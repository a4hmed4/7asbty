import { Check } from 'lucide-react';

export async function generateMetadata({ params: { locale } }) {
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'النسخة المميزة' : 'Go Premium',
    description: isAr ? 'أزل الإعلانات وافتح حاسبات متقدمة مع النسخة المميزة.' : 'Remove ads and unlock advanced calculators with Premium.',
    alternates: { canonical: `/${locale}/premium` },
  };
}

export default function PremiumPage({ params: { locale } }) {
  const isAr = locale === 'ar';

  const freeFeatures = isAr
    ? ['كل الحاسبات الأساسية', 'استخدام غير محدود', 'دعم اللغتين العربية والإنجليزية']
    : ['All core calculators', 'Unlimited usage', 'Arabic & English support'];

  const premiumFeatures = isAr
    ? ['بدون إعلانات نهائيًا', 'حاسبات متقدمة حصرية', 'تصدير النتائج كـ PDF بدون علامة مائية', 'دعم فني ذو أولوية']
    : ['Completely ad-free experience', 'Exclusive advanced calculators', 'Export results to PDF, no watermark', 'Priority support'];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold md:text-4xl">{isAr ? 'ارتقِ إلى النسخة المميزة' : 'Upgrade to Premium'}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {isAr ? 'استمتع بتجربة بدون إعلانات مع حاسبات متقدمة إضافية.' : 'Enjoy an ad-free experience with additional advanced calculators.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
          <h2 className="text-xl font-bold">{isAr ? 'مجاني' : 'Free'}</h2>
          <p className="mt-1 text-3xl font-extrabold">$0</p>
          <ul className="mt-4 space-y-2 text-sm">
            {freeFeatures.map((f, i) => (
              <li key={i} className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> {f}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-brand-600 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-brand-700 dark:text-brand-500">{isAr ? 'مميز' : 'Premium'}</h2>
          <p className="mt-1 text-3xl font-extrabold">$3.99<span className="text-sm font-normal text-slate-500">/{isAr ? 'شهر' : 'mo'}</span></p>
          <ul className="mt-4 space-y-2 text-sm">
            {premiumFeatures.map((f, i) => (
              <li key={i} className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-600" /> {f}</li>
            ))}
          </ul>
          <button className="mt-6 w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
            {isAr ? 'اشترك الآن' : 'Subscribe Now'}
          </button>
          <p className="mt-2 text-center text-xs text-slate-400">
            {isAr ? 'زر تجريبي — اربطه بمزود دفع مثل Stripe عند النشر.' : 'Placeholder button — wire this up to Stripe or another payment provider before launch.'}
          </p>
        </div>
      </div>
    </div>
  );
}
