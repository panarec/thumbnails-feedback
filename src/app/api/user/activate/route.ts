import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get('token');
  try {
    // Check if token exists
    if (!token) {
      console.error('Token not found');
      return NextResponse.json({ error: 'User do not exist or was already activated' }, { status: 400 });
    }

    const activationToken = await db.activationToken.findUnique({
      where: {
        token: token,
      },
    });

    if (!activationToken) {
      console.error(`Token: ${token} not found`);
      return NextResponse.json({ error: 'User do not exist or was already activated' }, { status: 404 });
    }

    // Check if token is expired

    if (activationToken.expiresAt < new Date()) {
      console.error(`Token: ${token} expired`);
      return NextResponse.json({ error: 'Token expired' }, { status: 400 });
    }

    // Activate user

    const data = await db.user.update({
      where: {
        id: activationToken.userId,
      },
      data: {
        isActivated: true,
      },
      select: {
        email: true,
        isActivated: true,
      },
    });

    // Delete activation token

    await db.activationToken.delete({
      where: {
        id: activationToken.id,
      },
    });

    console.log(`User ID: ${activationToken.userId} activated`);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(`Error activating user: ${error}`);
    return NextResponse.json({ error: 'Error activating user' }, { status: 500 });
  }
};
