import { ReactNode, FC } from 'react';
import DasboardSidebar from '@/components/sidebar/DashboardSidebar';
import DashboardTitle from '@/components/DashboardTitle';

interface DasboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DasboardLayout: FC<DasboardLayoutProps> = ({ children, title}) => {
  return (
    <>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] mt-5">
        <div></div>
        <DashboardTitle customTitle={title} />
        <div className="overflow-hidden">
          <DasboardSidebar />
        </div>
        <main className="w-full">{children}</main>
      </div>
    </>
  );
};
export default DasboardLayout;
