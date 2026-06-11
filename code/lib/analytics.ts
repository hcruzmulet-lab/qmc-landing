type Trackers = {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

// Fires a lead-conversion event on every WhatsApp CTA click.
// `source` identifies which CTA fired it (hero, offer, services, footer, fab).
export function trackLeadClick(source: string): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as Trackers;
  try {
    w.fbq?.("track", "Lead", { source });
    w.gtag?.("event", "generate_lead", { source });
  } catch {
    // never let analytics break a real click-through
  }
}
