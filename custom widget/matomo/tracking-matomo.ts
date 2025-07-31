// tracking-matomo.ts

let isMatomoLoaded = false;

/**
 * Initialisiert das Matomo-Tracking, ohne es zu starten.
 * Muss vor der Zustimmung geladen werden.
 */
export function loadMatomoAndTrack(): void {
  if (isMatomoLoaded) return;
  isMatomoLoaded = true;

  // Matomo globales Tracking-Array
  (window as any)._paq = (window as any)._paq || [];
  const _paq = (window as any)._paq;

  // Warte auf Cookie-Zustimmung
  _paq.push(['requireCookieConsent']);
  _paq.push(['enableLinkTracking']);
  _paq.push(['setTrackerUrl', 'https://dashjoin.matomo.cloud/matomo.php']);
  _paq.push(['setSiteId', '1']);

  // Matomo Script dynamisch einfügen
  const d = document;
  const g = d.createElement('script');
  const s = d.getElementsByTagName('script')[0];
  g.async = true;
  g.src = 'https://cdn.matomo.cloud/dashjoin.matomo.cloud/matomo.js';
  s.parentNode?.insertBefore(g, s);
}

/**
 * Gibt Matomo die Zustimmung zur Cookie-Verwendung
 * und startet das Tracking (PageView).
 */
export function activateMatomo(): void {
  const _paq = (window as any)._paq;
  if (!_paq) return;

  _paq.push(['setCookieConsentGiven']);
  _paq.push(['rememberCookieConsentGiven']);
  _paq.push(['trackPageView']);
}
