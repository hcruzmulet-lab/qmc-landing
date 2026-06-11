import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Specialty } from "@/lib/specialties";

export function SpecialtyCard({ specialty }: { specialty: Specialty }) {
  const Icon = specialty.icon;
  return (
    <Link
      href={`/especialidades/${specialty.slug}`}
      className="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-shadow duration-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
    >
      <Icon className="h-8 w-8 text-[var(--color-secondary)]" aria-hidden="true" />
      <h3 className="mt-4 font-[var(--font-heading)] text-xl font-semibold text-[var(--color-primary)]">
        {specialty.nombre}
      </h3>
      <p className="mt-2 flex-1 text-sm text-[var(--color-muted-foreground)]">
        {specialty.descCorta}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-[var(--font-heading)] font-semibold tabular-nums text-[var(--color-primary)]">
          {specialty.precio}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-secondary)]">
          Ver más
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
