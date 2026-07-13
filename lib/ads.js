export const ADSENSE = {
  enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true',
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  slots: {
    homeTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP || '',
    homeMiddle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MIDDLE || '',
    calculator: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CALCULATOR || '',
  },
};

export function isAdsenseReady(slot) {
  return ADSENSE.enabled && ADSENSE.client && slot;
}
