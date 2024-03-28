import { fileTypeSchema } from '@/lib/validations/s3';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '@/lib/s3';
import { MAX_FILE_SIZE } from '@/config/image';
import { S3_BUCKET_NAME } from '@/config/s3';
import { NextApiRequest } from 'next';

export async function POST(req: Request): Promise<NextResponse> {
  if (!req.body) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const reqFileType = (await req.json()).fileType;
  const fileId = nanoid();

  try {
    // validate file extension, will throw if invalid
    const fileType = fileTypeSchema.parse(reqFileType);
    const fileExtension = fileType.split('/')[1];
    const key = `${fileId}.${fileExtension}`;

    // Create a presigned POST request to upload the file to S3
    const { url: postUrl, fields } = (await createPresignedPost(s3, {
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Expires: 60,
      Conditions: [
        ['content-length-range', 0, MAX_FILE_SIZE],
        ['starts-with', '$Content-Type', 'image/'],
      ],
    })) as { url: string; fields: any };

    const command = new GetObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command);

    const getUrl = signedUrl.split('?')[0];

    return NextResponse.json({ postUrl, fields, getUrl }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 415 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
