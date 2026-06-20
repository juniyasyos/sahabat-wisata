import { Clock, MapPin, ArrowRight, MessageCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { travelRoutes } from "../data/travelRoutes";
import { buildWhatsAppUrl, WA_MESSAGES, formatPrice } from "../utils/whatsapp";

export default function RoutesSection() {
  const featured = travelRoutes.filter((r) => r.isFeatured && r.isActive);

  return (
    <section id="rute" className="py-10 sm:py-16 lg:py-24 bg-stone-50" data-testid="routes-section">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4" data-animate>
          <div>
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium font-sans px-3 py-1 rounded-full mb-3">
              Rute Populer
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-stone-900">
              Rute Travel Paling Banyak Dipesan
            </h2>
          </div>
          <a
            href="#travel"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium font-sans text-sm whitespace-nowrap transition-colors"
          >
            Lihat Semua Rute <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((route) => {
            const waMsg = WA_MESSAGES.travel(route.origin, route.destination, "", "");
            return (
              <div
                key={route.id}
                className="bg-white rounded-2xl p-6 border border-stone-100 card-hover"
                data-animate
                data-testid={`route-card-${route.slug}`}
              >
                {/* Badge */}
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium font-sans px-2.5 py-1 rounded-full mb-4">
                  Travel Reguler
                </span>

                {/* Route title */}
                <h3 className="font-heading font-bold text-stone-900 text-xl mb-3 flex items-center gap-2">
                  <span className="text-stone-600">{route.origin}</span>
                  <span className="text-amber-500 text-lg">→</span>
                  <span>{route.destination}</span>
                </h3>

                {/* Info row */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-stone-500 text-sm font-sans">
                    <Clock size={14} className="text-stone-400" />
                    {route.estimatedDuration}
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-500 text-sm font-sans">
                    <MapPin size={14} className="text-stone-400" />
                    Door-to-Door
                  </div>
                </div>

                {/* Facilities */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {route.facilities.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 bg-stone-50 text-stone-600 text-xs font-sans px-2 py-0.5 rounded-lg border border-stone-100"
                    >
                      <CheckCircle size={10} className="text-teal-500" />
                      {f}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="border-t border-stone-100 pt-4 mb-4">
                  <p className="font-sans text-xs text-stone-400 mb-0.5">Mulai dari</p>
                  <p className="font-heading font-bold text-stone-900 text-xl">
                    {formatPrice(route.basePrice)}
                    <span className="text-sm font-normal text-stone-500"> / orang</span>
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex gap-2">
                  <a
                    href={buildWhatsAppUrl(waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`route-wa-${route.slug}`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-xl text-sm font-medium font-sans transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <MessageCircle size={14} />
                    Pesan via WA
                  </a>
                  <Link
                    to={`/travel/${route.slug}`}
                    data-testid={`route-detail-${route.slug}`}
                    title="Lihat Detail"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
