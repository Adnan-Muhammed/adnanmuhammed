// Lightweight analytics / event tracking helper
export function trackEvent(eventName, payload = {}) {
  try {
    if (typeof window !== 'undefined') {
      // Send event to Google Analytics (gtag.js)
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, payload);
      }
      if (import.meta.env.DEV) {
        console.log(`[Analytics Event] ${eventName}:`, payload);
      }
    }
  } catch {
    // Graceful no-op fallback
  }
}

export default trackEvent;
