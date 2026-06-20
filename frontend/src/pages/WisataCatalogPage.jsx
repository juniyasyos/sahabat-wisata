import { Link } from "react-router-dom";
import { Calendar, Users, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { tourPackages } from "../data/tourPackages";
import { buildWhatsAppUrl, WA_MESSAGES, formatPrice } from "../utils/whatsapp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWAButton from "../components/FloatingWAButton";
import PageHero from "../components/PageHero";
import CTABanner from "../components/CTABanner";
import FAQSection from "../components/FAQSection";
import SEO from "../components/SEO";
import { schemaItemList, schemaBreadcrumb } from "../utils/schema";

export default function WisataCatalogPage() {
  const packages = tourPackages.filter(p => p.isActive);

  return (
    <div className="min-h-screen bg-stone-50 pt-16">
      <SEO
        title="Paket Wisata dari Jember | Bromo, Ijen & Pantai Papuma"
        description="Open trip & private trip ke Bromo, Kawah Ijen, Papuma dari Jember. Transport, guide, tiket sudah termasuk. Mulai Rp 150.000/orang. Pesan via WA."
        keywords={["paket wisata jember", "open trip bromo jember", "wisata kawah ijen jember", "open trip ijen jember", "tour bromo dari jember", "wisata pantai papuma jember"]}
        url="/wisata"
        image="https://images.pexels.com/photos/28386069/pexels-photo-28386069.jpeg?w=1200"
        schema={[
          schemaBreadcrumb([{ name: "Paket Wisata", url: "/wisata" }]),
          schemaItemList(packages.map(p => ({ name: p.name, url: `/wisata/${p.slug}`, image: p.image, shortDescription: p.shortDescription }))),
        ]}
      />
      <Navbar />
      <PageHero
        title="Paket Wisata dari Jember"
        subtitle="Open trip & private trip ke destinasi terbaik Jawa Timur. Transport, guide, tiket — sudah semua."
        image="https://images.pexels.com/photos/28386069/pexels-photo-28386069.jpeg?auto=compress&cs=tinysrgb&w=1600"
        badge="Paket Wisata"
        breadcrumbs={[{ label: "Wisata" }]}
        height="h-64 sm:h-80"
      />

      {/* Trust */}
      <div className="bg-white border-b border-stone-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 text-sm font-sans text-stone-500">
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" />Transport Inklusif</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" />Tiket Masuk Sudah Termasuk</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" />Guide Berpengalaman</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" />Open & Private Trip</span>
          </div>
        </div>
      </div>

      {/* Grid Paket */}
      <section className="py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-stone-900">Semua Paket Wisata</h2>
            <p className="font-sans text-stone-500 text-sm mt-1">{packages.length} paket tersedia</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden border border-stone-100 card-hover" data-testid={`tour-card-${pkg.slug}`}>
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                  <span className={`absolute top-3 left-3 text-xs font-medium font-sans px-2.5 py-1 rounded-full ${pkg.type === "Open Trip" ? "bg-green-500 text-white" : "bg-amber-500 text-stone-900"}`}>
                    {pkg.type}
                  </span>
                  <p className="absolute bottom-3 left-3 font-heading font-bold text-white text-lg">{pkg.name}</p>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-3 text-xs font-sans text-stone-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} />{pkg.duration}</span>
                    <span className="flex items-center gap-1"><Users size={12} />Min. {pkg.minPax} orang</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pkg.highlights.slice(0, 3).map(h => (
                      <span key={h} className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-sans px-2 py-0.5 rounded-lg">
                        <CheckCircle size={9} />{h}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-stone-100 pt-3 mb-4">
                    <p className="font-sans text-xs text-stone-400">Mulai dari</p>
                    <p className="font-heading font-bold text-stone-900 text-lg">
                      {formatPrice(pkg.price)}<span className="text-xs font-normal text-stone-500"> / orang</span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={buildWhatsAppUrl(WA_MESSAGES.wisata(pkg.name, "", ""))}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`tour-wa-${pkg.slug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-xl text-sm font-medium font-sans transition-all duration-200"
                    >
                      <MessageCircle size={14} />
                      Tanya Via WA
                    </a>

                    <Link
                      to={`/wisata/${pkg.slug}`}
                      data-testid={`tour-detail-${pkg.slug}`}
                      aria-label={`Lihat detail ${pkg.name}`}
                      className="group flex items-center justify-center gap-1.5 w-11 hover:w-24 py-2.5 border border-stone-200 hover:bg-stone-50 rounded-xl text-stone-600 transition-all duration-300 overflow-hidden"
                    >
                      <ArrowRight
                        size={15}
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                      />

                      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-16 group-hover:opacity-100">
                        Detail
                      </span>
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
