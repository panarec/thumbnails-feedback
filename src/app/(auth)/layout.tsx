import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-100px)] '>
      <main className='p-10 bg-blue-50 rounded-md'>{children}</main>
    </div>
  );
};

export default Layout;
