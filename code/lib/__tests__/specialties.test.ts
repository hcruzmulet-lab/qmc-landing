import { describe, it, expect } from "vitest";
import {
  specialties,
  getSpecialtyBySlug,
  specialtySlugs,
  principalSpecialties,
} from "@/lib/specialties";

describe("specialties data", () => {
  it("tiene una cartera amplia y slugs únicos", () => {
    expect(specialties.length).toBeGreaterThanOrEqual(20);
    const slugs = specialtySlugs();
    expect(new Set(slugs).size).toBe(slugs.length); // sin duplicados
  });

  it("destaca entre 4 y 8 especialidades principales", () => {
    const principales = principalSpecialties();
    expect(principales.length).toBeGreaterThanOrEqual(4);
    expect(principales.length).toBeLessThanOrEqual(8);
  });

  it("cada especialidad tiene los campos requeridos no vacíos", () => {
    for (const s of specialties) {
      expect(s.slug).toBeTruthy();
      expect(s.nombre).toBeTruthy();
      expect(s.categoria).toBeTruthy();
      expect(s.descCorta).toBeTruthy();
      expect(s.descLarga).toBeTruthy();
      expect(s.queTratamos.length).toBeGreaterThanOrEqual(4);
      if (s.faqs) expect(s.faqs.length).toBeGreaterThanOrEqual(2);
      expect(s.icon).toBeTruthy();
    }
  });

  it("getSpecialtyBySlug devuelve la especialidad correcta o undefined", () => {
    expect(getSpecialtyBySlug("pediatria")?.nombre).toBe("Pediatría");
    expect(getSpecialtyBySlug("no-existe")).toBeUndefined();
  });
});
