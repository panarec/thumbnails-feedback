import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export type Reviews = {
  count: number;
  firstReview: { id: string };
};

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect('/sign-in');
  }

  const countResult = await db.test.count({
    where: {
      thumbnails: {
        every: {
          votes: {
            none: {
              userId: session.user.id,
            },
          },
        },
      },
      NOT: {
        userId: session.user.id,
      },
      expiresAt: {
        gte: new Date(),
      },
    },
  });

  const firstReview = await db.test.findFirst({
    where: {
      thumbnails: {
        every: {
          votes: {
            none: {
              userId: session.user.id,
            },
          },
        },
      },
      NOT: {
        userId: session.user.id,
      },
      expiresAt: {
        gte: new Date(),
      },
    },
    select: {
      id: true,
    },
  });

  const result = {
    count: countResult,
    firstReview,
  };

  return NextResponse.json(result);
};
