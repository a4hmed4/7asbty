'use client';
import { useState } from 'react';
import { Copy, Check, Share2, Printer } from 'lucide-react';
import { SITE } from '../lib/site';

export default function ResultActions({ resultText, dict, printDetails = [] }) {
  const [copied, setCopied] = useState(false);

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      /* clipboard unavailable — no-op */
    }
  };

  const handleShare = async () => {
    const shareData = { title: document.title, text: resultText, url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (e) { /* user cancelled */ }
    } else {
      handleCopy();
    }
  };

  const handlePrint = () => {
    const appName = dict.brand;
    const pageUrl = window.location.href;
    const details = Array.isArray(printDetails) ? printDetails.filter(Boolean) : [printDetails].filter(Boolean);
    const detailsTitle = dict.brand === 'حاسبتي' ? 'تفاصيل العملية الحسابية' : 'Calculation Details';
    const detailsMarkup = details.length > 0
      ? `
        <section class="details">
          <h2>${escapeHtml(detailsTitle)}</h2>
          <ul>
            ${details.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </section>
      `
      : '';
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>${escapeHtml(appName)}</title>
          <style>
            @page { size: A4; margin: 18mm; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              min-height: 100vh;
              color: #0f172a;
              font-family: Arial, sans-serif;
              position: relative;
            }
            .watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              width: 140%;
              transform: translate(-50%, -50%) rotate(-28deg);
              color: rgba(15, 23, 42, 0.08);
              font-size: 44px;
              font-weight: 800;
              line-height: 1.5;
              text-align: center;
              white-space: nowrap;
              z-index: 0;
            }
            .content {
              position: relative;
              z-index: 1;
              min-height: calc(100vh - 36mm);
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 18px;
              text-align: center;
            }
            .brand { font-size: 28px; font-weight: 800; }
            .result { font-size: 22px; line-height: 1.7; white-space: pre-wrap; }
            .details {
              width: min(100%, 680px);
              margin: 0 auto;
              border-top: 1px solid #cbd5e1;
              padding-top: 16px;
              text-align: start;
            }
            .details h2 {
              margin: 0 0 10px;
              font-size: 16px;
            }
            .details ul {
              margin: 0;
              padding-inline-start: 22px;
              line-height: 1.8;
              font-size: 14px;
            }
            .link { color: #2563eb; font-size: 14px; word-break: break-all; }
          </style>
        </head>
        <body>
          <div class="watermark">${escapeHtml(appName)} • ${escapeHtml(SITE.url)}</div>
          <main class="content">
            <div class="brand">${escapeHtml(appName)}</div>
            <div class="result">${escapeHtml(resultText)}</div>
            ${detailsMarkup}
            <div class="link">${escapeHtml(pageUrl)}</div>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="no-print mt-4 flex flex-wrap gap-2">
      <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        {copied ? dict.common.copied : dict.common.copyResult}
      </button>
      <button onClick={handleShare} className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
        <Share2 className="h-4 w-4" /> {dict.common.share}
      </button>
      <button onClick={handlePrint} className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
        <Printer className="h-4 w-4" /> {dict.common.print}
      </button>
    </div>
  );
}
