import Link from 'next/link';

import { cn } from '@/lib/utils';
import { SiteConfig } from '@/config/site';
import Image from 'next/image';

interface MainNavProps {
  siteConfig?: SiteConfig;
}

export async function MainNav({ siteConfig }: MainNavProps) {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <span className="">{siteConfig?.name}</span>
      </Link>
      {siteConfig?.mainNav?.length ? (
        <nav className="hidden gap-6 md:flex">
          {siteConfig?.mainNav?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-100 sm:text-sm',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </nav>
  );
}
