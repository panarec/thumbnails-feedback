import Link from 'next/link';
import { FaceIcon, HomeIcon, PlusCircledIcon, VideoIcon } from '@radix-ui/react-icons';

const sidebarMenu = [
  { label: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { label: 'Review', href: '/review', icon: VideoIcon },
  { label: 'New test', href: '/new-test', icon: PlusCircledIcon },
];
const DasboardSidebar = () => {
  return (
    <>
      <nav className="grid gap-4 text-sm text-muted-foreground md:sticky md:top-1/2 md:-translate-y-1/2">
        {sidebarMenu.map((item, index) => (
          <Link href={item.href} key={index} className="pr-10 pl-1 py-2 flex flex-row items-center hover:bg-slate-100">
            {item.icon && <item.icon className="w-5 h-5 mr-2 text-primary" />}
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default DasboardSidebar;
