import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './db';
import { compare } from 'bcrypt';
import { v4 } from 'uuid';
import { resend } from './resend';
import VerificationEmailTemplate from '@/components/email-templates/verification-email';
import { ReactElement } from 'react';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error('Email or password is incorrect. Please try again.');
        }

        if (user.isActivated === false) {
          const token = await db.activationToken.findFirst({
            where: {
              userId: user.id,
            },
          });

          if (!token) {
            throw new Error('User is not activated. Please check your email for the activation link.');
          }

          const newToken = await db.activationToken.update({
            where: {
              userId: user.id,
              token: token.token,
            },
            data: {
              expiresAt: new Date(Date.now() + 1000 * 60 * 60),
              token: v4(),
            },
          });

          const { data, error } = await resend.emails.send({
            from: 'Thumbnails Feedback <noreply@notifications.thumbnailsfeedback.com>',
            to: user.email,
            subject: 'Verify your email',
            headers: {
              'X-Entity-Ref-ID': v4(),
            },
            
            react: VerificationEmailTemplate({
              username: user.username,
              userId: user.id,
              token: newToken.token,
            }) as ReactElement,
          });
          throw new Error('User is not activated. Please check your email for the new activation link.');
        }

        const passwordMatch = await compare(credentials.password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          tier: user.tier,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, username: user.username, id: user.id, tier: user.tier };
      }
      return token;
    },
    async session({ session, token }) {
      const user = await db.user.findUnique({
        where: {
          id: token.id as string,
        },
      });
      return { ...session, user: { ...session.user, username: token.username, id: token.id, tier: user?.tier } };
    },
  },
};
