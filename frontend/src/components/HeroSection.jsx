import { useState } from "react";
import {
  MapPin, Calendar, Users, Car, MessageCircle, ArrowRight,
  Star, Plane, ChevronDown,
} from "lucide-react";
import { buildWhatsAppUrl, WA_MESSAGES } from "../utils/whatsapp";

/* ─── Constants ─────────────────────────────────────────── */
const TABS = [
  { id: "travel",    label: "Travel",     icon: Plane },
  { id: "wisata",    label: "Wisata",     icon: MapPin },
  { id: "armada",    label: "Armada",     icon: Car },
  { id: "rombongan", label: "Rombongan",  icon: Users },
];

const DESTINATIONS = [
  "Surabaya", "Malang", "Bali (Denpasar)", "Juanda (Bandara)", "Banyuwangi", "Lainnya",
];
const FLEET_OPTIONS = [
  "Hiace Commuter (14 seat)", "Innova Reborn (7 seat)", "Avanza / Xenia (6 seat)", "Belum tahu",
];
const DURATION_OPTIONS = ["1 Hari", "2 Hari", "3 Hari", "Lebih dari 3 Hari"];

const HERO_IMAGE = "https://images.unsplash.com/photo-1560103104-4623c14a473b?crop=entropy&cs=srgb&fm=jpg&q=90&w=1400";
const CARD_IMAGE  = "https://images.pexels.com/photos/28386069/pexels-photo-28386069.jpeg?auto=compress&cs=tinysrgb&w=200";
const CARD_IMAGE2 = "https://images.pexels.com/photos/12397207/pexels-photo-12397207.jpeg?auto=compress&cs=tinysrgb&w=200";

const STATS = [
  { value: "500+", label: "Penumpang" },
  { value: "5+",   label: "Tahun" },
  { value: "3",    label: "Kota Tujuan Utama" },
];

/* ─── Sub-components ─────────────────────────────────────── */
const inputCls =
  "w-full border border-stone-200 rounded-xl py-3 px-3 text-sm text-stone-800 bg-white " +
  "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent " +
  "transition-all placeholder-stone-400";

function Field({ icon: Icon, children }) {
  return (
    <div className="relative">
      {Icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
          <Icon size={15} />
        </span>
      )}
      <div className={Icon ? "pl-8" : ""}>{children}</div>
    </div>
  );
}

/* ─── Forms ──────────────────────────────────────────────── */
function TravelForm({ onSubmit }) {
  const [f, setF] = useState({ origin: "Jember", destination: "", date: "", passengers: "1" });
  const [err, setErr] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!f.destination || !f.date) { setErr(true); return; }
    onSubmit(WA_MESSAGES.travel(f.origin, f.destination, f.date, f.passengers));
  };
  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Field icon={MapPin}>
          <select className={`${inputCls} pl-8`} value={f.origin}
            onChange={e => setF({...f, origin: e.target.value})} data-testid="travel-origin">
            <option value="Jember">Dari: Jember</option>
            <option value="Surabaya">Dari: Surabaya</option>
            <option value="Malang">Dari: Malang</option>
          </select>
        </Field>
        <Field icon={MapPin}>
          <select className={`${inputCls} pl-8 ${err && !f.destination ? "border-red-400" : ""}`}
            value={f.destination} onChange={e => { setF({...f, destination: e.target.value}); setErr(false); }}
            data-testid="travel-destination">
            <option value="">Tujuan</option>
            {DESTINATIONS.map(d => <option key={d}>{d}</option>)}
          </select>
        </Field>
        <Field icon={Calendar}>
          <input type="date" className={`${inputCls} pl-8 ${err && !f.date ? "border-red-400" : ""}`}
            value={f.date} onChange={e => { setF({...f, date: e.target.value}); setErr(false); }}
            min={new Date().toISOString().split("T")[0]} data-testid="travel-date" />
        </Field>
        <Field icon={Users}>
          <select className={`${inputCls} pl-8`} value={f.passengers}
            onChange={e => setF({...f, passengers: e.target.value})} data-testid="travel-passengers">
            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Penumpang</option>)}
          </select>
        </Field>
      </div>
      {err && <p className="text-red-500 text-xs mt-1.5">Pilih tujuan & tanggal terlebih dahulu.</p>}
      <SubmitBtn label="Pesan Travel via WhatsApp" />
    </form>
  );
}

