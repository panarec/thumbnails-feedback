import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
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
          id: true,
          title: true,
          thumbnail_url: true,
        },
      },
    },
  });

  return NextResponse.json(result);
}
