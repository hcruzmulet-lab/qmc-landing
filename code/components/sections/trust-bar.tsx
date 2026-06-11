import { MapPin, HeartHandshake, ShieldCheck, Stethoscope, BadgeCheck } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";

const items = [
  { icon: MapPin, label: "Av. 6 de Diciembre, Quito" },
  { icon: HeartHandshake, label: "Atención cercana y personalizada" },
  { icon: ShieldCheck, label: "Enfoque preventivo" },
  { icon: Stethoscope, label: "Médicos especialistas" },
  { icon: BadgeCheck, label: site.permits.label },
];

export function TrustBar() {
  return (
    <section className="border-y border-[var(--color-border)] bg-white">
      <Reveal>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 md:grid-cols-3 lg:grid-cols-5">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm text-[var(--color-foreground)]">
            <Icon className="h-5 w-5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
      </Reveal>
    </section>
  );
}
