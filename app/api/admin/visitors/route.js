import { NextResponse } from 'next/server';
import { CALCULATORS } from '../../../../lib/calculators';
import { readAdminData } from '../../../../lib/admin-store';

export async function GET() {
  const data = await readAdminData();
  const since = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const views = data.pageViews.filter((view) => new Date(view.viewedAt).getTime() >= since);
  const bySlug = new Map();

  for (const view of views) {
    bySlug.set(view.slug, (bySlug.get(view.slug) || 0) + 1);
  }

  const calculators = [...CALCULATORS, ...data.calculators];
  const rows = calculators
    .map((calculator) => ({
      slug: calculator.slug,
      name: calculator.en.name,
      views: bySlug.get(calculator.slug) || 0,
    }))
    .sort((a, b) => b.views - a.views);

  return NextResponse.json({
    totalViews: views.length,
    rows,
  });
}
