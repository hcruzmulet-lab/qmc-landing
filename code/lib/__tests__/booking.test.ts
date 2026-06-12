import { describe, it, expect } from "vitest";
import {
  CAL_USERNAME,
  BOOKING_NAMESPACE,
  calLinkFor,
  isBookable,
  bookableSpecialties,
} from "@/lib/booking";
import { specialties, getSpecialtyBySlug } from "@/lib/specialties";

describe("calLinkFor", () => {
  it("arma '<username>/<slug>' usando el slug de la especialidad", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    expect(calLinkFor(pediatria)).toBe(`${CAL_USERNAME}/pediatria`);
  });

  it("prefiere calEventSlug cuando está presente", () => {
    expect(calLinkFor({ slug: "pediatria", calEventSlug: "peques" })).toBe(
      `${CAL_USERNAME}/peques`
    );
  });
});

describe("isBookable / bookableSpecialties", () => {
  it("por defecto todas las especialidades son agendables", () => {
    expect(bookableSpecialties()).toHaveLength(specialties.length);
    expect(specialties.every((s) => isBookable(s.slug))).toBe(true);
  });

  it("preserva el orden del directorio de especialidades", () => {
    expect(bookableSpecialties().map((s) => s.slug)).toEqual(
      specialties.map((s) => s.slug)
    );
  });
});

describe("BOOKING_NAMESPACE", () => {
  it("es un string estable y no vacío", () => {
    expect(BOOKING_NAMESPACE).toBe("agendar");
  });
});
