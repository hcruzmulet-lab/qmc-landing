// Promociones del mes — EDITA AQUÍ para actualizar.
// Para cambiar las promos: reemplaza las imágenes en public/promos/ y ajusta
// este arreglo (título, precio, resumen). Si queda vacío, la sección se oculta.

export type Promocion = {
  id: string;
  titulo: string;
  precio: string;
  imagen: string; // ruta en public/promos/
  resumen: string; // línea corta de qué incluye
};

export const promociones: Promocion[] = [
  {
    id: "endoscopia",
    titulo: "Endoscopia digestiva",
    precio: "$232",
    imagen: "/promos/endoscopia.jpg",
    resumen: "Gastroenterología, anestesia, biopsia y estudio histopatológico.",
  },
  {
    id: "colonoscopia",
    titulo: "Colonoscopia",
    precio: "$282",
    imagen: "/promos/colonoscopia.jpg",
    resumen: "Gastroenterología, anestesia, biopsia y estudio histopatológico.",
  },
  {
    id: "endoscopia-colonoscopia",
    titulo: "Endoscopia + Colonoscopia",
    precio: "$512",
    imagen: "/promos/endoscopia-colonoscopia.jpg",
    resumen: "Paquete combinado con estudios preanestésicos y patología.",
  },
  {
    id: "medicina-general",
    titulo: "Medicina General",
    precio: "$10",
    imagen: "/promos/medicina-general.jpg",
    resumen: "Revisión completa + 50% off en 2 citas de especialidades.",
  },
];
