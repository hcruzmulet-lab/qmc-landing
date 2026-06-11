import { MapPin, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";

const items = [
  { icon: MapPin, label: "Av. 6 de Diciembre, Quito" },
  { icon: HeartHandshake, label: "Atención cercana y personalizada" },
  { icon: ShieldCheck, label: "Enfoque preventivo" },
  { icon: Stethoscope, label: "Médicos especialistas" },
];

export function TrustBar() {
  return (
    <section className="border-y border-[var(--color-border)] bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm text-[var(--color-foreground)]">
            <Icon className="h-5 w-5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
