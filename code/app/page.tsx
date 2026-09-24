import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { SpecialtiesShowcase } from "@/components/sections/specialties-showcase";
import { About } from "@/components/sections/about";
import { B2bTeaser } from "@/components/sections/b2b-teaser";
import { Location } from "@/components/sections/location";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { WhatsAppFab } from "@/components/sections/whatsapp-fab";
import { StickyMobileCta } from "@/components/sections/sticky-mobile-cta";

export default function Home() {
  return (
    <>
      <Header />
      {/* overflow-x-clip: los Reveal laterales (x ±36px) no generan scroll
          horizontal en móvil. Ocultos por ahora: Testimonios (hasta tener reseñas
          reales) y Promociones (la clínica pidió no publicar precios). */}
      <main className="overflow-x-clip pb-20 lg:pb-0">
        <Hero />
        <SpecialtiesShowcase />
        <About />
        <Faq />
        <B2bTeaser />
        <Location />
      </main>
      <Footer />
      <WhatsAppFab />
      <StickyMobileCta />
    </>
  );
}
