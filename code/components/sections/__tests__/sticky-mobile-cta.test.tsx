import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StickyMobileCta } from "@/components/sections/sticky-mobile-cta";
import { site } from "@/lib/site";

describe("StickyMobileCta", () => {
  it("muestra un enlace de llamada y un CTA de WhatsApp", () => {
    render(<StickyMobileCta />);
    const tel = screen.getByRole("link", { name: /llamar/i });
    expect(tel.getAttribute("href")).toBe(`tel:${site.phoneE164}`);
    const wa = screen.getByRole("link", { name: /whatsapp/i });
    expect(wa.getAttribute("href")).toContain(`wa.me/${site.whatsappE164}`);
  });
});
