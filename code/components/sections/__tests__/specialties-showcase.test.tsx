import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpecialtiesShowcase } from "@/components/sections/specialties-showcase";

describe("SpecialtiesShowcase section", () => {
  it("renderiza el título y enlaces a las páginas de especialidad", () => {
    render(<SpecialtiesShowcase />);
    expect(screen.getByRole("heading", { name: /especialidades/i })).toBeTruthy();
    const hrefs = screen.getAllByRole("link").map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/especialidades/pediatria");
    expect(hrefs).toContain("/especialidades/laboratorio-clinico");
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(7);
  });
});
