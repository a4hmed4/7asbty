'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { CALCULATORS } from '../lib/calculators';
import { normalizeLocale } from '../lib/i18n';

export default function SearchBar({ locale, placeholder }) {
  const safeLocale = normalizeLocale(locale);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return CALCULATORS.filter((c) => {
      const d = c[safeLocale] || c.en;
      return (
        d.name.toLowerCase().includes(q) ||
        d.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }).slice(0, 6);
  }, [query, safeLocale]);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <Search className="h-5 w-5 shrink-0 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          aria-label="Search calculators"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
          {results.map((c) => (
            <Link
              key={c.slug}
              href={`/${safeLocale}/calculators/${c.slug}`}
              className="block px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => setQuery('')}
            >
              {(c[safeLocale] || c.en).name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
