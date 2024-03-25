import { ReactNode, FC } from 'react';
import DasboardSidebar from '@/components/sidebar/DashboardSidebar';
import DashboardTitle from '@/components/DashboardTitle';

interface DasboardLayoutProps {
  children: ReactNode;
}

const DasboardLayout: FC<DasboardLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] mt-5">
        <div></div>
        <DashboardTitle />
        <div className="overflow-hidden">
          <DasboardSidebar />
        </div>
        <main className="w-full">{children}</main>
      </div>
    </>
  );
};
export default DasboardLayout;
