'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection({ title, items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-6" aria-label={title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {items.map((item, i) => (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between px-4 py-4 text-left font-medium"
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              aria-expanded={openIndex === i}
            >
              <span>{item.q}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <p className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
