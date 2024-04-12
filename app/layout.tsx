import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Shippori_Mincho as FontSerif } from 'next/font/google';
import { cn } from '@/lib/utils';

import './globals.css';

const fontSerif = FontSerif({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'RPG Wiki',
  description: 'Your best tool for building RPG Campaigns',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-serif antialiased',
          fontSerif.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
