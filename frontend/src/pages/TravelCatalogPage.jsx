import { Link } from "react-router-dom";
import { Clock, MapPin, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { travelRoutes } from "../data/travelRoutes";
import { buildWhatsAppUrl, WA_MESSAGES, formatPrice } from "../utils/whatsapp";
import PageHero from "../components/PageHero";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FloatingWAButton from "../components/FloatingWAButton";
import FAQSection from "../components/FAQSection";
import SEO from "../components/SEO";
import { schemaItemList, schemaBreadcrumb } from "../utils/schema";

export default function TravelCatalogPage() {
  const routes = travelRoutes.filter(r => r.isActive);

  return (
    <div className="min-h-screen bg-stone-50 pt-16">
      <SEO
        title="Travel Jember Antar Kota | Jadwal & Harga Terbaru"
        description="Jadwal & harga travel Jember ke Surabaya, Malang, Bali, Juanda. Door-to-door setiap hari. Armada ber-AC, driver profesional. Pesan via WhatsApp."
        keywords={["travel jember surabaya", "travel jember malang", "travel jember bali", "travel jember juanda", "travel antar kota jember", "jadwal travel jember"]}
        url="/travel"
        schema={[
          schemaBreadcrumb([{ name: "Travel Antar Kota", url: "/travel" }]),
          schemaItemList(routes.map(r => ({ name: r.name, url: `/travel/${r.slug}`, image: r.image, shortDescription: r.shortDescription }))),
        ]}
      />
      <Navbar />
      <PageHero
        title="Katalog Travel Antar Kota"
        subtitle="Layanan door-to-door dari Jember ke berbagai kota tujuan. Tersedia setiap hari."
        image="https://images.pexels.com/photos/30758874/pexels-photo-30758874.jpeg?auto=compress&cs=tinysrgb&w=1600"
        badge="Travel Reguler"
        breadcrumbs={[{ label: "Travel Antar Kota" }]}
        height="h-60 sm:h-72"
      />

      {/* Stats */}
      <div className="bg-white border-b border-stone-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 text-sm font-sans text-stone-500">
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" /> Door-to-Door Service</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" /> Armada Ber-AC</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" /> Driver Berpengalaman</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" /> Keberangkatan Setiap Hari</span>
          </div>
        </div>
      </div>

      {/* Grid Rute */}
      <section className="py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-stone-900">Semua Rute Tersedia</h2>
              <p className="font-sans text-stone-500 text-sm mt-1">{routes.length} rute aktif tersedia</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {routes.map((route) => (
              <div key={route.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden card-hover" data-testid={`route-card-${route.slug}`}>
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img src={route.image} alt={route.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-white/90 text-stone-700 text-xs font-medium font-sans px-2 py-1 rounded-full">
                    Travel Reguler
                  </span>
                </div>

                <div className="p-5">
                  {/* Route */}
                  <h3 className="font-heading font-bold text-stone-900 text-lg mb-2 flex items-center gap-2">
                    <span className="text-stone-500">{route.origin}</span>
                    <span className="text-amber-500">→</span>
                    <span>{route.destination}</span>
                  </h3>

                  <div className="flex flex-wrap gap-3 text-xs font-sans text-stone-500 mb-3">
                    <span className="flex items-center gap-1"><Clock size={12} />{route.estimatedDuration}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} />Door-to-Door</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {route.facilities.slice(0, 3).map(f => (
                      <span key={f} className="inline-flex items-center gap-1 bg-stone-50 text-stone-600 text-xs font-sans px-2 py-0.5 rounded-lg border border-stone-100">
                        <CheckCircle size={9} className="text-teal-500" />{f}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-stone-100 pt-3 mb-3">
                    <p className="font-sans text-xs text-stone-400">Mulai dari</p>
                    <p className="font-heading font-bold text-stone-900 text-lg">
                      {formatPrice(route.basePrice)}<span className="text-xs font-normal text-stone-500"> / orang</span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <a href={buildWhatsAppUrl(WA_MESSAGES.travel(route.origin, route.destination, "", ""))}
                      target="_blank" rel="noopener noreferrer"
                      data-testid={`route-wa-${route.slug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-xl text-sm font-medium font-sans transition-all duration-200">
                      <MessageCircle size={14} />Pesan WA
                    </a>
                    <Link to={`/travel/${route.slug}`}
                      data-testid={`route-detail-${route.slug}`}
                      className="px-3 py-2.5 border border-stone-200 hover:bg-stone-50 rounded-xl text-stone-600 transition-colors">
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <CTABanner />
      <Footer />
      <FloatingWAButton />
    </div>
  );
}
