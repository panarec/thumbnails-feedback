import Link from 'next/link';
import { FaceIcon, ImageIcon, SunIcon } from '@radix-ui/react-icons';

const sidebarMenu = [
  { label: 'My tests', href: '/', icon: SunIcon },
  { label: 'Blog', href: '/blog', icon: FaceIcon },
  { label: 'Photos', href: '/photos', icon: ImageIcon },
  { label: 'Portfolio', href: '/portfolio', icon: ImageIcon },
  { label: 'Docs', href: '/docs', icon: ImageIcon },
];
const DasboardSidebar = () => {
  return (
    <div className="p-10 bg-gray-50 rounded-xl drop-shadow-sm mr-5 ">
      <ul>
        {sidebarMenu.map((item, index) => (
          <li key={index} className="my-4 pr-10 flex flex-row items-center">
            {item.icon && <item.icon className="w-5 h-5 mr-2" color="red" />}
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DasboardSidebar;
