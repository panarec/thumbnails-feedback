import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const usersWithMostCommentsAndVotes = await db.user.findMany({
    select: {
      comments: {
        select: {
          id: true,
        },
      },
      votes: {
        select: {
          id: true,
        },
      },
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
}
