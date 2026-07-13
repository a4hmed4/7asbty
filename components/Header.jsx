'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Calculator, Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Header({ locale, dict }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const swappedPath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg text-brand-700 dark:text-brand-500">
          <Calculator className="h-6 w-6" />
          <span>{dict.brand}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href={`/${locale}`} className="text-sm font-medium hover:text-brand-600">{dict.nav.home}</Link>
          <Link href={`/${locale}#categories`} className="text-sm font-medium hover:text-brand-600">{dict.nav.categories}</Link>
          <Link href={`/${locale}/premium`} className="rounded-full bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">
            {dict.nav.premium}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={swappedPath}
            className="flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {otherLocale.toUpperCase()}
          </Link>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full border border-slate-300 p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 md:hidden dark:border-slate-800">
          <Link href={`/${locale}`} onClick={() => setOpen(false)}>{dict.nav.home}</Link>
          <Link href={`/${locale}#categories`} onClick={() => setOpen(false)}>{dict.nav.categories}</Link>
          <Link href={`/${locale}/premium`} onClick={() => setOpen(false)}>{dict.nav.premium}</Link>
        </div>
      )}
    </header>
  );
}
