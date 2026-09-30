import { promises as fs } from 'fs';
import path from 'path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import type { CaseKey } from '@/components/how-it-works/content';

export type StoredAnswer = { question: string; answer: string | string[] };
export type StoredResponse = {
  name: string;
  email: string | null;
  organisation: string | null;
  language: string;
  submittedAt: string;
  questions: Record<string, StoredAnswer>;
};

// Every submission is saved as its own file, e.g.
//   presentation/responses/users/2026-09-30T20-50-57-123Z-anastasia-dashcovska-1a2b3c4d.json
// holding { "users": { "<id>": { name, email, ... questions } } }.
// S3 is used when the S3 variables are set; otherwise the files go to data/responses locally.
// Read on every call so a .env created or changed while the server runs is picked up.
// Vercel reserves AWS_REGION and AWS_SECRET_ACCESS_KEY for its own runtime, so the AWS_S3_* names
// are preferred there; the plain AWS_* names still work locally.
function s3Settings() {
  const env = process.env;
  return {
    AWS_S3_ACCESS_ID: env.AWS_S3_ACCESS_ID,
    AWS_S3_SECRET_ACCESS_KEY: env.AWS_S3_SECRET_ACCESS_KEY || env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_REGION: env.AWS_S3_REGION || env.AWS_REGION,
    AWS_S3_BUCKET: env.AWS_S3_BUCKET,
  };
}

function s3Config() {
  const { AWS_S3_ACCESS_ID, AWS_S3_SECRET_ACCESS_KEY, AWS_S3_REGION, AWS_S3_BUCKET } = s3Settings();
  if (!AWS_S3_ACCESS_ID || !AWS_S3_SECRET_ACCESS_KEY || !AWS_S3_REGION || !AWS_S3_BUCKET) return null;
  return {
    bucket: AWS_S3_BUCKET,
    prefix: (process.env.AWS_S3_PREFIX || 'presentation/responses').replace(/\/+$/, ''),
    client: new S3Client({
      region: AWS_S3_REGION,
      credentials: { accessKeyId: AWS_S3_ACCESS_ID, secretAccessKey: AWS_S3_SECRET_ACCESS_KEY },
    }),
  };
}

const localDir = () => process.env.PRESENTATION_RESPONSES_DIR || path.join(process.cwd(), 'data', 'responses');

export function storageTarget() {
  const s3 = s3Config();
  return s3 ? `s3://${s3.bucket}/${s3.prefix}/` : localDir();
}

function fileName(id: string, entry: StoredResponse) {
  const time = entry.submittedAt.replace(/[:.]/g, '-');
  const slug = entry.name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  return `${time}-${slug || 'anonymous'}-${id.slice(0, 8)}.json`;
}

export async function saveResponse(caseKey: CaseKey, id: string, entry: StoredResponse): Promise<string> {
  const name = fileName(id, entry);
  const body = JSON.stringify({ [caseKey]: { [id]: entry } }, null, 2);

  const s3 = s3Config();
  if (s3) {
    const key = `${s3.prefix}/${caseKey}/${name}`;
    await s3.client.send(
      new PutObjectCommand({
        Bucket: s3.bucket,
        Key: key,
        Body: body,
        ContentType: 'application/json',
        ServerSideEncryption: 'AES256',
        IfNoneMatch: '*', // never overwrite an existing submission
      })
    );
    return `s3://${s3.bucket}/${key}`;
  }

  if (process.env.VERCEL) {
    // Vercel's file system is read-only, so a local file cannot work there.
    const missing = Object.entries(s3Settings()).filter(([, v]) => !v).map(([k]) => k);
    throw new Error(`S3 is not configured on Vercel; missing: ${missing.join(', ')}`);
  }

  const file = path.join(localDir(), caseKey, name);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, body, { encoding: 'utf8', flag: 'wx' });
  return file;
}
