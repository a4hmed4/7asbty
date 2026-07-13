'use client';
import { useMemo, useState } from 'react';
import { getDictionary } from '../../../../lib/i18n';
import ResultActions from '../../../../components/ResultActions';

const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800';
const labelCls = 'mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300';

export default function InstallmentClient({ locale }) {
  const dict = getDictionary(locale);
  const [price, setPrice] = useState(12000);
  const [down, setDown] = useState(2000);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(5);

  const { monthly, total, financed } = useMemo(() => {
    const P = Math.max((Number(price) || 0) - (Number(down) || 0), 0);
    const r = (Number(rate) || 0) / 100 / 12;
    const n = Number(months) || 0;
    if (P <= 0 || n <= 0) return { monthly: 0, total: 0, financed: P };
    const m = r === 0 ? P / n : (P * r) / (1 - Math.pow(1 + r, -n));
    return { monthly: m, total: m * n, financed: P };
  }, [price, down, months, rate]);

  const fmt = (n) => new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 }).format(n);
  const resultText = `${dict.brand} — ${locale === 'ar' ? 'القسط الشهري' : 'Monthly Installment'}: ${fmt(monthly)}`;
  const printDetails = locale === 'ar'
    ? [
      `سعر المنتج: ${fmt(Number(price) || 0)}`,
      `الدفعة الأولى: ${fmt(Number(down) || 0)}`,
      `المبلغ الممول: ${fmt(financed)}`,
      `عدد الأشهر: ${fmt(Number(months) || 0)}`,
      `سعر الفائدة السنوي: ${fmt(Number(rate) || 0)}%`,
      'المعادلة: القسط = (المبلغ الممول × الفائدة الشهرية) ÷ (1 - (1 + الفائدة الشهرية)^-عدد الأشهر)',
      `القسط الشهري: ${fmt(monthly)}`,
      `إجمالي المدفوع: ${fmt(total)}`,
    ]
    : [
      `Product price: ${fmt(Number(price) || 0)}`,
      `Down payment: ${fmt(Number(down) || 0)}`,
      `Financed amount: ${fmt(financed)}`,
      `Number of months: ${fmt(Number(months) || 0)}`,
      `Annual interest rate: ${fmt(Number(rate) || 0)}%`,
      'Formula: installment = (financed amount × monthly rate) ÷ (1 - (1 + monthly rate)^-months)',
      `Monthly installment: ${fmt(monthly)}`,
      `Total payment: ${fmt(total)}`,
    ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div><label className={labelCls}>{locale === 'ar' ? 'سعر المنتج' : 'Product Price'}</label><input type="number" className={inputCls} value={price} onChange={(e) => setPrice(e.target.value)} /></div>
        <div><label className={labelCls}>{locale === 'ar' ? 'الدفعة الأولى' : 'Down Payment'}</label><input type="number" className={inputCls} value={down} onChange={(e) => setDown(e.target.value)} /></div>
        <div><label className={labelCls}>{locale === 'ar' ? 'عدد الأشهر' : 'Number of Months'}</label><input type="number" className={inputCls} value={months} onChange={(e) => setMonths(e.target.value)} /></div>
        <div><label className={labelCls}>{locale === 'ar' ? 'سعر الفائدة السنوي (%)' : 'Annual Interest Rate (%)'}</label><input type="number" step="0.01" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} /></div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-brand-50 p-5 dark:bg-slate-800 sm:grid-cols-3">
        <Stat label={locale === 'ar' ? 'المبلغ الممول' : 'Financed Amount'} value={fmt(financed)} />
        <Stat label={locale === 'ar' ? 'القسط الشهري' : 'Monthly Installment'} value={fmt(monthly)} highlight />
        <Stat label={locale === 'ar' ? 'إجمالي المدفوع' : 'Total Payment'} value={fmt(total)} />
      </div>

      <ResultActions resultText={resultText} dict={dict} printDetails={printDetails} />
    </div>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`text-xl font-bold ${highlight ? 'text-brand-700 dark:text-brand-500' : ''}`}>{value}</p>
    </div>
  );
}
