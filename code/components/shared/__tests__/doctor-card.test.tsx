import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DoctorCard } from "@/components/shared/doctor-card";
import type { Doctor } from "@/lib/doctors";

const doc: Doctor = {
  id: "d1",
  nombre: "Dra. María Pérez",
  foto: "/doctors/maria.jpg",
  credenciales: "Pediatra · 10 años de experiencia",
  especialidades: ["pediatria"],
  bio: "Especialista en salud infantil con enfoque preventivo.",
};

describe("DoctorCard", () => {
  it("muestra nombre, credenciales, bio y la foto con alt accesible", () => {
    render(<DoctorCard doctor={doc} />);
    expect(screen.getByText("Dra. María Pérez")).toBeTruthy();
    expect(screen.getByText(doc.credenciales)).toBeTruthy();
    expect(screen.getByText(doc.bio)).toBeTruthy();
    const img = screen.getByRole("img", { name: /maría pérez/i });
    expect(img.getAttribute("src")).toContain("maria.jpg");
  });
});
