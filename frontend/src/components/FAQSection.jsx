import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../data/faqs";

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-stone-50" data-testid="faq-section">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10" data-animate>
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium font-sans px-3 py-1 rounded-full mb-3">
            FAQ
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-stone-900 mb-2">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="font-sans text-stone-500 text-sm sm:text-base">
            Tidak menemukan jawaban? Langsung tanya ke admin WA kami.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-stone-100 overflow-hidden transition-all duration-200 hover:border-amber-200"
                data-animate
                data-testid={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  data-testid={`faq-toggle-${faq.id}`}
                >
                  <span className="font-heading font-semibold text-stone-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-stone-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-96" : "max-h-0"}`}
                >
                  <p className="px-6 pb-4 font-sans text-stone-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
