# 7asbty

A modern, SEO-optimized, multi-calculator platform built with **Next.js 14 (App Router)**, **React 18**, and **Tailwind CSS**. Includes Arabic/English i18n with RTL support, dark/light mode, per-calculator SEO (metadata, JSON-LD schema, FAQ sections), a generated sitemap/robots.txt, an admin dashboard scaffold, and monetization-ready placeholders (AdSense slots + premium plan page).

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` (redirects to `/en`). Switch to Arabic via the language toggle in the header, or visit `/ar` directly (RTL layout applies automatically).

Build for production:

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.jsx                 Root passthrough layout
  page.jsx                   Redirects "/" -> "/en"
  sitemap.js                 Dynamic sitemap.xml (all locales + calculators)
  robots.js                  Dynamic robots.txt
  api/exchange-rates/        Live currency rate proxy (Frankfurter API + fallback)
  admin/                     Admin dashboard (overview, calculators, SEO, visitors)
  [locale]/
    layout.jsx                <html lang/dir>, header, footer, theme provider
    page.jsx                   Homepage (hero, search, categories, popular, FAQ)
    about|contact|privacy|terms|premium/page.jsx
    calculators/<slug>/
      page.jsx                Server component: SEO metadata + JSON-LD + shell
      Client.jsx               'use client' interactive calculator logic

components/                  Header, Footer, ThemeProvider, SearchBar,
                              CalculatorCard, CalculatorPageShell, FAQSection,
                              AdSlot, ResultActions
lib/
  site.js                     Global site config (name, URL, locales)
  calculators.js               Single source of truth: every calculator's
                                category, icon, and per-locale SEO content
  i18n.js                     Dictionary loader
  units.js                    Unit-conversion factor tables
  schema.sql                   Recommended Postgres schema for going
                                database-backed (calculators, SEO, page
                                views, users, subscriptions)
messages/en.json, ar.json    UI string dictionaries
middleware.js                Locale-prefix redirect (/ -> /en, /ar, etc.)
```

## Included Calculators

Loan, Installment, Discount, Percentage, Age, BMI, Currency Converter (live rates),
Unit Converter (length/weight/temperature/speed/area/volume/time), Fuel Consumption,
Electricity Bill.

Each has its own route, unique meta title/description, Open Graph tags, canonical +
hreflang alternates, `WebApplication` + `BreadcrumbList` JSON-LD, an FAQ section with
`FAQPage` JSON-LD, copy/share/print-to-PDF result actions, and related-calculator
cross-links for internal linking (SEO).

## Adding a New Calculator

1. Add an entry to `CALCULATORS` in `lib/calculators.js` (slug, category, icon,
   `en`/`ar` name, title, description, h1, intro, keywords, faq).
2. Create `app/[locale]/calculators/<slug>/page.jsx` (copy an existing one,
   swap the slug) and `Client.jsx` with your calculation logic.
3. The homepage, sitemap, footer links, and search bar all pick it up
   automatically from the registry — no other file needs editing.

## SEO Checklist (already wired up)

- [x] Unique per-page metadata (title, description, keywords, canonical, hreflang)
- [x] Organization, WebSite, WebApplication, BreadcrumbList, FAQPage JSON-LD
- [x] `app/sitemap.js` + `app/robots.js`
- [x] Server-rendered content (App Router server components) for crawlability
- [x] Semantic headings or, internal cross-linking between related calculators

## Monetization

- `components/AdSlot.jsx` — drop-in AdSense placeholder used on the homepage
  and every calculator page; swap the commented `<ins className="adsbygoogle">`
  block in for the real tag once your AdSense account is approved.
- `/[locale]/premium` — pricing page UI; wire the "Subscribe" button to Stripe
  Checkout (or another provider) and gate `is_premium` users to hide `AdSlot`
  and unlock premium-only calculators.

## Going Database-Backed

The calculator content currently lives in `lib/calculators.js` for simplicity
and zero-config deployment. `lib/schema.sql` has a ready-to-use Postgres schema
(calculators, translations, FAQs, page_views, users, subscriptions) for when
you want the admin dashboard (`/admin`) to persist real edits — pair it with
Prisma or Drizzle and swap `getCalculator()`/`CALCULATORS` for DB queries.

## Notes

- The admin dashboard at `/admin` has no authentication yet — add middleware-based
  auth (NextAuth, Clerk, etc.) before deploying it publicly.
- The currency converter fetches from `api.frankfurter.app` (no API key needed)
  with a static fallback if the request fails; swap in a paid provider for more
  currencies or SLA guarantees.
