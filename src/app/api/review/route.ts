import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const Review = Prisma.validator<Prisma.TestDefaultArgs>()({
  select: {
    id: true,
    video_description: true,
    thumbnails: {
      select: {
        id: true,
        thumbnail_url: true,
        title: true,
      },
    },
  },
});

export type Review = Prisma.TestGetPayload<typeof Review>;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log('calling review api');

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

  const expirySoonAndLowestVotes = filteredTests
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

  return NextResponse.json(expirySoonAndLowestVotes[0]);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect('/sign-in');
  }

  const body = await req.json();

  const voteResponse = await db.vote.create({
    data: {
      userId: session.user.id,
      thumbnailId: body.votedThumbnailId,
    },
  });

  if (!body.comments) return NextResponse.json({ message: 'success' });

  const validComments = body.comments.filter((comment: any) => comment);

  const commentResponse = await db.comment.createMany({
    data: validComments.map((comment: any) => ({
      userId: session.user.id,
      thumbnailId: comment.thumbnailId,
      comment: comment.comment,
    })),
  });

  return NextResponse.json({ message: 'success' });
}
