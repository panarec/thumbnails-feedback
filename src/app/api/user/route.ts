import { db } from '@/lib/db';
import { hash } from 'bcrypt';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { VerificationEmailTemplate } from '@/components/email-templates/verification-email';
import { ReactElement } from 'react';
import { v4 } from 'uuid';

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
  const body = await req.json();
  const { username, email, password } = userRegistrationSchema.parse(body);

  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { body: { error: 'User with this email already exists', field: 'email' } },
        { status: 400 }
      );
    }

    // Check if username is already taken
    const existingUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return NextResponse.json({ body: { error: 'Username already taken', field: 'username' } }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const activationToken = await db.activationToken.create({
      data: {
        userId: newUser.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour,
        token: v4(),
      },
    });

    const { password: _, id: __, ...user } = newUser;

    const { data, error } = await resend.emails.send({
      from: 'Thumbnails Feedback <noreply@notifications.thumbnailsfeedback.com>',
      to: email,
      subject: 'Verify your email',
      headers: {
        'X-Entity-Ref-ID': v4(),
      },
      react: VerificationEmailTemplate({
        username: username,
        userId: newUser.id,
        token: activationToken.token,
      }) as ReactElement,
    });

    if (error) {
      console.error(error);
      throw new Error('Failed to send email');
    }

    return NextResponse.json({ user, message: 'User created' }, { status: 201 });
  } catch (error) {
    console.log(error);
    await db.user.delete({
      where: {
        email: email,
      },
    });
    return NextResponse.json({ body: { error: 'Something went wrong' } }, { status: 500 });
  }
};
