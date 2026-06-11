import { describe, it, expect, vi, beforeEach } from "vitest";
import { trackLeadClick } from "@/lib/analytics";

describe("trackLeadClick", () => {
  beforeEach(() => {
    (window as any).fbq = vi.fn();
    (window as any).gtag = vi.fn();
  });

  it("fires Meta Pixel Lead event with the source", () => {
    trackLeadClick("hero");
    expect((window as any).fbq).toHaveBeenCalledWith("track", "Lead", { source: "hero" });
  });

  it("fires GA4 generate_lead event with the source", () => {
    trackLeadClick("hero");
    expect((window as any).gtag).toHaveBeenCalledWith("event", "generate_lead", { source: "hero" });
  });

  it("does not throw when trackers are absent", () => {
    delete (window as any).fbq;
    delete (window as any).gtag;
    expect(() => trackLeadClick("footer")).not.toThrow();
  });
});
