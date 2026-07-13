import { CALCULATORS } from '../../lib/calculators';
import { readAdminData } from '../../lib/admin-store';

export default async function AdminOverview() {
  const data = await readAdminData();
  const since = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentViews = data.pageViews.filter((view) => new Date(view.viewedAt).getTime() >= since);
  const statCards = [
    { label: 'Total Calculators', value: CALCULATORS.length + data.calculators.length },
    { label: 'Custom Calculators', value: data.calculators.length },
    { label: 'Visitors (30 days)', value: recentViews.length.toLocaleString() },
    { label: 'SEO Overrides', value: Object.keys(data.seo).length },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Overview</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Admin data is stored locally in data/admin.json. Use a database before deploying to a multi-server environment.
      </p>
    </div>
  );
}
