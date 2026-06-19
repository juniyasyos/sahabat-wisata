import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWAButton from "../components/FloatingWAButton";
import SEO from "../components/SEO";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <SEO
        title="Halaman Tidak Ditemukan (404)"
        description="Halaman yang Anda cari tidak ditemukan. Kembali ke beranda Sahabat Wisata Jember untuk layanan travel, wisata, dan sewa armada."
        url="/404"
      />
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <p className="font-heading font-extrabold text-amber-500 text-8xl mb-4">404</p>
          <h1 className="font-heading font-bold text-stone-900 text-2xl mb-3">Halaman Tidak Ditemukan</h1>
          <p className="font-sans text-stone-500 text-base mb-8">
            Halaman yang Anda cari tidak ada atau sudah dipindahkan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-900 px-6 py-3 rounded-xl font-medium font-sans text-sm transition-all duration-200">
              <Home size={16} />Kembali ke Beranda
            </Link>
            <button onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 px-6 py-3 rounded-xl font-medium font-sans text-sm transition-all duration-200">
              <ArrowLeft size={16} />Kembali
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingWAButton />
    </div>
  );
}
