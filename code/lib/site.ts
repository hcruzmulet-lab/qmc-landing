export const site = {
  legalName: "Medisuport International Medical Support S.A.",
  brand: "QMC Medisuport",
  phone: "(02) 224-7429",
  phoneE164: "+59322247429",
  whatsapp: "0958875624",
  whatsappE164: "593958875624", // sin +, usado en el link wa.me
  email: "info@quitomedicalcenter.com",
  instagram: "https://instagram.com/clinicaqmc",
  instagramHandle: "@clinicaqmc",
  address: "Gaspar de Cañero E10-114 y Av. 6 de Diciembre, Quito, Pichincha",
  // TODO(content): confirmar horarios reales con la clínica antes del lanzamiento
  hours: "Lun–Vie 8:00–18:00 · Sáb 8:00–13:00",
  mapsQuery: "Quito Medical Center, Av. 6 de Diciembre, Quito",
  // Aseguradoras aceptadas — confirmar lista real con la clínica
  insurances: [
    "Salud S.A.",
    "BMI",
    "Humana",
    "Ecuasanitas",
    "MediKen",
  ] as string[],
  // Sello sanitario / permiso de funcionamiento — confirmar número real
  permits: {
    label: "Permiso de funcionamiento ARCSA",
    // TODO(content): número de registro real
    number: "",
  },
} as const;
