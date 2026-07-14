import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = process.env.VERCEL ? '/tmp/7asbty' : path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'admin.json');
const DEFAULT_DATA = { calculators: [], seo: {}, pageViews: [] };
const SEED_DATA_FILE = path.join(process.cwd(), 'data', 'admin.json');

async function readSeedData() {
  try {
    const raw = await fs.readFile(SEED_DATA_FILE, 'utf8');
    return normalizeAdminData(JSON.parse(raw));
  } catch {
    return DEFAULT_DATA;
  }
}

function normalizeAdminData(data) {
  return {
    calculators: Array.isArray(data?.calculators) ? data.calculators : [],
    seo: data?.seo && typeof data.seo === 'object' ? data.seo : {},
    pageViews: Array.isArray(data?.pageViews) ? data.pageViews : [],
  };
}

export async function readAdminData() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return normalizeAdminData(JSON.parse(raw));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const seedData = await readSeedData();
    await writeAdminData(seedData);
    return seedData;
  }
}

export async function writeAdminData(data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}
