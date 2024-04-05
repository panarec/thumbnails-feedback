import { authOptions } from '@/lib/auth';
import { NavItem } from '@/types/nav';
import { getServerSession } from 'next-auth';

export interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {};
}

const loggedUserNav: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

const guestNav: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
];

export async function getSiteConfig() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return {
      name: 'Thumbnail Feedbacks',
      description: '',
      mainNav: loggedUserNav,
      links: {},
    };
  } else {
    return {
      name: 'Thumbnail Feedbacks',
      description: '',
      mainNav: guestNav,
      links: {},
    };
  }
}
