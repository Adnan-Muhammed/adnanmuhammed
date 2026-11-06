// Lightweight analytics / event tracking helper
export function trackEvent(eventName, payload = {}) {
  try {
    if (typeof window !== 'undefined') {
      // Check for Google Analytics or custom tag manager
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, payload);
      }
    }
  } catch {
    // Graceful no-op fallback
  }
}

export default trackEvent;
