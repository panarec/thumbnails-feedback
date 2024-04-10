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
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const SideNav = async ({ username }: { username: string }) => {
  return (
    <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Welcome, {username}!</DropdownMenuLabel>
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
  );
};
