import { doctors as allDoctors, type Doctor } from "@/lib/doctors";
import { DoctorCard } from "@/components/shared/doctor-card";
import { Reveal } from "@/components/sections/reveal";

export function MedicalTeam({ team = allDoctors }: { team?: Doctor[] }) {
  if (team.length === 0) return null;
  return (
    <section id="equipo" className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Reveal>
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
            Nuestro equipo
          </h2>
          <p className="mt-2 text-center font-[var(--font-heading)] text-3xl font-bold text-[var(--color-primary)]">
            Especialistas que te atienden
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.06}>
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
