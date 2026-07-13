import Link from 'next/link';
import { LayoutDashboard, Calculator, Search, BarChart3 } from 'lucide-react';

export const metadata = { title: 'Admin Dashboard | 7asbty', robots: { index: false, follow: false } };

const NAV = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/calculators', label: 'Calculators', icon: Calculator },
  { href: '/admin/seo', label: 'SEO Manager', icon: Search },
  { href: '/admin/visitors', label: 'Visitors', icon: BarChart3 },
];

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white p-4 md:block">
        <div className="mb-8 px-2 text-lg font-bold text-brand-700">Admin Panel</div>
        <nav className="space-y-1">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
