import { Menu, Package2 } from 'lucide-react';
import { Button } from './button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './sheet';
import Link from 'next/link';
import { SiteConfig } from '@/config/site';
import { FC } from 'react';
import Image from 'next/image';

interface MobileNavProps {
  siteConfig?: SiteConfig;
}

export const MobileNav: FC<MobileNavProps> = ({ siteConfig }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
            <Image src="/logo.svg" alt="logo" width={40} height={40} />
            <span className="">{siteConfig?.name}</span>
          </Link>
          {siteConfig?.mainNav?.map((item, index) => (
            <SheetClose key={index} asChild>
              <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                {item.title}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
