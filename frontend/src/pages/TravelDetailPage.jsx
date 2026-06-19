import { useParams, Link, Navigate } from "react-router-dom";
import { Clock, MapPin, CheckCircle, XCircle, MessageCircle, ArrowLeft, Users } from "lucide-react";
import { travelRoutes } from "../data/travelRoutes";
import { buildWhatsAppUrl, WA_MESSAGES, formatPrice } from "../utils/whatsapp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWAButton from "../components/FloatingWAButton";
import Breadcrumb from "../components/Breadcrumb";
import StickyBookingCard from "../components/StickyBookingCard";
import CTABanner from "../components/CTABanner";
import SEO from "../components/SEO";
import { schemaTravelRoute, schemaBreadcrumb } from "../utils/schema";

export default function TravelDetailPage() {
  const { slug } = useParams();
  const route = travelRoutes.find(r => r.slug === slug);

  if (!route) return <Navigate to="/travel" replace />;

  const waMsg = WA_MESSAGES.travel(route.origin, route.destination, "", "");

  return (
    <div className="min-h-screen bg-stone-50">
      <SEO
        title={`Travel ${route.origin} ${route.destination} Door-to-Door | Mulai ${formatPrice(route.basePrice)}`}
        description={`Travel ${route.origin}–${route.destination} mulai Rp ${route.basePrice.toLocaleString("id-ID")}/orang. Door-to-door, ${route.schedules.length}x keberangkatan/hari. Armada ber-AC, driver profesional. Pesan via WA.`}
        keywords={[`travel ${route.origin.toLowerCase()} ${route.destination.toLowerCase()}`, `jadwal travel ${route.origin.toLowerCase()}`, `harga travel ${route.destination.toLowerCase()} ${route.origin.toLowerCase()}`]}
        url={`/travel/${route.slug}`}
        image={route.image}
        schema={[
          schemaTravelRoute(route),
          schemaBreadcrumb([{ name: "Travel Antar Kota", url: "/travel" }, { name: route.name, url: `/travel/${route.slug}` }]),
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-end" data-testid="page-hero">
        <div className="absolute inset-0">
          <img src={route.image} alt={route.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/40 to-stone-900/10" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Breadcrumb items={[{ label: "Travel", href: "/travel" }, { label: route.name }]} />
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-block bg-amber-500 text-stone-900 text-xs font-medium font-sans px-3 py-1 rounded-full mb-2">
                Travel Reguler
              </span>
              <h1 className="font-heading font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight">
                {route.origin} <span className="text-amber-400">→</span> {route.destination}
              </h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm font-sans text-white/80">
                <span className="flex items-center gap-1.5"><Clock size={14} />{route.estimatedDuration}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} />Door-to-Door</span>
                <span className="flex items-center gap-1.5"><Users size={14} />{route.schedules.length}x keberangkatan/hari</span>
              </div>
            </div>
            <a href={buildWhatsAppUrl(waMsg)} target="_blank" rel="noopener noreferrer"
              data-testid="hero-wa-btn"
              className="hidden sm:flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-3 rounded-xl font-medium font-sans text-sm transition-all duration-200">
              <MessageCircle size={16} />Pesan via WA
            </a>
          </div>
        </div>
      </section>

      {/* Mobile CTA */}
      <div className="sm:hidden bg-white border-b border-stone-100 px-4 py-3">
        <a href={buildWhatsAppUrl(waMsg)} target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white py-3 rounded-xl font-medium font-sans text-sm">
          <MessageCircle size={15} />Mulai dari {formatPrice(route.basePrice)} — Pesan via WA
        </a>
      </div>

      {/* Body */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Detail */}
          <div className="lg:col-span-2 space-y-8">
            {/* Deskripsi */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="font-heading font-bold text-stone-900 text-xl mb-3">Tentang Rute Ini</h2>
              <p className="font-sans text-stone-600 leading-relaxed">{route.description}</p>
            </div>

            {/* Jadwal */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="font-heading font-bold text-stone-900 text-xl mb-4">Jadwal Keberangkatan</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {route.schedules.map(s => (
                  <div key={s} className="flex items-center gap-3 bg-amber-50 rounded-xl p-3">
                    <Clock size={16} className="text-amber-600 flex-shrink-0" />
                    <span className="font-heading font-semibold text-stone-900 text-sm">{s}</span>
                  </div>
                ))}
              </div>
              <p className="font-sans text-stone-400 text-xs mt-3">*Jadwal dapat berubah. Konfirmasi via WhatsApp.</p>
            </div>

            {/* Titik Penjemputan */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="font-heading font-bold text-stone-900 text-xl mb-4">Area Penjemputan ({route.origin})</h2>
              <div className="space-y-3">
                {route.pickupPoints.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-stone-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <MapPin size={15} className="text-amber-500 flex-shrink-0" />
                      <span className="font-sans text-stone-700 text-sm">{p.area}</span>
                    </div>
                    <span className={`font-sans text-sm font-medium ${p.extraFee === 0 ? "text-teal-600" : "text-stone-600"}`}>
                      {p.extraFee === 0 ? "Gratis" : `+ ${formatPrice(p.extraFee)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Titik Tujuan */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="font-heading font-bold text-stone-900 text-xl mb-4">Area Pengantaran ({route.destination})</h2>
              <div className="space-y-3">
                {route.dropPoints.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-stone-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <MapPin size={15} className="text-teal-500 flex-shrink-0" />
                      <span className="font-sans text-stone-700 text-sm">{p.area}</span>
                    </div>
                    <span className={`font-sans text-sm font-medium ${p.extraFee === 0 ? "text-teal-600" : "text-stone-600"}`}>
                      {p.extraFee === 0 ? "Gratis" : `+ ${formatPrice(p.extraFee)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fasilitas */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="font-heading font-bold text-stone-900 text-xl mb-4">Fasilitas</h2>
              <div className="grid grid-cols-2 gap-3">
                {route.facilities.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-teal-500 flex-shrink-0" />
                    <span className="font-sans text-stone-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kebijakan */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="font-heading font-bold text-stone-900 text-xl mb-4">Kebijakan Pemesanan</h2>
              <ul className="space-y-2">
                {route.policies.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-stone-600 text-sm">
                    <span className="w-5 h-5 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium text-stone-500">{i+1}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Back */}
            <Link to="/travel" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 font-sans text-sm transition-colors">
              <ArrowLeft size={15} />Kembali ke semua rute
            </Link>
          </div>

          {/* RIGHT: Sticky booking card */}
          <div className="hidden lg:block">
            <StickyBookingCard
              title={route.name}
              price={route.basePrice}
              info={[
                { icon: Clock, label: "Estimasi Waktu", value: route.estimatedDuration },
                { icon: MapPin, label: "Sistem Pengantaran", value: "Door-to-Door" },
                { icon: Users, label: "Keberangkatan", value: `${route.schedules.length}x per hari` },
              ]}
              waMessage={waMsg}
              ctaLabel="Pesan Sekarang via WhatsApp"
              note="Harga final tergantung titik jemput & tujuan"
            />
          </div>
        </div>
      </div>

      {/* Mobile Booking Summary */}
      <div className="lg:hidden bg-white border-t border-stone-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-sans text-xs text-stone-400 mb-0.5">Mulai dari</p>
                <p className="font-heading font-extrabold text-stone-900 text-2xl">
                  {formatPrice(route.basePrice)}<span className="text-sm font-normal text-stone-500"> / orang</span>
                </p>
              </div>
              <span className="bg-amber-100 text-amber-700 text-xs font-medium font-sans px-2.5 py-1 rounded-full">Travel Reguler</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4 border-t border-stone-200 pt-4">
              <div className="text-center">
                <Clock size={16} className="text-amber-500 mx-auto mb-1" />
                <p className="font-sans text-xs text-stone-400">Durasi</p>
                <p className="font-sans text-xs font-semibold text-stone-800">{route.estimatedDuration}</p>
              </div>
              <div className="text-center">
                <MapPin size={16} className="text-amber-500 mx-auto mb-1" />
                <p className="font-sans text-xs text-stone-400">Sistem</p>
                <p className="font-sans text-xs font-semibold text-stone-800">Door-to-Door</p>
              </div>
              <div className="text-center">
                <Users size={16} className="text-amber-500 mx-auto mb-1" />
                <p className="font-sans text-xs text-stone-400">Jadwal</p>
                <p className="font-sans text-xs font-semibold text-stone-800">{route.schedules.length}x/hari</p>
              </div>
            </div>
            <a href={buildWhatsAppUrl(waMsg)} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded-xl font-medium font-sans text-sm transition-all duration-200">
              <MessageCircle size={16} />Pesan Sekarang via WhatsApp
            </a>
            <p className="text-center font-sans text-xs text-stone-400 mt-2">Harga final tergantung titik jemput &amp; tujuan</p>
          </div>
        </div>
      </div>

      <CTABanner />
      <Footer />
      <FloatingWAButton />
    </div>
  );
}
