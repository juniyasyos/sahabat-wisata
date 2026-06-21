import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import PageTransition from "./components/PageTransition";
import "./App.css";

/* Pages */
const HomePage = lazy(() => import("./pages/HomePage"));
const TravelCatalogPage = lazy(() => import("./pages/TravelCatalogPage"));
const TravelDetailPage = lazy(() => import("./pages/TravelDetailPage"));
const WisataCatalogPage = lazy(() => import("./pages/WisataCatalogPage"));
const WisataDetailPage = lazy(() => import("./pages/WisataDetailPage"));
const ArmadaCatalogPage = lazy(() => import("./pages/ArmadaCatalogPage"));
const ArmadaDetailPage = lazy(() => import("./pages/ArmadaDetailPage"));
const RombonganPage = lazy(() => import("./pages/RombonganPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const KontakPage = lazy(() => import("./pages/KontakPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/travel" element={<PageTransition><TravelCatalogPage /></PageTransition>} />
        <Route path="/travel/:slug" element={<PageTransition><TravelDetailPage /></PageTransition>} />
        <Route path="/wisata" element={<PageTransition><WisataCatalogPage /></PageTransition>} />
        <Route path="/wisata/:slug" element={<PageTransition><WisataDetailPage /></PageTransition>} />
        <Route path="/sewa-armada" element={<PageTransition><ArmadaCatalogPage /></PageTransition>} />
        <Route path="/sewa-armada/:slug" element={<PageTransition><ArmadaDetailPage /></PageTransition>} />
        <Route path="/rombongan" element={<PageTransition><RombonganPage /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQPage /></PageTransition>} />
        <Route path="/kontak" element={<PageTransition><KontakPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AnimationObserver />
          <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>}>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
