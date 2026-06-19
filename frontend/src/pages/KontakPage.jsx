import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import { siteConfig } from "../data/siteConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWAButton from "../components/FloatingWAButton";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { schemaLocalBusiness, schemaBreadcrumb } from "../utils/schema";

const contactItems = [
  {
    icon: Phone,
    label: "WhatsApp / Telepon",
    value: "+62 857-3243-1396",
    href: `https://wa.me/${siteConfig.whatsappNumber}`,
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contactEmail,
    href: `mailto:${siteConfig.contactEmail}`,
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: MapPin,
    label: "Alamat Kantor",
    value: siteConfig.address,
    href: "#",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: siteConfig.operatingHours,
    href: null,
    color: "bg-green-50 text-green-600",
  },
];

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <SEO
        title="Kontak Sahabat Wisata Jember | WA 0857-3243-1396"
        description="Hubungi Sahabat Wisata Jember via WhatsApp 0857-3243-1396. Kami siap membantu setiap hari 05:00–22:00 WIB untuk travel, wisata, dan sewa armada."
        keywords={["kontak sahabat wisata jember", "whatsapp travel jember", "telepon travel jember", "alamat travel jember"]}
        url="/kontak"
        schema={[
          schemaLocalBusiness(),
          schemaBreadcrumb([{ name: "Kontak", url: "/kontak" }]),
        ]}
      />
      <Navbar />
      <PageHero
        title="Hubungi Kami"
        subtitle="Ada pertanyaan atau ingin memesan? Kami siap membantu setiap hari."
        image="https://images.pexels.com/photos/28386069/pexels-photo-28386069.jpeg?auto=compress&cs=tinysrgb&w=1600"
        badge="Kontak"
        breadcrumbs={[{ label: "Kontak" }]}
        height="h-56 sm:h-64"
      />

      <section className="py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* LEFT: Contact Info */}
            <div>
              <h2 className="font-heading font-bold text-2xl text-stone-900 mb-6">Informasi Kontak</h2>
              <div className="space-y-4">
                {contactItems.map(item => (
                  <div key={item.label} className="bg-white rounded-2xl p-5 border border-stone-100 flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="font-sans text-stone-400 text-xs mb-0.5">{item.label}</p>
                      {item.href && item.href !== "#" ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer"
                          className="font-sans font-medium text-stone-800 hover:text-amber-600 transition-colors text-sm">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-sans font-medium text-stone-800 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WA Direct */}
              <div className="mt-6 bg-teal-500 rounded-2xl p-5 text-center">
                <p className="font-heading font-bold text-white text-lg mb-1">Chat Langsung via WhatsApp</p>
                <p className="font-sans text-white/80 text-sm mb-4">Respons tercepat & paling nyaman.</p>
                <a href={buildWhatsAppUrl("Halo, saya ingin menghubungi Sahabat Wisata Jember.")}
                  target="_blank" rel="noopener noreferrer"
                  data-testid="kontak-wa-btn"
                  className="inline-flex items-center gap-2 bg-white text-teal-600 hover:bg-stone-50 px-6 py-2.5 rounded-xl font-medium font-sans text-sm transition-colors">
                  <MessageCircle size={15} />Mulai Chat WA
                </a>
              </div>
            </div>

            {/* RIGHT: Map placeholder + Form */}
            <div>
              <h2 className="font-heading font-bold text-2xl text-stone-900 mb-6">Kirim Pesan</h2>
              <KontakForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWAButton />
    </div>
  );
}

function KontakForm() {
  const [f, setF] = useState({ name: "", phone: "", topic: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Halo, saya ${f.name}.\n\nTopik: ${f.topic}\nNo. WA/HP: ${f.phone}\n\nPesan:\n${f.message}`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  const inp = "w-full border border-stone-200 rounded-xl py-3 px-4 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all placeholder-stone-400";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-100 p-6 sm:p-7 space-y-4" data-testid="kontak-form">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-sans text-sm font-medium text-stone-700 mb-1.5">Nama Anda *</label>
          <input type="text" required placeholder="Nama lengkap..." className={inp}
            value={f.name} onChange={e => setF({...f, name: e.target.value})} data-testid="kontak-name" />
        </div>
        <div>
          <label className="block font-sans text-sm font-medium text-stone-700 mb-1.5">No. WhatsApp / HP *</label>
          <input type="text" required placeholder="08xxxxxxxxx" className={inp}
            value={f.phone} onChange={e => setF({...f, phone: e.target.value})} data-testid="kontak-phone" />
        </div>
      </div>
      <div>
        <label className="block font-sans text-sm font-medium text-stone-700 mb-1.5">Topik / Layanan</label>
        <select className={inp} value={f.topic} onChange={e => setF({...f, topic: e.target.value})} data-testid="kontak-topic">
          <option value="">Pilih topik...</option>
          <option>Travel Antar Kota</option>
          <option>Paket Wisata</option>
          <option>Sewa Armada</option>
          <option>Perjalanan Rombongan</option>
          <option>Lainnya</option>
        </select>
      </div>
      <div>
        <label className="block font-sans text-sm font-medium text-stone-700 mb-1.5">Pesan *</label>
        <textarea rows={4} required placeholder="Tuliskan pertanyaan atau kebutuhan Anda..." className={`${inp} resize-none`}
          value={f.message} onChange={e => setF({...f, message: e.target.value})} data-testid="kontak-message" />
      </div>
      <button type="submit" data-testid="kontak-submit"
        className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded-xl font-medium font-sans text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <MessageCircle size={16} />Kirim via WhatsApp
      </button>
    </form>
  );
}
