import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Insurances } from "@/components/sections/insurances";
import { site } from "@/lib/site";

describe("Insurances section", () => {
  it("muestra el título y cada aseguradora de site.insurances", () => {
    render(<Insurances />);
    expect(screen.getByRole("heading", { name: /seguros/i })).toBeTruthy();
    for (const name of site.insurances) {
      expect(screen.getByText(name)).toBeTruthy();
    }
  });
});
