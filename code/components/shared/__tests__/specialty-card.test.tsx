import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpecialtyCard } from "@/components/shared/specialty-card";
import { getSpecialtyBySlug } from "@/lib/specialties";

describe("SpecialtyCard", () => {
  it("muestra nombre, descripción corta, precio y enlace a la página de la especialidad", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(<SpecialtyCard specialty={pediatria} />);

    expect(screen.getByText("Pediatría")).toBeTruthy();
    expect(screen.getByText(pediatria.descCorta)).toBeTruthy();
    expect(screen.getByText(/\$25/)).toBeTruthy();

    const link = screen.getByRole("link", { name: /pediatría/i });
    expect(link.getAttribute("href")).toBe("/especialidades/pediatria");
  });
});
