import { getCalculator } from '../../../../lib/calculators';
import { getCalculatorMetadata } from '../../../../lib/calculator-metadata';
import CalculatorPageShell from '../../../../components/CalculatorPageShell';
import UnitClient from './Client';

const calc = getCalculator('unit-converter');

export async function generateMetadata({ params: { locale } }) {
  const d = await getCalculatorMetadata(calc, locale);
  return {
    title: d.title,
    description: d.description,
    keywords: d.keywords,
    alternates: { canonical: `/${locale}/calculators/unit-converter`, languages: { en: '/en/calculators/unit-converter', ar: '/ar/calculators/unit-converter' } },
  };
}

export default function Page({ params: { locale } }) {
  return (
    <CalculatorPageShell locale={locale} calc={calc}>
      <UnitClient locale={locale} />
    </CalculatorPageShell>
  );
}
