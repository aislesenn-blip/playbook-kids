import { notFound } from 'next/navigation';

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

  return <>{children}</>;
}
