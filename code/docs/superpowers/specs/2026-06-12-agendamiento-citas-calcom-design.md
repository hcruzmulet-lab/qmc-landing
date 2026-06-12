# Agendamiento de citas online (Cal.com embebido) — Diseño

**Fecha:** 2026-06-12
**Proyecto:** QMC Medisuport — landing Next.js
**Estado:** Aprobado para planificación

## Objetivo

Permitir que un paciente, desde la landing, elija una especialidad y un horario y reserve
una cita sin salir del sitio. La clínica debe poder configurar, **por especialidad**, la
disponibilidad y la habilitación, y gestionar las citas (cancelar, confirmar, reagendar) sin
escribir código.

Restricción central: **gratis** y de bajo mantenimiento (clínica pequeña, 1 doctor por
especialidad).

## Decisión: Cal.com cloud (plan gratis) embebido

Calendly open-source. El plan gratis cubre event-types ilimitados, sync de calendario,
embeds y workflows para 1 usuario. Equipos/round-robin (pago) no se necesita porque hay 1
doctor por especialidad.

Alternativas descartadas:
- **Self-host Cal.com:** gratis e ilimitado pero implica mantener servidor/DB/updates. Sobra.
- **Custom (Next.js + Supabase + Google Calendar API):** control y marca total, pero exige
  construir UI de disponibilidad, reagenda, emails y anti-doble-reserva. Semanas de trabajo +
  mantenimiento. No cumple "sencillo".

## Arquitectura

Dos planos separados:

- **Configuración (sin código) = panel de Cal.com.** Horarios, disponibilidad, habilitar/
  deshabilitar y gestión de citas (cancelar/confirmar/reagendar) viven aquí. Todo lo
  "por especialidad" se administra desde el panel.
- **Código (este repo) = solo el selector y el botón** que abre el embed correcto por
  especialidad. El sitio sigue estático; no se agrega backend ni base de datos.

Flujo de alto nivel:

```
Paciente (móvil)
   │  "Agendar"
   ▼
Grid de especialidades (reusa lib/specialties.ts)
   │  click tarjeta
   ▼
Cal.com embed popup (tema navy/teal)
   │  confirma
   ▼
Cal.com cloud (gratis)
   ├─ email automático → paciente + clínica
   └─ sync 2-vías → Google Calendar de la clínica
        │
        ▼
   Recepción: lee la cita → envía WhatsApp manual
   Panel Cal.com: cancelar / confirmar / reagendar / habilitar
```

## Modelo de datos / mapeo

- 1 especialidad ↔ 1 event-type de Cal.com. Llave = `slug` (ya existe en `lib/specialties.ts`).
- Nuevo `lib/booking.ts`:
  - `CAL_USERNAME` desde env `NEXT_PUBLIC_CAL_USERNAME` (ej. `qmc-medisuport`).
  - `calLinkFor(slug)` → `"qmc-medisuport/pediatria"`.
  - `BOOKABLE`: lista/flag de especialidades agendables, para ocultar una en el sitio sin
    tocar Cal.com (doble control con el panel).
- El tipo `Specialty` gana un campo opcional `calEventSlug?` (default = `slug`) por si un slug
  de Cal.com difiere del slug de la especialidad.
- Sin DB nueva. Cal.com es el almacén de citas. El repo permanece estático.

## Componentes (código nuevo, mínimo)

- `components/booking/BookingButton.tsx`
  - Usa `@calcom/embed-react`.
  - Props: `slug`, `label`.
  - Abre el popup con `calLink = calLinkFor(slug)`, tema de marca (brandColor navy, layout
    `month_view`), zona `America/Guayaquil`.
  - Dispara `lib/analytics` en el click y en el callback `bookingSuccessful`.
- `components/booking/AgendaSection.tsx`
  - Sección con ancla `#agendar`: título + grid de especialidades `BOOKABLE` (reusa
    icon/nombre/precio de `specialties.ts`), cada tarjeta con su `BookingButton`.
  - Incluye un CTA de WhatsApp de respaldo al pie.
- Wiring en `app/page.tsx`: nueva sección + ancla de navegación `#agendar`. Los botones
  "Agendar" del hero apuntan a `#agendar`.

## Flujos

**Reserva (paciente):** landing → Agendar → elige especialidad → el popup muestra solo los
slots libres (horario de esa especialidad menos lo ocupado en Google Calendar) → llena
nombre / email / **WhatsApp (requerido)** / motivo → confirma → email a paciente + clínica y
evento en el Google Calendar de la clínica.

**Gestión (clínica):**
- Aviso: email + evento en Google Calendar → recepción envía WhatsApp manual (el teléfono
  viene capturado en la reserva).
- Cancelar / reagendar: links en el email del paciente + panel de Cal.com.
- Cambiar horario de una especialidad: editar su availability schedule en Cal.com.
- Apagar una especialidad temporalmente: ocultar el event-type en Cal.com (o flag `BOOKABLE`
  en código).

## Errores / casos borde

- Sin cupos → Cal.com muestra "sin disponibilidad" + CTA WhatsApp de respaldo en la sección.
- Embed no carga (script bloqueado) → fallback a la página hosteada
  `cal.com/qmc-medisuport/<slug>` (degradación elegante).
- Doble reserva → la previene Cal.com (bloqueo de slot).
- Zona horaria → event-types en `America/Guayaquil`; Cal.com ajusta la vista del paciente a su
  zona.
- Accesibilidad: `prefers-reduced-motion` respetado, focus visible, touch targets ≥44px,
  consistente con el resto del sitio (WCAG 2.1 AA, ver PRODUCT.md).

## Pruebas (vitest, ya configurado)

- Unit `lib/booking.ts`: `calLinkFor` arma el link correcto; el filtro `BOOKABLE` excluye lo
  no agendable.
- Component `BookingButton`: renderiza con el `data-cal-link` correcto y nombre accesible.
- El embed de Cal.com no se testea (servicio externo).

## Setup manual (fuera del código, una sola vez)

1. Crear cuenta gratis en Cal.com con username `qmc-medisuport`.
2. Conectar el Google Calendar de la clínica.
3. Crear 7 event-types (slug = slug de especialidad): duración, ubicación = dirección de la
   clínica, precio en la descripción, **availability por especialidad**, zona
   `America/Guayaquil`.
4. Booking questions: nombre, email, **WhatsApp (requerido)**, motivo (opcional).
5. Configurar color de marca navy/teal.
6. Poner el username en `.env.local` → `NEXT_PUBLIC_CAL_USERNAME`.

## Alcance de código

- Dependencia nueva: `@calcom/embed-react` (verificar compatibilidad con Next 16 / React 19).
- `lib/booking.ts` (mapeo + flags).
- 2 componentes: `BookingButton`, `AgendaSection`.
- Wiring en `app/page.tsx` + ancla `#agendar`.
- `.env.local.example` + nota en README.
- 2 tests (unit booking, component button).
- Backend nuevo: ninguno.

## Fuera de alcance (por ahora)

- Recordatorios automáticos por WhatsApp/SMS (workflows de pago / Twilio).
- Varios doctores por especialidad (requiere Teams de pago).
- Pagos online de la consulta.
- Página `/agendar` dedicada (se usa sección en la landing; revisable después).
