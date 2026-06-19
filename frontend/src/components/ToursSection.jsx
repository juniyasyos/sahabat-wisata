import { Calendar, Users, CheckCircle, X, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { tourPackages } from "../data/tourPackages";
import { buildWhatsAppUrl, WA_MESSAGES, formatPrice } from "../utils/whatsapp";

export default function ToursSection() {
  const featured = tourPackages.filter((t) => t.isFeatured && t.isActive);

  return (
    <section id="wisata" className="py-10 sm:py-16 lg:py-24 bg-white" data-testid="tours-section">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4" data-animate>
          <div>
            <span className="inline-block bg-green-100 text-green-700 text-xs font-medium font-sans px-3 py-1 rounded-full mb-3">
              Paket Wisata
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-stone-900">
              Paket Wisata Pilihan dari Jember
            </h2>
            <p className="font-sans text-stone-500 text-sm mt-2">
              Berangkat dari Jember, semua sudah diurus.
            </p>
          </div>
          <a
            href="#semua-wisata"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium font-sans text-sm whitespace-nowrap transition-colors"
          >
            Lihat Semua Paket <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featured.map((pkg) => {
            const waMsg = WA_MESSAGES.wisata(pkg.name, "", "");
            return (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-100 card-hover"
                data-animate
                data-testid={`tour-card-${pkg.slug}`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-medium font-sans px-2.5 py-1 rounded-full">
                    Open Trip
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-heading font-bold text-white text-xl">{pkg.name}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="flex items-center gap-1.5 text-stone-500 text-sm font-sans">
                      <Calendar size={14} className="text-stone-400" />
                      {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-stone-500 text-sm font-sans">
                      <Users size={14} className="text-stone-400" />
                      Min. {pkg.minPax} orang
                    </span>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pkg.highlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-sans px-2 py-0.5 rounded-lg"
                      >
                        <CheckCircle size={10} />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="border-t border-stone-100 pt-4 mb-4">
                    <p className="font-sans text-xs text-stone-400 mb-0.5">Mulai dari</p>
                    <p className="font-heading font-bold text-stone-900 text-xl">
                      {formatPrice(pkg.price)}
                      <span className="text-sm font-normal text-stone-500"> / orang</span>
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-2">
                    <a
                      href={buildWhatsAppUrl(waMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`tour-wa-${pkg.slug}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-medium font-sans text-sm transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <MessageCircle size={15} />Tanya WA
                    </a>
                    <Link to={`/wisata/${pkg.slug}`}
                      data-testid={`tour-detail-${pkg.slug}`}
                      className="px-3 py-3 border border-stone-200 hover:bg-stone-50 rounded-xl text-stone-600 transition-colors">
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
