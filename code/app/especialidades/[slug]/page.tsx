import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import {
  getSpecialtyBySlug,
  specialtySlugs,
  type Specialty,
} from "@/lib/specialties";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppFab } from "@/components/sections/whatsapp-fab";
import { StickyMobileCta } from "@/components/sections/sticky-mobile-cta";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd, faqPageLd, specialtyServiceLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return specialtySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSpecialtyBySlug(slug);
  if (!s) return { title: { absolute: "Especialidad no encontrada | QMC Medisuport" } };
  return {
    title: { absolute: s.metaTitle },
    description: s.metaDescription,
    alternates: { canonical: `/especialidades/${s.slug}` },
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      url: `/especialidades/${s.slug}`,
      type: "article",
    },
  };
}

export default async function EspecialidadPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const s = getSpecialtyBySlug(slug);
  if (!s) notFound();

  const especialidad = s as Specialty;
  const Icon = especialidad.icon;

  const schema: object[] = [
    breadcrumbLd([
      { name: "Inicio", url: "/" },
      { name: "Especialidades", url: "/especialidades" },
      { name: especialidad.nombre, url: `/especialidades/${especialidad.slug}` },
    ]),
    specialtyServiceLd(especialidad),
  ];
  if (especialidad.faqs && especialidad.faqs.length > 0) {
    schema.push(faqPageLd(especialidad.faqs.map((f) => ({ q: f.q, a: f.a }))));
  }

  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pb-20 lg:pb-0">
        {/* Hero de la especialidad */}
        <section className="bg-[#0C2545] text-white">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
            <Reveal variant="left">
              <Link
                href="/especialidades"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Todas las especialidades
              </Link>
              <div className="mt-6 flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-[var(--color-aqua)]">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <p className="eyebrow text-[var(--color-neutral)]">{especialidad.categoria}</p>
                  <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
                    {especialidad.nombre}
                  </h1>
                </div>
              </div>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
                {especialidad.descLarga}
              </p>
              <div className="mt-7">
                <CtaButton
                  message={`Hola QMC, quiero agendar una cita de ${especialidad.nombre}.`}
                  source={`especialidad-detalle:${especialidad.slug}`}
                  label={`Agendar ${especialidad.nombre}`}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Qué tratamos + FAQs */}
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-[var(--color-primary)]">
                Qué tratamos
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {especialidad.queTratamos.map((q) => (
                  <li key={q} className="flex items-start gap-2.5 text-[var(--color-foreground)]">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-secondary)]" aria-hidden="true" />
                    <span className="text-sm leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {especialidad.faqs && especialidad.faqs.length > 0 && (
              <Reveal delay={0.1}>
                <h2 className="font-display text-2xl font-bold text-[var(--color-primary)]">
                  Preguntas frecuentes
                </h2>
                <dl className="mt-5 space-y-5">
                  {especialidad.faqs.map((f) => (
                    <div key={f.q} className="border-b border-[var(--color-border)] pb-5">
                      <dt className="font-semibold text-[var(--color-primary)]">{f.q}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                        {f.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>

          {/* CTA de cierre */}
          <Reveal>
            <div className="mt-14 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center sm:p-10">
              <h2 className="font-display text-2xl font-bold text-[var(--color-primary)]">
                Agenda tu cita de {especialidad.nombre}
              </h2>
              <p className="mt-3 text-[var(--color-muted-foreground)]">
                Escríbenos por WhatsApp y coordinamos el horario que mejor te quede.
              </p>
              <div className="mt-6 flex justify-center">
                <CtaButton
                  message={`Hola QMC, quiero agendar una cita de ${especialidad.nombre}.`}
                  source={`especialidad-detalle-cierre:${especialidad.slug}`}
                  label="Agendar por WhatsApp"
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
