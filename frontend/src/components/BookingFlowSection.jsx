import { MessageCircle, ClipboardList, CheckCircle2, Navigation } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    num: "01",
    title: "Hubungi via WhatsApp",
    desc: "Klik tombol WhatsApp dan ceritakan kebutuhan perjalanan Anda.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: ClipboardList,
    num: "02",
    title: "Pilih Layanan & Jadwal",
    desc: "Admin akan membantu memilih rute, armada, atau paket yang paling sesuai.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: CheckCircle2,
    num: "03",
    title: "Konfirmasi & Bayar DP",
    desc: "Konfirmasi pesanan dan lakukan pembayaran DP sesuai ketentuan.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Navigation,
    num: "04",
    title: "Siap Berangkat!",
    desc: "Driver kami akan menjemput tepat waktu di lokasi yang disepakati.",
    color: "bg-green-50 text-green-600",
  },
];

export default function BookingFlowSection() {
  return (
    <section id="cara-pesan" className="py-16 sm:py-24 bg-white" data-testid="booking-section">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-animate>
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium font-sans px-3 py-1 rounded-full mb-3">
            Cara Pemesanan
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-stone-900 mb-3">
            Mudah, Cepat, dan Terpercaya
          </h2>
          <p className="font-sans text-stone-500 text-sm sm:text-base max-w-md mx-auto">
            Pesan perjalanan Anda dalam 4 langkah sederhana melalui WhatsApp.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-stone-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={step.num} className="relative text-center group" data-animate>
                {/* Step circle */}
                <div className="relative z-10 inline-flex">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:-translate-y-1 ${step.color}`}>
                    <step.icon size={32} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-stone-900 text-white text-xs font-bold font-heading rounded-full flex items-center justify-center">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-stone-900 text-base mb-2">{step.title}</h3>
                <p className="font-sans text-stone-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
