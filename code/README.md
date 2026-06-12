This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Agendamiento online (Cal.com)

El selector de citas (`#agendar`) usa el embed gratuito de **Cal.com**. Config manual,
una sola vez:

1. Crear cuenta gratis en cal.com con username `qmc-medisuport` (o el que se use).
2. Conectar el Google Calendar de la clínica (sync 2-vías, bloquea slots ocupados).
3. Crear un event-type por especialidad con **slug = slug de la especialidad**
   (`pediatria`, `medicina-general`, `gastroenterologia`, `traumatologia`, `fisiatria`,
   `rehabilitacion`, `laboratorio-clinico`): duración, ubicación = dirección de la clínica,
   precio en la descripción, **disponibilidad propia por especialidad**, zona
   `America/Guayaquil`.
4. Booking questions: nombre, email, **WhatsApp (requerido)**, motivo (opcional).
5. Poner el username en `.env.local`:
   ```bash
   NEXT_PUBLIC_CAL_USERNAME=qmc-medisuport
   ```

Gestión (cancelar/confirmar/reagendar, habilitar/ocultar especialidades, horarios) se hace
en el panel de Cal.com — sin tocar código. Para sacar una especialidad del sitio sin tocar
Cal.com, agregá su slug a `NOT_BOOKABLE` en `lib/booking.ts`.
