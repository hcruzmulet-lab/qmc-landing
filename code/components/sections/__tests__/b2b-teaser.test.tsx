import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { B2bTeaser } from "@/components/sections/b2b-teaser";

describe("B2bTeaser section", () => {
  it("muestra el título de empresas y un CTA de WhatsApp con mensaje B2B", () => {
    render(<B2bTeaser />);
    expect(screen.getByRole("heading", { name: /empresas/i })).toBeTruthy();
    const cta = screen.getByRole("link", { name: /whatsapp|convenio|empresa/i });
    const href = cta.getAttribute("href") ?? "";
    expect(href).toContain("wa.me/593958875624");
    expect(decodeURIComponent(href)).toMatch(/empresa/i);
  });
});
