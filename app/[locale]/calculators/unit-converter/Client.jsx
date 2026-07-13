'use client';
import { useMemo, useState } from 'react';
import { getDictionary } from '../../../../lib/i18n';
import ResultActions from '../../../../components/ResultActions';
import { UNIT_CATEGORIES, convertLinear, convertTemperature } from '../../../../lib/units';

const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800';
const labelCls = 'mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300';
const tabCls = (active) => `rounded-lg px-3 py-1.5 text-sm font-medium ${active ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`;

const CATEGORY_LABELS = {
  length: { en: 'Length', ar: 'الطول' },
  weight: { en: 'Weight', ar: 'الوزن' },
  temperature: { en: 'Temperature', ar: 'درجة الحرارة' },
  speed: { en: 'Speed', ar: 'السرعة' },
  area: { en: 'Area', ar: 'المساحة' },
  volume: { en: 'Volume', ar: 'الحجم' },
  time: { en: 'Time', ar: 'الوقت' },
};
const TEMP_UNITS = ['C', 'F', 'K'];

export default function UnitClient({ locale }) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const categories = Object.keys(CATEGORY_LABELS);
  const [category, setCategory] = useState('length');
  const [value, setValue] = useState(1);

  const unitsForCategory = category === 'temperature' ? TEMP_UNITS : Object.keys(UNIT_CATEGORIES[category].units);
  const [from, setFrom] = useState(unitsForCategory[0]);
  const [to, setTo] = useState(unitsForCategory[1] || unitsForCategory[0]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const units = cat === 'temperature' ? TEMP_UNITS : Object.keys(UNIT_CATEGORIES[cat].units);
    setFrom(units[0]);
    setTo(units[1] || units[0]);
  };

  const result = useMemo(() => {
    if (category === 'temperature') return convertTemperature(value, from, to);
    return convertLinear(value, from, to, category);
  }, [value, from, to, category]);

  const fmt = (n) => new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US', { maximumFractionDigits: 6 }).format(n);
  const resultText = `${dict.brand} — ${value} ${from} = ${fmt(result)} ${to}`;
  const printDetails = isAr
    ? [
      `نوع التحويل: ${CATEGORY_LABELS[category][locale]}`,
      `القيمة: ${fmt(Number(value) || 0)} ${from}`,
      `من: ${from}`,
      `إلى: ${to}`,
      category === 'temperature' ? 'المعادلة: يتم تحويل درجة الحرارة باستخدام معادلات Celsius/Fahrenheit/Kelvin القياسية' : 'المعادلة: يتم تحويل القيمة إلى الوحدة الأساسية ثم إلى وحدة الهدف',
      `النتيجة: ${fmt(result)} ${to}`,
    ]
    : [
      `Conversion type: ${CATEGORY_LABELS[category][locale]}`,
      `Value: ${fmt(Number(value) || 0)} ${from}`,
      `From: ${from}`,
      `To: ${to}`,
      category === 'temperature' ? 'Formula: temperature is converted with the standard Celsius/Fahrenheit/Kelvin formulas' : 'Formula: value is converted to the base unit, then to the target unit',
      `Result: ${fmt(result)} ${to}`,
    ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button key={cat} className={tabCls(category === cat)} onClick={() => handleCategoryChange(cat)}>
            {CATEGORY_LABELS[cat][locale]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls}>{isAr ? 'القيمة' : 'Value'}</label>
          <input type="number" className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>{isAr ? 'من' : 'From'}</label>
          <select className={inputCls} value={from} onChange={(e) => setFrom(e.target.value)}>
            {unitsForCategory.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>{isAr ? 'إلى' : 'To'}</label>
          <select className={inputCls} value={to} onChange={(e) => setTo(e.target.value)}>
            {unitsForCategory.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-brand-50 p-5 text-center dark:bg-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">{isAr ? 'النتيجة' : 'Result'}</p>
        <p className="text-3xl font-extrabold text-brand-700 dark:text-brand-500">{fmt(result)} {to}</p>
      </div>

      <ResultActions resultText={resultText} dict={dict} printDetails={printDetails} />
    </div>
  );
}
