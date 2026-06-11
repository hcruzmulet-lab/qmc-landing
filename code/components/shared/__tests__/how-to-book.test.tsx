import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowToBook } from "@/components/shared/how-to-book";

describe("HowToBook", () => {
  it("muestra los 3 pasos para agendar", () => {
    render(<HowToBook />);
    expect(screen.getByText(/escríbenos por whatsapp/i)).toBeTruthy();
    expect(screen.getByText(/elige tu especialidad y horario/i)).toBeTruthy();
    expect(screen.getByText(/confirma y asiste/i)).toBeTruthy();
  });
});
