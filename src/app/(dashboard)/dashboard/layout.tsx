import { ReactNode, FC } from 'react';
import DasboardSidebar from '@/components/sidebar/DashboardSidebar';

interface DasboardLayoutProps {
  children: ReactNode;
}

const DasboardLayout: FC<DasboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row w-full container">
      <aside>
        <DasboardSidebar />
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
};
export default DasboardLayout;
