import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

export function initAnalytics() {
  const hasKey = Boolean(POSTHOG_KEY);
  const isProduction = import.meta.env.PROD;

  if (hasKey) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: isProduction,
      persistence: 'localStorage',
    });
  }
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  posthog.capture(eventName, properties);
}

export function identifyUser(userId: string, traits?: Record<string, unknown>) {
  posthog.identify(userId, traits);
}

export function resetUser() {
  posthog.reset();
}

export { posthog };
