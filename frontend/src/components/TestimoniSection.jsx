import { Star, Quote } from "lucide-react";
import { testimonials } from "../data/testimonials";

export default function TestimoniSection() {
  return (
    <section id="testimoni" className="py-10 sm:py-16 lg:py-24 bg-stone-50" data-testid="testimoni-section">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10" data-animate>
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium font-sans px-3 py-1 rounded-full mb-3">
            Testimoni
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-stone-900 mb-2">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="font-sans text-stone-500 text-sm sm:text-base">
            Kepercayaan Anda adalah motivasi terbesar kami.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 border border-stone-100 card-hover relative" data-animate>
              <Quote size={28} className="text-amber-100 absolute top-5 right-5" />
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} className={i <= t.rating ? "fill-amber-400 text-amber-400" : "text-stone-200 fill-stone-200"} />
                ))}
              </div>
              <p className="font-sans text-stone-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3 border-t border-stone-100 pt-4">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm font-heading">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-stone-900 text-sm">{t.name}</p>
                  <p className="font-sans text-stone-400 text-xs">{t.route}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
