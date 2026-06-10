# Diseño — Landing Page QMC MediSuport (Captación de clientes Quito)

**Fecha:** 2026-06-10
**Estado:** Aprobado (diseño), pendiente plan de implementación

---

## 1. Objetivo

Landing page de una sola página para captación rápida de pacientes en Quito, optimizada para convertir tráfico de anuncios a contactos por WhatsApp. Gancho principal: **consulta integral a precio promocional de $10**.

**Meta de negocio:** maximizar citas agendadas al menor costo por lead (CPL), con precio promocional editable para no comprometer al cliente cuando suba.

---

## 2. Datos del cliente (fuente)

- **Nombre legal:** Medisuport International Medical Support S.A.
- **Marca:** QMC — Quito Medical Center.
- **Dirección:** Gaspar de Cañero E10-114 y Av. 6 de Diciembre, Quito, Pichincha, EC 170135.
- **Teléfono:** (02) 224-7429.
- **WhatsApp:** 0958875624.
- **Correo:** info@quitomedicalcenter.com.
- **Instagram:** @clinicaqmc.
- **Servicios confirmados:** Neumología, Medicina Familiar, Evaluación clínica integral, Psiquiatría (Dr. Elvis Rodríguez Martín).
- **Precios:** Consulta integral $10 (promo) — incluye oídos, garganta, fondo de ojo, signos vitales. Medicina Familiar $8.
- **Filosofía:** enfoque preventivo, atención cercana y personalizada. "El cuidado no es solo cuando duele."

### Datos faltantes (confirmar con clínica antes de lanzar)
- Horarios de atención completos.
- ¿Aceptan seguros médicos?
- Lista completa de especialidades y precios.
- Fotos reales del centro y médicos.
- Testimonios/reseñas reales.

---

## 3. Campaña de marketing + embudo de ventas

### Embudo (4 etapas)

```
TOFU  Atraer  →  MOFU  Captar  →  BOFU  Convertir  →  Retener
(ads/SEO/QR)     (landing $10)     (WhatsApp cita)     (recordatorio)
```

**1. TOFU — Atraer (frío)**
- **Meta Ads (FB/IG):** segmenta Quito radio ~15km, edad 25-60, intereses salud/familia. Gancho promo $10.
- **Google Ads (búsqueda):** keywords intención alta — `neumologo quito`, `consulta medica quito`, `medico familiar quito`.
- **SEO:** landing optimizada palabras clave Quito → tráfico orgánico mediano plazo.
- **QR físico:** volantes de barrio + QR en clínica → misma landing.

**2. MOFU — Captar (landing)**
- Una página, mensaje único: consulta integral **$10 promocional**.
- Prueba social + confianza (médicos reales, dirección, enfoque preventivo).
- Cero fricción: todo apunta a un solo botón (WhatsApp).

**3. BOFU — Convertir (WhatsApp)**
- Botón flotante + CTAs → WhatsApp `0958875624` con mensaje pre-armado:
  > "Hola QMC, quiero agendar mi consulta integral de $10"
- Click = evento de conversión medido (Meta Pixel + Google Ads + GA4).

**4. Retener (post-cita)**
- WhatsApp: recordatorio de cita + control preventivo a 3/6 meses.
- Base de leads para campañas futuras (medicina familiar, neumología).

### Framing del precio (clave)
El $10 se comunica SIEMPRE como **precio promocional**, nunca como precio fijo. Esto permite subir el precio después sin romper la confianza.

- **Ángulo recomendado: "Promo de reapertura"** — *"Por reapertura: consulta integral $10 (precio regular $25)"*.
- Refuerzos de urgencia/escasez: "Promo válida hasta fin de mes", "Cupos limitados por semana", precio regular tachado (~~$25~~ **$10**).
- **Implementación técnica:** precio y promo viven en un solo archivo de config (`config/promo.ts`). Cambiar precio o quitar promo = editar 1 línea.

### Ángulos de anuncios (para testear A/B)

