import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/components/AuthProvider';
import { OfflineBanner } from '@/components/ui/OfflineBanner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'AI Builder | Create Anything',
  description: 'Type your idea, get a website.',
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
      <body className="antialiased min-h-screen bg-background">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AuthProvider>
            <main className="w-full min-h-screen">
              {children}
            </main>
            <Toaster position="top-center" />
            <OfflineBanner />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
