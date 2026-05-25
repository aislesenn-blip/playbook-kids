import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { TopNav } from '@/components/layout/TopNav';
import { BottomNav } from '@/components/layout/BottomNav';
import { ContextualTour } from '@/components/onboarding/ContextualTour';
import { Toaster } from 'sonner';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'Hero' });

  // Remove HTML tags from the title for metadata
  const rawTitle = t('title').replace(/<[^>]*>?/gm, '');

  return {
    title: `uNiMONDAY | ${rawTitle}`,
    description: t('subtitle'),
    openGraph: {
      title: `uNiMONDAY | ${rawTitle}`,
      description: t('subtitle'),
      type: 'website',
      url: `https://unimonday.com/${resolvedParams.locale}`,
    },
    alternates: {
      canonical: `https://unimonday.com/${resolvedParams.locale}`,
      languages: {
        'en': 'https://unimonday.com/en',
        'sw': 'https://unimonday.com/sw',
        'fr': 'https://unimonday.com/fr',
        'de': 'https://unimonday.com/de',
        'es': 'https://unimonday.com/es',
        'ja': 'https://unimonday.com/ja',
        'ar': 'https://unimonday.com/ar',
        'x-default': 'https://unimonday.com/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locales = ['en', 'fr', 'de', 'es', 'ja', 'ar', 'sw'];

  if (!locales.includes(resolvedParams.locale)) notFound();

  // Fetch messages (provided by the request config)
  const messages = await getMessages();

  return (
    <html lang={resolvedParams.locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen pb-20 sm:pb-0 pt-16 bg-[#F8F6F3] text-zinc-900 selection:bg-zinc-200 overflow-x-hidden">
        <NextIntlClientProvider messages={messages} locale={resolvedParams.locale}>
          <TopNav />
          <main className="w-full min-h-[calc(100vh-4rem)] flex flex-col font-sans">
            {children}
          </main>
          <div className="sm:hidden">
            <BottomNav />
          </div>
          <Toaster position="top-center" />
          <ContextualTour />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
