// Lightweight analytics / event tracking helper
export function trackEvent(eventName, payload = {}) {
  try {
    if (typeof window !== 'undefined') {
        // Robust gtag dispatcher with dataLayer fallback
        const gtag =
          typeof window.gtag === 'function'
            ? window.gtag
            : Array.isArray(window.dataLayer)
              ? function () {
                window.dataLayer.push(arguments);
              }
              : null;

        if (gtag) {
          gtag('event', eventName, payload);
        }

          if (import.meta.env?.DEV) {
            console.log(`[Analytics Event] ${eventName}:`, payload);
          }
        }
      } catch {
        // Graceful no-op fallback
      }
    }

    export default trackEvent;
