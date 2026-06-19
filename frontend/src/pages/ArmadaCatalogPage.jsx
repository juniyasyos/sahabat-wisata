import { Link } from "react-router-dom";
import { Users, CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { fleets } from "../data/fleets";
import { buildWhatsAppUrl, WA_MESSAGES } from "../utils/whatsapp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWAButton from "../components/FloatingWAButton";
import PageHero from "../components/PageHero";
import CTABanner from "../components/CTABanner";
import FAQSection from "../components/FAQSection";
import { MessageCircle as MC2, ClipboardList, CheckCircle2, Navigation } from "lucide-react";
import SEO from "../components/SEO";
import { schemaItemList, schemaBreadcrumb } from "../utils/schema";

const howToSteps = [
  { icon: MC2, title: "Hubungi Admin WA", desc: "Ceritakan kebutuhan Anda: tujuan, tanggal, berapa hari, dan berapa orang." },
  { icon: ClipboardList, title: "Pilih Armada & Diskusi Harga", desc: "Admin akan rekomendasikan armada yang paling sesuai beserta penawaran harga terbaik." },
  { icon: CheckCircle2, title: "Konfirmasi & DP", desc: "Setujui penawaran dan lakukan DP untuk konfirmasi booking armada." },
  { icon: Navigation, title: "Siap Berangkat!", desc: "Driver tiba tepat waktu di lokasi Anda pada hari yang disepakati." },
];

export default function ArmadaCatalogPage() {
  const activeFleets = fleets.filter(f => f.isActive);

  return (
    <div className="min-h-screen bg-stone-50">
      <SEO
        title="Sewa Armada dengan Driver di Jember | Hiace, Innova, Avanza"
        description="Rental Hiace, Innova, Avanza dengan driver berpengalaman di Jember. Untuk wisata, perjalanan dinas, rombongan. Harga transparan. Hubungi WA."
        keywords={["sewa hiace jember", "sewa innova jember", "sewa mobil jember", "rental mobil jember driver", "sewa armada jember", "sewa minibus jember"]}
        url="/sewa-armada"
        schema={[
          schemaBreadcrumb([{ name: "Sewa Armada", url: "/sewa-armada" }]),
          schemaItemList(activeFleets.map(f => ({ name: `Sewa ${f.name}`, url: `/sewa-armada/${f.slug}`, image: f.image, shortDescription: f.shortDescription }))),
        ]}
      />
      <Navbar />
      <PageHero
        title="Sewa Armada dengan Driver"
        subtitle="Rental kendaraan + driver profesional untuk wisata, perjalanan dinas, atau event khusus."
        image="https://images.unsplash.com/photo-1534011056808-50c1c6082fe7?w=1600&q=80"
        badge="Sewa Armada"
        breadcrumbs={[{ label: "Sewa Armada" }]}
        height="h-60 sm:h-72"
      />

      {/* Trust */}
      <div className="bg-white border-b border-stone-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 text-sm font-sans text-stone-500">
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" />Termasuk Driver</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" />Armada Terawat</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" />Harga Transparan</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-teal-500" />Tersedia 24 Jam</span>
          </div>
        </div>
      </div>

      {/* Grid Armada */}
      <section className="py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-stone-900">Pilihan Armada</h2>
            <p className="font-sans text-stone-500 text-sm mt-1">{activeFleets.length} armada tersedia untuk disewa</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeFleets.map(fleet => (
              <div key={fleet.id} className="bg-white rounded-2xl overflow-hidden border border-stone-100 card-hover" data-testid={`fleet-card-${fleet.slug}`}>
                <div className="relative h-44 overflow-hidden">
                  <img src={fleet.image} alt={fleet.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading font-semibold text-stone-900 text-lg">{fleet.name}</h3>
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-sans font-medium px-2 py-0.5 rounded-full">
                      <Users size={10} />{fleet.capacity} Seat
                    </span>
                  </div>
                  <p className="font-sans text-stone-500 text-sm mb-3">{fleet.shortDescription}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {fleet.facilities.map(f => (
                      <span key={f} className="inline-flex items-center gap-1 bg-stone-50 text-stone-600 text-xs font-sans px-2 py-0.5 rounded-lg border border-stone-100">
                        <CheckCircle size={9} className="text-teal-500" />{f}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a href={buildWhatsAppUrl(WA_MESSAGES.armada(fleet.name, "", "", ""))}
                      target="_blank" rel="noopener noreferrer"
                      data-testid={`fleet-wa-${fleet.slug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-xl text-sm font-medium font-sans transition-all duration-200">
                      <MessageCircle size={14} />Tanya Harga
                    </a>
                    <Link to={`/sewa-armada/${fleet.slug}`}
                      className="px-3 py-2.5 border border-stone-200 hover:bg-stone-50 rounded-xl text-stone-600 transition-colors">
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Sewa */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium font-sans px-3 py-1 rounded-full mb-3">Cara Sewa</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-stone-900">Mudah Sewa Armada via WhatsApp</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToSteps.map((step, i) => (
              <div key={i} className="text-center" data-animate>
                <div className="relative inline-flex mb-5">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center">
                    <step.icon size={28} className="text-amber-600" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-stone-900 text-white text-xs font-bold rounded-full flex items-center justify-center">{i+1}</span>
                </div>
                <h3 className="font-heading font-semibold text-stone-900 text-base mb-2">{step.title}</h3>
                <p className="font-sans text-stone-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <CTABanner />
      <Footer />
      <FloatingWAButton />
    </div>
  );
}
