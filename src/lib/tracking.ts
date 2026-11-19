/**
 * Módulo de medición unificada para Google Tag Manager, GA4, Meta Pixel y TikTok Ads
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    ttq?: {
      track: (eventName: string, params?: Record<string, any>) => void;
      page: () => void;
    };
  }
}

export interface TrackingEventParams {
  eventName: string;
  category?: string;
  label?: string;
  value?: number;
  currency?: string;
  jobId?: string;
  jobTitle?: string;
  leadType?: string;
  [key: string]: any;
}

export const trackEvent = ({
  eventName,
  category = 'General',
  label,
  value,
  currency = 'USD',
  jobId,
  jobTitle,
  leadType,
  ...extra
}: TrackingEventParams) => {
  const eventData = {
    event: eventName,
    event_category: category,
    event_label: label,
    value,
    currency,
    job_id: jobId,
    job_title: jobTitle,
    lead_type: leadType,
    ...extra,
    timestamp: new Date().toISOString()
  };

  // 1. GTM DataLayer
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);

    // 2. Google Analytics 4 (gtag)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        event_category: category,
        event_label: label,
        value,
        currency,
        ...extra
      });
    }

    // 3. Meta Ads Pixel (fbq)
    if (typeof window.fbq === 'function') {
      if (eventName === 'generate_lead' || eventName === 'contact_submit') {
        window.fbq('track', 'Lead', { content_name: label, value, currency });
      } else if (eventName === 'apply_job') {
        window.fbq('track', 'SubmitApplication', { content_name: jobTitle, content_category: jobId });
      } else if (eventName === 'whatsapp_click') {
        window.fbq('track', 'Contact', { content_name: 'WhatsApp Click' });
      } else {
        window.fbq('trackCustom', eventName, eventData);
      }
    }

    // 4. TikTok Ads Pixel (ttq)
    if (typeof window.ttq?.track === 'function') {
      if (eventName === 'generate_lead' || eventName === 'contact_submit') {
        window.ttq.track('SubmitForm', { contents: [{ content_name: label }] });
      } else if (eventName === 'apply_job') {
        window.ttq.track('CompleteRegistration', { contents: [{ content_name: jobTitle }] });
      } else if (eventName === 'whatsapp_click') {
        window.ttq.track('ClickButton', { contents: [{ content_name: 'WhatsApp' }] });
      }
    }
  }
};
