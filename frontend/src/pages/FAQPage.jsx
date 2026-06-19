import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { faqs } from "../data/faqs";
import { buildWhatsAppUrl, WA_MESSAGES } from "../utils/whatsapp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWAButton from "../components/FloatingWAButton";
import CTABanner from "../components/CTABanner";
import PageHero from "../components/PageHero";

const CATEGORIES = [
  { id: "all", label: "Semua" },
  { id: "travel", label: "Travel" },
  { id: "wisata", label: "Wisata" },
  { id: "armada", label: "Armada" },
  { id: "pembayaran", label: "Pembayaran" },
  { id: "booking", label: "Pemesanan" },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all" ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <PageHero
        title="Pertanyaan yang Sering Ditanyakan"
        subtitle="Temukan jawaban untuk pertanyaan umum tentang layanan Sahabat Wisata Jember."
        image="https://images.pexels.com/photos/28386069/pexels-photo-28386069.jpeg?auto=compress&cs=tinysrgb&w=1600"
        badge="FAQ"
        breadcrumbs={[{ label: "FAQ" }]}
        height="h-56 sm:h-64"
      />

      <section className="py-12 sm:py-16">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                data-testid={`faq-filter-${cat.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium font-sans transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-amber-500 text-stone-900"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-amber-300"
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filtered.map(faq => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden transition-all hover:border-amber-200"
                  data-testid={`faq-item-${faq.id}`}>
                  <button onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                    data-testid={`faq-toggle-${faq.id}`}>
                    <span className="font-heading font-semibold text-stone-900 text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown size={18} className={`flex-shrink-0 text-stone-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-96" : "max-h-0"}`}>
                    <p className="px-6 pb-4 font-sans text-stone-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Masih ada pertanyaan? */}
          <div className="mt-10 bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
            <p className="font-heading font-bold text-stone-900 text-lg mb-2">Tidak menemukan jawaban yang dicari?</p>
            <p className="font-sans text-stone-600 text-sm mb-4">Tanyakan langsung ke admin kami via WhatsApp, kami siap membantu.</p>
            <a href={buildWhatsAppUrl("Halo, saya punya pertanyaan tentang layanan Sahabat Wisata Jember.")}
              target="_blank" rel="noopener noreferrer"
              data-testid="faq-wa-btn"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-medium font-sans text-sm transition-all duration-200">
              <MessageCircle size={15} />Tanya via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
      <FloatingWAButton />
    </div>
  );
}
