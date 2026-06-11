export type Doctor = {
  id: string;
  nombre: string;
  foto: string; // ruta en public/, p.ej. /doctors/nombre.jpg
  credenciales: string;
  especialidades: string[]; // slugs de lib/specialties.ts
  bio: string;
};

// Poblar con los médicos reales (fotos en code/public/doctors/).
// Vacío por ahora: los componentes manejan la ausencia con gracia.
export const doctors: Doctor[] = [];

export function getDoctorsForSpecialty(
  slug: string,
  source: Doctor[] = doctors
): Doctor[] {
  return source.filter((d) => d.especialidades.includes(slug));
}
