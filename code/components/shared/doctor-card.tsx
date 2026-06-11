import type { Doctor } from "@/lib/doctors";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="flex flex-col items-center rounded-2xl border border-[var(--color-border)] bg-white p-6 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={doctor.foto}
        alt={`Foto de ${doctor.nombre}`}
        width={96}
        height={96}
        className="h-24 w-24 rounded-full object-cover"
        loading="lazy"
      />
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
