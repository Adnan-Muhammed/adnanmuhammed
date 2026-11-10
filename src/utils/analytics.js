import { track as trackVercel } from '@vercel/analytics';

const MAX_VERCEL_LEN = 255;

function toVercelPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return undefined;
  }

  const sanitized = {};
  let hasEntries = false;

  for (const [rawKey, value] of Object.entries(payload)) {
    const key = String(rawKey).slice(0, MAX_VERCEL_LEN);
    if (!key || value === undefined) continue;

    if (typeof value === 'string') {
      sanitized[key] = value.slice(0, MAX_VERCEL_LEN);
      hasEntries = true;
    } else if (
      (typeof value === 'number' && Number.isFinite(value)) ||
      typeof value === 'boolean' ||
      value === null
    ) {
      sanitized[key] = value;
      hasEntries = true;
    }
  }

  return hasEntries ? sanitized : undefined;
}

// Lightweight dual-analytics dispatcher (GA4 + Vercel Web Analytics)
export function trackEvent(eventName, payload = {}) {
  try {
    if (typeof window === 'undefined' || !eventName) return;

    // 1. Google Analytics 4 (gtag dispatcher with dataLayer fallback)
    try {
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
    } catch {
      // Ignore GA4 dispatch failures
    }

    // 2. Vercel Web Analytics custom event
    try {
      const safeName = String(eventName).slice(0, MAX_VERCEL_LEN);
      const vercelPayload = toVercelPayload(payload);
      if (vercelPayload) {
        trackVercel(safeName, vercelPayload);
      } else {
        trackVercel(safeName);
      }
    } catch {
      // Ignore Vercel dispatch failures
    }

    if (import.meta.env?.DEV) {
      console.log(`[Analytics Event] ${eventName}:`, payload);
    }
  } catch {
    // Graceful no-op fallback
  }
}

export default trackEvent;
