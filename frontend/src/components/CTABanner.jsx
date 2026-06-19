import { MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppUrl, WA_MESSAGES } from "../utils/whatsapp";
import { siteConfig } from "../data/siteConfig";

export default function CTABanner() {
  const waUrl = buildWhatsAppUrl(WA_MESSAGES.general);

  return (
    <section
      id="cta-banner"
      className="py-16 sm:py-24 bg-amber-500"
      data-testid="cta-section"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-animate>
          <h2 className="font-heading font-extrabold text-stone-900 text-2xl sm:text-4xl mb-4 leading-tight">
            Ada Pertanyaan atau Siap Memesan?
          </h2>
          <p className="font-sans text-stone-700 text-base sm:text-lg mb-8 max-w-lg mx-auto">
            Tim kami siap membantu melalui WhatsApp, setiap hari dari pagi hingga malam.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-banner-wa-btn"
              className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-2xl font-medium font-sans text-base transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <MessageCircle size={20} />
              Hubungi Kami via WhatsApp
            </a>
            <a
              href={`tel:+${siteConfig.whatsappNumber}`}
              data-testid="cta-banner-phone-btn"
              className="inline-flex items-center justify-center gap-2 bg-stone-900/20 hover:bg-stone-900/30 text-stone-900 border border-stone-900/20 px-8 py-4 rounded-2xl font-medium font-sans text-base transition-all duration-200 hover:-translate-y-1"
            >
              <Phone size={20} />
              Telepon Langsung
            </a>
          </div>

          <p className="mt-5 font-sans text-stone-700/70 text-sm">
            {siteConfig.operatingHours}
          </p>
        </div>
      </div>
    </section>
  );
}
