'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE, isAdsenseReady } from '../lib/ads';

export default function AdSlot({
  slot,
  label = 'Advertisement',
  className = '',
  format = 'auto',
  responsive = true,
}) {
  const pushed = useRef(false);
  const ready = isAdsenseReady(slot);

  useEffect(() => {
    if (!ready || pushed.current) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch (error) {
      pushed.current = false;
    }
  }, [ready]);

  if (!ready) {
    return (
      <div
        className={`no-print flex min-h-[90px] w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-900 ${className}`}
        data-ad-slot="disabled"
      >
        {label}
      </div>
    );
  }

  return (
    <div className={`no-print min-h-[90px] w-full overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE.client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
