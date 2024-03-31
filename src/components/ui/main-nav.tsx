import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SiteConfig } from '@/config/site';
import GradientShape from './graphics/GradientShape';

interface MainNavProps {
  siteConfig?: SiteConfig;
}

export async function MainNav({ siteConfig }: MainNavProps) {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
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
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="-ml-4 text-base hover:bg-transparent focus:ring-0 md:hidden">
            <span className="font-bold">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={24} className="w-[300px] overflow-scroll">
          <DropdownMenuLabel>
            <Link href="/" className="flex items-center">
              {siteConfig?.name}
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {siteConfig?.mainNav?.map(
            (item, index) =>
              item.href && (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href}>{item.title}</Link>
                </DropdownMenuItem>
              )
          )}
        </DropdownMenuContent>
      </DropdownMenu> */}
    </nav>
  );
}
