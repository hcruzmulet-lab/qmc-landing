export const site = {
  legalName: "Medisuport International Medical Support S.A.",
  brand: "QMC Medisuport",
  // Dominio de producción canónico — usado por metadataBase, sitemap, JSON-LD.
  // TODO(content): confirmar dominio final con la clínica (¿con o sin www?).
  url: "https://quitomedicalcenter.com",
  ruc: "1792900468001",
  slogan: "¡Tu Salud Primero!",
  phone: "(02) 224-7429",
  phoneE164: "+59322247429",
  phone2: "(02) 224-7495",
  phone2E164: "+59322247495",
  whatsapp: "0999772499",
  whatsappE164: "593999772499", // sin +, usado en el link wa.me
  email: "info@quitomedicalcenter.com",
  instagram: "https://instagram.com/clinicaqmc",
  instagramHandle: "@clinicaqmc",
  address:
    "Gaspar Cañero E10-114 y Av. 6 de Diciembre, Sector Iñaquito, Quito, Pichincha",
  // Referencia para quien busca: diagonal al Colegio Sebastián de Benalcázar.
  addressReference: "Diagonal al Colegio Sebastián de Benalcázar",
  hours: "Lun–Vie 7:30–18:00 · Sáb 8:00–16:00",
  hoursNote: "Atención por cita previa",
  mapsQuery: "Quito Medical Center, Av. 6 de Diciembre, Quito",
  // Componentes de la dirección para schema.org PostalAddress.
  addressParts: {
    streetAddress: "Gaspar Cañero E10-114 y Av. 6 de Diciembre",
    addressLocality: "Quito",
    addressRegion: "Pichincha",
    addressCountry: "EC",
  },
  // Coordenadas para LocalBusiness/MedicalClinic schema y el mapa.
  // TODO(content): confirmar lat/lng exactas con el pin real de Google Maps.
  geo: { lat: -0.1769, lng: -78.483 },
  // Horario en formato schema.org (OpeningHoursSpecification).
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:30", closes: "18:00" },
    { days: ["Saturday"], opens: "08:00", closes: "16:00" },
  ],
  // Formas de pago reales (carta de presentación).
  paymentMethods: ["Efectivo", "Cheques", "Transferencias bancarias", "Tarjetas de crédito"] as string[],
  // No publicamos lista de aseguradoras: la clínica está abierta a la red de
  // cualquier seguro. Copy genérico y honesto (consultar cobertura).
  insurances: [] as string[],
  // Sello sanitario / permiso de funcionamiento — confirmar número real
  permits: {
    label: "Permiso de funcionamiento ARCSA",
    // TODO(content): número de registro real
    number: "",
  },
} as const;
