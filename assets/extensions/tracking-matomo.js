//<!-- Matomo -->
//<script>
/*  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  /*_paq.push(['trackPageView']);
  _paq.push(['requireCookieConsent']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://dashjoin.matomo.cloud/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://cdn.matomo.cloud/dashjoin.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
  })();
//</script>
//<!-- End Matomo Code -->

// tracking-matomo.js

let isMatomoLoaded = false;

export function loadMatomo() {
  if (isMatomoLoaded) return;
  isMatomoLoaded = true;

  window._paq = window._paq || [];
  const _paq = window._paq;

  // Nur Cookies speichern bei aktiver Zustimmung
  _paq.push(['requireCookieConsent']);
  _paq.push(['enableLinkTracking']);
  _paq.push(['setTrackerUrl', 'https://dashjoin.matomo.cloud/matomo.php']);
  _paq.push(['setSiteId', '1']);

  // Tracking-Skript laden
  const d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
  g.async = true;
  g.src = 'https://cdn.matomo.cloud/dashjoin.matomo.cloud/matomo.js';
  s.parentNode.insertBefore(g, s);
}

export function activateTracking() {
  if (window._paq) {
    window._paq.push(['setCookieConsentGiven']);
    window._paq.push(['rememberCookieConsentGiven']);
  }
}*/
// tracking-matomo.js

let isMatomoLoaded = false;

export function loadMatomoAndTrack() {
  if (isMatomoLoaded) return;
  isMatomoLoaded = true;

  window._paq = window._paq || [];
  const _paq = window._paq;

  _paq.push(['requireCookieConsent']); // Tracking blockiert bis Zustimmung
  _paq.push(['enableLinkTracking']);
  _paq.push(['setTrackerUrl', 'https://dashjoin.matomo.cloud/matomo.php']);
  _paq.push(['setSiteId', '1']);

  // Skript laden
  const d = document;
  const g = d.createElement('script');
  const s = d.getElementsByTagName('script')[0];
  g.async = true;
  g.src = 'https://cdn.matomo.cloud/dashjoin.matomo.cloud/matomo.js';
  s.parentNode.insertBefore(g, s);
}

export function activateMatomo() {
  if (window._paq) {
    window._paq.push(['setCookieConsentGiven']);
    window._paq.push(['rememberCookieConsentGiven']);
    window._paq.push(['trackPageView']); // jetzt erst tracken!
  }
}


