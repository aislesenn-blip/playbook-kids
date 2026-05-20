import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
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
  title: 'uNiMONDAY | The Future of Language Learning',
  description: 'An AI-powered living language universe where learning happens through emotionally engaging conversations.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen pb-20 sm:pb-0 pt-16 bg-background">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <TopNav />
          <main className="w-full h-full min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          <div className="sm:hidden">
            <BottomNav />
          </div>
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
