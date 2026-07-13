import { NextResponse } from 'next/server';
import { readAdminData, writeAdminData } from '../../../../../lib/admin-store';

export async function DELETE(_request, { params }) {
  const data = await readAdminData();
  const before = data.calculators.length;
  data.calculators = data.calculators.filter((item) => item.slug !== params.slug);

  if (data.calculators.length === before) {
    return NextResponse.json({ error: 'Only custom calculators can be deleted.' }, { status: 404 });
  }

  await writeAdminData(data);
  return NextResponse.json({ ok: true });
}
