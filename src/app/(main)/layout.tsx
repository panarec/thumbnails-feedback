import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/Footer';
import Scroll from '@/components/Scroll';

const poppins = Poppins({ weight: '700', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Get feedback before going live',
  description: 'Get feedback before publishing your content and avoid mistakes that could cost you views.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Scroll /> {/* Scroll to top of page when navigating to a new page */}
      <body
        className={`${poppins.className}  min-h-[calc(100vh - 200px)] bg-white text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50 w-full flex flex-col`}
      >
        <Navbar />
        <main className="h-full">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
