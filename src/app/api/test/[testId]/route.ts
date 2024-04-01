import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { Prisma, Test } from '@prisma/client';
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const TestWithCommentsAndVotes = Prisma.validator<Prisma.TestDefaultArgs>()({
  include: {
    thumbnails: {
      select: {
        id: true,
        thumbnail_url: true,
        title: true,
        votes: {
          select: {
            id: true,
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
      test_duration: true,
      video_description: true,
      thumbnails: {
        select: {
          id: true,
          thumbnail_url: true,
          title: true,
          votes: {
            select: {
              id: true,
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
    },
  });

  return NextResponse.json(result);
}
