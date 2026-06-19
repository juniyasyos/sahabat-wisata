import { MessageCircle, Clock, Calendar } from "lucide-react";
import { buildWhatsAppUrl, formatPrice } from "../utils/whatsapp";

export default function StickyBookingCard({ title, price, priceLabel = "/ orang", info = [], waMessage, ctaLabel = "Pesan via WhatsApp", note }) {
  return (
    <div className="sticky top-24 bg-white rounded-2xl border border-stone-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-amber-500 px-6 py-4">
        <p className="font-sans text-amber-900 text-xs font-medium mb-1">Mulai dari</p>
        <p className="font-heading font-extrabold text-stone-900 text-2xl">
          {formatPrice(price)}
          <span className="text-sm font-normal text-stone-700"> {priceLabel}</span>
        </p>
      </div>

      {/* Info */}
      <div className="px-6 py-4 space-y-3 border-b border-stone-100">
        {info.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-stone-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <item.icon size={15} className="text-stone-500" />
            </div>
            <div>
              <p className="font-sans text-xs text-stone-400">{item.label}</p>
              <p className="font-sans text-sm font-medium text-stone-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 py-4">
        <a
          href={buildWhatsAppUrl(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="sticky-booking-wa-btn"
          className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded-xl font-medium font-sans text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <MessageCircle size={16} />
          {ctaLabel}
        </a>
        {note && (
          <p className="text-center text-stone-400 text-xs mt-2 font-sans">{note}</p>
        )}
      </div>
    </div>
  );
}
