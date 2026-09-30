import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { CASE_KEYS, CaseKey, canonicalPresentation } from '@/components/how-it-works/content';
import { StoredAnswer, StoredResponse, saveResponse, storageTarget } from './storage';

// Stored shape (in S3 or the local file, see ./storage):
// { users: { "<id>": { name, email, organisation, language, submittedAt,
//     questions: { "question 1": { question, answer }, ... "question 10": {...} } } },
//   vets: {...}, shelters: {...} }

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON.' }, { status: 400 });
  }

  const caseKey = body.caseKey as CaseKey;
  if (!CASE_KEYS.includes(caseKey)) {
    return NextResponse.json({ success: false, message: 'Unknown case.' }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const organisation = clean(body.organisation, 200);
  if (!name || body.consent !== true) {
    return NextResponse.json({ success: false, message: 'Name and consent are required.' }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, message: 'Invalid email.' }, { status: 400 });
  }

  // Answers arrive as option indexes and are stored with the English question and option text.
  const questions = canonicalPresentation.cases[caseKey].questions;
  const answers = body.answers;
  if (!Array.isArray(answers) || answers.length !== questions.length) {
    return NextResponse.json({ success: false, message: 'All questions must be answered.' }, { status: 400 });
  }

  const stored: Record<string, StoredAnswer> = {};
  for (let i = 0; i < questions.length; i++) {
    const { q, options, multi } = questions[i];
    const raw = answers[i];
    const picks = multi && Array.isArray(raw) ? raw : [raw];
    const valid = picks.length > 0 && picks.every((p) => Number.isInteger(p) && p >= 0 && p < options.length);
    if (!valid) {
      return NextResponse.json({ success: false, message: `Invalid answer for question ${i + 1}.` }, { status: 400 });
    }
    const labels = Array.from(new Set(picks as number[])).map((p) => options[p]);
    stored[`question ${i + 1}`] = { question: q, answer: multi ? labels : labels[0] };
  }

  const entry: StoredResponse = {
    name,
    email: email || null,
    organisation: caseKey === 'users' ? null : organisation || null,
    language: clean(body.language, 5) || 'en',
    submittedAt: new Date().toISOString(),
    questions: stored,
  };

  const id = randomUUID();
  try {
    await saveResponse(caseKey, id, entry);
  } catch (error) {
    console.error(`Could not save presentation response to ${storageTarget()}:`, error);
    return NextResponse.json({ success: false, message: 'Could not save the answers.' }, { status: 500 });
  }

  return NextResponse.json({ success: true, id, savedTo: storageTarget().startsWith('s3://') ? 's3' : 'local' });
}
