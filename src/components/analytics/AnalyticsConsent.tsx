import { useEffect, useState } from 'react';
import { Check, Cookie, ShieldCheck, X } from 'lucide-react';
import { trackEvent, trackOperationalEvent } from '../../lib/tracking';

const CONSENT_KEY = 'nexo-analytics-consent';
const GTM_ID = 'GTM-PX6M5QSS';
const GA4_ID = 'G-T4ZC2SJXHS';

export function hasAnalyticsConsent(): boolean {
  return typeof window !== 'undefined' && window.localStorage.getItem(CONSENT_KEY) === 'granted';
}

function loadAnalyticsTags() {
  if (document.getElementById('nexo-gtm-script')) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  window.gtag = (...args: any[]) => window.dataLayer?.push(args);
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID, { anonymize_ip: true });

  const gtag = document.createElement('script');
  gtag.id = 'nexo-ga4-script';
  gtag.async = true;
  gtag.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(gtag);

  const gtm = document.createElement('script');
  gtm.id = 'nexo-gtm-script';
  gtm.async = true;
  gtm.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(gtm);
}

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<'unknown' | 'granted' | 'denied'>('unknown');

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === 'granted') {
      setChoice('granted');
      loadAnalyticsTags();
    } else if (saved === 'denied') {
      setChoice('denied');
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(CONSENT_KEY, 'granted');
    setChoice('granted');
    loadAnalyticsTags();
    trackEvent({ eventName: 'analytics_consent_granted', category: 'Consentimiento', label: 'Banner de cookies' });
  };

  const reject = () => {
    window.localStorage.setItem(CONSENT_KEY, 'denied');
    setChoice('denied');
    trackOperationalEvent({ eventName: 'analytics_consent_denied', category: 'Consentimiento', label: 'Banner de cookies' });
  };

  if (choice !== 'unknown') return null;

  return (
    <section className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-2xl border border-cyan-400/30 bg-slate-950/95 p-4 text-slate-100 shadow-2xl backdrop-blur-xl sm:bottom-5 sm:p-5" aria-label="Preferencias de medición">
      <div className="flex gap-3">
        <div className="mt-0.5 rounded-xl bg-cyan-400/15 p-2 text-cyan-300"><Cookie className="h-5 w-5" /></div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold">¿Nos ayudas a mejorar Nexo Talento?</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">Registramos de forma anónima el volumen de visitas y acciones de contacto para operar el sitio. Con tu permiso activamos además Google Analytics y etiquetas publicitarias. No enviamos tus datos de contacto a Analytics.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={reject} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-600 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800"><X className="h-3.5 w-3.5" />Rechazar</button>
            <button type="button" onClick={accept} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-cyan-400 px-3 py-2 text-xs font-extrabold text-slate-950 hover:bg-cyan-300"><Check className="h-3.5 w-3.5" />Aceptar medición</button>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400"><ShieldCheck className="h-3 w-3" />Puedes seguir navegando aunque rechaces la medición.</p>
        </div>
      </div>
    </section>
  );
}
