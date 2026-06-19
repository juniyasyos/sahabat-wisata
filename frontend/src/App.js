import { useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrustBar from "./components/TrustBar";
import ServicesSection from "./components/ServicesSection";
import RoutesSection from "./components/RoutesSection";
import ToursSection from "./components/ToursSection";
import FleetSection from "./components/FleetSection";
import BookingFlowSection from "./components/BookingFlowSection";
import FAQSection from "./components/FAQSection";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import FloatingWAButton from "./components/FloatingWAButton";
import "./App.css";

function App() {
  // Scroll animation using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App" data-testid="app-root">
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <RoutesSection />
        <ToursSection />
        <FleetSection />
        <BookingFlowSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
      <FloatingWAButton />
    </div>
  );
}

export default App;
