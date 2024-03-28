import Link from 'next/link';
import { FaceIcon, HomeIcon, PlusCircledIcon, VideoIcon } from '@radix-ui/react-icons';

const sidebarMenu = [
  { label: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { label: 'Review', href: '/review', icon: VideoIcon },
  { label: 'New test', href: '/new-test', icon: PlusCircledIcon },
];
const DasboardSidebar = () => {
  return (
    <div className="py-10 rounded-md drop-shadow-sm bg-slate-50 mr-5 sticky top-1/2 -translate-y-1/2">
      <ul className="min-w-40">
        {sidebarMenu.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="px-10 py-4 flex flex-row items-center hover:bg-slate-100">
              {item.icon && <item.icon className="w-5 h-5 mr-2 text-primary" />}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DasboardSidebar;
