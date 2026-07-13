'use client';
import { useMemo, useState } from 'react';
import { getDictionary } from '../../../../lib/i18n';
import ResultActions from '../../../../components/ResultActions';

const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800';
const labelCls = 'mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300';

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

export default function AgeClient({ locale }) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const [birthDate, setBirthDate] = useState('2000-01-01');

  const { years, months, days, nextBirthdayDays } = useMemo(() => {
    const birth = new Date(birthDate);
    const today = new Date();
    if (isNaN(birth.getTime()) || birth > today) return { years: 0, months: 0, days: 0, nextBirthdayDays: 0 };

    let y = today.getFullYear() - birth.getFullYear();
    let m = today.getMonth() - birth.getMonth();
    let d = today.getDate() - birth.getDate();

    if (d < 0) {
      m -= 1;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      d += lastMonth.getDate();
    }
    if (m < 0) {
      y -= 1;
      m += 12;
    }

    let nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) nextBday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    const diffDays = Math.ceil((nextBday - today) / (1000 * 60 * 60 * 24));

    return { years: y, months: m, days: d, nextBirthdayDays: diffDays };
  }, [birthDate]);

  const resultText = `${dict.brand} — ${isAr ? 'العمر' : 'Age'}: ${years} ${isAr ? 'سنة' : 'yrs'} ${months} ${isAr ? 'شهر' : 'mo'} ${days} ${isAr ? 'يوم' : 'days'}`;

  return (
    <div>
      <div className="max-w-sm">
        <label className={labelCls}>{isAr ? 'تاريخ الميلاد' : 'Date of Birth'}</label>
        <input type="date" className={inputCls} value={birthDate} max={toISODate(new Date())} onChange={(e) => setBirthDate(e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-brand-50 p-5 dark:bg-slate-800 sm:grid-cols-3">
        <Stat label={isAr ? 'سنوات' : 'Years'} value={years} highlight />
        <Stat label={isAr ? 'أشهر' : 'Months'} value={months} />
        <Stat label={isAr ? 'أيام' : 'Days'} value={days} />
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-700">
        🎂 {isAr ? `عيد ميلادك القادم بعد ${nextBirthdayDays} يوم` : `Your next birthday is in ${nextBirthdayDays} days`}
      </div>

      <ResultActions resultText={resultText} dict={dict} />
    </div>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-brand-700 dark:text-brand-500' : ''}`}>{value}</p>
    </div>
  );
}
