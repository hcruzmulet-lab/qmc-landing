import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

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
