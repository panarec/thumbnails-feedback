import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export type Reviews = {
  id: string;
  createdAt: Date;
  expiresAt: Date;
  video_description: string;
  user: {
    id: string;
    tier: string;
  };
  thumbnails: {
    id: string;
    thumbnail_url: string;
    title: string;
    votes: {
      createdAt: Date;
      userId: string;
    }[];
  }[];
}[];

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect('/sign-in');
  }

  const countResult = await db.test.findMany({
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
      userId: {
        not: session.user.id,
      },
      expiresAt: {
        gte: new Date(),
      },
    },
    select: {
      id: true,
      createdAt: true,
      video_description: true,
      expiresAt: true,
      user: {
        select: {
          id: true,
          tier: true,
        },
      },
      thumbnails: {
        select: {
          thumbnail_url: true,
          title: true,
          id: true,
          votes: {
            select: {
              createdAt: true,
              userId: true,
            },
          },
        },
      },
    },
  });

  // filter tests with user which is free tier and has already 5 votes on test
  const filteredTests = countResult.filter((test) => {
    const votes = test.thumbnails.reduce((acc, thumbnail) => {
      return acc + thumbnail.votes.length;
    }, 0);

    if (test.user.tier === 'free' && votes >= 5) {
      return false;
    } else {
      return true;
    }
  });

  const reviews = filteredTests
    .sort((a, b) => {
      return a.expiresAt.getTime() - b.expiresAt.getTime();
    })
    .sort((a, b) => {
      const votesA = a.thumbnails.reduce((acc, thumbnail) => {
        return acc + thumbnail.votes.length;
      }, 0);
      const votesB = b.thumbnails.reduce((acc, thumbnail) => {
        return acc + thumbnail.votes.length;
      }, 0);

      return votesA - votesB;
    });


  return NextResponse.json(reviews);
};
