import { Stethoscope, BadgePercent, Zap } from "lucide-react";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";
import { BorderBeam } from "@/components/ui/border-beam";

// Qué incluye el convenio — íconos distintos por beneficio (no checklist plano).
const incluye = [
  {
    icon: Stethoscope,
    title: "Chequeos ocupacionales",
    desc: "Evaluaciones médicas para tu personal, coordinadas en bloque.",
  },
  {
    icon: BadgePercent,
    title: "Tarifas corporativas",
    desc: "Atención preventiva con precios pensados para tu nómina.",
  },
  {
    icon: Zap,
    title: "Coordinación ágil",
    desc: "Un canal directo por WhatsApp para agendar a tu equipo.",
  },
];

const sectores = ["Oficinas", "Fábricas", "Retail", "PYMES"];

export function B2bTeaser() {
  return (
    <section id="empresas" className="relative overflow-hidden bg-[#0C2545] text-white">
      {/* Foto de fondo — equipo corporativo con skyline de Quito */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/empresas.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-right"
      />
      {/* Overlay navy: izquierda sólida para el titular, revela la escena a la derecha */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,37,69,0.70) 0%, rgba(16,49,88,0.86) 100%)," +
            "linear-gradient(100deg, #0C2545 0%, rgba(12,37,69,0.80) 42%, rgba(12,37,69,0.22) 100%)",
        }}
      />
      {/* Glows de marca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(760px 420px at 88% 0%, rgba(43,212,230,0.16), transparent 60%)," +
            "radial-gradient(760px 520px at 0% 100%, rgba(33,116,153,0.26), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
        style={{ maskImage: "radial-gradient(circle at 60% 38%, #000 32%, transparent 80%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Mensaje + CTA */}
          <Reveal variant="left">
            <h2 className="font-display text-4xl font-bold leading-[1.02] [text-wrap:balance] sm:text-6xl">
              La salud de tu equipo,
              <br />
              en una sola clínica
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">
              Convenios para empresas a la medida: chequeos ocupacionales y atención
              preventiva con tarifas corporativas, coordinados por un solo canal.
            </p>

            <div className="mt-8">
              <CtaButton
                message="Hola QMC, represento a una empresa y quiero información sobre convenios y chequeos ocupacionales."
                source="b2b"
                label="Solicitar convenio"
              />
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {sectores.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white/85"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Panel: qué incluye — objeto focal con luz de borde */}
          <Reveal variant="right" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0C2545] shadow-2xl">
              <BorderBeam size={300} duration={11} colorFrom="#2BD4E6" colorTo="#6FB0CE" />
              <p className="eyebrow px-6 pt-6 text-[var(--color-neutral)]">
                Qué incluye el convenio
              </p>
              <ul className="mt-2 divide-y divide-white/10">
                {incluye.map((b) => {
                  const Icon = b.icon;
                  return (
                    <li
                      key={b.title}
                      className="flex items-start gap-4 px-6 py-5 transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--color-aqua)]/10 text-[var(--color-aqua)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold text-white">
                          {b.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-white/70">
                          {b.desc}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
