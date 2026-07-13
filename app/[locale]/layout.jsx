import { ThemeProvider } from '../../components/ThemeProvider';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getDictionary, isRTL, isSupportedLocale, normalizeLocale } from '../../lib/i18n';
import { SITE } from '../../lib/site';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return SITE.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  const safeLocale = normalizeLocale(locale);
  const dict = getDictionary(safeLocale);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: dict.brand, template: `%s | ${dict.brand}` },
    description: dict.hero.subtitle,
    alternates: {
      canonical: `/${safeLocale}`,
      languages: { en: '/en', ar: '/ar' },
    },
    openGraph: {
      siteName: dict.brand,
      locale: safeLocale === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default function LocaleLayout({ children, params: { locale } }) {
  if (!isSupportedLocale(locale)) notFound();

  const safeLocale = normalizeLocale(locale);
  const dict = getDictionary(safeLocale);
  const dir = isRTL(safeLocale) ? 'rtl' : 'ltr';

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: dict.brand,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
  };

  return (
    <div lang={safeLocale} dir={dir} className={safeLocale === 'ar' ? 'font-arabic' : 'font-sans'}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <ThemeProvider>
        <Header locale={safeLocale} dict={dict} />
        <main className="min-h-[70vh]">{children}</main>
        <Footer locale={safeLocale} dict={dict} />
      </ThemeProvider>
    </div>
  );
}