| Ángulo | Headline |
|--------|----------|
| Promo arraigo | "Por reapertura: chequeo completo ~~$25~~ **$10**. Cupos limitados." |
| Prevención | "El cuidado no es solo cuando duele. Evaluación integral en Quito." |
| Neumología | "¿Respiras mal? Neumólogo especialista en Quito." |
| Familia | "Un médico para toda tu familia. Desde $8." |

### KPIs
- CPL (costo por lead/WhatsApp), CTR de ads, % landing→click WhatsApp, citas agendadas, costo por cita.
- Objetivo: CPL bajo + tasa de click a WhatsApp > 8%.

---

## 4. Estructura de la página

Una sola página, scroll vertical, mobile-first. Orden de secciones = orden psicológico del embudo.

1. **Header fijo (sticky):** logo QMC + teléfono + botón WhatsApp. Siempre visible.
2. **Hero:** headline promo (precio regular tachado + $10), subtítulo con qué incluye, badge de urgencia, CTA grande "Agendar por WhatsApp", foto (placeholder).
3. **Barra de confianza:** iconos — ubicación · atención personalizada · enfoque preventivo · médicos especialistas.
4. **La oferta:** card con checklist de qué cubre la consulta de $10. Precio tachado + promo + CTA.
5. **Servicios:** 3 cards — Neumología · Medicina Familiar ($8) · Evaluación clínica integral. Cada una con CTA WhatsApp con mensaje pre-armado según servicio.
6. **Por qué QMC:** diferenciadores — prevención + diagnóstico preciso + seguimiento. Filosofía.
7. **Prueba social:** testimonios (placeholder hasta tener reales) + Instagram @clinicaqmc.
8. **Ubicación + contacto:** mapa embebido (Av. 6 de Diciembre), dirección, teléfono, WhatsApp, horario (pendiente confirmar).
9. **FAQ:** ¿Necesito cita? · ¿Aceptan seguro? · ¿Qué incluye los $10? · ¿Dónde están? (baja fricción + SEO).
10. **Footer:** logo, datos legales (Medisuport S.A.), redes, repetir CTA.
11. **Botón WhatsApp flotante:** fijo esquina inferior, todo el scroll.

### Elementos transversales
- **Tracking:** cada click WhatsApp dispara evento Meta Pixel + Google Ads + GA4.
- **Mobile-first:** 80%+ tráfico de ads es celular.
- **Velocidad:** imágenes optimizadas, Next.js SSG → carga < 2s.
- **Un mensaje, una acción:** todo empuja a WhatsApp; sin links que distraigan.

---

## 5. Stack técnico

- **Framework:** Next.js (App Router) — SSG/SSR para SEO + velocidad + deploy fácil.
- **UI:** React + TypeScript + Tailwind CSS + shadcn/ui.
- **Hosting:** Vercel (gratis). Dominio a contratar después (placeholder mientras tanto).
- **Config de promo:** `config/promo.ts` — precio promo, precio regular, motivo, vigencia (editable en 1 lugar).
- **Analítica:** Meta Pixel + Google Ads tag + GA4, con evento de conversión en click de WhatsApp.

### Activos
- Logo QMC: disponible.
- Dominio: pendiente de contratar.
- Fotos: usar stock/placeholder hasta tener reales.

---

## 6. Decisiones tomadas

| Decisión | Elección |
|----------|----------|
| Acción de conversión | WhatsApp directo (mensaje pre-armado) |
| Canales de tráfico | Meta Ads + Google Ads + SEO + QR físico |
| Gancho | Consulta integral $10 (promocional) |
| Stack | Next.js + React + TS + Tailwind + shadcn |
| Tracking | Meta Pixel + Google Ads + GA4 |
| Precio | Promocional, editable en config |

---

## 7. Fuera de alcance (por ahora)

- Portal de pacientes / login / historias clínicas.
- Sistema de agendamiento automático (se usa WhatsApp manual).
- Pasarela de pagos.
- Backend / base de datos (landing estática + WhatsApp).
