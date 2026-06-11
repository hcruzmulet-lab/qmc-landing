export type Promo = {
  enabled: boolean;
  price: string;        // promotional price shown everywhere
  regularPrice: string; // struck-through anchor price
  reason: string;       // e.g. "por reapertura"
  validUntil: string;   // human-readable deadline
  validUntilISO: string; // ISO 8601 deadline for countdown timer
  scarcity: string;     // urgency line
};

// ── EDIT THE PROMO HERE (single source of truth) ──────────────
export const promo: Promo = {
  enabled: true,
  price: "$10",
  regularPrice: "$25",
  reason: "por reapertura",
  validUntil: "30 de junio",
  validUntilISO: "2026-06-30T23:59:59-05:00",
  scarcity: "Cupos limitados por semana",
};
// ──────────────────────────────────────────────────────────────

export function isPromoActive(p: Promo): boolean {
  return p.enabled;
}

export function savingsLabel(p: Promo): string {
  const toNum = (s: string) => Number(s.replace(/[^0-9.]/g, ""));
  const diff = toNum(p.regularPrice) - toNum(p.price);
  return `Ahorras $${diff}`;
}
