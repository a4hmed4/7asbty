import { NextResponse } from 'next/server';
import { readAdminData, writeAdminData } from '../../../../lib/admin-store';

export async function POST(request) {
  try {
    const payload = await request.json();
    const slug = String(payload.slug || '').trim();
    const locale = String(payload.locale || '').trim();
    const path = String(payload.path || '').trim();

    if (!slug || !path) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const data = await readAdminData();
    data.pageViews.push({
      slug,
      locale,
      path,
      viewedAt: new Date().toISOString(),
    });
    data.pageViews = data.pageViews.slice(-5000);

    await writeAdminData(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
