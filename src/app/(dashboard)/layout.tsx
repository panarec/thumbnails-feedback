import { ReactNode, FC } from 'react';
import DasboardSidebar from '@/components/sidebar/DashboardSidebar';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const DasboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <DasboardSidebar />
          <div className="grid gap-6">
            <main className="w-full">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};

export default DasboardLayout;
