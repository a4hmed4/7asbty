import { readAdminData } from './admin-store';
import { normalizeLocale } from './i18n';

export async function getCalculatorMetadata(calc, locale) {
  const safeLocale = normalizeLocale(locale);
  const data = await readAdminData();
  const override = data.seo[calc.slug]?.[safeLocale] || {};
  const base = calc[safeLocale] || calc.en;

  return {
    ...base,
    title: override.title || base.title,
    description: override.description || base.description,
  };
}
