'use client';

import { usePathname } from 'next/navigation';

const DashboardTitle = ({ customTitle }: {customTitle: string}) => {

  const pathName = usePathname();
  const title = pathName
    .slice(1)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-10 mb-10">{customTitle ? customTitle : title}</h2>;
};

export default DashboardTitle;
