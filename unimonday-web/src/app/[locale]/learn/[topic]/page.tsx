import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

// In a real database, this would be a lookup table mapping slugs to structured content
const SEO_TOPICS: Record<string, { en: { title: string, desc: string }, sw: { title: string, desc: string } }> = {
  'english-for-kids': {
    en: {
      title: 'Learn English for Kids',
      desc: 'The best 5-minute daily ecosystem to teach your 5-year-old English through natural voice conversation.',
    },
    sw: {
      title: 'Jifunze Kiingereza kwa Watoto',
      desc: 'Mfumo bora wa dakika 5 kila siku kumfundisha mwanao Kiingereza kupitia mazungumzo asilia ya sauti.',
    }
  },
  'spanish-for-kids': {
    en: {
      title: 'Learn Spanish for Kids',
      desc: 'Help your child acquire native-level Spanish fluency without screen addiction.',
    },
    sw: {
      title: 'Jifunze Kihispania kwa Watoto',
      desc: 'Msaidie mwanao kujifunza Kihispania kwa ufasaha bila kutegemea skrini.',
    }
  }
};

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string, topic: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const topicData = SEO_TOPICS[resolvedParams.topic]?.[resolvedParams.locale as 'en' | 'sw'];

  if (!topicData) return { title: 'Not Found' };

  return {
    title: `${topicData.title} | uNiMONDAY`,
    description: topicData.desc,
    alternates: {
      canonical: `https://unimonday.com/${resolvedParams.locale}/learn/${resolvedParams.topic}`,
    },
  };
}

export default async function ProgrammaticLearnPage({
  params
}: {
  params: Promise<{ locale: string, topic: string }>;
}) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'Hero' });
  const topicData = SEO_TOPICS[resolvedParams.topic]?.[resolvedParams.locale as 'en' | 'sw'];

  if (!topicData) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalArticle',
    name: topicData.title,
    headline: topicData.title,
    description: topicData.desc,
    publisher: {
      '@type': 'Organization',
      name: 'uNiMONDAY'
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#F8F6F3] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="w-full px-4 pt-24 md:pt-32 pb-24 flex flex-col items-center text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 mb-6 leading-tight">
          {topicData.title}
        </h1>
        <p className="text-xl text-zinc-500 font-medium mb-12">
          {topicData.desc}
        </p>
        <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm w-full">
           <h2 className="text-2xl font-medium mb-4">{t('login')}</h2>
           <p className="text-zinc-600 mb-6">Programmatic SEO Content Engine Placeholder</p>
        </div>
      </section>
    </div>
  );
}
