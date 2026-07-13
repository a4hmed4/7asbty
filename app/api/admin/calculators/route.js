import { NextResponse } from 'next/server';
import { CALCULATORS } from '../../../../lib/calculators';
import { readAdminData, writeAdminData } from '../../../../lib/admin-store';

function normalizeSlug(slug) {
  return String(slug || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createCalculator(payload) {
  const slug = normalizeSlug(payload.slug);
  const nameEn = String(payload.nameEn || '').trim();
  const nameAr = String(payload.nameAr || '').trim();

  if (!slug || !nameEn || !nameAr) {
    throw new Error('Slug, English name, and Arabic name are required.');
  }

  return {
    slug,
    category: payload.category || 'daily-life',
    icon: payload.icon || 'Calculator',
    popular: Boolean(payload.popular),
    custom: true,
    createdAt: new Date().toISOString(),
    en: {
      name: nameEn,
      title: String(payload.titleEn || nameEn).trim(),
      description: String(payload.descriptionEn || '').trim(),
    },
    ar: {
      name: nameAr,
      title: String(payload.titleAr || nameAr).trim(),
      description: String(payload.descriptionAr || '').trim(),
    },
  };
}

export async function GET() {
  const data = await readAdminData();
  return NextResponse.json({ calculators: [...CALCULATORS, ...data.calculators] });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const data = await readAdminData();
    const calculator = createCalculator(payload);
    const exists = [...CALCULATORS, ...data.calculators].some((item) => item.slug === calculator.slug);

    if (exists) {
      return NextResponse.json({ error: 'Calculator slug already exists.' }, { status: 409 });
    }

    data.calculators.push(calculator);
    await writeAdminData(data);
    return NextResponse.json({ calculator }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to save calculator.' }, { status: 400 });
  }
}
