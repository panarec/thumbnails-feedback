import { MainNav } from './ui/main-nav';
import { getSiteConfig } from '@/config/site';
import Header from './ui/header';
import { SideNav } from './ui/side-nav';
import { MobileNav } from './ui/mobile-nav';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { authOptions } from '@/lib/auth';

const Navbar = async () => {
  const siteConfig = await getSiteConfig();
  const session = await getServerSession(authOptions);

  return (
    <Header>
      <MainNav siteConfig={siteConfig} />
      <MobileNav siteConfig={siteConfig} />
      {session?.user ? (
        <SideNav session={session} />
      ) : (
        <Link href="/sign-in" scroll={true} className={buttonVariants()}>
          Sign in
        </Link>
      )}
    </Header>
  );
};

export default Navbar;
