import { S3_BUCKET_NAME } from '@/config/s3';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { s3 } from '@/lib/s3';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Prisma, Test } from '@prisma/client';
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const TestWithCommentsAndVotes = Prisma.validator<Prisma.TestDefaultArgs>()({
  select: {
    id: true,
    test_name: true,
    expiresAt: true,
    createdAt: true,
    video_description: true,
    thumbnails: {
      select: {
        id: true,
        thumbnail_url: true,
        title: true,
        votes: {
          select: {
            id: true,
            userId: true,
          },
        },
        comments: {
          select: {
            user: {
              select: {
                username: true,
              },
            },
            comment: true,
            createdAt: true,
            id: true,
          },
        },
      },
    },
  },
});

export type TestWithCommentsAndVotes = Prisma.TestGetPayload<typeof TestWithCommentsAndVotes>;

export async function GET(req: NextRequest, { params: { testId } }: { params: { testId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect('/sign-in');
  }

  const result = await db.test.findFirst({
    where: {
      id: testId,
    },
    select: {
      id: true,
      test_name: true,
      expiresAt: true,
      createdAt: true,
      video_description: true,
      thumbnails: {
        select: {
          id: true,
          thumbnail_url: true,
          title: true,
          votes: {
            select: {
              id: true,
              userId: true,
            },
          },
          comments: {
            select: {
              user: {
                select: {
                  username: true,
                },
              },
              comment: true,
              createdAt: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(result);
}
const TestWithIdAndTestName = Prisma.validator<Prisma.TestArgs>()({
  select: {
    id: true,
    test_name: true,
  },
});

export type TestWithIdAndTestName = Prisma.TestGetPayload<typeof TestWithIdAndTestName>;

export async function DELETE(req: NextRequest, { params: { testId } }: { params: { testId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect('/sign-in');
  }

  const result = await db.test.delete({
    where: {
      id: testId,
    },
    select: {
      id: true,
      test_name: true,
      thumbnails: {
        select: {
          id: true,
          thumbnail_url: true,
          title: true,
        },
      },
    },
  });

  result.thumbnails.forEach((thumbnail) => {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: thumbnail.thumbnail_url.split('/').pop(),
    });

    s3.send(deleteCommand);
  });

  return NextResponse.json(result);
}
