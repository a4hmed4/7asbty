import { NextResponse } from 'next/server';
import { CALCULATORS } from '../../../../lib/calculators';
import { readAdminData, writeAdminData } from '../../../../lib/admin-store';

export async function GET() {
  const data = await readAdminData();
  return NextResponse.json({ calculators: [...CALCULATORS, ...data.calculators], seo: data.seo });
}

export async function PATCH(request) {
  const payload = await request.json();
  const slug = String(payload.slug || '').trim();

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required.' }, { status: 400 });
  }

  const data = await readAdminData();
  data.seo[slug] = {
    en: {
      title: String(payload.en?.title || '').trim(),
      description: String(payload.en?.description || '').trim(),
    },
    ar: {
      title: String(payload.ar?.title || '').trim(),
      description: String(payload.ar?.description || '').trim(),
    },
    updatedAt: new Date().toISOString(),
  };

  await writeAdminData(data);
  return NextResponse.json({ seo: data.seo[slug] });
}
