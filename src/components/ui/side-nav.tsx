'use client';

import { CircleUser } from 'lucide-react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { SessionProvider, getSession, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UpgradeButton } from './UpgradeButton';

export const SideNav = ({ session }: { session: any }) => {
  const clientSession = getSession();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    clientSession.then((ses: any) => {
      setIsPremium(ses?.user.tier === 'premium');
    });
  }, [clientSession]);

  return (
    <SessionProvider>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {!isPremium ? (
          <UpgradeButton successUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`} cancelUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`}>
            Upgrade to premium
          </UpgradeButton>
        ) : (
          <Link href="/dashboard" className="text-orange-400">
            Premium member
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Welcome, {session.user.username}!</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/dashboard">
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
            <a href="mailto:support@thumbnailsfeedback.com">
              <DropdownMenuItem>Support</DropdownMenuItem>
            </a>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: '/sign-in',
                })
              }
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SessionProvider>
  );
};
