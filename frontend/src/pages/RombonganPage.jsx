import { useState } from "react";
import { MessageCircle, Users, MapPin, ClipboardList, CheckCircle } from "lucide-react";
import { buildWhatsAppUrl, WA_MESSAGES } from "../utils/whatsapp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWAButton from "../components/FloatingWAButton";
import CTABanner from "../components/CTABanner";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { schemaLocalBusiness, schemaBreadcrumb } from "../utils/schema";

const useCases = [
  { icon: Users, title: "Perjalanan Wisata Grup", desc: "Cocok untuk wisata sekolah, kampus, komunitas, atau group tour ke Bromo, Ijen, Bali, dan lainnya." },
  { icon: ClipboardList, title: "Study Tour & Edukasi", desc: "Layanan terpadu untuk kebutuhan study tour siswa dan mahasiswa, aman dan terjangkau." },
  { icon: MapPin, title: "Perjalanan Ibadah", desc: "Transportasi nyaman untuk ziarah, umroh lokal, atau kunjungan masjid/pesantren rombongan." },
  { icon: CheckCircle, title: "Event Perusahaan", desc: "Family gathering, team building, dan acara korporat dengan armada representatif dan driver profesional." },
];

const packages = [
  { name: "Paket Basic", desc: "Transportasi saja (mobil + driver)", note: "Cocok untuk yang sudah punya rundown sendiri" },
  { name: "Paket Komplit", desc: "Transportasi + guide + tiket masuk destinasi", note: "Praktis, semua sudah diurus" },
  { name: "Paket Custom", desc: "Sesuai kebutuhan spesifik Anda", note: "Hubungi admin untuk penawaran terbaik" },
];

