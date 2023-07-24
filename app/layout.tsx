import React, { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

import SessionProvider from './session-provider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

import { ThemeProvider } from './theme-provider';
import Navbar from './navbar';
import Footer from './footer';

import './globals.css';
import pkg from '@/package.json';

export const metadata = {
  title: {
    default: pkg.displayName,
  },
  description: pkg.description,
  keywords: pkg.keywords,
  authors: [
    {
      name: "Allen",
      url: "https://liallen.me",
    },
  ],
  creator: "Allen",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: pkg.url,
    title: pkg.displayName,
    description: pkg.description,
    siteName: pkg.displayName,
  },
  twitter: {
    card: "summary_large_image",
    title: pkg.displayName,
    description: pkg.description,
    images: [`${pkg.url}/og.jpg`],
    creator: "@radicalblind",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${pkg.url}/site.webmanifest`,
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="">
        <SessionProvider session={session}>
          <ThemeProvider>
            <Navbar />
            <div className="px-4 lg:max-w-screen-lg mx-auto">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </SessionProvider>

        <Analytics />
        <script defer data-domain="chatgptprompthub.vercel.app" src="https://plausible.liallen.me/js/script.js"></script>
      </body>
    </html>
  );
};

export default RootLayout;
