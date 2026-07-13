import { getCalculator } from '../../../../lib/calculators';
import { getCalculatorMetadata } from '../../../../lib/calculator-metadata';
import CalculatorPageShell from '../../../../components/CalculatorPageShell';
import DiscountClient from './Client';

const calc = getCalculator('discount');

export async function generateMetadata({ params: { locale } }) {
  const d = await getCalculatorMetadata(calc, locale);
  return {
    title: d.title,
    description: d.description,
    keywords: d.keywords,
    alternates: { canonical: `/${locale}/calculators/discount`, languages: { en: '/en/calculators/discount', ar: '/ar/calculators/discount' } },
  };
}

export default function Page({ params: { locale } }) {
  return (
    <CalculatorPageShell locale={locale} calc={calc}>
      <DiscountClient locale={locale} />
    </CalculatorPageShell>
  );
}
