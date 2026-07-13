'use client';

import { useEffect, useState } from 'react';

export default function AdminVisitorsClient() {
  const [rows, setRows] = useState([]);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    fetch('/api/admin/visitors')
      .then((response) => response.json())
      .then((data) => {
        setRows(data.rows || []);
        setTotalViews(data.totalViews || 0);
      });
  }, []);

  const max = Math.max(...rows.map((row) => row.views), 1);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Visitor Statistics</h1>
      <div className="mb-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs text-slate-500">Tracked views in the last 30 days</p>
        <p className="mt-1 text-2xl font-bold">{totalViews.toLocaleString()}</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold">Page Views by Calculator (last 30 days)</h2>
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row.slug} className="flex items-center gap-3">
              <span className="w-40 shrink-0 truncate text-sm">{row.name}</span>
              <div className="h-3 flex-1 rounded-full bg-slate-100">
                <div className="h-3 rounded-full bg-brand-600" style={{ width: `${(row.views / max) * 100}%` }} />
              </div>
              <span className="w-16 shrink-0 text-right text-sm text-slate-500">{row.views.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Views are tracked from calculator pages and stored locally in data/admin.json.
      </p>
    </div>
  );
}
