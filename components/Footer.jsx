import Link from 'next/link';
import { CATEGORIES, CALCULATORS } from '../lib/calculators';
import { normalizeLocale } from '../lib/i18n';

export default function Footer({ locale, dict }) {
  const safeLocale = normalizeLocale(locale);
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="col-span-2 md:col-span-1">
          <h3 className="mb-2 text-lg font-bold text-brand-700 dark:text-brand-500">{dict.brand}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{dict.footer.tagline}</p>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">{dict.footer.categories}</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link href={`/${safeLocale}#${c.id}`} className="hover:text-brand-600">{c[safeLocale]}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">{dict.sections.popular}</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {CALCULATORS.filter((c) => c.popular).slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/${safeLocale}/calculators/${c.slug}`} className="hover:text-brand-600">{(c[safeLocale] || c.en).name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">{dict.footer.company}</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href={`/${safeLocale}/about`} className="hover:text-brand-600">{dict.footer.about}</Link></li>
            <li><Link href={`/${safeLocale}/contact`} className="hover:text-brand-600">{dict.footer.contact}</Link></li>
            <li><Link href={`/${safeLocale}/privacy`} className="hover:text-brand-600">{dict.footer.privacy}</Link></li>
            <li><Link href={`/${safeLocale}/terms`} className="hover:text-brand-600">{dict.footer.terms}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
        © {year} {dict.brand}. {dict.footer.rights}
      </div>
    </footer>
  );
}
