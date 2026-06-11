import { Check } from "lucide-react";
import { promo, savingsLabel } from "@/lib/promo";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";

const includes = [
  "Revisión de oídos",
  "Revisión de garganta",
  "Fondo de ojo",
  "Control de signos vitales",
];

export function Offer() {
  return (
    <section id="oferta" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <Reveal>
      <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--color-border)] bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-md">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-foreground)]">
          ¿Qué incluye tu consulta integral?
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {includes.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[var(--color-foreground)]">
              <Check className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="tabular-nums text-3xl font-bold text-[var(--color-accent)]">{promo.price}</span>
            <span className="tabular-nums ml-2 text-lg text-[var(--color-muted-foreground)] line-through">{promo.regularPrice}</span>
            <p className="text-sm font-medium text-[var(--color-accent)]">{savingsLabel(promo)}</p>
          </div>
          <CtaButton
            message={`Hola QMC, quiero mi consulta integral de ${promo.price}. ¿Qué horarios tienen?`}
            source="offer"
          />
        </div>
      </div>
      </Reveal>
    </section>
  );
}
