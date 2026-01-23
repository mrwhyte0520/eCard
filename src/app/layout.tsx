import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import TransitionProvider from './transition-provider';

export const metadata: Metadata = {
  title: 'Hello eCard',
  description: 'Create your digital profile in seconds.',
  metadataBase: new URL('https://helloecard.com'),
  openGraph: {
    title: 'Hello eCard',
    description: 'Create your digital profile in seconds.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
