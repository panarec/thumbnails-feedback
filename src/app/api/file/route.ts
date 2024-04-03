import { fileTypeSchema } from '@/lib/validations/s3';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '@/lib/s3';
import { S3_BUCKET_NAME } from '@/config/s3';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request): Promise<NextResponse> {
  if (!req.body) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const { fileType, fileSize, checksum } = await req.json();
  const fileId = nanoid();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // validate file extension, will throw if invalid
    const parsedFileType = fileTypeSchema.parse(fileType);
    const fileExtension = parsedFileType.split('/')[1];
    const key = `${fileId}.${fileExtension}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
      ContentLength: fileSize,
      ChecksumSHA256: checksum,
      Metadata: {
        userId: session.user.id,
      },
    });
    const signedUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 60 });

    const getUrl = signedUrl.split('?')[0];

    return NextResponse.json({ signedUrl, getUrl }, { status: 200 });
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
