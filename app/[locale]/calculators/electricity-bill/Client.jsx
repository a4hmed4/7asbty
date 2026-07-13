'use client';
import { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getDictionary } from '../../../../lib/i18n';
import ResultActions from '../../../../components/ResultActions';

const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800';
const labelCls = 'mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300';

let idCounter = 1;

export default function ElectricityClient({ locale }) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const [pricePerKwh, setPricePerKwh] = useState(0.12);
  const [devices, setDevices] = useState([
    { id: idCounter++, name: isAr ? 'ثلاجة' : 'Refrigerator', watt: 150, hours: 24 },
  ]);

  const addDevice = () => setDevices((d) => [...d, { id: idCounter++, name: '', watt: 100, hours: 4 }]);
  const removeDevice = (id) => setDevices((d) => d.filter((x) => x.id !== id));
  const updateDevice = (id, field, val) => setDevices((d) => d.map((x) => (x.id === id ? { ...x, [field]: val } : x)));

  const { rows, totalDaily, totalMonthly } = useMemo(() => {
    const price = Number(pricePerKwh) || 0;
    const rows = devices.map((dvc) => {
      const dailyKwh = ((Number(dvc.watt) || 0) * (Number(dvc.hours) || 0)) / 1000;
      const monthlyKwh = dailyKwh * 30;
      return { ...dvc, dailyKwh, monthlyCost: monthlyKwh * price };
    });
    const totalDaily = rows.reduce((s, r) => s + r.dailyKwh, 0);
    const totalMonthly = rows.reduce((s, r) => s + r.monthlyCost, 0);
    return { rows, totalDaily, totalMonthly };
  }, [devices, pricePerKwh]);

  const fmt = (n) => new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 }).format(n);
  const resultText = `${dict.brand} — ${isAr ? 'الفاتورة الشهرية المقدرة' : 'Estimated Monthly Bill'}: ${fmt(totalMonthly)}`;

  return (
    <div>
      <div className="max-w-xs">
        <label className={labelCls}>{isAr ? 'سعر الكيلوواط ساعة' : 'Price per kWh'}</label>
        <input type="number" step="0.01" className={inputCls} value={pricePerKwh} onChange={(e) => setPricePerKwh(e.target.value)} />
      </div>

      <div className="mt-4 space-y-3">
        {devices.map((dvc) => (
          <div key={dvc.id} className="grid grid-cols-2 gap-2 rounded-lg border border-slate-200 p-3 sm:grid-cols-4 sm:items-end dark:border-slate-700">
            <div>
              <label className={labelCls}>{isAr ? 'اسم الجهاز' : 'Device Name'}</label>
              <input className={inputCls} value={dvc.name} onChange={(e) => updateDevice(dvc.id, 'name', e.target.value)} placeholder={isAr ? 'مثال: مكيف' : 'e.g. AC'} />
            </div>
            <div>
              <label className={labelCls}>{isAr ? 'القدرة (واط)' : 'Wattage (W)'}</label>
              <input type="number" className={inputCls} value={dvc.watt} onChange={(e) => updateDevice(dvc.id, 'watt', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>{isAr ? 'ساعات التشغيل يوميًا' : 'Hours/Day'}</label>
              <input type="number" className={inputCls} value={dvc.hours} onChange={(e) => updateDevice(dvc.id, 'hours', e.target.value)} />
            </div>
            <button onClick={() => removeDevice(dvc.id)} className="no-print flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={addDevice} className="no-print mt-3 flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
        <Plus className="h-4 w-4" /> {isAr ? 'إضافة جهاز' : 'Add Device'}
      </button>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-brand-50 p-5 dark:bg-slate-800 sm:grid-cols-2">
        <Stat label={isAr ? 'الاستهلاك اليومي' : 'Daily Consumption'} value={`${fmt(totalDaily)} kWh`} />
        <Stat label={isAr ? 'الفاتورة الشهرية المقدرة' : 'Estimated Monthly Bill'} value={fmt(totalMonthly)} highlight />
      </div>

      <ResultActions resultText={resultText} dict={dict} />
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
