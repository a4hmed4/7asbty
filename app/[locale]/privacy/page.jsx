export async function generateMetadata({ params: { locale } }) {
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
    alternates: { canonical: `/${locale}/privacy` },
  };
}

export default function PrivacyPage({ params: { locale } }) {
  const isAr = locale === 'ar';
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="mb-4 text-3xl font-extrabold">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</h1>
      <div className="space-y-4 text-slate-600 dark:text-slate-400">
        <p>
          {isAr
            ? 'لا تتطلب حاسباتنا إنشاء حساب، وتتم جميع عمليات الحساب داخل متصفحك مباشرة دون إرسال بياناتك الشخصية إلى خوادمنا.'
            : 'Our calculators do not require an account, and all calculations run directly in your browser without sending your personal inputs to our servers.'}
        </p>
        <p>
          {isAr
            ? 'قد نستخدم ملفات تعريف الارتباط (Cookies) وخدمات إعلانية مثل Google AdSense لعرض إعلانات ذات صلة، ولتحليل استخدام الموقع عبر أدوات مثل Google Analytics.'
            : 'We may use cookies and advertising services such as Google AdSense to show relevant ads, and analytics tools like Google Analytics to understand site usage.'}
        </p>
        <p>
          {isAr ? 'باستخدامك للموقع فإنك توافق على هذه السياسة. قد يتم تحديث هذه الصفحة من وقت لآخر.' : 'By using this site, you agree to this policy. This page may be updated periodically.'}
        </p>
      </div>
    </div>
  );
}
