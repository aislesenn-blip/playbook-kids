import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TopNav } from '@/components/layout/TopNav';
import { BottomNav } from '@/components/layout/BottomNav';
import { ParentTour } from '@/components/onboarding/ParentTour';
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
  title: 'uNiMONDAY | Student Communication Ecosystem',
  description: 'A platform for students to master academic and social language through focused practice.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen pb-20 sm:pb-0 pt-16 bg-[#F8F6F3] text-zinc-900 selection:bg-zinc-200 overflow-x-hidden">
        <TopNav />
        <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col font-sans">
          {children}
        </main>
        <div className="sm:hidden">
          <BottomNav />
        </div>
        <Toaster position="top-center" />
        <ParentTour />
      </body>
    </html>
  );
}
