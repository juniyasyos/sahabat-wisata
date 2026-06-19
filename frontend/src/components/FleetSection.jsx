import { Users, CheckCircle, MessageCircle } from "lucide-react";
import { fleets } from "../data/fleets";
import { buildWhatsAppUrl, WA_MESSAGES, formatPrice } from "../utils/whatsapp";

export default function FleetSection() {
  const featured = fleets.filter((f) => f.isActive);

  return (
    <section id="armada" className="py-10 sm:py-16 lg:py-24 bg-stone-50" data-testid="fleet-section">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10" data-animate>
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium font-sans px-3 py-1 rounded-full mb-3">
            Armada Kami
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-stone-900 mb-2">
            Kendaraan Nyaman & Terawat
          </h2>
          <p className="font-sans text-stone-500 text-sm sm:text-base max-w-md mx-auto">
            Semua armada rutin di-servis dan dilengkapi fasilitas untuk kenyamanan perjalanan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((fleet) => {
            const waMsg = WA_MESSAGES.armada(fleet.name, "", "", "");
            return (
              <div
                key={fleet.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-100 card-hover"
                data-animate
                data-testid={`fleet-card-${fleet.slug}`}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={fleet.image}
                    alt={fleet.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading font-semibold text-stone-900 text-lg">{fleet.name}</h3>
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-sans font-medium px-2 py-0.5 rounded-full">
                      <Users size={11} />
                      {fleet.capacity} Seat
                    </span>
                  </div>

                  <p className="font-sans text-stone-500 text-sm mb-3 leading-relaxed">{fleet.shortDescription}</p>

                  {/* Facilities */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {fleet.facilities.map((f) => (
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
                  {fleet.basePrice && (
                    <div className="border-t border-stone-100 pt-3 mb-3">
                      <p className="font-sans text-xs text-stone-400">Mulai dari</p>
                      <p className="font-heading font-bold text-stone-900 text-lg">
                        {formatPrice(fleet.basePrice)}
                        <span className="text-xs font-normal text-stone-500"> / {fleet.priceNote || "hari"}</span>
                      </p>
                    </div>
                  )}

                  <a
                    href={buildWhatsAppUrl(waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`fleet-wa-${fleet.slug}`}
                    className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-xl font-medium font-sans text-sm transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <MessageCircle size={14} />
                    Tanya Sewa via WA
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
