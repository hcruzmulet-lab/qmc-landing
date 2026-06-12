# Design

Sistema visual de la landing QMC Medisuport. Tokens vigentes en `app/globals.css`.

## Theme
Claro, con secciones navy de alto impacto intercaladas. Identidad azul oficial de marca (manual en `doc/logos`), energizada con un acento aqua. No dark-mode (v1 solo claro). Mood: clínico-confiable pero cálido y vivo.

## Color
Paleta oficial + acento aqua. Hex fijos (sin variante `.dark`).

| Rol | Token | Hex | Uso |
|---|---|---|---|
| Primary | `--color-primary` | `#103158` | Navy de marca: títulos, header/footer, paneles, texto |
| On primary | `--color-on-primary` | `#FFFFFF` | Texto sobre navy |
| Secondary | `--color-secondary` | `#217499` | Teal: eyebrows, enlaces, íconos, detalles |
| Aqua | `--color-aqua` | `#2BD4E6` | Acento vivo: glows, gradientes, acentos sobre navy |
| Accent (CTA) | `--color-accent` | `#059669` | Verde WhatsApp — SOLO conversión (NO cambiar) |
| Neutral | `--color-neutral` | `#A4B1BF` | Gris-azul de marca: eyebrows sobre navy, separadores |
| Background | `--color-background` | `#FFFFFF` | Fondo base |
| Surface | `--color-surface` | `#F4F7FA` | Secciones alternas claras |
| Foreground | `--color-foreground` | `#0F2236` | Texto principal (16:1) |
| Muted fg | `--color-muted-foreground` | `#4A5A6A` | Texto secundario (7:1) |
| Border | `--color-border` | `#DCE5EE` | Bordes hairline |

- Gradiente de marca para palabra clave: `#39B8D4 → #2BD4E6` (`.text-gradient-brand`, AA sobre navy).
- Acento sobre navy: usar aqua o `#6FB0CE` (teal puro no contrasta sobre navy).
- Secciones navy de impacto: gradiente `#0C2545 → #103158` + glows radiales teal/aqua + grid de puntos (`.bg-grid`).

## Typography
Pareja en eje de contraste (geométrico display + grotesque cuerpo). Variables en `<html>` (layout.tsx).

- **Display**: Sora (`--font-heading`, `.font-display`, tracking `-0.02em`). Titulares bold.
- **Body**: Inter (`--font-body`). Cuerpo, datos, utilidades.
- Eyebrow: Inter 0.75rem, uppercase, tracking `0.16em`, teal (`.eyebrow`); sobre navy → neutral/aqua.
- `[text-wrap:balance]` en h1.

## Components
- **CTA WhatsApp** (`cta-button.tsx`): verde sólido, glow opcional `shadow-[...]`. Único verde de la página.
- **Hero**: sección navy con cover (Unsplash clínica, blur), glows, nodos de especialidad orbitando foto real, promo destacada (badge aqua), franja de hechos reales (tiles glassy).
- **Especialidades**: directorio de filas (hairline) + panel sticky de preview; fondo `InfiniteGridBackground` (puntos animados + collage de fotos reales + reveal con cursor, variante clara).
- **Quiénes somos**: `CircularTestimonials` (carrusel 3D de fotos reales, cita animada palabra-por-palabra).
- **Consulta integral** (`offer.tsx`): card sobre fondo navy con `BorderBeam` (luz aqua→teal recorriendo el borde).
- **Testimonios**: 3 columnas con auto-scroll vertical infinito + fade mask; avatares de iniciales (sin caras stock).
- **FAQ**: tarjetas con glow/borde sobre navy, acordeón animado (una abierta), ícono `+`→`×`.
- Header sticky (regla teal), Footer navy (logo invertido), FAB WhatsApp, sticky CTA móvil.

## Layout
- Contenedor `max-w-6xl`, padding `px-4`.
- Ritmo de secciones `py-16 sm:py-20/24`; alternancia bg/surface/navy.
- Grids: directorio `[1fr_0.92fr]`, hero `[1.05fr_0.95fr]`. Flex para 1D.
- Responsive: nodos/columnas extra se ocultan en móvil; todo stackea sin overflow.

## Motion
- Reveal scroll-into-view (framer-motion, `once`, respeta reduced-motion).
- Materiales premium en uso: gradientes, blur, glow/shadow, mask, offset-path (border beam), perspective 3D (carrusel), grid animado (offset infinito).
- Curvas ease-out; sin bounce/elastic. Stagger por índice en listas.
- `prefers-reduced-motion`: todo se congela o hace crossfade (keyframe global + guards por componente).
