import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TrustBar from "../components/TrustBar";
import ServicesSection from "../components/ServicesSection";
import RoutesSection from "../components/RoutesSection";
import ToursSection from "../components/ToursSection";
import FleetSection from "../components/FleetSection";
import WhyUsSection from "../components/WhyUsSection";
import BookingFlowSection from "../components/BookingFlowSection";
import TestimoniSection from "../components/TestimoniSection";
import FAQSection from "../components/FAQSection";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";
import FloatingWAButton from "../components/FloatingWAButton";
import SEO from "../components/SEO";
import { schemaLocalBusiness, schemaFAQ } from "../utils/schema";
import { faqs } from "../data/faqs";

export default function HomePage() {
  return (
    <div data-testid="app-root">
      <SEO
        title="Sahabat Wisata Jember | Travel, Wisata & Sewa Armada Terpercaya"
        description="Travel antar kota door-to-door, paket wisata Bromo & Ijen, sewa armada dari Jember. Berpengalaman 5+ tahun. Hubungi WA: 6285732431396. Tersedia setiap hari."
        keywords={["travel jember", "travel jember surabaya", "travel jember malang", "travel jember bali", "wisata bromo jember", "kawah ijen jember", "sewa mobil jember", "sewa hiace jember"]}
        url="/"
        noAppend
        schema={[schemaLocalBusiness(), schemaFAQ(faqs)]}
      />
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <RoutesSection />
        <ToursSection />
        <FleetSection />
        <WhyUsSection />
        <BookingFlowSection />
        <TestimoniSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
      <FloatingWAButton />
    </div>
  );
}
