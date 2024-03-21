import { db } from '@/lib/db';
import { hash } from 'bcrypt';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const userRegistrationSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(20, {
      message: 'Username must be at most 20 characters.',
    }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(1, {
      message: 'Password is required.',
    })
    .min(6, {
      message: 'Password must be at least 6 characters.',
    })
    .max(100, {
      message: 'Password must be at most 100 characters.',
    }),
});

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { username, email, password } = userRegistrationSchema.parse(body);

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ body: { error: 'User already exists' } });
    }

    // Check if username is already taken
    const existingUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return NextResponse.json({ body: { error: 'Username already taken' } });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json({ user, message: 'User created' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ body: { error: 'Something went wrong' } });
  }
};
