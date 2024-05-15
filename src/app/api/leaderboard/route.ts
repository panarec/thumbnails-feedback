import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const usersWithMostCommentsAndVotes = await db.user.findMany({
    select: {
      comments: true,
      votes: true,
      username: true,
      _count: {
        select: {
          comments: true,
          votes: true,
        },
      },
    },
    where: {
      isActivated: true,
    },
    orderBy: [
      {
        votes: {
          _count: 'desc',
        },
      },
      {
        comments: {
          _count: 'desc',
        },
      },
    ],
    take: 10,
  });

  return NextResponse.json(usersWithMostCommentsAndVotes, { status: 200 });
};
