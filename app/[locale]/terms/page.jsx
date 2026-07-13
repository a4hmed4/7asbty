export async function generateMetadata({ params: { locale } }) {
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'شروط الاستخدام' : 'Terms of Service',
    alternates: { canonical: `/${locale}/terms` },
  };
}

export default function TermsPage({ params: { locale } }) {
  const isAr = locale === 'ar';
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="mb-4 text-3xl font-extrabold">{isAr ? 'شروط الاستخدام' : 'Terms of Service'}</h1>
      <div className="space-y-4 text-slate-600 dark:text-slate-400">
        <p>
          {isAr
            ? 'تُقدَّم جميع الحاسبات على هذا الموقع لأغراض إعلامية وتقديرية فقط، ولا تُعد استشارة مالية أو صحية أو قانونية.'
            : 'All calculators on this site are provided for informational and estimation purposes only and do not constitute financial, health, or legal advice.'}
        </p>
        <p>
          {isAr ? 'نسعى لدقة النتائج لكننا لا نضمن خلوها التام من الأخطاء. يتحمل المستخدم مسؤولية التحقق من أي قرار مهم.' : 'We strive for accuracy but do not guarantee results are completely error-free. Users are responsible for verifying any important decision independently.'}
        </p>
        <p>
          {isAr ? 'باستخدامك للموقع فإنك توافق على هذه الشروط، وقد يتم تحديثها من وقت لآخر.' : 'By using this site, you agree to these terms, which may be updated from time to time.'}
        </p>
      </div>
    </div>
  );
}
