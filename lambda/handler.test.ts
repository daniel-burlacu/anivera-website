import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CASE_KEYS, canonicalPresentation } from '../src/components/how-it-works/content';
import { handle, type FunctionUrlEvent, type Settings } from './handler';

const SECRET = 'test-secret-value';

function setup() {
  const sent: { Bucket?: string; Key?: string; Body?: string }[] = [];
  const settings: Settings = {
    bucket: 'survey-bucket',
    prefix: 'presentation/responses',
    originVerify: SECRET,
    client: {
      async send(command) {
        sent.push((command as unknown as { input: (typeof sent)[number] }).input);
        return {};
      },
    },
  };
  return { sent, settings };
}

const validAnswers = (caseKey: (typeof CASE_KEYS)[number]) =>
  canonicalPresentation.cases[caseKey].questions.map((q) => (q.multi ? [0] : 0));

const post = (body: unknown, headers: Record<string, string> = { 'x-origin-verify': SECRET }): FunctionUrlEvent => ({
  rawPath: '/api/presentation-responses',
  headers,
  body: JSON.stringify(body),
  requestContext: { http: { method: 'POST' } },
});

const valid = () => ({
  caseKey: 'vets',
  name: 'Ana Pérez',
  email: 'ana@example.test',
  organisation: 'Clínica Sol',
  consent: true,
  language: 'es',
  answers: validAnswers('vets'),
});

test('stores a valid submission as one JSON file', async () => {
  const { sent, settings } = setup();
  const res = await handle(post(valid()), settings);
  assert.equal(res.statusCode, 200);
  assert.equal(sent.length, 1);
  assert.match(sent[0].Key!, /^presentation\/responses\/vets\/.+-ana-perez-[0-9a-f]{8}\.json$/);
  const saved = JSON.parse(sent[0].Body!);
  const [entry] = Object.values(saved.vets) as { name: string; questions: Record<string, unknown> }[];
  assert.equal(entry.name, 'Ana Pérez');
  assert.equal(Object.keys(entry.questions).length, canonicalPresentation.cases.vets.questions.length);
});

test('refuses calls without the CloudFront secret header', async () => {
  const { sent, settings } = setup();
  assert.equal((await handle(post(valid(), {}), settings)).statusCode, 403);
  assert.equal((await handle(post(valid(), { 'x-origin-verify': 'wrong' }), settings)).statusCode, 403);
  assert.equal(sent.length, 0);
});

test('refuses everything when the secret is not configured', async () => {
  const { settings } = setup();
  assert.equal((await handle(post(valid(), { 'x-origin-verify': '' }), { ...settings, originVerify: '' })).statusCode, 403);
});

test('rejects wrong method, wrong path and oversized bodies', async () => {
  const { sent, settings } = setup();
  const get = { ...post(valid()), requestContext: { http: { method: 'GET' } } };
  assert.equal((await handle(get, settings)).statusCode, 404);
  assert.equal((await handle({ ...post(valid()), rawPath: '/api/other' }, settings)).statusCode, 404);
  assert.equal((await handle({ ...post(valid()), body: 'x'.repeat(40_000) }, settings)).statusCode, 413);
  assert.equal(sent.length, 0);
});

test('validates the submission', async () => {
  const { sent, settings } = setup();
  const bad = async (patch: Record<string, unknown>) => (await handle(post({ ...valid(), ...patch }), settings)).statusCode;
  assert.equal(await bad({ caseKey: 'other' }), 400);
  assert.equal(await bad({ name: '  ' }), 400);
  assert.equal(await bad({ consent: false }), 400);
  assert.equal(await bad({ email: 'not-an-email' }), 400);
  assert.equal(await bad({ answers: [] }), 400);
  assert.equal(await bad({ answers: validAnswers('vets').map(() => 999) }), 400);
  assert.equal((await handle({ ...post(valid()), body: '{not json' }, settings)).statusCode, 400);
  assert.equal(sent.length, 0);
});

test('reports a storage failure without leaking details', async () => {
  const { settings } = setup();
  settings.client = {
    async send() {
      throw new Error('AccessDenied for ana@example.test');
    },
  };
  const res = await handle(post(valid()), settings);
  assert.equal(res.statusCode, 500);
  assert.doesNotMatch(res.body, /ana@example/);
});
