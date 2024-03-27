'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';

const UserAccountNav = () => {
  return (
    <Button
      className='bg-transparent border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/90 hover:text-primary-foreground'
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: '/sign-in',
        })
      }
    >
      Sign out
    </Button>
  );
};

export default UserAccountNav;
