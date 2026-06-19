import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
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

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AnimationObserver />
          <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>}>
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
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
