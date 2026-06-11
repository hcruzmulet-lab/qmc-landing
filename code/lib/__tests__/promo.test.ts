import { describe, it, expect } from "vitest";
import { promo, isPromoActive, savingsLabel } from "@/lib/promo";

describe("promo config", () => {
  it("exposes promo and regular prices", () => {
    expect(promo.price).toBe("$10");
    expect(promo.regularPrice).toBe("$25");
  });

  it("isPromoActive is true when enabled", () => {
    expect(isPromoActive(promo)).toBe(true);
  });

  it("savingsLabel shows the discount amount", () => {
    expect(savingsLabel(promo)).toBe("Ahorras $15");
  });
});
