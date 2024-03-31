import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccountNav from './UserAccountNav';
import { MainNav } from './ui/main-nav';
import { getSiteConfig } from '@/config/site';
import Header from './ui/header';
import { SideNav } from './ui/side-nav';
import { MobileNav } from './ui/mobile-nav';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const siteConfig = await getSiteConfig();

  return (
    <Header>
      <MainNav siteConfig={siteConfig} />
      <MobileNav />
      <SideNav />
      {/* <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {session?.user ? (
              <UserAccountNav />
            ) : (
              <Link href="/sign-in" className={buttonVariants()}>
                Sign In
              </Link>
            )}
          </nav>
        </div> */}
    </Header>
  );
};

export default Navbar;
