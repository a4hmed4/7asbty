export function GET() {
  const sellerAccount = process.env.ADSENSE_SELLER_ACCOUNT || '';
  const body = sellerAccount
    ? `google.com, ${sellerAccount}, DIRECT, f08c47fec0942fa0\n`
    : '# Add ADSENSE_SELLER_ACCOUNT=pub-0000000000000000 to enable ads.txt\n';

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
