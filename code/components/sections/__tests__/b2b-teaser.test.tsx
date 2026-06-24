import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { B2bTeaser } from "@/components/sections/b2b-teaser";
import { site } from "@/lib/site";

describe("B2bTeaser section", () => {
  it("renderiza la sección #empresas con encabezado y subcopy de convenios", () => {
    const { container } = render(<B2bTeaser />);
    expect(container.querySelector("section#empresas")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /equipo|cl[ií]nica/i })).toBeTruthy();
    expect(screen.getByText(/socio estrat[ée]gico de QMC/i)).toBeTruthy();
  });

  it("tiene un CTA de WhatsApp con mensaje B2B", () => {
    render(<B2bTeaser />);
    const cta = screen.getByRole("link", { name: /convenio|whatsapp|empresa/i });
    const href = cta.getAttribute("href") ?? "";
    expect(href).toContain(`wa.me/${site.whatsappE164}`);
    expect(decodeURIComponent(href)).toMatch(/empresa/i);
  });
});
