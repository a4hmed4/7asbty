import { SITE } from '../lib/site';
import { CALCULATORS } from '../lib/calculators';

export default function sitemap() {
  const staticPages = ['', '/about', '/contact', '/privacy', '/terms', '/premium'];
  const entries = [];

  for (const locale of SITE.locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${SITE.url}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'monthly',
        priority: page === '' ? 1 : 0.5,
      });
    }
    for (const calc of CALCULATORS) {
      entries.push({
        url: `${SITE.url}/${locale}/calculators/${calc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: calc.popular ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
