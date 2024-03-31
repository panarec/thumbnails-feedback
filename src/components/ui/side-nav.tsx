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

export const SideNav = async () => {
  return (
    <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <Button
        className="bg-transparent border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/90 hover:text-primary-foreground"
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: '/sign-in',
          })
        }
      >
        Sign out
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
