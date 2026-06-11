import { MessageCircle, CalendarCheck, CheckCircle2 } from "lucide-react";

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
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold text-[var(--color-primary)]">
          Agendar es muy fácil
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pasos.map((p, i) => (
            <div key={p.titulo} className="flex flex-col items-center rounded-2xl bg-white p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-muted)]">
                <p.icon className="h-6 w-6 text-[var(--color-secondary)]" aria-hidden="true" />
              </div>
              <span className="mt-4 font-[var(--font-heading)] text-sm font-bold tabular-nums text-[var(--color-neutral)]">
                Paso {i + 1}
              </span>
              <h3 className="mt-1 font-[var(--font-heading)] text-lg font-semibold text-[var(--color-primary)]">
                {p.titulo}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
