import { describe, it, expect } from "vitest";
import { doctors, getDoctorsForSpecialty, type Doctor } from "@/lib/doctors";

describe("doctors data", () => {
  it("exporta un arreglo de médicos (puede iniciar vacío)", () => {
    expect(Array.isArray(doctors)).toBe(true);
  });

  it("getDoctorsForSpecialty filtra por slug de especialidad", () => {
    const fixtures: Doctor[] = [
      { id: "d1", nombre: "Dra. A", foto: "/doctors/a.jpg", credenciales: "Pediatra", especialidades: ["pediatria"], bio: "Bio A" },
      { id: "d2", nombre: "Dr. B", foto: "/doctors/b.jpg", credenciales: "Traumatólogo", especialidades: ["traumatologia"], bio: "Bio B" },
    ];
    expect(getDoctorsForSpecialty("pediatria", fixtures)).toHaveLength(1);
    expect(getDoctorsForSpecialty("pediatria", fixtures)[0].id).toBe("d1");
    expect(getDoctorsForSpecialty("cardiologia", fixtures)).toHaveLength(0);
  });

  it("getDoctorsForSpecialty usa el arreglo global por defecto", () => {
    expect(Array.isArray(getDoctorsForSpecialty("pediatria"))).toBe(true);
  });
});
