import { getSiteConfig } from '@/config/site';
import Link from 'next/link';
import { FooterLinksBlock } from './FooterLinksBlock';
import Image from 'next/image';

export const Footer = async () => {
  const siteConfig = await getSiteConfig();

  return (
    <footer className="bg-base-200 border-t border-base-content/10">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-80 max-w-full flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link href="/" className="flex gap-2 justify-center md:justify-start items-center">
              <Image src="/logo.svg" alt="logo" className="w-8 h-8" width={200} height={200} />
              <span className="font-extrabold tracking-tight text-base md:text-lg">{siteConfig.name}</span>
            </Link>
            <p className="mt-3 text-sm text-base-content/80 leading-relaxed">
              Copyrigth © {new Date().getFullYear()} - All rights reserved.
            </p>
            <div className="mt-10">
              <Link href={siteConfig.socials.youtube} className="text-primary">
                Paul vee
              </Link>
              &nbsp;made this.
            </div>
            <a href="mailto:support@thumbnailsfeedback.co" className="text-xs">
              support@thumbnailsfeedback.com
            </a>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-24 -mb-10 md:mt-0 mt-10 text-center md:text-left">
            <FooterLinksBlock header="Links">
              <Link href="mailto:support@thumbnailsfeedback.com">Support</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/sign-in">Signin</Link>
              <Link href="/sign-up">Signup</Link>
            </FooterLinksBlock>
            <FooterLinksBlock header="Legal">
              <Link href="/terms">Terms</Link>
              <Link href="/privacy-policy">Privacy</Link>
            </FooterLinksBlock>
          </div>
        </div>
      </div>
    </footer>
  );
};
