import { formSchema } from '@/components/form/NewTestForm';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export type CreateTestResponse = {
  test_name: string;
  id: number;
};

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as z.infer<typeof formSchema>;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect('/sign-in');
  }

  const data = await db.test.create({
    data: {
      test_name: body.testName,
      test_duration: body.testDuration,
      video_description: body.videoDescription,
      thumbnails: {
        createMany: {
          data: body.testItems.map((item) => ({
            title: item.videoName,
            thumbnail_url: item.file,
          })),
        },
      },
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
    select: {
      test_name: true,
      id: true,
    },
  });

  return NextResponse.json(data);
}
