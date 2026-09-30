import { promises as fs } from 'fs';
import path from 'path';
import { GetObjectCommand, PutObjectCommand, S3Client, S3ServiceException } from '@aws-sdk/client-s3';
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
export type ResponsesFile = Record<CaseKey, Record<string, StoredResponse>>;

const emptyFile = (): ResponsesFile => ({ users: {}, vets: {}, shelters: {} });

// S3 is used when all four S3 variables are set; otherwise answers go to a local JSON file.
// Read on every call so a .env created or changed while the server runs is picked up.
function s3Config() {
  const { AWS_S3_ACCESS_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_REGION, AWS_S3_BUCKET } = process.env;
  if (!AWS_S3_ACCESS_ID || !AWS_SECRET_ACCESS_KEY || !AWS_S3_REGION || !AWS_S3_BUCKET) return null;
  return {
    bucket: AWS_S3_BUCKET,
    key: process.env.AWS_S3_KEY || 'presentation/presentation-responses.json',
    client: new S3Client({
      region: AWS_S3_REGION,
      credentials: { accessKeyId: AWS_S3_ACCESS_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
    }),
  };
}

const localFile = () => process.env.PRESENTATION_RESPONSES_FILE || path.join(process.cwd(), 'data', 'presentation-responses.json');

export function storageTarget() {
  const s3 = s3Config();
  return s3 ? `s3://${s3.bucket}/${s3.key}` : localFile();
}

async function addToS3(s3: NonNullable<ReturnType<typeof s3Config>>, caseKey: CaseKey, id: string, entry: StoredResponse) {
  // Read, add, write back only if nobody else wrote in between (S3 conditional write); retry on conflict.
  for (let attempt = 0; attempt < 5; attempt++) {
    let data = emptyFile();
    let etag: string | undefined;
    try {
      const res = await s3.client.send(new GetObjectCommand({ Bucket: s3.bucket, Key: s3.key }));
      data = { ...data, ...JSON.parse(await res.Body!.transformToString('utf-8')) };
      etag = res.ETag;
    } catch (error) {
      if (!(error instanceof S3ServiceException && error.name === 'NoSuchKey')) throw error;
    }

    data[caseKey][id] = entry;
    try {
      await s3.client.send(
        new PutObjectCommand({
          Bucket: s3.bucket,
          Key: s3.key,
          Body: JSON.stringify(data, null, 2),
          ContentType: 'application/json',
          ServerSideEncryption: 'AES256',
          ...(etag ? { IfMatch: etag } : { IfNoneMatch: '*' }),
        })
      );
      return;
    } catch (error) {
      const status = error instanceof S3ServiceException ? error.$metadata.httpStatusCode : undefined;
      if (status !== 412 && status !== 409) throw error;
      await new Promise((resolve) => setTimeout(resolve, 100 * (attempt + 1)));
    }
  }
  throw new Error('S3 object kept changing; answers not saved.');
}

// Serialize local writes so two submissions at the same time cannot overwrite each other.
let localQueue: Promise<unknown> = Promise.resolve();

async function addToLocalFile(caseKey: CaseKey, id: string, entry: StoredResponse) {
  const LOCAL_FILE = localFile();
  let data = emptyFile();
  try {
    data = { ...data, ...JSON.parse(await fs.readFile(LOCAL_FILE, 'utf8')) };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
  data[caseKey][id] = entry;
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  const tmp = `${LOCAL_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(tmp, LOCAL_FILE);
}

export async function saveResponse(caseKey: CaseKey, id: string, entry: StoredResponse) {
  const s3 = s3Config();
  if (s3) return addToS3(s3, caseKey, id, entry);
  const write = localQueue.then(() => addToLocalFile(caseKey, id, entry));
  localQueue = write.catch(() => undefined);
  return write;
}
