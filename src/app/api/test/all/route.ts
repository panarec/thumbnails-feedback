import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { Prisma, Test } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const TestWithCommentsIdsAndVotesIds = Prisma.validator<Prisma.TestDefaultArgs>()({
  include: {
    thumbnails: {
      select: {
        votes: {
          select: {
            id: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
      },
    },
  },
});

export type TestWithCommentsIdsAndVotesIds = Prisma.TestGetPayload<typeof TestWithCommentsIdsAndVotesIds>;

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect('/sign-in');
  }

  const result = await db.test.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      test_name: true,
      test_duration: true,
      video_description: true,
      thumbnails: {
        select: {
          votes: {
            select: {
              id: true,
            },
          },
          comments: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(result);
}
