import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

/* Pages */
import HomePage from "./pages/HomePage";
import TravelCatalogPage from "./pages/TravelCatalogPage";
import TravelDetailPage from "./pages/TravelDetailPage";
import WisataCatalogPage from "./pages/WisataCatalogPage";
import WisataDetailPage from "./pages/WisataDetailPage";
import ArmadaCatalogPage from "./pages/ArmadaCatalogPage";
import ArmadaDetailPage from "./pages/ArmadaDetailPage";
import RombonganPage from "./pages/RombonganPage";
import FAQPage from "./pages/FAQPage";
import KontakPage from "./pages/KontakPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimationObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    const refresh = () => {
      document.querySelectorAll("[data-animate]:not(.is-visible)").forEach(el => observer.observe(el));
    };
    refresh();
    const mo = new MutationObserver(refresh);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnimationObserver />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/travel" element={<TravelCatalogPage />} />
          <Route path="/travel/:slug" element={<TravelDetailPage />} />
          <Route path="/wisata" element={<WisataCatalogPage />} />
          <Route path="/wisata/:slug" element={<WisataDetailPage />} />
          <Route path="/sewa-armada" element={<ArmadaCatalogPage />} />
          <Route path="/sewa-armada/:slug" element={<ArmadaDetailPage />} />
          <Route path="/rombongan" element={<RombonganPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/kontak" element={<KontakPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
