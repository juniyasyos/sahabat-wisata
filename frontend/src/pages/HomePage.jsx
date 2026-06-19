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

export default function HomePage() {
  return (
    <div data-testid="app-root">
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
