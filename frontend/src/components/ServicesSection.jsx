import { Bus, Mountain, Car, Users, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { buildWhatsAppUrl } from "../utils/whatsapp";

const services = [
  { icon: Bus, title: "Travel Reguler", desc: "Door-to-door antar kota setiap hari. Jember ke Surabaya, Malang, Bali, dan kota lainnya.", to: "/travel", color: "bg-blue-50 text-blue-600", ctaMsg: "Halo, saya ingin tanya tentang layanan Travel Reguler." },
  { icon: Mountain, title: "Paket Wisata", desc: "Open trip & private trip ke Bromo, Ijen, Papuma, dan destinasi pilihan lainnya.", to: "/wisata", color: "bg-green-50 text-green-600", ctaMsg: "Halo, saya ingin tanya tentang Paket Wisata." },
  { icon: Car, title: "Sewa Armada", desc: "Rental kendaraan dengan driver berpengalaman. Hiace, Innova, Avanza, dan lainnya.", to: "/sewa-armada", color: "bg-amber-50 text-amber-600", ctaMsg: "Halo, saya ingin tanya tentang Sewa Armada." },
  { icon: Users, title: "Rombongan", desc: "Perjalanan grup, study tour, family gathering, dan event perusahaan. Harga spesial.", to: "/rombongan", color: "bg-purple-50 text-purple-600", ctaMsg: "Halo, saya ingin tanya tentang layanan Rombongan." },
];

export default function ServicesSection() {
  return (
    <section id="layanan" className="py-10 sm:py-16 lg:py-24 bg-white" data-testid="services-section">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-animate>
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium font-sans px-3 py-1 rounded-full mb-3">
            Layanan Kami
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-stone-900 mb-3">
            Pilih Layanan yang Sesuai Kebutuhan Anda
          </h2>
          <p className="font-sans text-stone-500 max-w-lg mx-auto text-sm sm:text-base">
            Semua layanan tersedia setiap hari, jemput rumah, antar ke tujuan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="bg-stone-50 rounded-2xl p-6 border border-stone-100 card-hover group"
              data-animate
              data-testid={`service-card-${svc.title.toLowerCase().replace(" ", "-")}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${svc.color}`}>
                <svc.icon size={22} />
              </div>
              <h3 className="font-heading font-semibold text-stone-900 text-lg mb-2">{svc.title}</h3>
              <p className="font-sans text-stone-500 text-sm leading-relaxed mb-4">{svc.desc}</p>
              <Link
                to={svc.to}
                className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 text-sm font-medium font-sans group-hover:gap-2.5 transition-all duration-200"
              >
                Lihat Detail <ArrowRight size={14} />
              </Link>
              <a
                href={buildWhatsAppUrl(svc.ctaMsg)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`service-wa-${svc.title.toLowerCase().replace(" ", "-")}`}
                className="mt-3 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-xl text-sm font-medium font-sans transition-all duration-200 hover:-translate-y-0.5"
              >
                <MessageCircle size={14} />
                Tanya via WA
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
