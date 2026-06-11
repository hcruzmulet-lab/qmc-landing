import { describe, it, expect } from "vitest";
import {
  buildWhatsAppUrl,
  buildSpecialtyMessage,
  buildSpecialtyWhatsAppUrl,
} from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me link with the E164 number and url-encoded message", () => {
    const url = buildWhatsAppUrl("Hola QMC, quiero mi consulta de $10");
    expect(url).toBe(
      "https://wa.me/593958875624?text=Hola%20QMC%2C%20quiero%20mi%20consulta%20de%20%2410"
    );
  });

  it("trims surrounding whitespace from the message", () => {
    const url = buildWhatsAppUrl("  hola  ");
    expect(url).toBe("https://wa.me/593958875624?text=hola");
  });
});

describe("buildSpecialtyMessage", () => {
  it("arma un mensaje pre-llenado con el nombre de la especialidad", () => {
    expect(buildSpecialtyMessage("Pediatría")).toBe(
      "Hola QMC, quiero agendar una cita de Pediatría."
    );
  });
});

describe("buildSpecialtyWhatsAppUrl", () => {
  it("compone el mensaje por especialidad dentro del deep-link wa.me codificado", () => {
    expect(buildSpecialtyWhatsAppUrl("Pediatría")).toBe(
      buildWhatsAppUrl(buildSpecialtyMessage("Pediatría"))
    );
  });
});
