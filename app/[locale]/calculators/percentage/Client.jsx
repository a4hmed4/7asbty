'use client';
import { useMemo, useState } from 'react';
import { getDictionary } from '../../../../lib/i18n';
import ResultActions from '../../../../components/ResultActions';

const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800';
const labelCls = 'mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300';
const tabCls = (active) => `rounded-lg px-4 py-2 text-sm font-medium ${active ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`;

export default function PercentageClient({ locale }) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const [tab, setTab] = useState('basic');

  const [x, setX] = useState(20);
  const [y, setY] = useState(200);

  const [oldVal, setOldVal] = useState(100);
  const [newVal, setNewVal] = useState(120);

  const [valA, setValA] = useState(80);
  const [valB, setValB] = useState(100);

  const basicResult = useMemo(() => ((Number(x) || 0) * (Number(y) || 0)) / 100, [x, y]);
  const changeResult = useMemo(() => {
    const o = Number(oldVal) || 0;
    const n = Number(newVal) || 0;
    if (o === 0) return 0;
    return ((n - o) / o) * 100;
  }, [oldVal, newVal]);
  const compareResult = useMemo(() => {
    const a = Number(valA) || 0;
    const b = Number(valB) || 0;
    if (b === 0) return 0;
    return (a / b) * 100;
  }, [valA, valB]);

  const fmt = (n) => new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button className={tabCls(tab === 'basic')} onClick={() => setTab('basic')}>{isAr ? 'نسبة من قيمة' : 'X% of Y'}</button>
        <button className={tabCls(tab === 'change')} onClick={() => setTab('change')}>{isAr ? 'الزيادة/النقصان' : 'Increase / Decrease'}</button>
        <button className={tabCls(tab === 'compare')} onClick={() => setTab('compare')}>{isAr ? 'مقارنة قيمتين' : 'Compare Values'}</button>
      </div>

      {tab === 'basic' && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><label className={labelCls}>{isAr ? 'النسبة (%)' : 'Percentage (%)'}</label><input type="number" className={inputCls} value={x} onChange={(e) => setX(e.target.value)} /></div>
            <div><label className={labelCls}>{isAr ? 'من القيمة' : 'Of Value'}</label><input type="number" className={inputCls} value={y} onChange={(e) => setY(e.target.value)} /></div>
          </div>
          <ResultBox label={isAr ? 'النتيجة' : 'Result'} value={fmt(basicResult)} />
          <ResultActions resultText={`${dict.brand} — ${x}% ${isAr ? 'من' : 'of'} ${y} = ${fmt(basicResult)}`} dict={dict} />
        </>
      )}

      {tab === 'change' && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><label className={labelCls}>{isAr ? 'القيمة القديمة' : 'Old Value'}</label><input type="number" className={inputCls} value={oldVal} onChange={(e) => setOldVal(e.target.value)} /></div>
            <div><label className={labelCls}>{isAr ? 'القيمة الجديدة' : 'New Value'}</label><input type="number" className={inputCls} value={newVal} onChange={(e) => setNewVal(e.target.value)} /></div>
          </div>
          <ResultBox
            label={changeResult >= 0 ? (isAr ? 'نسبة الزيادة' : 'Percentage Increase') : (isAr ? 'نسبة النقصان' : 'Percentage Decrease')}
            value={`${fmt(Math.abs(changeResult))}%`}
          />
          <ResultActions resultText={`${dict.brand} — ${isAr ? 'التغيير' : 'Change'}: ${fmt(changeResult)}%`} dict={dict} />
        </>
      )}

      {tab === 'compare' && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><label className={labelCls}>{isAr ? 'القيمة الأولى' : 'Value A'}</label><input type="number" className={inputCls} value={valA} onChange={(e) => setValA(e.target.value)} /></div>
            <div><label className={labelCls}>{isAr ? 'القيمة الثانية' : 'Value B'}</label><input type="number" className={inputCls} value={valB} onChange={(e) => setValB(e.target.value)} /></div>
          </div>
          <ResultBox label={isAr ? 'A كنسبة من B' : 'A as % of B'} value={`${fmt(compareResult)}%`} />
          <ResultActions resultText={`${dict.brand} — A ${isAr ? 'يمثل' : 'is'} ${fmt(compareResult)}% ${isAr ? 'من' : 'of'} B`} dict={dict} />
        </>
      )}
    </div>
  );
}

function ResultBox({ label, value }) {
  return (
    <div className="mt-6 rounded-xl bg-brand-50 p-5 dark:bg-slate-800">
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-brand-700 dark:text-brand-500">{value}</p>
    </div>
  );
}
