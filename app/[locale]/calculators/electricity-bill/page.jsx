import { getCalculator } from '../../../../lib/calculators';
import { getCalculatorMetadata } from '../../../../lib/calculator-metadata';
import CalculatorPageShell from '../../../../components/CalculatorPageShell';
import ElectricityClient from './Client';

const calc = getCalculator('electricity-bill');

export async function generateMetadata({ params: { locale } }) {
  const d = await getCalculatorMetadata(calc, locale);
  return {
    title: d.title,
    description: d.description,
    keywords: d.keywords,
    alternates: { canonical: `/${locale}/calculators/electricity-bill`, languages: { en: '/en/calculators/electricity-bill', ar: '/ar/calculators/electricity-bill' } },
  };
}

export default function Page({ params: { locale } }) {
  return (
    <CalculatorPageShell locale={locale} calc={calc}>
      <ElectricityClient locale={locale} />
    </CalculatorPageShell>
  );
}
