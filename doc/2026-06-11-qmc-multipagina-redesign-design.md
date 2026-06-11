# QMC Medisuport — Rediseño multi-página (captación de pacientes)

**Fecha:** 2026-06-11
**Estado:** Diseño aprobado · pendiente plan de implementación
**Reemplaza:** la landing de una sola página descrita en `doc/2026-06-10-landing-qmc-design.md`

---

## 1. Objetivo

Rediseño completo del sitio de **QMC Medisuport**, clínica de especialidades en Quito (Ecuador), con un único objetivo de negocio: **captar la mayor cantidad posible de pacientes nuevos**.

- **Meta de conversión:** todo CTA termina en **WhatsApp** con mensaje pre-armado según el contexto (especialidad, promo, B2B).
- **Sensación de marca:** familiar, cálida y segura. Debe transmitir confianza a familias y a pacientes de todas las edades, no frialdad corporativa.
- **Posicionamiento:** clínica seria multi-especialidad **+** gancho de promoción de consulta a $10. Enfoque híbrido: confianza primero, conversión en todo momento.

### Métrica de éxito
Aumento de clics de lead a WhatsApp (evento `Lead` ya instrumentado en `lib/analytics.ts`), medible por fuente (`source`) y por especialidad.

---

## 2. Alcance

**Enfoque elegido: multi-página (B).** Una landing principal + páginas dedicadas por especialidad + página B2B. Las páginas de especialidad se generan desde una **plantilla única alimentada por datos**, no a mano.

Razón: SEO local fuerte (rankear "gastroenterólogo en Quito", "pediatra Quito", etc.), cada especialidad con URL, meta y datos estructurados propios. Más alcance orgánico = más captación.

### Especialidades (7)
| Slug | Nombre |
|------|--------|
| `pediatria` | Pediatría |
| `medicina-general` | Medicina General |
| `gastroenterologia` | Gastroenterología |
| `traumatologia` | Traumatología |
| `fisiatria` | Fisiatría |
| `rehabilitacion` | Rehabilitación |
| `laboratorio-clinico` | Laboratorio Clínico |

> Se **descartan** neumología y medicina familiar (estaban en el sitio anterior, no en el alcance actual).

---

## 3. Arquitectura de páginas

```
/                              Landing (home) — embudo de conversión completo
/especialidades                Índice: grid de las 7 especialidades
/especialidades/[slug]         Plantilla × 7 (estática, generateStaticParams)
/convenios-empresariales       Página B2B (chequeos ocupacionales a empresas)
```

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4. Se reutiliza el stack y los componentes ya construidos.
- **Render:** estático/SSG donde sea posible. Las 7 páginas de especialidad se prerenderan desde datos.
- **Mobile-first:** la mayoría del tráfico será móvil (campañas IG/Ads). Diseño optimizado a 375px primero.

---

## 4. Modelo de datos (una sola fuente de verdad)

Tanto la landing como las páginas de especialidad consumen los mismos datos. Editar contenido = editar un solo archivo.

```
lib/specialties.ts   Array de 7 Specialty:
                     { slug, nombre, icono, descCorta, descLarga,
                       precio, queTratamos[], incluye[], doctorIds[],
                       faqs[{q,a}], foto, metaTitle, metaDescription }

lib/doctors.ts       Array de Doctor:
                     { id, nombre, foto, credenciales, especialidades[], bio }

lib/site.ts          Datos de la clínica (extiende el actual):
                     + insurances[]  (aseguradoras aceptadas)
                     + permits        (registro sanitario / ARCSA)
                     direccion, telefono, whatsapp, horarios, email, IG

lib/promo.ts         Promo $10 (reusa el existente, con validUntilISO)
lib/whatsapp.ts      Deep-link wa.me + mensaje pre-armado por contexto (reusa/extiende)
lib/analytics.ts     trackLeadClick(source) → Meta Pixel + GA4 + Google Ads (reusa)
```

**Relación médicos ↔ especialidades:** un médico puede atender varias especialidades; cada especialidad referencia a sus médicos por `doctorIds`. Las páginas resuelven los datos cruzando ambos arreglos.

> El contenido real (bios, fotos, precios, descripciones, FAQs por especialidad) se rellena en estos archivos durante la implementación. La estructura está fija; el contenido se completa con los assets reales que ya existen.

---

## 5. Landing (`/`) — orden de secciones

1. **Header sticky** — logo · navegación con anclas · teléfono · botón WhatsApp
2. **Hero** — promesa "Clínica de especialidades en Quito" + foto real de la clínica + tarjeta de cita + gancho promo $10 + countdown en vivo + trust signals
3. **Trust bar + sello sanitario** — años · 7 especialidades · pacientes atendidos · permiso ARCSA · ubicación
4. **Catálogo de especialidades** *(núcleo nuevo)* — grid de 7 cards; cada una con ícono, descripción corta, precio y enlace a su página `/especialidades/[slug]`
5. **Promo $10 destacada** — checklist de lo incluido + countdown de cierre
6. **Cómo agendar — 3 pasos** — reduce fricción antes del clic a WhatsApp
7. **Equipo médico** — fotos + bios + credenciales de especialistas destacados (confianza real)
8. **Por qué QMC** — diferenciadores: prevención, diagnóstico preciso, seguimiento, todo en un lugar
9. **Testimonios reales** — con nombre/foto o reseñas de Google (reemplaza placeholders)
10. **Seguros aceptados** — logos de aseguradoras
11. **Galería + Instagram** — fotos reales de instalaciones/equipos + feed del IG activo (@clinicaqmc)
12. **Convenios empresariales (teaser)** — bloque que enlaza a `/convenios-empresariales`
13. **Ubicación** — mapa + horarios + cómo llegar + parqueo
14. **FAQ** — agenda, seguros, precios, qué incluye
15. **Footer + WhatsApp FAB + barra CTA sticky en móvil**