function WisataForm({ onSubmit }) {
  const [f, setF] = useState({ destination: "", date: "", pax: "2" });
  const submit = (e) => {
    e.preventDefault();
    onSubmit(WA_MESSAGES.wisata(f.destination || "wisata pilihan", f.date, f.pax));
  };
  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field icon={MapPin}>
          <select className={`${inputCls} pl-8`} value={f.destination}
            onChange={e => setF({...f, destination: e.target.value})} data-testid="wisata-package">
            <option value="">Destinasi Wisata</option>
            <option>Bromo Sunrise</option>
            <option>Kawah Ijen Blue Fire</option>
            <option>Pantai Papuma</option>
            <option>Custom / Lainnya</option>
          </select>
        </Field>
        <Field icon={Calendar}>
          <input type="date" className={`${inputCls} pl-8`} value={f.date}
            onChange={e => setF({...f, date: e.target.value})}
            min={new Date().toISOString().split("T")[0]} data-testid="wisata-date" />
        </Field>
        <Field icon={Users}>
          <select className={`${inputCls} pl-8`} value={f.pax}
            onChange={e => setF({...f, pax: e.target.value})} data-testid="wisata-pax">
            {[1,2,3,4,5,6,8,10,15,20].map(n => <option key={n} value={n}>{n} Peserta</option>)}
          </select>
        </Field>
      </div>
      <SubmitBtn label="Tanya Paket via WhatsApp" />
    </form>
  );
}

function ArmadaForm({ onSubmit }) {
  const [f, setF] = useState({ fleet: "", date: "", duration: "1 Hari", destination: "" });
  const submit = (e) => {
    e.preventDefault();
    onSubmit(WA_MESSAGES.armada(f.fleet, f.date, f.duration, f.destination));
  };
  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Field icon={Car}>
          <select className={`${inputCls} pl-8`} value={f.fleet}
            onChange={e => setF({...f, fleet: e.target.value})} data-testid="armada-fleet">
            <option value="">Jenis Armada</option>
            {FLEET_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field icon={Calendar}>
          <input type="date" className={`${inputCls} pl-8`} value={f.date}
            onChange={e => setF({...f, date: e.target.value})}
            min={new Date().toISOString().split("T")[0]} data-testid="armada-date" />
        </Field>
        <Field icon={ChevronDown}>
          <select className={`${inputCls} pl-8`} value={f.duration}
            onChange={e => setF({...f, duration: e.target.value})} data-testid="armada-duration">
            {DURATION_OPTIONS.map(d => <option key={d}>{d}</option>)}
          </select>
        </Field>
        <input type="text" placeholder="Tujuan / Rute…"
          className={inputCls} value={f.destination}
          onChange={e => setF({...f, destination: e.target.value})}
          data-testid="armada-destination" />
      </div>
      <SubmitBtn label="Tanya Harga Sewa via WhatsApp" />
    </form>
  );
}

function RombonganForm({ onSubmit }) {
  const [f, setF] = useState({ destination: "", date: "", pax: "20", notes: "" });
  const submit = (e) => {
    e.preventDefault();
    onSubmit(WA_MESSAGES.rombongan(f.destination, f.date, f.pax, f.notes));
  };
  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input type="text" placeholder="Tujuan rombongan…"
          className={inputCls} value={f.destination}
          onChange={e => setF({...f, destination: e.target.value})}
          data-testid="rombongan-destination" />
        <Field icon={Calendar}>
          <input type="date" className={`${inputCls} pl-8`} value={f.date}
            onChange={e => setF({...f, date: e.target.value})}
            min={new Date().toISOString().split("T")[0]} data-testid="rombongan-date" />
        </Field>
        <input type="text" placeholder="Jumlah peserta"
          className={inputCls} value={f.pax}
          onChange={e => setF({...f, pax: e.target.value})}
          data-testid="rombongan-pax" />
        <input type="text" placeholder="Catatan tambahan (opsional)"
          className={inputCls} value={f.notes}
          onChange={e => setF({...f, notes: e.target.value})}
          data-testid="rombongan-notes" />
      </div>
      <SubmitBtn label="Konsultasi Rombongan via WhatsApp" />
    </form>
  );
}

function SubmitBtn({ label }) {
  return (
    <button type="submit" data-testid="hero-cta-submit"
      className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 active:scale-[0.99] text-white py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <MessageCircle size={17} />
      {label}
    </button>
  );
}

/* ─── Floating Destination Card ─────────────────────────── */
function FloatingCard() {
  return (
    <div className="absolute bottom-4 right-3 sm:bottom-6 sm:right-6 bg-white rounded-2xl shadow-2xl p-3 sm:p-3.5 w-44 sm:w-52 border border-stone-100"
      style={{ animation: "fadeInUp 0.7s ease-out 0.9s both" }}>
      <div className="flex items-center gap-3 mb-2.5">
        <img src={CARD_IMAGE} alt="Gunung Bromo"
          className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
        <div className="min-w-0">
          <p className="font-heading font-bold text-stone-900 text-sm leading-tight truncate">Gunung Bromo</p>
          <div className="flex items-center gap-0.5 mt-0.5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={10} className={i <= 4 ? "fill-amber-400 text-amber-400" : "fill-stone-200 text-stone-200"} />
            ))}
            <span className="text-stone-400 text-xs ml-1">4.8</span>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-100 pt-2">
        <p className="text-stone-400 text-xs">Mulai dari</p>
        <p className="font-heading font-bold text-stone-900 text-base">
          Rp 350.000<span className="text-xs font-normal text-stone-500">/org</span>
        </p>
      </div>
    </div>
  );
}

