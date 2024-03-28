import { ReactNode, FC } from 'react';
import DasboardSidebar from '@/components/sidebar/DashboardSidebar';

const DasboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] mt-5">
        <div className="min-h-[calc(100vh-200px)]">
          <DasboardSidebar />
        </div>
        <main className="w-full">{children}</main>
      </div>
    </>
  );
};

export default DasboardLayout;