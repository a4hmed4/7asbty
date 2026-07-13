'use client';
import { useMemo, useState } from 'react';
import { getDictionary } from '../../../../lib/i18n';
import ResultActions from '../../../../components/ResultActions';

const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800';
const labelCls = 'mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300';

export default function DiscountClient({ locale }) {
  const dict = getDictionary(locale);
  const [price, setPrice] = useState(100);
  const [discount, setDiscount] = useState(20);

  const { finalPrice, saved } = useMemo(() => {
    const p = Number(price) || 0;
    const d = Number(discount) || 0;
    const savedAmount = (p * d) / 100;
    return { finalPrice: p - savedAmount, saved: savedAmount };
  }, [price, discount]);

  const fmt = (n) => new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 }).format(n);
  const resultText = `${dict.brand} — ${locale === 'ar' ? 'السعر النهائي' : 'Final Price'}: ${fmt(finalPrice)} | ${locale === 'ar' ? 'التوفير' : 'You Save'}: ${fmt(saved)}`;
  const printDetails = locale === 'ar'
    ? [
      `السعر الأصلي: ${fmt(Number(price) || 0)}`,
      `نسبة الخصم: ${fmt(Number(discount) || 0)}%`,
      'المعادلة: مبلغ الخصم = السعر الأصلي × نسبة الخصم ÷ 100',
      `مبلغ الخصم: ${fmt(saved)}`,
      `السعر النهائي = السعر الأصلي - مبلغ الخصم = ${fmt(finalPrice)}`,
    ]
    : [
      `Original price: ${fmt(Number(price) || 0)}`,
      `Discount rate: ${fmt(Number(discount) || 0)}%`,
      'Formula: discount amount = original price × discount rate ÷ 100',
      `Discount amount: ${fmt(saved)}`,
      `Final price = original price - discount amount = ${fmt(finalPrice)}`,
    ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><label className={labelCls}>{locale === 'ar' ? 'السعر الأصلي' : 'Original Price'}</label><input type="number" className={inputCls} value={price} onChange={(e) => setPrice(e.target.value)} /></div>
        <div><label className={labelCls}>{locale === 'ar' ? 'نسبة الخصم (%)' : 'Discount (%)'}</label><input type="number" className={inputCls} value={discount} onChange={(e) => setDiscount(e.target.value)} /></div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-brand-50 p-5 dark:bg-slate-800 sm:grid-cols-2">
        <Stat label={locale === 'ar' ? 'السعر النهائي' : 'Final Price'} value={fmt(finalPrice)} highlight />
        <Stat label={locale === 'ar' ? 'المبلغ الموفر' : 'Amount Saved'} value={fmt(saved)} />
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
