'use client';

import { useEffect } from 'react';

export default function PageViewTracker({ locale, slug }) {
  useEffect(() => {
    fetch('/api/analytics/page-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale, slug, path: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [locale, slug]);

  return null;
}
