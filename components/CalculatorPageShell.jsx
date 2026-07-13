import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CALCULATORS } from '../lib/calculators';
import { SITE } from '../lib/site';
import AdSlot from './AdSlot';
import FAQSection from './FAQSection';
import CalculatorCard from './CalculatorCard';
import { getDictionary, normalizeLocale } from '../lib/i18n';
import PageViewTracker from './PageViewTracker';
import { ADSENSE } from '../lib/ads';

export default function CalculatorPageShell({ locale, calc, children }) {
  const safeLocale = normalizeLocale(locale);
  const dict = getDictionary(safeLocale);
  const data = calc[safeLocale] || calc.en;
  const related = CALCULATORS.filter((c) => c.category === calc.category && c.slug !== calc.slug).slice(0, 3);

  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: data.name,
    url: `${SITE.url}/${safeLocale}/calculators/${calc.slug}`,
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: data.description,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.brand, item: `${SITE.url}/${safeLocale}` },
      { '@type': 'ListItem', position: 2, name: data.name, item: `${SITE.url}/${safeLocale}/calculators/${calc.slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <PageViewTracker locale={safeLocale} slug={calc.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="mb-4 flex items-center gap-1 text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href={`/${safeLocale}`} className="hover:text-brand-600">{dict.brand}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-700 dark:text-slate-300">{data.name}</span>
      </nav>

      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{data.h1}</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{data.intro}</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 print-area">
        {children}
      </div>

      <AdSlot slot={ADSENSE.slots.calculator} label={dict.ads.placeholder} className="my-8" />

      {related.length > 0 && (
        <section className="py-6">
          <h2 className="mb-4 text-xl font-bold">{dict.common.relatedCalculators}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((c) => <CalculatorCard key={c.slug} calc={c} locale={safeLocale} />)}
          </div>
        </section>
      )}

      <FAQSection title={dict.sections.faq} items={data.faq} />
    </div>
  );
}
