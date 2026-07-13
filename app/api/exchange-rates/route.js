import { NextResponse } from 'next/server';
import { CURRENCY_COUNTRIES, FALLBACK_RATES } from '../../../lib/currencies';

const PRIMARY_PROVIDER_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json';
const FALLBACK_PROVIDER_URL = 'https://latest.currency-api.pages.dev/v1/currencies/usd.min.json';

function normalizeRates(data) {
  const rawRates = data?.usd || {};
  const supportedCodes = new Set(Object.keys(CURRENCY_COUNTRIES));

  return Object.fromEntries(
    Object.entries(rawRates)
      .map(([code, rate]) => [code.toUpperCase(), rate])
      .filter(([code, rate]) => supportedCodes.has(code) && Number.isFinite(rate))
      .sort(([a], [b]) => a.localeCompare(b))
  );
}

export async function GET() {
  try {
    const primary = await fetch(PRIMARY_PROVIDER_URL, { next: { revalidate: 3600 } });
    const response = primary.ok ? primary : await fetch(FALLBACK_PROVIDER_URL, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error('Provider error');

    const data = await response.json();
    const rates = { USD: 1, ...normalizeRates(data) };

    return NextResponse.json({
      base: 'USD',
      date: data.date,
      rates,
      source: primary.ok ? 'jsdelivr' : 'cloudflare',
    });
  } catch (e) {
    return NextResponse.json({ base: 'USD', rates: FALLBACK_RATES, source: 'fallback' });
  }
}
