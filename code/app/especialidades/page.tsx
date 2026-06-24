import type { Metadata } from "next";
import { specialtiesByCategoria, specialties } from "@/lib/specialties";
import { site } from "@/lib/site";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppFab } from "@/components/sections/whatsapp-fab";
import { StickyMobileCta } from "@/components/sections/sticky-mobile-cta";
import { SpecialtyCard } from "@/components/shared/specialty-card";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Especialidades y servicios médicos en Quito | QMC Medisuport" },
  description:
    "Más de 30 especialidades, servicios de diagnóstico, rehabilitación y laboratorio en un mismo lugar en Quito. Agenda por WhatsApp en QMC Medisuport.",
  alternates: { canonical: "/especialidades" },
};

export default function EspecialidadesPage() {
  const grupos = specialtiesByCategoria();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", url: "/" },
          { name: "Especialidades", url: "/especialidades" },
        ])}
      />
      <Header />
      <main className="pb-20 lg:pb-0">
        {/* Encabezado */}
        <section className="bg-[#0C2545] text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <Reveal variant="left" className="max-w-2xl">
              <p className="eyebrow text-[var(--color-neutral)]">Cartera de servicios</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
                Todas nuestras especialidades
              </h1>
              <p className="mt-4 max-w-xl text-white/80">
                {specialties.length} especialidades y servicios médicos, de
                diagnóstico, rehabilitación y laboratorio en un mismo lugar, en la
                Av. 6 de Diciembre. Agenda la que necesites por WhatsApp.
              </p>
              <div className="mt-7">
                <CtaButton
                  message="Hola QMC, quiero información sobre sus especialidades y servicios."
                  source="especialidades-page-hero"
                  label="Agendar por WhatsApp"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Grupos por categoría */}
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="space-y-16">
            {grupos.map((g) => (
              <section key={g.categoria} aria-labelledby={`cat-${g.categoria}`}>
                <Reveal>
                  <h2
                    id={`cat-${g.categoria}`}
                    className="font-display text-2xl font-bold text-[var(--color-primary)] sm:text-3xl"
                  >
                    {g.categoria}
                  </h2>
                </Reveal>
                <Reveal delay={0.05}>
                  <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {g.items.map((s) => (
                      <li key={s.slug} className="flex">
                        <SpecialtyCard specialty={s} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </section>
            ))}
          </div>

          {/* Cierre — formas de pago + CTA */}
          <Reveal>
            <div className="mt-16 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-[var(--color-primary)]">
                ¿No encuentras lo que buscas?
              </h2>
              <p className="mt-3 max-w-2xl text-[var(--color-muted-foreground)]">
                Escríbenos y te orientamos. Aceptamos {site.paymentMethods.join(", ").toLowerCase()}.
              </p>
              <div className="mt-6">
                <CtaButton
                  message="Hola QMC, quiero información sobre una especialidad o servicio."
                  source="especialidades-page-cierre"
                  label="Escríbenos por WhatsApp"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
      <StickyMobileCta />
    </>
  );
}
