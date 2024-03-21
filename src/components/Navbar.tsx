import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { User } from 'lucide-react';
import UserAccountNav from './UserAccountNav';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full top-0">
      <h1 className="container">
        <Link href="/">Logo</Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </h1>
    </div>
  );
};

export default Navbar;