/* ─── Floating Badge (top of image) ─────────────────────── */
function FloatingBadge() {
  return (
    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/60"
      style={{ animation: "fadeInUp 0.6s ease-out 0.7s both" }}>
      <div className="flex items-center gap-2">
        <img src={CARD_IMAGE2} alt="Kawah Ijen"
          className="w-8 h-8 rounded-lg object-cover" />
        <div>
          <p className="font-sans text-stone-800 text-xs font-semibold">Kawah Ijen</p>
          <p className="font-sans text-teal-600 text-xs font-medium">Rp 250.000</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("travel");

  const handleSubmit = (msg) => {
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  return (
    <section id="hero" data-testid="hero-section"
      className="bg-white pt-16 sm:pt-0 overflow-hidden">

      {/* ── TOP: Split Layout ── */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[calc(100svh-80px)] lg:min-h-0 lg:h-[600px] xl:h-[660px] gap-8 lg:gap-12 py-12 lg:py-0">

          {/* LEFT: Content */}
          <div className="flex-1 min-w-0 w-full lg:w-auto order-2 lg:order-1"
            style={{ animation: "fadeInUp 0.65s ease-out 0.1s both" }}>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-5">
              <Plane size={13} className="text-amber-500" />
              <span className="font-sans text-amber-700 text-xs font-semibold tracking-wide uppercase">
                Travel Terpercaya dari Jember
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-stone-900 leading-[1.1] mb-4"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
              Jelajahi Keindahan{" "}
              <span className="relative">
                <span className="relative z-10 text-amber-500">Indonesia</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-100 rounded -z-0 -skew-x-2" />
              </span>{" "}
              Bersama Kami
            </h1>

            {/* Sub */}
            <p className="font-sans text-stone-500 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
              Travel antar kota, paket wisata Bromo & Ijen, sewa armada —
              semua dari Jember dengan sistem door‑to‑door.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a href="#layanan"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3.5 rounded-2xl font-medium font-sans text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                Jelajahi Layanan <ArrowRight size={16} />
              </a>
              <a href={buildWhatsAppUrl("Halo, saya ingin konsultasi tentang layanan travel Sahabat Wisata Jember.")}
                target="_blank" rel="noopener noreferrer" data-testid="hero-wa-secondary"
                className="inline-flex items-center gap-2 bg-white border border-stone-200 hover:border-teal-400 hover:bg-teal-50 text-stone-700 hover:text-teal-700 px-6 py-3.5 rounded-2xl font-medium font-sans text-sm transition-all duration-200">
                <MessageCircle size={16} />
                Konsultasi Gratis
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 border-t border-stone-100 pt-6">
              {STATS.map((s, i) => (
                <div key={i} className={i > 0 ? "border-l border-stone-200 pl-6" : ""}>
                  <p className="font-heading font-extrabold text-stone-900 text-xl">{s.value}</p>
                  <p className="font-sans text-stone-500 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Vivid Image */}
          <div className="relative flex-shrink-0 w-full lg:w-[48%] xl:w-[50%] order-1 lg:order-2"
            style={{ animation: "fadeInUp 0.65s ease-out 0.3s both" }}>
            <div className="relative w-full h-64 sm:h-80 lg:h-[520px] xl:h-[560px] rounded-3xl overflow-hidden shadow-2xl">
              <img src={HERO_IMAGE} alt="Destinasi Wisata Indonesia"
                className="w-full h-full object-cover object-center"
                loading="eager" fetchPriority="high" />
              {/* Subtle vignette */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5" />
            </div>
            <FloatingBadge />
            <FloatingCard />
            {/* Decorative background blob */}
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-amber-50 rounded-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-50 rounded-2xl -z-10" />
          </div>
        </div>
      </div>

      {/* ── BOTTOM: Search Box ── */}
      <div className="bg-stone-50 border-t border-stone-100">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6"
          data-testid="hero-search-box">

          {/* Tabs */}
          <div className="flex gap-1 mb-5 bg-white border border-stone-200 rounded-2xl p-1.5 shadow-sm overflow-x-auto">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                data-testid={`tab-${tab.id}`}
                className={`flex items-center gap-1.5 sm:gap-2 flex-1 min-w-[72px] sm:min-w-[90px] py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-medium font-sans transition-all duration-200 whitespace-nowrap justify-center ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                }`}>
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-stone-100 p-4 sm:p-5 shadow-sm">
            {activeTab === "travel"    && <TravelForm onSubmit={handleSubmit} />}
            {activeTab === "wisata"    && <WisataForm onSubmit={handleSubmit} />}
            {activeTab === "armada"    && <ArmadaForm onSubmit={handleSubmit} />}
            {activeTab === "rombongan" && <RombonganForm onSubmit={handleSubmit} />}
          </div>
        </div>
      </div>
    </section>
  );
}
