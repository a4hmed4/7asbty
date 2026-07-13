import { NextResponse } from 'next/server';
import { SITE } from './lib/site';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const localeAdminPattern = new RegExp(`^/(${SITE.locales.join('|')})/admin(/.*)?$`);
  const localeAdminMatch = pathname.match(localeAdminPattern);

  if (localeAdminMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/admin${localeAdminMatch[2] || ''}`;
    return NextResponse.redirect(url);
  }

  const pathnameHasLocale = SITE.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Skip static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // files like favicon.ico, sitemap.xml
  ) {
    return;
  }

  const locale = SITE.defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
