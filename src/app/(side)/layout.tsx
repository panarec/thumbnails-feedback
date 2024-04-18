import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';

const poppins = Poppins({ weight: '700', subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Thumbnails Feedback',
    template: '%s | Thumbnails Feedback',
  },
  description: 'Get feedback before publishing your content and avoid mistakes that could cost you views.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}  min-h-[calc(100vh - 200px)] bg-white text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50 w-full flex flex-col`}
      >
        <main className="max-w-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
