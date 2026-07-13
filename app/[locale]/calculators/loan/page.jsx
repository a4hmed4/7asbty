import { getCalculator } from '../../../../lib/calculators';
import { getCalculatorMetadata } from '../../../../lib/calculator-metadata';
import CalculatorPageShell from '../../../../components/CalculatorPageShell';
import LoanClient from './Client';

const calc = getCalculator('loan');

export async function generateMetadata({ params: { locale } }) {
  const d = await getCalculatorMetadata(calc, locale);
  return {
    title: d.title,
    description: d.description,
    keywords: d.keywords,
    alternates: { canonical: `/${locale}/calculators/loan`, languages: { en: '/en/calculators/loan', ar: '/ar/calculators/loan' } },
    openGraph: { title: d.title, description: d.description },
  };
}

export default function Page({ params: { locale } }) {
  return (
    <CalculatorPageShell locale={locale} calc={calc}>
      <LoanClient locale={locale} />
    </CalculatorPageShell>
  );
}
