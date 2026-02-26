import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import ParticlesBackground from './particles-background';
import TransitionProvider from './transition-provider';

const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

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
      <body className={`${fontSans.variable} ${fontDisplay.variable} overflow-x-hidden font-sans antialiased`}>
        <ParticlesBackground />
        <div className="relative z-10">
          <TransitionProvider>{children}</TransitionProvider>
        </div>
      </body>
    </html>
  );
}
