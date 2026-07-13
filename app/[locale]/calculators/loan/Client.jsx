'use client';
import { useMemo, useState } from 'react';
import { getDictionary } from '../../../../lib/i18n';
import ResultActions from '../../../../components/ResultActions';

const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800';
const labelCls = 'mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300';

export default function LoanClient({ locale }) {
  const dict = getDictionary(locale);
  const [amount, setAmount] = useState(200000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(20);
  const [showTable, setShowTable] = useState(false);

  const { monthly, totalPayment, totalInterest, schedule } = useMemo(() => {
    const P = Number(amount) || 0;
    const r = (Number(rate) || 0) / 100 / 12;
    const n = (Number(years) || 0) * 12;
    if (P <= 0 || n <= 0) return { monthly: 0, totalPayment: 0, totalInterest: 0, schedule: [] };

    const m = r === 0 ? P / n : (P * r) / (1 - Math.pow(1 + r, -n));
    let balance = P;
    const sched = [];
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = m - interest;
      balance = Math.max(balance - principal, 0);
      sched.push({ month: i, payment: m, principal, interest, balance });
    }
    return {
      monthly: m,
      totalPayment: m * n,
      totalInterest: m * n - P,
      schedule: sched,
    };
  }, [amount, rate, years]);

  const fmt = (n) => new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 }).format(n);
  const resultText = `${dict.brand} — ${locale === 'ar' ? 'القسط الشهري' : 'Monthly Payment'}: ${fmt(monthly)} | ${locale === 'ar' ? 'إجمالي الفوائد' : 'Total Interest'}: ${fmt(totalInterest)} | ${locale === 'ar' ? 'إجمالي السداد' : 'Total Payment'}: ${fmt(totalPayment)}`;
  const printDetails = locale === 'ar'
    ? [
      `مبلغ القرض: ${fmt(Number(amount) || 0)}`,
      `سعر الفائدة السنوي: ${fmt(Number(rate) || 0)}%`,
      `مدة القرض: ${fmt(Number(years) || 0)} سنة (${fmt((Number(years) || 0) * 12)} شهر)`,
      'المعادلة: القسط = (مبلغ القرض × الفائدة الشهرية) ÷ (1 - (1 + الفائدة الشهرية)^-عدد الأشهر)',
      `القسط الشهري: ${fmt(monthly)}`,
      `إجمالي الفوائد: ${fmt(totalInterest)}`,
      `إجمالي السداد: ${fmt(totalPayment)}`,
    ]
    : [
      `Loan amount: ${fmt(Number(amount) || 0)}`,
      `Annual interest rate: ${fmt(Number(rate) || 0)}%`,
      `Loan term: ${fmt(Number(years) || 0)} years (${fmt((Number(years) || 0) * 12)} months)`,
      'Formula: payment = (loan amount × monthly rate) ÷ (1 - (1 + monthly rate)^-months)',
      `Monthly payment: ${fmt(monthly)}`,
      `Total interest: ${fmt(totalInterest)}`,
      `Total payment: ${fmt(totalPayment)}`,
    ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls}>{locale === 'ar' ? 'مبلغ القرض' : 'Loan Amount'}</label>
          <input type="number" min="0" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>{locale === 'ar' ? 'سعر الفائدة السنوي (%)' : 'Annual Interest Rate (%)'}</label>
          <input type="number" min="0" step="0.01" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>{locale === 'ar' ? 'مدة القرض (سنوات)' : 'Loan Term (years)'}</label>
          <input type="number" min="1" className={inputCls} value={years} onChange={(e) => setYears(e.target.value)} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-brand-50 p-5 dark:bg-slate-800 sm:grid-cols-3">
        <Stat label={locale === 'ar' ? 'القسط الشهري' : 'Monthly Payment'} value={fmt(monthly)} highlight />
        <Stat label={locale === 'ar' ? 'إجمالي الفوائد' : 'Total Interest'} value={fmt(totalInterest)} />
        <Stat label={locale === 'ar' ? 'إجمالي السداد' : 'Total Payment'} value={fmt(totalPayment)} />
      </div>

      <ResultActions resultText={resultText} dict={dict} printDetails={printDetails} />

      <button
        onClick={() => setShowTable(!showTable)}
        className="no-print mt-6 text-sm font-medium text-brand-600 hover:underline"
      >
        {showTable ? (locale === 'ar' ? 'إخفاء جدول السداد' : 'Hide Amortization Table') : (locale === 'ar' ? 'عرض جدول السداد' : 'Show Amortization Table')}
      </button>

      {showTable && schedule.length > 0 && (
        <div className="mt-4 max-h-96 overflow-auto rounded-lg border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-3 py-2 text-start">{locale === 'ar' ? 'الشهر' : 'Month'}</th>
                <th className="px-3 py-2 text-start">{locale === 'ar' ? 'القسط' : 'Payment'}</th>
                <th className="px-3 py-2 text-start">{locale === 'ar' ? 'الأصل' : 'Principal'}</th>
                <th className="px-3 py-2 text-start">{locale === 'ar' ? 'الفائدة' : 'Interest'}</th>
                <th className="px-3 py-2 text-start">{locale === 'ar' ? 'الرصيد المتبقي' : 'Balance'}</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.month} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-3 py-1.5">{row.month}</td>
                  <td className="px-3 py-1.5">{fmt(row.payment)}</td>
                  <td className="px-3 py-1.5">{fmt(row.principal)}</td>
                  <td className="px-3 py-1.5">{fmt(row.interest)}</td>
                  <td className="px-3 py-1.5">{fmt(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
