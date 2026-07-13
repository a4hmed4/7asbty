import Link from 'next/link';
import { getIcon } from '../lib/icon-map';
import { ArrowUpRight } from 'lucide-react';
import { normalizeLocale } from '../lib/i18n';

export default function CalculatorCard({ calc, locale }) {
  const safeLocale = normalizeLocale(locale);
  const Icon = getIcon(calc.icon);
  const data = calc[safeLocale] || calc.en;
  return (
    <Link
      href={`/${safeLocale}/calculators/${calc.slug}`}
      className="card-hover group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-500">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mb-1 font-semibold">{data.name}</h3>
        <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{data.description}</p>
      </div>
      <span className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
        {safeLocale === 'ar' ? 'استخدم الآن' : 'Use now'} <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
