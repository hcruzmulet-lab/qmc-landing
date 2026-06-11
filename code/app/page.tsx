import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Offer } from "@/components/sections/offer";
import { Services } from "@/components/sections/services";
import { WhyQmc } from "@/components/sections/why-qmc";
import { Testimonials } from "@/components/sections/testimonials";
import { Location } from "@/components/sections/location";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { WhatsAppFab } from "@/components/sections/whatsapp-fab";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Offer />
        <Services />
        <WhyQmc />
        <Testimonials />
        <Location />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
