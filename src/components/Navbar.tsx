import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccountNav from './UserAccountNav';
import { MainNav } from './ui/main-nav';
import { getSiteConfig } from '@/config/site';
import Header from './ui/header';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const siteConfig = await getSiteConfig();

  return (
    <Header>
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
    </Header>
  );
};

export default Navbar;