---

## 6. Plantilla de página de especialidad (`/especialidades/[slug]`)

Estructura única, alimentada por `specialties.ts`:

1. **Breadcrumb** — Inicio › Especialidades › [Nombre]
2. **Hero de especialidad** — nombre, descripción larga, precio, CTA WhatsApp con mensaje pre-armado ("Hola QMC, quiero agendar [especialidad]"), foto
3. **Qué tratamos** — lista de condiciones/servicios de la especialidad
4. **Médico(s)** — perfil(es) que atienden esa especialidad (cruce con `doctors.ts`)
5. **Cómo agendar — 3 pasos** (componente compartido)
6. **FAQ de la especialidad**
7. **CTA final + enlaces a otras especialidades** (navegación cruzada para retención/SEO)
8. **Ubicación + Footer** (componentes compartidos)

**SEO por página:** `metaTitle`/`metaDescription` propios + datos estructurados `MedicalClinic`/`Physician` (JSON-LD).

---

## 7. Página B2B (`/convenios-empresariales`)

1. **Hero empresas** — propuesta de valor para empleadores
2. **Beneficios** — chequeos ocupacionales, salud preventiva del personal
3. **Servicios para empresas** — qué incluye un convenio
4. **CTA WhatsApp B2B** — mensaje pre-armado para empresas (source `b2b`)
5. **Footer** (compartido)

---

## 8. Sistema de diseño (rediseño visual total)

### Color — paleta oficial de marca (del manual en `doc/logos/`)
| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#103158` | Azul marino — títulos, header, footer, énfasis |
| `accent` | `#217499` | Teal — enlaces, íconos, detalles, gradientes |
| `neutral` | `#a4b1bf` | Gris-azul — bordes, texto secundario, fondos suaves |
| `background` | `#ffffff` / `#f6f8fa` | Fondos |
| `cta` | verde (WhatsApp) | Botones de conversión — se conserva por reconocimiento |

> Reemplaza por completo la paleta sky-blue (`#0284C7`) del sitio actual, que **no** correspondía a la marca.

### Tipografía — familiar, segura, poco usada
- **Títulos: Hanken Grotesk** — grotesca humanista cálida, con carácter, poco común. Da familiaridad sin perder seriedad.
- **Cuerpo: Mulish** — humanista, discreta, altísima legibilidad en móvil y texto pequeño (importa para pacientes mayores). Transmite seguridad/claridad.
- Ambas en Google Fonts, con soporte completo de español (tildes, ñ).
- Reemplaza Figtree/Noto Sans del sitio actual.

### Componentes
- Reutilizar y restilar a la paleta: `button`, `card`, `badge`, `accordion`.
- Reutilizar `Reveal` (scroll reveal, respeta `prefers-reduced-motion`) y `Countdown`.
- Nuevos componentes compartidos: `SpecialtyCard`, `DoctorCard`, `HowToBook` (3 pasos), `InsuranceLogos`, `Gallery`, `InstagramFeed`, `B2BTeaser`.

### Principios de conversión (captación máxima)
- CTA a WhatsApp visible en cada sección y en barra sticky móvil + FAB.
- Fricción mínima: mensajes pre-armados, sin formularios obligatorios.
- Confianza en todo: credenciales médicas, sello sanitario, testimonios reales, fotos reales, seguros.
- Velocidad: estático, imágenes optimizadas, fuentes con `display: swap`.

---

## 9. Reutilización del trabajo existente

Se conserva y adapta lo ya construido en `code/`:
- Stack completo (Next 16, React 19, Tailwind v4, framer-motion, vitest).
- Lógica con tests: `promo.ts`, `whatsapp.ts`, `analytics.ts` (extender, no reescribir).
- Componentes base UI y `Reveal`/`Countdown`.
- Integración de logo y analytics.

Se **reescriben**: todas las secciones (nueva paleta, tipografía, estructura), `page.tsx`, y se **añaden**: routing de especialidades, plantilla, página B2B, `specialties.ts`, `doctors.ts`.

---

## 10. Fuera de alcance (v1)

- Sistema de reservas con calendario/disponibilidad (sigue siendo WhatsApp manual).
- Pasarela de pagos.
- Resultados de laboratorio en línea (la página de laboratorio describe el servicio; el portal de resultados es futuro).
- Blog/contenido educativo (queda como fase posterior de SEO; la arquitectura multi-página lo permite sin retrabajo).
- Multi-idioma (solo español en v1).

---

## 11. Preguntas abiertas / a confirmar en implementación
- Contenido real por especialidad (descripciones, precios, qué tratamos, FAQs).
- Asignación médico ↔ especialidad (qué doctor atiende qué).
- Lista de aseguradoras aceptadas.
- Número/registro sanitario exacto para el sello ARCSA.
- Fotos finales (clínica, médicos) y su optimización.
