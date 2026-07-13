import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'admin.json');
const DEFAULT_DATA = { calculators: [], seo: {}, pageViews: [] };

export async function readAdminData() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      calculators: Array.isArray(parsed.calculators) ? parsed.calculators : [],
      seo: parsed.seo && typeof parsed.seo === 'object' ? parsed.seo : {},
      pageViews: Array.isArray(parsed.pageViews) ? parsed.pageViews : [],
    };
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await writeAdminData(DEFAULT_DATA);
    return DEFAULT_DATA;
  }
}

export async function writeAdminData(data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}
