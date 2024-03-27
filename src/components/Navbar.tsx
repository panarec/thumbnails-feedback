import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccountNav from './UserAccountNav';
import { MainNav } from './ui/main-nav';
import { getSiteConfig } from '@/config/site';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const siteConfig = await getSiteConfig();

  return (
    <header className="sticky top-0 z-40 bg-white py-2 border-b border-s-zinc-200 w-full">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav siteConfig={siteConfig} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {session?.user ? (
              <UserAccountNav />
            ) : (
              <Link href="/sign-in" className={buttonVariants()}>
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
