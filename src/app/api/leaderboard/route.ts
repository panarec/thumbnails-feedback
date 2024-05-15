import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
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
  });

  return NextResponse.json(usersWithMostCommentsAndVotes, { status: 200 });
};
