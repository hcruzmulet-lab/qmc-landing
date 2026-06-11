import { Building2, Check } from "lucide-react";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";

const beneficios = [
  "Chequeos ocupacionales para tu personal",
  "Atención preventiva con tarifas corporativas",
  "Coordinación ágil por WhatsApp",
];

export function B2bTeaser() {
  return (
    <section id="empresas" className="bg-[var(--color-primary)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal className="space-y-4">
            <Building2 className="h-9 w-9 text-[var(--color-secondary)]" aria-hidden="true" />
            <h2 className="font-[var(--font-heading)] text-3xl font-bold">
              Convenios para empresas
            </h2>
            <p className="text-white/80">
              Cuida la salud de tu equipo con chequeos ocupacionales y atención preventiva.
              Diseñamos un convenio a la medida de tu empresa.
            </p>
            <ul className="space-y-2">
              {beneficios.map((b) => (
                <li key={b} className="flex items-start gap-2 text-white/90">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-secondary)]"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:justify-self-end">
            <CtaButton
              message="Hola QMC, represento a una empresa y quiero información sobre convenios y chequeos ocupacionales."
              source="b2b"
              label="Solicitar convenio empresarial"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
