import { ReviewsNeededEmailTemplate } from '../../../../emails/reviews-needed';
import { db } from '@/lib/db';
import { resend } from '@/lib/resend';
import { sub } from 'date-fns';
import { NextRequest } from 'next/server';
import { ReactElement } from 'react';
import { v4 } from 'uuid';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const testsCreatedYesterday = await db.test.findMany({
    where: {
      createdAt: {
        gte: sub(new Date(), { days: 1 }),
        lt: new Date(),
      },
    },
    select: {
      id: true,
      userId: true,
      thumbnails: {
        select: {
          id: true,
          votes: {
            select: {
              id: true,
              userId: true,
            },
          },
        },
      },
    },
  });

  if (testsCreatedYesterday.length === 0) {
    return Response.json([]);
  }

  const allUsers = await db.user.findMany({
    select: {
      id: true,
      tier: true,
    },
  });

  const testsWithLessThan5votes = testsCreatedYesterday.filter((test) => {
    const user = allUsers.find((user) => user.id === test.userId);
    if (user?.tier === 'premium') return true;
    const votes = test.thumbnails.reduce((acc, thumbnail) => {
      return acc + thumbnail.votes.length;
    }, 0);

    return votes < 5;
  });

  const allUsersWithEmailSub = await db.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
    },
    where: {
      emailSubscription: true,
      isActivated: true,
    },
  });

  let usersNotVotedOnAllTests = allUsersWithEmailSub.filter((user) => {
    return !testsWithLessThan5votes.every((test) => {
      return (
        test.thumbnails.some((thumbnail) => {
          return thumbnail.votes.some((vote) => vote.userId === user.id);
        }) || test.userId === user.id
      );
    });
  });

  const usersNotVotedOnAllTestsAndVotesCount = usersNotVotedOnAllTests.map((user) => {
    const userVotesNeeded = testsWithLessThan5votes.filter((test) => {
      if (test.userId !== user.id)
        return !test.thumbnails.some((thumbnail) => {
          return thumbnail.votes.some((vote) => vote.userId === user.id);
        });
    });
    return {
      email: user.email,
      username: user.username,
      id: user.id,
      votesNeeded: userVotesNeeded.length,
    };
  });
  try {
    const emails = usersNotVotedOnAllTestsAndVotesCount.map((user) => {
      return {
        from: 'Thumbnails Feedback <noreply@notifications.thumbnailsfeedback.com>',
        to: user.email,
        subject: 'Need your review on some thumbnails!',
        headers: {
          'X-Entity-Ref-ID': v4(),
        },
        react: ReviewsNeededEmailTemplate({
          username: user.username,
          testCount: user.votesNeeded,
          userId: user.id,
        }) as ReactElement,
      };
    });

    const { data, error } = await resend.batch.send(emails);

    if (error) {
      console.error(error);
      return Response.json({ error: 'Failed to send emails' }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}
