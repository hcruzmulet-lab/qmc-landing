import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InstagramCta } from "@/components/sections/instagram-cta";
import { site } from "@/lib/site";

describe("InstagramCta section", () => {
  it("muestra el handle y enlaza al perfil de Instagram", () => {
    render(<InstagramCta />);
    expect(screen.getByText(site.instagramHandle)).toBeTruthy();
    const link = screen.getByRole("link", { name: /instagram/i });
    expect(link.getAttribute("href")).toBe(site.instagram);
  });
});
