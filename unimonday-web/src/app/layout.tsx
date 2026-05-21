
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TopNav } from '@/components/layout/TopNav';
import { BottomNav } from '@/components/layout/BottomNav';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'uNiMONDAY | Kids University',
  description: 'An AI-powered Kids University for languages.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen pb-20 sm:pb-0 pt-16 bg-[#DDA359] text-black selection:bg-[#DDA359]/30 overflow-x-hidden">
        <TopNav />
        <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col">
          {children}
        </main>
        <div className="sm:hidden">
          <BottomNav />
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
