import { useParams, Navigate, Link } from "react-router-dom";
import { Users, CheckCircle, MessageCircle, ArrowLeft } from "lucide-react";
import { fleets } from "../data/fleets";
import { buildWhatsAppUrl, WA_MESSAGES } from "../utils/whatsapp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWAButton from "../components/FloatingWAButton";
import Breadcrumb from "../components/Breadcrumb";
import StickyBookingCard from "../components/StickyBookingCard";
import CTABanner from "../components/CTABanner";
import { Calendar, MapPin } from "lucide-react";

const USES = {
  "toyota-hiace-commuter": ["Wisata rombongan keluarga", "Study tour sekolah / kampus", "Gathering kantor", "Perjalanan antar kota jauh", "Acara pernikahan"],
  "innova-reborn": ["Perjalanan bisnis / dinas", "Family trip (2-3 keluarga)", "Airport transfer", "Tour keliling kota", "Pernikahan (mobil pengantar)"],
  "avanza-xenia": ["City tour harian", "Belanja ke pasar / mall", "Antar jemput bandara keluarga", "Keperluan harian personal", "Acara lokal seputar Jember"],
};

export default function ArmadaDetailPage() {
  const { slug } = useParams();
  const fleet = fleets.find(f => f.slug === slug);
  if (!fleet) return <Navigate to="/sewa-armada" replace />;

  const waMsg = WA_MESSAGES.armada(fleet.name, "", "", "");
  const uses = USES[fleet.slug] || ["Wisata", "Perjalanan dinas", "Event"];
  const otherFleets = fleets.filter(f => f.slug !== slug && f.isActive);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-end" data-testid="page-hero">
        <div className="absolute inset-0">
          <img src={fleet.image} alt={fleet.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Breadcrumb items={[{ label: "Sewa Armada", href: "/sewa-armada" }, { label: fleet.name }]} />
          <div className="mt-3">
            <span className="inline-block bg-amber-500 text-stone-900 text-xs font-medium font-sans px-3 py-1 rounded-full mb-2">Sewa Armada</span>
            <h1 className="font-heading font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl mb-2">{fleet.name}</h1>
            <div className="flex items-center gap-4 text-sm font-sans text-white/80">
              <span className="flex items-center gap-1.5"><Users size={14} />{fleet.capacity} Seat</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={14} />Termasuk Driver</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA */}
      <div className="sm:hidden bg-white border-b border-stone-100 px-4 py-3">
        <a href={buildWhatsAppUrl(waMsg)} target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white py-3 rounded-xl font-medium font-sans text-sm">
          <MessageCircle size={15} />Tanya Harga Sewa via WA
        </a>
      </div>

      {/* Body */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-7">
            {/* Info armada */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="font-heading font-bold text-stone-900 text-xl mb-3">Tentang Armada Ini</h2>
              <p className="font-sans text-stone-600 leading-relaxed mb-5">{fleet.shortDescription}</p>
              <div className="grid grid-cols-2 gap-3">
                {fleet.facilities.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-teal-500 flex-shrink-0" />
                    <span className="font-sans text-stone-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cocok untuk */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="font-heading font-bold text-stone-900 text-xl mb-4">Cocok Untuk</h2>
              <ul className="space-y-2">
                {uses.map((u, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                    <span className="font-sans text-stone-700 text-sm">{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Armada lain */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="font-heading font-bold text-stone-900 text-xl mb-4">Armada Lainnya</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {otherFleets.map(f => (
                  <Link key={f.id} to={`/sewa-armada/${f.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-stone-100 hover:border-amber-200 hover:bg-amber-50 transition-all">
                    <img src={f.image} alt={f.name} className="w-14 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <p className="font-heading font-semibold text-stone-900 text-sm">{f.name}</p>
                      <p className="font-sans text-stone-400 text-xs">{f.capacity} seat</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/sewa-armada" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 font-sans text-sm transition-colors">
              <ArrowLeft size={15} />Kembali ke semua armada
            </Link>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:block">
            <StickyBookingCard
              title={fleet.name}
              price={null}
              priceLabel=""
              info={[
                { icon: Users, label: "Kapasitas", value: `${fleet.capacity} Penumpang` },
                { icon: Calendar, label: "Ketersediaan", value: "Setiap Hari" },
                { icon: MapPin, label: "Jangkauan", value: "Seluruh Indonesia" },
              ]}
              waMessage={waMsg}
              ctaLabel="Tanya Harga Sewa via WhatsApp"
              note="Harga tergantung jarak, durasi & ketersediaan"
            />
          </div>
        </div>
      </div>

      <CTABanner />
      <Footer />
      <FloatingWAButton />
    </div>
  );
}
