import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const user = searchParams.get('user');
  try {
    // Check if user exists
    if (!user) {
      console.error('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }
    await db.user.update({
      where: {
        id: user,
      },
      data: {
        emailSubscription: false,
      },
    });

    console.log(`User ID: ${user} unsubscribed`);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(`Error unsubscribe user: ${error}`);
    return NextResponse.json({ error: 'Error unsubscribe user' }, { status: 500 });
  }
};
