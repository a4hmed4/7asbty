import en from '../messages/en.json';
import ar from '../messages/ar.json';

const dictionaries = { en, ar };
const locales = Object.keys(dictionaries);

export function normalizeLocale(locale) {
  return locales.includes(locale) ? locale : 'en';
}

export function isSupportedLocale(locale) {
  return locales.includes(locale);
}

export function getDictionary(locale) {
  return dictionaries[normalizeLocale(locale)];
}

export function isRTL(locale) {
  return normalizeLocale(locale) === 'ar';
}
