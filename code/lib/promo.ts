export type Promo = {
  enabled: boolean;
  price: string;        // promotional price shown everywhere
  regularPrice: string; // struck-through anchor price
  reason: string;       // e.g. "por reapertura"
  validUntil: string;   // human-readable deadline
  scarcity: string;     // urgency line
};

// ── EDIT THE PROMO HERE (single source of truth) ──────────────
export const promo: Promo = {
  enabled: true,
  price: "$10",
  regularPrice: "$25",
  reason: "por reapertura",
  validUntil: "30 de junio",
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
