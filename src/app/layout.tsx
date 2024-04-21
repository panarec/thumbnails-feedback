import type { Metadata } from 'next';
import './globals.css';
import PlausibleProvider from 'next-plausible';

export const metadata: Metadata = {
  title: {
    default: 'Thumbnails Feedback',
    template: '%s | Thumbnails Feedback',
  },
  description: 'Get feedback before publishing your content and avoid mistakes that could cost you views.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="thumbnailsfeedback.com" />
      </head>
      {children}
    </html>
  );
}
