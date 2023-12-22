import 'server-only';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import 'react-tooltip/dist/react-tooltip.css';
import { AppProviders } from './AppProviders';
import localFont from 'next/font/local';
import { GeistSans } from 'geist/font/sans';
import OneTap from '@/components/OneTap';

// const satoshiFont = localFont({
//   src: '../fonts/satoshi/Satoshi-Variable.woff2',
//   display: 'swap',
//   variable: '--font-satoshi',
// });

const inter = Inter({
  display: 'swap',
  subsets: ['cyrillic', 'cyrillic-ext', 'latin-ext', 'latin', 'vietnamese'],
  variable: '--font-inter',
});

export const metadata = {
  icons: {
    icon: '/images/logo-black-main.ico',
  },
  title: 'Nextbase Pro',
  description: 'Nextbase Pro',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head><script
        src="https://accounts.google.com/gsi/client"
        async
        defer
      ></script></head>
      <body className="bg-white dark:bg-slate-900" suppressHydrationWarning>
        <AppProviders>
          <OneTap />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
