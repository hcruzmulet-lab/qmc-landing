import { site } from "@/lib/site";
import { specialties, type Specialty } from "@/lib/specialties";
import { doctors } from "@/lib/doctors";

// Honorífico fuera, para el `name` del Physician en el grafo.
const stripHonorific = (n: string) =>
  n.replace(/^(Dr|Dra|Psic|Nut|Lcd[ao]|BQF|Mgs)\.?\s+/i, "");

// Helpers para construir bloques JSON-LD (schema.org). Centraliza el grafo de
// datos estructurados para que un solo lugar defina la identidad de la clínica.

const dayUrl = (d: string) => `https://schema.org/${d}`;

function postalAddress() {
  const a = site.addressParts;
  return {
    "@type": "PostalAddress",
    streetAddress: a.streetAddress,
    addressLocality: a.addressLocality,
    addressRegion: a.addressRegion,
    addressCountry: a.addressCountry,
  };
}

function openingHoursSpecification() {
  return site.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days.map(dayUrl),
    opens: h.opens,
    closes: h.closes,
  }));
}

// Entidad principal: el centro médico. Reusable como `@id` para enlazar el grafo.
export const CLINIC_ID = `${site.url}/#clinica`;

export function medicalClinicLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: site.commercialName,
    alternateName: site.brand,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/logo.png`,
    image: `${site.url}/clinic/fachada.jpg`,
    telephone: site.phoneE164,
    email: site.email,
    slogan: site.slogan,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}`,
    areaServed: { "@type": "City", name: "Quito" },
    openingHoursSpecification: openingHoursSpecification(),
    paymentAccepted: site.paymentMethods.join(", "),
    sameAs: [site.instagram].filter(Boolean),
    medicalSpecialty: Array.from(new Set(specialties.map((s) => s.nombre))),
    availableService: specialties.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.nombre,
      url: `${site.url}/especialidades/${s.slug}`,
    })),
    // Cuerpo médico real — refuerza Expertise/Trust (E-E-A-T) en YMYL.
    employee: doctors.map((d) => ({
      "@type": "Physician",
      name: stripHonorific(d.nombre),
      medicalSpecialty: d.especialidades
        .map((slug) => specialties.find((s) => s.slug === slug)?.nombre)
        .filter(Boolean),
    })),
  };
}

// WebSite con SearchAction potencial + identidad del sitio.
export function webSiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.brand,
    inLanguage: "es-EC",
    publisher: { "@id": CLINIC_ID },
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${site.url}${it.url}`,
    })),
  };
}

export function faqPageLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// Página de una especialidad: servicio médico ofrecido por la clínica.
export function specialtyServiceLd(s: Specialty) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: s.nombre,
    description: s.descCorta,
    url: `${site.url}/especialidades/${s.slug}`,
    provider: { "@id": CLINIC_ID },
  };
}
