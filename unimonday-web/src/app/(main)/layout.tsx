import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/components/AuthProvider';
import { OfflineBanner } from '@/components/ui/OfflineBanner';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <AuthProvider>
        <main className="w-full min-h-screen">
          {children}
        </main>
        <Toaster position="top-center" />
        <OfflineBanner />
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
