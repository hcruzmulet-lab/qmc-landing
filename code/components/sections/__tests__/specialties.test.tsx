import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Specialties } from "@/components/sections/specialties";

describe("Specialties section", () => {
  it("renderiza el título y las 7 especialidades con enlaces a sus páginas", () => {
    render(<Specialties />);
    expect(screen.getByRole("heading", { name: /especialidades/i })).toBeTruthy();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/especialidades/pediatria");
    expect(hrefs).toContain("/especialidades/laboratorio-clinico");
    expect(links.length).toBeGreaterThanOrEqual(7);
  });
});
