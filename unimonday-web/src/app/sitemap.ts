import { MetadataRoute } from 'next';

const locales = ['en', 'fr', 'de', 'es', 'ja', 'ar', 'sw'];
const baseUrl = 'https://unimonday.com';

// Define the core pages that exist across all locales
const routes = ['', '/faq', '/auth/login', '/auth/signup'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
