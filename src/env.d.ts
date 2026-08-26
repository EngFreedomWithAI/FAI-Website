/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA4_ID?: string;
  readonly PUBLIC_POSTHOG_KEY?: string;
  readonly PUBLIC_POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    /**
     * Sends an event to whichever analytics tools are live (GA4, PostHog).
     * Defined by src/components/Analytics.astro, and absent when no analytics
     * IDs are configured. Always call it optionally: `window.faiTrack?.(...)`.
     */
    faiTrack?: (name: string, props?: Record<string, unknown>) => void;
    posthog?: Record<string, any>;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export {};
