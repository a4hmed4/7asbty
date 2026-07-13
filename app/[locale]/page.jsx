import { getDictionary } from '../../lib/i18n';
import { SITE } from '../../lib/site';
import { CATEGORIES, CALCULATORS } from '../../lib/calculators';
import SearchBar from '../../components/SearchBar';
import CalculatorCard from '../../components/CalculatorCard';
import FAQSection from '../../components/FAQSection';
import AdSlot from '../../components/AdSlot';
import { getIcon } from '../../lib/icon-map';
import Link from 'next/link';
import { ADSENSE } from '../../lib/ads';

export async function generateMetadata({ params: { locale } }) {
  const dict = getDictionary(locale);
  return {
    title: dict.hero.title,
    description: dict.hero.subtitle,
    alternates: { canonical: `/${locale}` },
  };
}

const HOME_FAQ = {
  en: [
    { q: 'Is 7asbty free to use?', a: 'Yes, every calculator on the platform is completely free to use, with an optional premium plan that removes ads and unlocks advanced calculators.' },
    { q: 'Do I need to create an account?', a: 'No account is required to use any calculator. Results are calculated instantly in your browser.' },
    { q: 'How accurate are the calculators?', a: 'All calculators use standard, widely accepted formulas for finance, health, and unit conversions to ensure accurate results.' },
    { q: 'Can I use these calculators on mobile?', a: 'Yes, the entire platform is built mobile-first and works smoothly on phones, tablets, and desktops.' },
  ],
  ar: [
    { q: 'هل استخدام حاسبتي مجاني؟', a: 'نعم، جميع الحاسبات على المنصة مجانية بالكامل، مع خطة مميزة اختيارية تزيل الإعلانات وتفتح حاسبات متقدمة.' },
    { q: 'هل أحتاج إلى إنشاء حساب؟', a: 'لا حاجة لإنشاء حساب لاستخدام أي حاسبة. تُحسب النتائج فورًا داخل المتصفح.' },
    { q: 'ما مدى دقة الحاسبات؟', a: 'تستخدم جميع الحاسبات معادلات معيارية ومعتمدة في المجالات المالية والصحية والتحويلات لضمان نتائج دقيقة.' },
    { q: 'هل يمكن استخدام الحاسبات على الجوال؟', a: 'نعم، المنصة بأكملها مصممة أولاً للجوال وتعمل بسلاسة على الهواتف والأجهزة اللوحية وأجهزة الكمبيوتر.' },
  ],
};

export default function HomePage({ params: { locale } }) {
  const dict = getDictionary(locale);
  const popular = CALCULATORS.filter((c) => c.popular);
  const recent = [...CALCULATORS].slice(-6).reverse();

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: dict.brand,
    url: `${SITE.url}/${locale}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/${locale}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white px-4 py-16 text-center dark:from-slate-900 dark:to-slate-950 md:px-6 md:py-24">
        <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">
          {dict.hero.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">{dict.hero.subtitle}</p>
        <div className="mt-8">
          <SearchBar locale={locale} placeholder={dict.hero.searchPlaceholder} />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <AdSlot slot={ADSENSE.slots.homeTop} label={dict.ads.placeholder} className="my-8" />

        {/* Categories */}
        <section id="categories" className="py-8">
          <h2 className="mb-6 text-2xl font-bold">{dict.sections.categories}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {CATEGORIES.map((cat) => {
              const Icon = getIcon('Calculator');
              const count = CALCULATORS.filter((c) => c.category === cat.id).length;
              return (
                <Link
                  key={cat.id}
                  href={`/${locale}#${cat.id}`}
                  id={cat.id}
                  className="card-hover flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900"
                >
                  <Icon className="h-6 w-6 text-brand-600" />
                  <span className="font-semibold">{cat[locale]}</span>
                  <span className="text-xs text-slate-500">{count} {locale === 'ar' ? 'حاسبة' : 'tools'}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Popular */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold">{dict.sections.popular}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((c) => <CalculatorCard key={c.slug} calc={c} locale={locale} />)}
          </div>
        </section>

        <AdSlot slot={ADSENSE.slots.homeMiddle} label={dict.ads.placeholder} className="my-8" />

        {/* Recently added */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold">{dict.sections.recent}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((c) => <CalculatorCard key={c.slug} calc={c} locale={locale} />)}
          </div>
        </section>

        {/* All calculators by category, for SEO crawl-ability */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold">{dict.sections.allCalculators}</h2>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-slate-600 dark:text-slate-400">{cat[locale]}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CALCULATORS.filter((c) => c.category === cat.id).map((c) => (
                  <CalculatorCard key={c.slug} calc={c} locale={locale} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <FAQSection title={dict.sections.faq} items={HOME_FAQ[locale]} />
    </>
  );
}
