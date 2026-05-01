import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TopNav } from '@/components/layout/TopNav';
import { BottomNav } from '@/components/layout/BottomNav';
import { OnboardingFlow } from '@/components/OnboardingFlow';
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
  title: 'UNIMONDAY | The Billion Dollar Standard',
  description: 'Instant campus ordering and payments.',
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
          <OnboardingFlow />
          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
