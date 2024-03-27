import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex items-center justify-center m-auto'>
      <main className='p-10 bg-blue-50 rounded-md'>{children}</main>
    </div>
  );
};

export default Layout;
