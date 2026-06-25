import type { Doctor } from "@/lib/doctors";

// Iniciales del nombre, sin el honorífico (Dr./Dra./Psic./Nut./BQF.).
function initials(nombre: string): string {
  return nombre
    .replace(/^(Dr|Dra|Psic|Nut|Lcd[ao]|BQF|Mgs)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="flex flex-col items-center rounded-2xl border border-[var(--color-border)] bg-white p-6 text-center">
      {doctor.foto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={doctor.foto}
          alt={`Foto de ${doctor.nombre}`}
          width={96}
          height={96}
          className="h-24 w-24 rounded-full object-cover"
          loading="lazy"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-secondary)]/10 font-[var(--font-heading)] text-2xl font-bold text-[var(--color-secondary)]"
        >
          {initials(doctor.nombre)}
        </div>
      )}
      <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-[var(--color-primary)]">
        {doctor.nombre}
      </h3>
      <p className="mt-1 text-sm font-medium text-[var(--color-secondary)]">
        {doctor.credenciales}
      </p>
      <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">{doctor.bio}</p>
    </article>
  );
}
