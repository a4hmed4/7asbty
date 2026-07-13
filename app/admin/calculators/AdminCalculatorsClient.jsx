'use client';

import { useEffect, useState } from 'react';

const inputCls = 'rounded-lg border border-slate-300 px-3 py-2 text-sm';

export default function AdminCalculatorsClient({ categories }) {
  const [calculators, setCalculators] = useState([]);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    nameEn: '',
    nameAr: '',
    slug: '',
    category: categories[0]?.id || 'daily-life',
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
  });

  const loadCalculators = async () => {
    const response = await fetch('/api/admin/calculators');
    const data = await response.json();
    setCalculators(data.calculators || []);
  };

  useEffect(() => {
    loadCalculators();
  }, []);

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Saving...');
    const response = await fetch('/api/admin/calculators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error || 'Unable to save calculator.');
      return;
    }

    setForm({
      nameEn: '',
      nameAr: '',
      slug: '',
      category: categories[0]?.id || 'daily-life',
      titleEn: '',
      titleAr: '',
      descriptionEn: '',
      descriptionAr: '',
    });
    setStatus('Calculator saved.');
    await loadCalculators();
  };

  const handleDelete = async (slug) => {
    setStatus('Deleting...');
    const response = await fetch(`/api/admin/calculators/${slug}`, { method: 'DELETE' });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error || 'Unable to delete calculator.');
      return;
    }

    setStatus('Calculator deleted.');
    await loadCalculators();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calculators</h1>
        {status && <span className="text-sm text-slate-500">{status}</span>}
      </div>

      <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Slug</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {calculators.map((calculator) => (
              <tr key={calculator.slug} className="border-t border-slate-100">
                <td className="px-4 py-2">{calculator.en.name}</td>
                <td className="px-4 py-2 font-mono text-xs text-slate-500">{calculator.slug}</td>
                <td className="px-4 py-2">{calculator.category}</td>
                <td className="px-4 py-2">{calculator.custom ? 'Admin' : 'Code'}</td>
                <td className="px-4 py-2">
                  {calculator.custom ? (
                    <button onClick={() => handleDelete(calculator.slug)} className="text-red-600 hover:underline">Delete</button>
                  ) : (
                    <span className="text-xs text-slate-400">Built-in</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Add New Calculator</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input value={form.nameEn} onChange={(event) => updateForm('nameEn', event.target.value)} className={inputCls} placeholder="Name (English)" />
          <input value={form.nameAr} onChange={(event) => updateForm('nameAr', event.target.value)} className={inputCls} placeholder="Name (Arabic)" dir="rtl" />
          <input value={form.slug} onChange={(event) => updateForm('slug', event.target.value)} className={inputCls} placeholder="Slug (e.g. tip-calculator)" />
          <select value={form.category} onChange={(event) => updateForm('category', event.target.value)} className={inputCls}>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.en}</option>)}
          </select>
          <input value={form.titleEn} onChange={(event) => updateForm('titleEn', event.target.value)} className={`${inputCls} sm:col-span-2`} placeholder="Meta Title (English)" />
          <input value={form.titleAr} onChange={(event) => updateForm('titleAr', event.target.value)} className={`${inputCls} sm:col-span-2`} placeholder="Meta Title (Arabic)" dir="rtl" />
          <textarea value={form.descriptionEn} onChange={(event) => updateForm('descriptionEn', event.target.value)} className={`${inputCls} sm:col-span-2`} placeholder="Meta Description (English)" rows={3} />
          <textarea value={form.descriptionAr} onChange={(event) => updateForm('descriptionAr', event.target.value)} className={`${inputCls} sm:col-span-2`} placeholder="Meta Description (Arabic)" rows={3} dir="rtl" />
          <button type="submit" className="w-fit rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 sm:col-span-2">
            Save Calculator
          </button>
        </form>
      </div>
    </div>
  );
}
