import Link from 'next/link';
import { FaceIcon, HomeIcon, PlusCircledIcon, VideoIcon } from '@radix-ui/react-icons';

const sidebarMenu = [
  { label: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { label: 'Review', href: '/review', icon: VideoIcon },
  { label: 'New test', href: '/new-test', icon: PlusCircledIcon },
];
const DasboardSidebar = () => {
  return (
    <div className="p-10 rounded-sm drop-shadow-sm bg-slate-50 mr-5 sticky top-10">
      <ul className="min-w-40">
        {sidebarMenu.map((item, index) => (
          <li key={index} className="my-4 pr-10 flex flex-row items-center">
            {item.icon && <item.icon className="w-5 h-5 mr-2 text-primary" />}
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DasboardSidebar;
