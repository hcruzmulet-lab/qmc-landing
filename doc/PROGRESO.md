# QMC Landing — Estado del proyecto (retomar aquí)

**Última actualización:** 2026-06-10

---

## Dónde quedamos

Landing page **funcional y construida**. Falta deploy + 4 mejoras UX/UI acordadas.

### ✅ Completado (Tasks 0–19, ~24 commits en git local)
- Scaffold: **Next 16 + React 19 + TypeScript + Tailwind v4 + shadcn + framer-motion 12.40 + vitest**. App en `code/`.
- Lógica con tests (8 tests verdes):
  - `code/lib/promo.ts` — precio promo editable 1 lugar ($10/$25, "Ahorras $15")
  - `code/lib/whatsapp.ts` — deep-links `wa.me/593958875624` + mensaje pre-armado
  - `code/lib/analytics.ts` — `trackLeadClick` → Meta Pixel + GA4 + Google Ads
  - `code/lib/site.ts` — datos clínica
- 11 secciones en `code/components/sections/`: header, hero, trust-bar, offer, services, why-qmc, testimonials, location, faq, footer, whatsapp-fab.
- Página ensamblada `code/app/page.tsx`, tracking scripts `code/components/analytics-scripts.tsx`.
- **Logo real** integrado: `code/public/logo.png` (header) + `code/app/icon.png` (favicon). Originales en `doc/logos/`.
- Build estático verde, verificado visual mobile 375px + desktop.

### ⏳ Pendiente
- **Task 20: Deploy a Vercel** (necesita acción usuario: GitHub push + Vercel import root=`code` + dominio).
- **3 mejoras UX/UI** acordadas (subagentes + review visual), sin conflicto de archivos:
  - **Mejora A — Foundations:** crear `components/sections/reveal.tsx` (framer-motion `whileInView` + reduced-motion), `components/sections/countdown.tsx` (countdown en vivo), `components/icons/instagram.tsx` (SVG marca). Añadir `validUntilISO: "2026-06-30T23:59:59-05:00"` a `lib/promo.ts` (Ecuador UTC-5) para el countdown.
  - **Mejora B — Hero premium + urgencia:** reconstruir `hero.tsx`: columna derecha = tarjeta "ticket/cita" con propósito (reemplaza gradiente vacío) + countdown + reveal. **Prueba social HONESTA**: Instagram @clinicaqmc + señales reales. NO inventar rating/nº pacientes (si la clínica da números reales, agregarlos).
  - **Mejora C — Pulido:** aplicar Reveal + stagger a services/why/offer/testimonials; hover elevación + `cursor-pointer` en cards; cifras tabulares en precios; reemplazar ícono Instagram genérico (`ExternalLink`) por SVG real en testimonials+footer; smooth-scroll.

## Tracker de tareas (TaskList)
- #1–#20 = completas. #21 = Deploy (pending). #22 = Mejora A, #23 = Mejora B, #24 = Mejora C (pending).

## Checklist post-launch (contenido, antes de pagar ads)
- [x] Logo real ✅
- [ ] Fotos reales clínica/médicos (hero usa placeholder)
- [ ] Horarios reales → `lib/site.ts` (campo `hours`, tiene TODO)
- [ ] Testimonios reales (hoy placeholder en `testimonials.tsx`)
- [ ] Confirmar respuesta de seguros en FAQ
- [ ] IDs de tracking en Vercel env (`.env.local.example` tiene las keys)
- [ ] **Rotar API key 21st.dev** (se pegó en chat)
- [ ] Verificar iframe de Google Maps en deploy real (salió blanco en localhost)

## Notas técnicas del entorno (jun-2026)
- **lucide-react 1.x removió íconos de marca** → Instagram usa `ExternalLink` temporal (Mejora C lo arregla con SVG propio).
- **shadcn usa @base-ui/react (no Radix)** → accordion sin props `type`/`collapsible`.
- `code/AGENTS.md` avisa: Next 16 tiene breaking changes; ver `node_modules/next/dist/docs/`.

## MCP 21st (magic) — pendiente de activar
- Configurado vía `claude mcp add magic` (user scope). **Sus tools NO están disponibles esta sesión** porque la sesión cargó MCP al arrancar.
- **Para usarlo: reiniciar Claude Code.** Luego aparecen tools tipo `21st_magic_component_builder` para generar componentes premium.
- Skill UX/UI instalado y funcional: `~/.claude/skills/ui-ux-pro-max` (auditoría ya corrida; patrón "Trust & Authority + Conversion").

## Docs del proyecto
- `doc/2026-06-10-landing-qmc-design.md` — spec (campaña + embudo + estructura)
- `doc/2026-06-10-landing-qmc-plan.md` — plan implementación (21 tareas, código exacto)
- `doc/PROGRESO.md` — este archivo

## Cómo retomar / correr local
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run dev      # http://localhost:3000
npm run test     # 8 tests
npm run build    # build estático
```
Para seguir mejoras: empezar por Mejora A (#22), luego B (#23), luego C (#24). Si reiniciaste, el MCP 21st queda disponible para Mejora B (hero).
