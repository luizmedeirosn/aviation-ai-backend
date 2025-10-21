import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import InternalServerError from '../utils/errors/InternalServerError.js';
import BadRequestError from '../utils/errors/BadRequestError.js';

const BUCKET_NAME: string = process.env.AWS_S3_BUCKET!;
const s3Client = new S3Client();

const EXPIRES_IN_SECONDS: number = 300; // 5m

const uploadToS3 = async (key: string, body: Buffer, contentType: string): Promise<void> => {
  try {
    if (!BUCKET_NAME) throw new InternalServerError(' Missing AWS_S3_BUCKET environment variable');
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
  } catch (error) {
    console.error(`[uploadToS3] - ${new Date()}`, error);
    throw error;
  }
};

const getPresignedDownloadUrl = async (key: string): Promise<string> => {
  try {
    if (!BUCKET_NAME) throw new InternalServerError(' Missing AWS_S3_BUCKET environment variable');
    if (!key) throw new BadRequestError('Missing S3 key');
    return await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
      {
        expiresIn: EXPIRES_IN_SECONDS,
      },
    );
  } catch (error) {
    console.error(`[getPresignedDownloadUrl] - ${new Date()}`, error);
    throw error;
  }
};

export { uploadToS3, getPresignedDownloadUrl };
