import { Poppins } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/Footer';

const poppins = Poppins({ weight: '700', subsets: ['latin'] });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      className={`${poppins.className}  min-h-[calc(100vh - 200px)] bg-white text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50 w-full flex flex-col`}
    >
      <Navbar />
      <main className="h-full">{children}</main>
      <Toaster />
      <Footer />
    </body>
  );
}
