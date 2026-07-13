'use client';
import { useMemo, useState } from 'react';
import { getDictionary } from '../../../../lib/i18n';
import ResultActions from '../../../../components/ResultActions';

const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800';
const labelCls = 'mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300';

const CATEGORY = {
  en: [
    { max: 18.5, label: 'Underweight', color: 'text-blue-600' },
    { max: 25, label: 'Normal', color: 'text-green-600' },
    { max: 30, label: 'Overweight', color: 'text-amber-600' },
    { max: Infinity, label: 'Obesity', color: 'text-red-600' },
  ],
  ar: [
    { max: 18.5, label: 'نقص الوزن', color: 'text-blue-600' },
    { max: 25, label: 'طبيعي', color: 'text-green-600' },
    { max: 30, label: 'زيادة الوزن', color: 'text-amber-600' },
    { max: Infinity, label: 'سمنة', color: 'text-red-600' },
  ],
};

export default function BmiClient({ locale }) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);

  const { bmi, category } = useMemo(() => {
    const w = Number(weight) || 0;
    const hM = (Number(height) || 0) / 100;
    if (w <= 0 || hM <= 0) return { bmi: 0, category: CATEGORY[locale][0] };
    const value = w / (hM * hM);
    const cat = CATEGORY[locale].find((c) => value < c.max) || CATEGORY[locale][CATEGORY[locale].length - 1];
    return { bmi: value, category: cat };
  }, [weight, height, locale]);

  const fmt = (n) => new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US', { maximumFractionDigits: 1 }).format(n);
  const resultText = `${dict.brand} — BMI: ${fmt(bmi)} (${category.label})`;
  const printDetails = isAr
    ? [
      `الوزن: ${fmt(Number(weight) || 0)} كجم`,
      `الطول: ${fmt(Number(height) || 0)} سم`,
      `الطول بالمتر: ${fmt((Number(height) || 0) / 100)} م`,
      'المعادلة: BMI = الوزن بالكيلوجرام ÷ (الطول بالمتر × الطول بالمتر)',
      `مؤشر كتلة الجسم: ${fmt(bmi)}`,
      `التصنيف: ${category.label}`,
    ]
    : [
      `Weight: ${fmt(Number(weight) || 0)} kg`,
      `Height: ${fmt(Number(height) || 0)} cm`,
      `Height in meters: ${fmt((Number(height) || 0) / 100)} m`,
      'Formula: BMI = weight in kg ÷ (height in meters × height in meters)',
      `BMI: ${fmt(bmi)}`,
      `Category: ${category.label}`,
    ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><label className={labelCls}>{isAr ? 'الوزن (كجم)' : 'Weight (kg)'}</label><input type="number" className={inputCls} value={weight} onChange={(e) => setWeight(e.target.value)} /></div>
        <div><label className={labelCls}>{isAr ? 'الطول (سم)' : 'Height (cm)'}</label><input type="number" className={inputCls} value={height} onChange={(e) => setHeight(e.target.value)} /></div>
      </div>

      <div className="mt-6 rounded-xl bg-brand-50 p-5 text-center dark:bg-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">{isAr ? 'مؤشر كتلة الجسم' : 'Your BMI'}</p>
        <p className="text-4xl font-extrabold text-brand-700 dark:text-brand-500">{fmt(bmi)}</p>
        <p className={`mt-1 font-semibold ${category.color}`}>{category.label}</p>
      </div>

      <ResultActions resultText={resultText} dict={dict} printDetails={printDetails} />
    </div>
  );
}
