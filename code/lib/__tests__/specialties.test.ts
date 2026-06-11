import { describe, it, expect } from "vitest";
import {
  specialties,
  getSpecialtyBySlug,
  specialtySlugs,
} from "@/lib/specialties";

describe("specialties data", () => {
  it("contiene exactamente las 7 especialidades del alcance", () => {
    expect(specialties).toHaveLength(7);
    expect(specialtySlugs()).toEqual([
      "pediatria",
      "medicina-general",
      "gastroenterologia",
      "traumatologia",
      "fisiatria",
      "rehabilitacion",
      "laboratorio-clinico",
    ]);
  });

  it("cada especialidad tiene los campos requeridos no vacíos", () => {
    for (const s of specialties) {
      expect(s.slug).toBeTruthy();
      expect(s.nombre).toBeTruthy();
      expect(s.descCorta).toBeTruthy();
      expect(s.descLarga).toBeTruthy();
      expect(s.precio).toBeTruthy();
      expect(s.queTratamos.length).toBeGreaterThanOrEqual(4);
      expect(s.faqs.length).toBeGreaterThanOrEqual(2);
      expect(s.icon).toBeTruthy();
    }
  });

  it("getSpecialtyBySlug devuelve la especialidad correcta o undefined", () => {
    expect(getSpecialtyBySlug("pediatria")?.nombre).toBe("Pediatría");
    expect(getSpecialtyBySlug("no-existe")).toBeUndefined();
  });
});
