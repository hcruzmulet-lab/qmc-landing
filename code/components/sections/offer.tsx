import { Check } from "lucide-react";
import { promo, savingsLabel } from "@/lib/promo";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";
import { BorderBeam } from "@/components/ui/border-beam";

const includes = [
  "Revisión de oídos",
  "Revisión de garganta",
  "Fondo de ojo",
  "Control de signos vitales",
];

export function Offer() {
  return (
    <section
      id="oferta"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(720px 380px at 85% 0%, rgba(43,212,230,0.16), transparent 60%)," +
          "radial-gradient(720px 480px at 0% 100%, rgba(33,116,153,0.26), transparent 60%)," +
          "linear-gradient(180deg, #0C2545 0%, #103158 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-50"
        style={{ maskImage: "radial-gradient(circle at 50% 50%, #000 35%, transparent 80%)" }}
      />
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <Reveal>
          <div className="relative grid overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-background)] shadow-2xl sm:grid-cols-[1.4fr_1fr]">
            <BorderBeam size={300} duration={11} />
            <BorderBeam size={300} duration={11} delay={5.5} colorFrom="#059669" colorTo="#2BD4E6" />
            {/* Contenido */}
            <div className="p-8 sm:p-10">
              <h2 className="font-display text-2xl font-bold leading-[1.15] text-[var(--color-primary)] sm:text-3xl">
                Una revisión completa, en una sola visita
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {includes.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[var(--color-foreground)]">
                    <Check className="h-5 w-5 shrink-0 text-[var(--color-secondary)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Precio + CTA */}
            <div className="flex flex-col justify-center gap-4 border-t border-[var(--color-border)] bg-[var(--color-muted)] p-8 sm:border-l sm:border-t-0 sm:p-10">
              <div>
                <div className="flex items-end gap-2">
                  <span className="font-display text-4xl font-bold tabular-nums text-[var(--color-primary)]">
                    {promo.price}
                  </span>
                  <span className="pb-1 text-lg tabular-nums text-[var(--color-muted-foreground)] line-through">
                    {promo.regularPrice}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-[var(--color-secondary)]">
                  {savingsLabel(promo)} · promo de reapertura
                </p>
              </div>
              <CtaButton
                message={`Hola QMC, quiero mi consulta integral de ${promo.price}. ¿Qué horarios tienen?`}
                source="offer"
                className="w-full"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
