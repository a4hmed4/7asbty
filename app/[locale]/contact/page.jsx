import { getDictionary } from '../../../lib/i18n';

export async function generateMetadata({ params: { locale } }) {
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'تواصل معنا' : 'Contact Us',
    description: isAr ? 'تواصل مع فريق حاسبتي' : 'Get in touch with the 7asbty team.',
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default function ContactPage({ params: { locale } }) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  return (
    <div className="mx-auto max-w-xl px-4 py-12 md:px-6">
      <h1 className="mb-4 text-3xl font-extrabold">{isAr ? 'تواصل معنا' : 'Contact Us'}</h1>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        {isAr ? 'لديك اقتراح لحاسبة جديدة أو وجدت خطأ؟ راسلنا وسنقوم بالرد في أقرب وقت.' : 'Have a suggestion for a new calculator or found a bug? Send us a message and we\'ll get back to you.'}
      </p>
      <form className="space-y-4">
        <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" placeholder={isAr ? 'الاسم' : 'Name'} />
        <input type="email" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} />
        <textarea rows={5} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800" placeholder={isAr ? 'رسالتك' : 'Your message'} />
        <button type="submit" className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
          {isAr ? 'إرسال' : 'Send Message'}
        </button>
      </form>
      <p className="mt-4 text-xs text-slate-400">
        {isAr ? 'هذا النموذج تجريبي — اربطه بخدمة بريد أو API خاص بك عند النشر.' : 'This form is a placeholder — connect it to an email service or your own API before going live.'}
      </p>
    </div>
  );
}
