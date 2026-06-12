import { site } from "@/lib/site";
import { InstagramIcon } from "@/components/icons/instagram";
import { Reveal } from "@/components/sections/reveal";

export function InstagramCta() {
  return (
    <section id="instagram" className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-secondary)]/12 text-[var(--color-secondary)]">
            <InstagramIcon className="h-7 w-7" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">
            Síguenos en Instagram
          </h2>
          <p className="mt-2 max-w-xl text-[var(--color-muted-foreground)]">
            Tips de salud, novedades de la clínica y nuestras promociones. Únete a nuestra comunidad.
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir Instagram de QMC Medisuport"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-6 py-3 font-semibold text-[var(--color-primary)] transition-shadow duration-200 hover:shadow-md"
          >
            <InstagramIcon className="h-5 w-5" />
            {site.instagramHandle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
