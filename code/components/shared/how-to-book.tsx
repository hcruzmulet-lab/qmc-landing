import { MessageCircle, CalendarCheck, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const pasos = [
  {
    icon: MessageCircle,
    titulo: "Escríbenos por WhatsApp",
    desc: "Toca cualquier botón verde y se abre el chat con un mensaje listo.",
  },
  {
    icon: CalendarCheck,
    titulo: "Elige tu especialidad y horario",
    desc: "Te ayudamos a encontrar el día y la hora que mejor te queden.",
  },
  {
    icon: CheckCircle2,
    titulo: "Confirma y asiste",
    desc: "Recibes la confirmación y te esperamos en la clínica.",
  },
];

export function HowToBook() {
  return (
    <section id="como-agendar" className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--color-secondary)]" aria-hidden="true" />
            Cómo agendar
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] text-[var(--color-primary)] sm:text-4xl">
            Agendar es muy fácil
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {pasos.map((p, i) => (
            <Reveal key={p.titulo} delay={i * 0.08}>
              <li className="relative flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] font-display text-sm font-bold tabular-nums text-white">
                    {i + 1}
                  </span>
                  <p.icon className="h-6 w-6 text-[var(--color-secondary)]" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[var(--color-primary)]">
                  {p.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  {p.desc}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
