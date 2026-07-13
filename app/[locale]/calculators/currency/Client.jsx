'use client';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { getDictionary } from '../../../../lib/i18n';
import { getCurrencyLabel } from '../../../../lib/currencies';
import ResultActions from '../../../../components/ResultActions';

const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800';
const labelCls = 'mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300';

export default function CurrencyClient({ locale }) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rateMeta, setRateMeta] = useState(null);
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EGP');

  useEffect(() => {
    fetch('/api/exchange-rates')
      .then((r) => r.json())
      .then((data) => {
        setRates(data.rates);
        setRateMeta({ date: data.date, source: data.source });
        setError(data.source === 'fallback');
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const converted = useMemo(() => {
    if (!rates || !rates[from] || !rates[to]) return 0;
    const usdAmount = (Number(amount) || 0) / rates[from];
    return usdAmount * rates[to];
  }, [rates, amount, from, to]);

  const fmt = (n) => new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 }).format(n);
  const resultText = `${dict.brand} — ${amount} ${from} = ${fmt(converted)} ${to}`;
  const printDetails = isAr
    ? [
      `المبلغ: ${fmt(Number(amount) || 0)} ${from}`,
      `من: ${getCurrencyLabel(from, locale)}`,
      `إلى: ${getCurrencyLabel(to, locale)}`,
      rates?.[from] ? `سعر ${from} مقابل USD: ${fmt(rates[from])}` : '',
      rates?.[to] ? `سعر ${to} مقابل USD: ${fmt(rates[to])}` : '',
      'المعادلة: المبلغ بالدولار = المبلغ ÷ سعر عملة المصدر، ثم الناتج = المبلغ بالدولار × سعر عملة الهدف',
      `النتيجة: ${fmt(converted)} ${to}`,
      statusText,
    ]
    : [
      `Amount: ${fmt(Number(amount) || 0)} ${from}`,
      `From: ${getCurrencyLabel(from, locale)}`,
      `To: ${getCurrencyLabel(to, locale)}`,
      rates?.[from] ? `${from} rate against USD: ${fmt(rates[from])}` : '',
      rates?.[to] ? `${to} rate against USD: ${fmt(rates[to])}` : '',
      'Formula: USD amount = amount ÷ source currency rate, then result = USD amount × target currency rate',
      `Result: ${fmt(converted)} ${to}`,
      statusText,
    ];

  const currencyOptions = rates ? Object.keys(rates) : ['USD', 'EUR', 'GBP', 'EGP', 'SAR', 'AED', 'KWD'];
  const lastUpdated = rateMeta?.date
    ? `${isAr ? 'آخر تحديث' : 'Last updated'}: ${rateMeta.date}`
    : isAr ? 'أسعار مباشرة' : 'Live rates';
  const statusText = error
    ? (isAr ? 'تعذر جلب السعر المباشر، يتم استخدام أسعار احتياطية مؤقتة.' : 'Live rates are unavailable, using temporary fallback rates.')
    : lastUpdated;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <label className={labelCls}>{isAr ? 'المبلغ' : 'Amount'}</label>
          <input type="number" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
          <select className={`${inputCls} mt-2`} value={from} onChange={(e) => setFrom(e.target.value)}>
            {currencyOptions.map((c) => <option key={c} value={c}>{getCurrencyLabel(c, locale)}</option>)}
          </select>
        </div>
        <button
          onClick={() => { setFrom(to); setTo(from); }}
          className="mt-6 hidden h-10 w-10 items-center justify-center self-start rounded-full border border-slate-300 sm:flex dark:border-slate-700"
          aria-label="Swap currencies"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>
        <div>
          <label className={labelCls}>{isAr ? 'إلى' : 'To'}</label>
          <div className={`${inputCls} flex items-center opacity-70`}>{loading ? '...' : fmt(converted)}</div>
          <select className={`${inputCls} mt-2`} value={to} onChange={(e) => setTo(e.target.value)}>
            {currencyOptions.map((c) => <option key={c} value={c}>{getCurrencyLabel(c, locale)}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-brand-50 p-5 text-center dark:bg-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">{isAr ? 'النتيجة' : 'Result'}</p>
        <p className="text-3xl font-extrabold text-brand-700 dark:text-brand-500">
          {loading ? '...' : `${fmt(converted)} ${to}`}
        </p>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{statusText}</p>
      </div>

      <ResultActions resultText={resultText} dict={dict} printDetails={printDetails} />
    </div>
  );
}
