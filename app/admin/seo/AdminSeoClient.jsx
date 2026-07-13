'use client';

import { useEffect, useState } from 'react';

const inputCls = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm';

export default function AdminSeoClient() {
  const [calculators, setCalculators] = useState([]);
  const [seo, setSeo] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/admin/seo')
      .then((response) => response.json())
      .then((data) => {
        setCalculators(data.calculators || []);
        setSeo(data.seo || {});
      });
  }, []);

  const getValue = (calculator, locale, key) => {
    return seo[calculator.slug]?.[locale]?.[key] ?? calculator[locale][key] ?? '';
  };

  const updateValue = (slug, locale, key, value) => {
    setSeo((current) => ({
      ...current,
      [slug]: {
        ...current[slug],
        [locale]: {
          ...current[slug]?.[locale],
          [key]: value,
        },
      },
    }));
  };

  const saveSeo = async (calculator) => {
    setStatus(`Saving ${calculator.slug}...`);
    const payload = {
      slug: calculator.slug,
      en: {
        title: getValue(calculator, 'en', 'title'),
        description: getValue(calculator, 'en', 'description'),
      },
      ar: {
        title: getValue(calculator, 'ar', 'title'),
        description: getValue(calculator, 'ar', 'description'),
      },
    };

    const response = await fetch('/api/admin/seo', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error || 'Unable to save SEO.');
      return;
    }

    setStatus(`Saved ${calculator.slug}.`);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">SEO Manager</h1>
        {status && <span className="text-sm text-slate-500">{status}</span>}
      </div>
      <div className="space-y-4">
        {calculators.map((calculator) => (
          <div key={calculator.slug} className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold">{calculator.en.name} <span className="font-mono text-xs text-slate-400">/{calculator.slug}</span></h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-slate-500">Meta Title (EN)</label>
                <input value={getValue(calculator, 'en', 'title')} onChange={(event) => updateValue(calculator.slug, 'en', 'title', event.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">Meta Title (AR)</label>
                <input value={getValue(calculator, 'ar', 'title')} onChange={(event) => updateValue(calculator.slug, 'ar', 'title', event.target.value)} className={inputCls} dir="rtl" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">Meta Description (EN)</label>
                <textarea value={getValue(calculator, 'en', 'description')} onChange={(event) => updateValue(calculator.slug, 'en', 'description', event.target.value)} rows={3} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">Meta Description (AR)</label>
                <textarea value={getValue(calculator, 'ar', 'description')} onChange={(event) => updateValue(calculator.slug, 'ar', 'description', event.target.value)} rows={3} className={inputCls} dir="rtl" />
              </div>
            </div>
            <button onClick={() => saveSeo(calculator)} className="mt-3 rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">Save</button>
          </div>
        ))}
      </div>
    </div>
  );
}
