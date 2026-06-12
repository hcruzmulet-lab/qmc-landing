import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { SpecialtiesShowcase } from "@/components/sections/specialties-showcase";
import { About } from "@/components/sections/about";
import { Offer } from "@/components/sections/offer";
import { HowToBook } from "@/components/shared/how-to-book";
import { MedicalTeam } from "@/components/sections/medical-team";
import { WhyQmc } from "@/components/sections/why-qmc";
import { Testimonials } from "@/components/sections/testimonials";
import { InstagramCta } from "@/components/sections/instagram-cta";
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
      <main className="pb-20 lg:pb-0">
        <Hero />
        <SpecialtiesShowcase />
        <About />
        <WhyQmc />
        <Offer />
        <HowToBook />
        <MedicalTeam />
        <Testimonials />
        <Faq />
        <InstagramCta />
        <B2bTeaser />
        <Location />
      </main>
      <Footer />
      <WhatsAppFab />
      <StickyMobileCta />
    </>
  );
}