export default function RombonganPage() {
  const waMsg = WA_MESSAGES.rombongan("", "", "", "Saya ingin konsultasi paket rombongan");

  return (
    <div className="min-h-screen bg-stone-50 pt-16">
      <SEO
        title="Layanan Perjalanan Rombongan dari Jember | Grup & Study Tour"
        description="Paket perjalanan rombongan dari Jember. Study tour, wisata grup, gathering kantor, ibadah. Armada lengkap, harga kompetitif. Konsultasi gratis via WA."
        keywords={["travel rombongan jember", "sewa bus wisata jember", "study tour jember", "wisata rombongan jember", "gathering jember", "paket rombongan jember"]}
        url="/rombongan"
        schema={[
          schemaBreadcrumb([{ name: "Rombongan", url: "/rombongan" }]),
          schemaLocalBusiness(),
        ]}
      />
      <Navbar />
      <PageHero
        title="Layanan Perjalanan Rombongan"
        subtitle="Paket perjalanan grup yang fleksibel dan terjangkau. Dari 10 orang hingga ratusan peserta."
        image="https://images.pexels.com/photos/28386069/pexels-photo-28386069.jpeg?auto=compress&cs=tinysrgb&w=1600"
        badge="Rombongan"
        breadcrumbs={[{ label: "Rombongan" }]}
        height="h-60 sm:h-72"
      />

      {/* CTA Top */}
      <div className="bg-white border-b border-stone-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-heading font-bold text-stone-900 text-lg">Butuh transportasi untuk rombongan?</p>
              <p className="font-sans text-stone-500 text-sm">Kami tangani dari A sampai Z. Ceritakan kebutuhan Anda lewat WhatsApp.</p>
            </div>
            <a href={buildWhatsAppUrl(waMsg)} target="_blank" rel="noopener noreferrer"
              data-testid="rombongan-cta-top"
              className="flex-shrink-0 flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-medium font-sans text-sm transition-all duration-200">
              <MessageCircle size={16} />Konsultasi Gratis
            </a>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <section className="py-14 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium font-sans px-3 py-1 rounded-full mb-3">Cocok Untuk</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-stone-900">Siapa yang Butuh Layanan Ini?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {useCases.map(u => (
              <div key={u.title} className="bg-white rounded-2xl p-6 border border-stone-100 card-hover" data-animate>
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                  <u.icon size={22} className="text-amber-600" />
                </div>
                <h3 className="font-heading font-semibold text-stone-900 text-base mb-2">{u.title}</h3>
                <p className="font-sans text-stone-500 text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paket */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium font-sans px-3 py-1 rounded-full mb-3">Pilihan Paket</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-stone-900">Paket yang Tersedia</h2>
            <p className="font-sans text-stone-500 text-sm mt-2">Semua harga custom — hubungi admin untuk penawaran terbaik sesuai kebutuhan Anda.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {packages.map((pkg, i) => (
              <div key={i} className={`rounded-2xl p-6 border card-hover ${i === 1 ? "bg-amber-500 border-amber-400" : "bg-white border-stone-100"}`} data-animate>
                <h3 className={`font-heading font-bold text-lg mb-2 ${i === 1 ? "text-stone-900" : "text-stone-900"}`}>{pkg.name}</h3>
                <p className={`font-sans text-sm mb-3 leading-relaxed ${i === 1 ? "text-stone-800" : "text-stone-600"}`}>{pkg.desc}</p>
                <p className={`font-sans text-xs italic ${i === 1 ? "text-stone-700" : "text-stone-400"}`}>{pkg.note}</p>
                <a href={buildWhatsAppUrl(`Halo, saya tertarik dengan ${pkg.name} untuk rombongan. Bisa minta penawaran?`)}
                  target="_blank" rel="noopener noreferrer"
                  className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium font-sans transition-all duration-200 ${i === 1 ? "bg-stone-900 text-white hover:bg-stone-800" : "bg-teal-500 text-white hover:bg-teal-600"}`}>
                  <MessageCircle size={14} />Minta Penawaran
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Inquiry */}
      <section className="py-12 sm:py-16 bg-stone-50">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-heading font-bold text-2xl text-stone-900 mb-2">Kirim Kebutuhan Anda</h2>
            <p className="font-sans text-stone-500 text-sm">Isi form di bawah, kami akan tindak lanjuti via WhatsApp dalam waktu singkat.</p>
          </div>
          <RombonganInquiryForm />
        </div>
      </section>

      <CTABanner />
      <Footer />
      <FloatingWAButton />
    </div>
  );
}

function RombonganInquiryForm() {
  const [form, setForm] = useState({ destination: "", date: "", pax: "", contact: "", notes: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Halo, saya ingin mengirimkan kebutuhan perjalanan rombongan:\n- Tujuan: ${form.destination}\n- Tanggal: ${form.date}\n- Jumlah Peserta: ${form.pax} orang\n- Kontak: ${form.contact}\n- Catatan: ${form.notes || "-"}\n\nMohon bantu informasi harga dan ketersediaan.`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  const inp = "w-full border border-stone-200 rounded-xl py-3 px-4 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all placeholder-stone-400";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-100 p-6 sm:p-8 space-y-4" data-testid="rombongan-inquiry-form">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-sans text-sm font-medium text-stone-700 mb-1.5">Tujuan Perjalanan *</label>
          <input type="text" required placeholder="Contoh: Bromo, Bali, Malang..." className={inp}
            value={form.destination} onChange={e => setForm({...form, destination: e.target.value})}
            data-testid="inquiry-destination" />
        </div>
        <div>
          <label className="block font-sans text-sm font-medium text-stone-700 mb-1.5">Rencana Tanggal</label>
          <input type="date" className={inp} value={form.date}
            onChange={e => setForm({...form, date: e.target.value})}
            min={new Date().toISOString().split("T")[0]} data-testid="inquiry-date" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-sans text-sm font-medium text-stone-700 mb-1.5">Jumlah Peserta *</label>
          <input type="text" required placeholder="Contoh: 25 orang" className={inp}
            value={form.pax} onChange={e => setForm({...form, pax: e.target.value})}
            data-testid="inquiry-pax" />
        </div>
        <div>
          <label className="block font-sans text-sm font-medium text-stone-700 mb-1.5">Nama & No. WA Anda *</label>
          <input type="text" required placeholder="Contoh: Budi 0812xxx" className={inp}
            value={form.contact} onChange={e => setForm({...form, contact: e.target.value})}
            data-testid="inquiry-contact" />
        </div>
      </div>
      <div>
        <label className="block font-sans text-sm font-medium text-stone-700 mb-1.5">Catatan Tambahan</label>
        <textarea rows={3} placeholder="Kebutuhan khusus, anggaran, dll..." className={`${inp} resize-none`}
          value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
          data-testid="inquiry-notes" />
      </div>
      <button type="submit" data-testid="inquiry-submit"
        className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded-xl font-medium font-sans text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <MessageCircle size={16} />Kirim via WhatsApp
      </button>
    </form>
  );
}
