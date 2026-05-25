import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'FAQ' });

  return {
    title: `uNiMONDAY FAQ | ${t('title')}`,
    description: t('description'),
    alternates: {
      canonical: `https://unimonday.com/${resolvedParams.locale}/faq`,
    },
  };
}

export default async function FAQPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'FAQ' });

  // In a real programmatic SEO setup, these would come from a CMS or Database
  const faqs = [
    {
      question: t('q1.question'),
      answer: t('q1.answer'),
    },
    {
      question: t('q2.question'),
      answer: t('q2.answer'),
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl md:text-5xl font-semibold mb-6">{t('title')}</h1>
      <p className="text-xl text-zinc-500 mb-12">{t('description')}</p>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h2 className="text-2xl font-medium mb-4">{faq.question}</h2>
            <p className="text-zinc-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
