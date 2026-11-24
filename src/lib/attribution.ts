export interface MarketingAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  ttclid?: string;
}

const ATTRIBUTION_KEYS: Array<keyof MarketingAttribution> = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid', 'ttclid'
];

export function getMarketingAttribution(): MarketingAttribution {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const stored = window.sessionStorage.getItem('nexo_marketing_attribution');
  let attribution: MarketingAttribution = {};
  if (stored) {
    try {
      attribution = JSON.parse(stored) as MarketingAttribution;
    } catch {
      window.sessionStorage.removeItem('nexo_marketing_attribution');
    }
  }

  ATTRIBUTION_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) attribution[key] = value.slice(0, 200);
  });

  if (Object.keys(attribution).length > 0) {
    window.sessionStorage.setItem('nexo_marketing_attribution', JSON.stringify(attribution));
  }

  return attribution;
}
