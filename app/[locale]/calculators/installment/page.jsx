import { getCalculator } from '../../../../lib/calculators';
import { getCalculatorMetadata } from '../../../../lib/calculator-metadata';
import CalculatorPageShell from '../../../../components/CalculatorPageShell';
import InstallmentClient from './Client';

const calc = getCalculator('installment');

export async function generateMetadata({ params: { locale } }) {
  const d = await getCalculatorMetadata(calc, locale);
  return {
    title: d.title,
    description: d.description,
    keywords: d.keywords,
    alternates: { canonical: `/${locale}/calculators/installment`, languages: { en: '/en/calculators/installment', ar: '/ar/calculators/installment' } },
  };
}

export default function Page({ params: { locale } }) {
  return (
    <CalculatorPageShell locale={locale} calc={calc}>
      <InstallmentClient locale={locale} />
    </CalculatorPageShell>
  );
}
