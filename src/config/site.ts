import { authOptions } from '@/lib/auth';
import { NavItem } from '@/types/nav';
import { getServerSession } from 'next-auth';

export interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links: {};
  socials?: {
    youtube?: string;
  };
}

const loggedUserNav: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Leaderboard',
    href: '/leaderboard',
  },
];

const guestNav: NavItem[] = [
  {
    title: 'How it works',
    href: '/#how-it-works',
  },
  {
    title: 'Pricing',
    href: '/#pricing',
  },
  {
    title: 'FAQ',
    href: '/#faq',
  },
  {
    title: 'Leaderboard',
    href: '/leaderboard',
  },
];

export async function getSiteConfig() {
  const session = await getServerSession(authOptions);

  const config = {
    name: 'Thumbnails Feedback',
    description: 'Get feedback before going live',
    links: {},
    socials: {
      youtube: 'https://www.youtube.com/channel/UChu9E6KNDxbyS8BiVRyFrYA',
    },
  };

  if (session?.user) {
    return {
      ...config,
      mainNav: loggedUserNav,
    };
  } else {
    return {
      ...config,
      mainNav: guestNav,
    };
  }
}
