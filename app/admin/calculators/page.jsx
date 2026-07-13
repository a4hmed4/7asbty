import { CATEGORIES } from '../../../lib/calculators';
import AdminCalculatorsClient from './AdminCalculatorsClient';

export default function AdminCalculatorsPage() {
  return <AdminCalculatorsClient categories={CATEGORIES} />;
}
