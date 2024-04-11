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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const SideNav = ({ session }: { session: any }) => {
  const router = useRouter();
  const clientSession = getSession();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    clientSession.then((ses: any) => {
    console.log({ses})
      setIsPremium(ses?.user.tier === 'premium');
    });
  }, [clientSession]);

  const handleClick = async () => {
    try {
      const stripeSessionRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email }),
      });
      const stripeSession = await stripeSessionRes.json();
      if (stripeSession.url) {
        router.push(stripeSession.url);
      }
    } catch (error) {
      console.error(error); // handle error
    }
  };


  return (
    <SessionProvider>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {!isPremium ? (
          <Button variant="default" size="sm" onClick={handleClick}>
            Upgrade to premium
          </Button>
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
            <Link href="/settings">
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>

            <DropdownMenuItem>Support</DropdownMenuItem>
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
