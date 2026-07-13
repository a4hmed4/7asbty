import { getDictionary } from '../../../lib/i18n';

export async function generateMetadata({ params: { locale } }) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'من نحن' : 'About Us',
    description: isAr ? `تعرف على ${dict.brand} ورسالتنا في تبسيط الحسابات اليومية.` : `Learn about ${dict.brand} and our mission to simplify everyday calculations.`,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default function AboutPage({ params: { locale } }) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="mb-4 text-3xl font-extrabold">{isAr ? 'من نحن' : 'About Us'}</h1>
      <p className="mb-4 text-slate-600 dark:text-slate-400">
        {isAr
          ? `${dict.brand} منصة مجانية تجمع أكثر الحاسبات استخدامًا في الحياة اليومية في مكان واحد، من القروض والأقساط إلى الصحة والتحويلات، بواجهة بسيطة وسريعة تعمل على جميع الأجهزة.`
          : `${dict.brand} is a free platform that brings together the most-used everyday calculators — from loans and installments to health and unit conversions — in one simple, fast interface that works on every device.`}
      </p>
      <p className="text-slate-600 dark:text-slate-400">
        {isAr
          ? 'هدفنا هو مساعدتك على اتخاذ قرارات مالية وصحية ويومية أفضل من خلال أدوات دقيقة وسهلة الاستخدام دون الحاجة لإنشاء حساب.'
          : 'Our goal is to help you make better financial, health, and daily-life decisions through accurate, easy-to-use tools with no account required.'}
      </p>
    </div>
  );
}
