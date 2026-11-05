import { randomUUID, timingSafeEqual } from 'node:crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CASE_KEYS, canonicalPresentation, type CaseKey } from '../src/components/how-it-works/content';

// Survey endpoint (POST /api/presentation-responses). Same rules as the old Next.js route: one JSON file per
// submission, { "<case>": { "<id>": { name, email, organisation, language, submittedAt, questions } } }.
// Runs behind CloudFront, which adds the X-Origin-Verify header. Calls without it are refused, so the
// function URL cannot be used directly. Credentials come from the Lambda execution role.

export interface FunctionUrlEvent {
  rawPath: string;
  headers: Record<string, string | undefined>;
  body?: string;
  isBase64Encoded?: boolean;
  requestContext: { http: { method: string } };
}

export interface HandlerResult {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

export interface PutClient {
  send(command: PutObjectCommand): Promise<unknown>;
}

export interface Settings {
  bucket: string;
  prefix: string;
  originVerify: string;
  client: PutClient;
}

const MAX_BODY_BYTES = 32 * 1024;

const reply = (statusCode: number, body: Record<string, unknown>): HandlerResult => ({
  statusCode,
  headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  body: JSON.stringify(body),
});

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

const sameSecret = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && x.length > 0 && timingSafeEqual(x, y);
};

const fileName = (id: string, submittedAt: string, name: string) => {
  const slug = name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  return `${submittedAt.replace(/[:.]/g, '-')}-${slug || 'anonymous'}-${id.slice(0, 8)}.json`;
};

export async function handle(event: FunctionUrlEvent, settings: Settings): Promise<HandlerResult> {
  if (!sameSecret(event.headers['x-origin-verify'] ?? '', settings.originVerify)) {
    return reply(403, { success: false, message: 'Forbidden.' });
  }
  if (event.requestContext.http.method !== 'POST' || event.rawPath !== '/api/presentation-responses') {
    return reply(404, { success: false, message: 'Not found.' });
  }

  const raw = event.isBase64Encoded ? Buffer.from(event.body ?? '', 'base64').toString('utf8') : (event.body ?? '');
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return reply(413, { success: false, message: 'Request too large.' });

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error('not an object');
    body = parsed as Record<string, unknown>;
  } catch {
    return reply(400, { success: false, message: 'Invalid JSON.' });
  }

  const caseKey = body.caseKey as CaseKey;
  if (!CASE_KEYS.includes(caseKey)) return reply(400, { success: false, message: 'Unknown case.' });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const organisation = clean(body.organisation, 200);
  if (!name || body.consent !== true) return reply(400, { success: false, message: 'Name and consent are required.' });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, { success: false, message: 'Invalid email.' });

  // Answers arrive as option indexes and are stored with the English question and option text.
  const questions = canonicalPresentation.cases[caseKey].questions;
  const answers = body.answers;
  if (!Array.isArray(answers) || answers.length !== questions.length) {
    return reply(400, { success: false, message: 'All questions must be answered.' });
  }

  const stored: Record<string, { question: string; answer: string | string[] }> = {};
  for (let i = 0; i < questions.length; i++) {
    const { q, options, multi } = questions[i];
    const rawAnswer = answers[i];
    const picks: unknown[] = multi && Array.isArray(rawAnswer) ? rawAnswer : [rawAnswer];
    const valid =
      picks.length > 0 && picks.every((p) => typeof p === 'number' && Number.isInteger(p) && p >= 0 && p < options.length);
    if (!valid) return reply(400, { success: false, message: `Invalid answer for question ${i + 1}.` });
    const labels = Array.from(new Set(picks as number[])).map((p) => options[p]);
    stored[`question ${i + 1}`] = { question: q, answer: multi ? labels : labels[0] };
  }

  const submittedAt = new Date().toISOString();
  const id = randomUUID();
  const entry = {
    name,
    email: email || null,
    organisation: caseKey === 'users' ? null : organisation || null,
    language: clean(body.language, 5) || 'en',
    submittedAt,
    questions: stored,
  };

  try {
    await settings.client.send(
      new PutObjectCommand({
        Bucket: settings.bucket,
        Key: `${settings.prefix}/${caseKey}/${fileName(id, submittedAt, name)}`,
        Body: JSON.stringify({ [caseKey]: { [id]: entry } }, null, 2),
        ContentType: 'application/json',
        IfNoneMatch: '*', // never overwrite an existing submission
      }),
    );
  } catch (error) {
    // Do not log the submission: it holds personal data.
    console.error('Could not save presentation response', error instanceof Error ? error.name : 'unknown error');
    return reply(500, { success: false, message: 'Could not save the answers.' });
  }

  return reply(200, { success: true, id });
}

let client: S3Client | undefined;

export const handler = (event: FunctionUrlEvent): Promise<HandlerResult> =>
  handle(event, {
    bucket: process.env.RESPONSES_BUCKET ?? '',
    prefix: (process.env.RESPONSES_PREFIX ?? 'presentation/responses').replace(/\/+$/, ''),
    originVerify: process.env.ORIGIN_VERIFY ?? '',
    client: (client ??= new S3Client({})),
  });
