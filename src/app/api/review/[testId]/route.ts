import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { Prisma, Test } from '@prisma/client';
import { equal } from 'assert';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const Review = Prisma.validator<Prisma.TestDefaultArgs>()({
  select: {
    id: true,
    video_description: true,
    expiresAt: true,
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

export async function GET(req: NextRequest, { params: { testId } }: { params: { testId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect('/sign-in');
  }

  const result = await db.test.findFirst({
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
      AND: {
        expiresAt: {
          gte: new Date(),
        },
      },
    },
    select: {
      id: true,
      userId: true,
      video_description: true,
      expiresAt: true,
      thumbnails: {
        select: {
          id: true,
          thumbnail_url: true,
          title: true,
        },
      },
    },
  });

  return NextResponse.json(result);
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
