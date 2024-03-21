import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main className='p-10 bg-slate-200 rounded-md'>{children}</main>
    </div>
  );
};

export default Layout;
