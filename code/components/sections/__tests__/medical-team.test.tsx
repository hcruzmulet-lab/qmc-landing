import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MedicalTeam } from "@/components/sections/medical-team";
import type { Doctor } from "@/lib/doctors";

const team: Doctor[] = [
  { id: "d1", nombre: "Dra. María Pérez", foto: "/doctors/maria.jpg", credenciales: "Pediatra", especialidades: ["pediatria"], bio: "Salud infantil." },
];

describe("MedicalTeam section", () => {
  it("no renderiza nada cuando no hay médicos", () => {
    const { container } = render(<MedicalTeam team={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renderiza el título y las tarjetas cuando hay médicos", () => {
    render(<MedicalTeam team={team} />);
    expect(screen.getByRole("heading", { name: /equipo/i })).toBeTruthy();
    expect(screen.getByText("Dra. María Pérez")).toBeTruthy();
  });
});
