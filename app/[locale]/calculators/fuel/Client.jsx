'use client';
import { useMemo, useState } from 'react';
import { getDictionary } from '../../../../lib/i18n';
import ResultActions from '../../../../components/ResultActions';

const inputCls = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800';
const labelCls = 'mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300';

export default function FuelClient({ locale }) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const [distance, setDistance] = useState(100);
  const [fuelUsed, setFuelUsed] = useState(8);
  const [price, setPrice] = useState(1.2);
  const [tripsPerMonth, setTripsPerMonth] = useState(20);

  const { costPerTrip, monthlyCost, consumptionPer100 } = useMemo(() => {
    const f = Number(fuelUsed) || 0;
    const p = Number(price) || 0;
    const d = Number(distance) || 0;
    const trip = f * p;
    return {
      costPerTrip: trip,
      monthlyCost: trip * (Number(tripsPerMonth) || 0),
      consumptionPer100: d > 0 ? (f / d) * 100 : 0,
    };
  }, [distance, fuelUsed, price, tripsPerMonth]);

  const fmt = (n) => new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 }).format(n);
  const resultText = `${dict.brand} — ${isAr ? 'تكلفة الرحلة' : 'Cost per Trip'}: ${fmt(costPerTrip)} | ${isAr ? 'التكلفة الشهرية' : 'Monthly Cost'}: ${fmt(monthlyCost)}`;
  const printDetails = isAr
    ? [
      `المسافة: ${fmt(Number(distance) || 0)} كم`,
      `الوقود المستهلك: ${fmt(Number(fuelUsed) || 0)} لتر`,
      `سعر اللتر: ${fmt(Number(price) || 0)}`,
      `عدد الرحلات شهريًا: ${fmt(Number(tripsPerMonth) || 0)}`,
      'المعادلة: الاستهلاك لكل 100 كم = الوقود المستهلك ÷ المسافة × 100',
      `الاستهلاك لكل 100 كم: ${fmt(consumptionPer100)} لتر`,
      `تكلفة الرحلة = الوقود المستهلك × سعر اللتر = ${fmt(costPerTrip)}`,
      `التكلفة الشهرية = تكلفة الرحلة × عدد الرحلات = ${fmt(monthlyCost)}`,
    ]
    : [
      `Distance: ${fmt(Number(distance) || 0)} km`,
      `Fuel consumed: ${fmt(Number(fuelUsed) || 0)} L`,
      `Price per liter: ${fmt(Number(price) || 0)}`,
      `Trips per month: ${fmt(Number(tripsPerMonth) || 0)}`,
      'Formula: consumption per 100km = fuel consumed ÷ distance × 100',
      `Consumption per 100km: ${fmt(consumptionPer100)} L`,
      `Cost per trip = fuel consumed × price per liter = ${fmt(costPerTrip)}`,
      `Monthly cost = cost per trip × trips per month = ${fmt(monthlyCost)}`,
    ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div><label className={labelCls}>{isAr ? 'المسافة (كم)' : 'Distance (km)'}</label><input type="number" className={inputCls} value={distance} onChange={(e) => setDistance(e.target.value)} /></div>
        <div><label className={labelCls}>{isAr ? 'الوقود المستهلك (لتر)' : 'Fuel Consumed (L)'}</label><input type="number" className={inputCls} value={fuelUsed} onChange={(e) => setFuelUsed(e.target.value)} /></div>
        <div><label className={labelCls}>{isAr ? 'سعر اللتر' : 'Price per Liter'}</label><input type="number" step="0.01" className={inputCls} value={price} onChange={(e) => setPrice(e.target.value)} /></div>
        <div><label className={labelCls}>{isAr ? 'عدد الرحلات شهريًا' : 'Trips per Month'}</label><input type="number" className={inputCls} value={tripsPerMonth} onChange={(e) => setTripsPerMonth(e.target.value)} /></div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-brand-50 p-5 dark:bg-slate-800 sm:grid-cols-3">
        <Stat label={isAr ? 'الاستهلاك لكل 100 كم' : 'Consumption per 100km'} value={`${fmt(consumptionPer100)} L`} />
        <Stat label={isAr ? 'تكلفة الرحلة' : 'Cost per Trip'} value={fmt(costPerTrip)} highlight />
        <Stat label={isAr ? 'التكلفة الشهرية' : 'Monthly Fuel Cost'} value={fmt(monthlyCost)} />
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
