'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const DashboardTitle = ({ customTitle, classname }: { customTitle: string; classname?: string }) => {
  const pathName = usePathname();
  const title = pathName
    .slice(1)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const customClass = clsx('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-10 mb-10', classname);

  return <h2 className={customClass}>{customTitle ? customTitle : title}</h2>;
};

export default DashboardTitle;
