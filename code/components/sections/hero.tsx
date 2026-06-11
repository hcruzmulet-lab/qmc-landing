import { Clock } from "lucide-react";
import { promo, savingsLabel } from "@/lib/promo";
import { CtaButton } from "@/components/sections/cta-button";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-muted)] px-3 py-1 text-sm font-medium text-[var(--color-primary)]">
            <Clock className="h-4 w-4" aria-hidden="true" />
            Promo {promo.reason} · válida hasta {promo.validUntil}
          </span>
          <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-bold leading-tight text-[var(--color-foreground)] sm:text-5xl">
            Chequeo integral por{" "}
            <span className="text-[var(--color-accent)]">{promo.price}</span>{" "}
            <span className="text-2xl font-normal text-[var(--color-muted-foreground)] line-through">
              {promo.regularPrice}
            </span>
          </h1>
          <p className="mt-4 text-lg text-[var(--color-muted-foreground)]">
            Incluye revisión de oídos, garganta, fondo de ojo y control de signos vitales.
            Atención cercana y preventiva en el norte de Quito.
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--color-accent)]">
            {savingsLabel(promo)} · {promo.scarcity}
          </p>
          <div className="mt-6">
            <CtaButton
              message={`Hola QMC, quiero agendar mi consulta integral de ${promo.price}`}
              source="hero"
            />
          </div>
        </div>
        <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)]" aria-hidden="true" />
      </div>
    </section>
  );
}
