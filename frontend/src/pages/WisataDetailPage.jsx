import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Users, CheckCircle, XCircle, MessageCircle, ArrowLeft, Clock } from "lucide-react";
import { tourPackages } from "../data/tourPackages";
import { buildWhatsAppUrl, WA_MESSAGES, formatPrice } from "../utils/whatsapp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWAButton from "../components/FloatingWAButton";
import Breadcrumb from "../components/Breadcrumb";
import StickyBookingCard from "../components/StickyBookingCard";
import CTABanner from "../components/CTABanner";
import SEO from "../components/SEO";
import { schemaTouristTrip, schemaBreadcrumb } from "../utils/schema";

export default function WisataDetailPage() {
  const { slug } = useParams();
  const pkg = tourPackages.find(p => p.slug === slug);

  if (!pkg) return <Navigate to="/wisata" replace />;

  const waMsg = WA_MESSAGES.wisata(pkg.name, "", "");

  return (
    <div className="min-h-screen bg-stone-50 pt-16">
      <SEO
        title={`${pkg.name} dari Jember | ${pkg.type} Mulai Rp ${pkg.price.toLocaleString("id-ID")}`}
        description={`${pkg.type} ${pkg.name} dari Jember. ${pkg.highlights.slice(0,3).join(", ")}. Sudah termasuk transport, guide, tiket. Mulai Rp ${pkg.price.toLocaleString("id-ID")}/orang.`}
        keywords={[pkg.name.toLowerCase(), `open trip ${pkg.name.toLowerCase()}`, `wisata ${pkg.name.toLowerCase()} dari jember`, `harga ${pkg.name.toLowerCase()} jember`]}
        url={`/wisata/${pkg.slug}`}
        image={pkg.image}
        schema={[
          schemaTouristTrip(pkg),
          schemaBreadcrumb([{ name: "Paket Wisata", url: "/wisata" }, { name: pkg.name, url: `/wisata/${pkg.slug}` }]),
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative h-80 sm:h-[420px] flex items-end" data-testid="page-hero">
        <div className="absolute inset-0">
          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <Breadcrumb items={[{ label: "Wisata", href: "/wisata" }, { label: pkg.name }]} />
          <div className="mt-3">
            <span className={`inline-block text-xs font-medium font-sans px-3 py-1 rounded-full mb-2 ${pkg.type === "Open Trip" ? "bg-green-500 text-white" : "bg-amber-500 text-stone-900"}`}>
              {pkg.type}
            </span>
            <h1 className="font-heading font-extrabold text-white text-2xl sm:text-4xl mb-3 leading-tight">{pkg.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm font-sans text-white/80 mb-4">
              <span className="flex items-center gap-1.5"><Calendar size={14} />{pkg.duration}</span>
              <span className="flex items-center gap-1.5"><Users size={14} />Min. {pkg.minPax} orang</span>
            </div>
            <a href={buildWhatsAppUrl(waMsg)} target="_blank" rel="noopener noreferrer"
              data-testid="hero-wa-btn"
              className="hidden sm:inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-medium font-sans text-sm transition-all duration-200">
              <MessageCircle size={16} />Tanya Paket via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Mobile CTA */}
      <div className="sm:hidden bg-white border-b border-stone-100 px-4 py-3">
        <a href={buildWhatsAppUrl(waMsg)} target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white py-3 rounded-xl font-medium font-sans text-sm">
          <MessageCircle size={15} />Mulai {formatPrice(pkg.price)} — Tanya via WA
        </a>
      </div>

      {/* Body */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-7">
            {/* Deskripsi */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="font-heading font-bold text-stone-900 text-xl mb-3">Tentang Paket Ini</h2>
              <p className="font-sans text-stone-600 leading-relaxed">{pkg.description}</p>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100">
              <h2 className="font-heading font-bold text-stone-900 text-xl mb-5">Rundown Perjalanan</h2>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-stone-100" />
                <div className="space-y-4">
                  {pkg.itinerary.map((item, i) => (
                    <div key={i} className="flex gap-4 relative">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                        <Clock size={16} className="text-white" />
                      </div>
                      <div className="flex-1 pb-1">
                        <p className="font-heading font-semibold text-stone-900 text-sm">{item.time}</p>
                        <p className="font-sans text-stone-600 text-sm mt-0.5">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Include / Exclude */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-6 border border-stone-100">
                <h2 className="font-heading font-bold text-stone-900 text-lg mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-teal-500" />Sudah Termasuk
                </h2>
                <ul className="space-y-2">
                  {pkg.includes.map(item => (
                    <li key={item} className="flex items-start gap-2 font-sans text-stone-600 text-sm">
                      <CheckCircle size={14} className="text-teal-500 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-100">
                <h2 className="font-heading font-bold text-stone-900 text-lg mb-4 flex items-center gap-2">
                  <XCircle size={18} className="text-red-400" />Belum Termasuk
                </h2>
                <ul className="space-y-2">
                  {pkg.excludes.map(item => (
                    <li key={item} className="flex items-start gap-2 font-sans text-stone-600 text-sm">
                      <XCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ */}
            {pkg.faqs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-stone-100">
                <h2 className="font-heading font-bold text-stone-900 text-xl mb-4">FAQ Paket Ini</h2>
                <div className="space-y-4">
                  {pkg.faqs.map((f, i) => (
                    <div key={i} className="border-b border-stone-100 pb-4 last:border-0 last:pb-0">
                      <p className="font-heading font-semibold text-stone-900 text-sm mb-1">{f.q}</p>
                      <p className="font-sans text-stone-600 text-sm">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link to="/wisata" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 font-sans text-sm transition-colors">
              <ArrowLeft size={15} />Kembali ke semua paket wisata
            </Link>
          </div>

          {/* RIGHT: Sticky */}
          <div className="hidden lg:block">
            <StickyBookingCard
              price={pkg.price}
              info={[
                { icon: Calendar, label: "Durasi", value: pkg.duration },
                { icon: Users, label: "Min. Peserta", value: `${pkg.minPax} orang` },
                { icon: Clock, label: "Tipe Trip", value: pkg.type },
              ]}
              waMessage={waMsg}
              ctaLabel="Tanya Paket via WhatsApp"
              note="Harga per orang. Hubungi admin untuk harga grup."
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
                  {formatPrice(pkg.price)}<span className="text-sm font-normal text-stone-500"> / orang</span>
                </p>
              </div>
              <span className={`text-xs font-medium font-sans px-2.5 py-1 rounded-full ${
                pkg.type === "Open Trip" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
              }`}>{pkg.type}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4 border-t border-stone-200 pt-4">
              <div className="text-center">
                <Calendar size={16} className="text-amber-500 mx-auto mb-1" />
                <p className="font-sans text-xs text-stone-400">Durasi</p>
                <p className="font-sans text-xs font-semibold text-stone-800">{pkg.duration}</p>
              </div>
              <div className="text-center">
                <Users size={16} className="text-amber-500 mx-auto mb-1" />
                <p className="font-sans text-xs text-stone-400">Min. Peserta</p>
                <p className="font-sans text-xs font-semibold text-stone-800">{pkg.minPax} orang</p>
              </div>
              <div className="text-center">
                <Clock size={16} className="text-amber-500 mx-auto mb-1" />
                <p className="font-sans text-xs text-stone-400">Tipe</p>
                <p className="font-sans text-xs font-semibold text-stone-800">{pkg.type}</p>
              </div>
            </div>
            <a href={buildWhatsAppUrl(waMsg)} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded-xl font-medium font-sans text-sm transition-all duration-200">
              <MessageCircle size={16} />Tanya Paket via WhatsApp
            </a>
            <p className="text-center font-sans text-xs text-stone-400 mt-2">Harga per orang. Hubungi admin untuk harga grup.</p>
          </div>
        </div>
      </div>

      <CTABanner />
      <Footer />
      <FloatingWAButton />
    </div>
  );
}
