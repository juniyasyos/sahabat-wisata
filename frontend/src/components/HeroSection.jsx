import { useState } from "react";
import { MapPin, Calendar, Users, Car, ChevronDown, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, WA_MESSAGES } from "../utils/whatsapp";
import { travelRoutes } from "../data/travelRoutes";
import { tourPackages } from "../data/tourPackages";

const tabs = [
  { id: "travel", label: "Travel" },
  { id: "wisata", label: "Wisata" },
  { id: "armada", label: "Armada" },
  { id: "rombongan", label: "Rombongan" },
];

const destinations = ["Surabaya", "Malang", "Bali (Denpasar)", "Juanda (Bandara)", "Banyuwangi", "Lainnya"];
const fleetOptions = ["Hiace Commuter (14 seat)", "Innova Reborn (7 seat)", "Avanza / Xenia (6 seat)", "Belum tahu"];
const durationOptions = ["1 Hari", "2 Hari", "3 Hari", "Lebih dari 3 Hari"];

function FormInput({ icon: Icon, children }) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
          <Icon size={16} />
        </div>
      )}
      <div className={Icon ? "pl-9" : ""}>{children}</div>
    </div>
  );
}

const inputClass =
  "w-full border border-stone-200 rounded-xl py-3 px-3 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all placeholder-stone-400";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("travel");

  // Travel form state
  const [travelForm, setTravelForm] = useState({ origin: "Jember", destination: "", date: "", passengers: "1" });
  // Wisata form state
  const [wisataForm, setWisataForm] = useState({ package: "", date: "", pax: "2" });
  // Armada form state
  const [armadaForm, setArmadaForm] = useState({ fleet: "", date: "", duration: "1 Hari", destination: "" });
  // Rombongan form state
  const [rombForm, setRombForm] = useState({ destination: "", date: "", pax: "20", notes: "" });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (activeTab === "travel") {
      if (!travelForm.destination) e.destination = true;
      if (!travelForm.date) e.date = true;
    }
    if (activeTab === "wisata") {
      if (!wisataForm.package) e.package = true;
    }
    if (activeTab === "armada") {
      if (!armadaForm.destination) e.destination = true;
    }
    if (activeTab === "rombongan") {
      if (!rombForm.destination) e.destination = true;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    let msg = "";
    if (activeTab === "travel") {
      msg = WA_MESSAGES.travel(travelForm.origin, travelForm.destination, travelForm.date, travelForm.passengers);
    } else if (activeTab === "wisata") {
      msg = WA_MESSAGES.wisata(wisataForm.package, wisataForm.date, wisataForm.pax);
    } else if (activeTab === "armada") {
      msg = WA_MESSAGES.armada(armadaForm.fleet, armadaForm.date, armadaForm.duration, armadaForm.destination);
    } else {
      msg = WA_MESSAGES.rombongan(rombForm.destination, rombForm.date, rombForm.pax, rombForm.notes);
    }

    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  const errClass = (field) =>
    errors[field] ? "border-red-400 focus:ring-red-300" : "";

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-[85svh] md:min-h-screen flex flex-col justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/11110093/pexels-photo-11110093.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280"
          alt="Perjalanan Jember"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/50 to-stone-900/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 mb-6"
            style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
          >
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-white text-xs font-medium font-sans">Travel Terpercaya dari Jember</span>
          </div>

          {/* Headline */}
          <h1
            className="font-heading font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 5.5vw, 3.5rem)", animation: "fadeInUp 0.6s ease-out 0.35s both" }}
          >
            Perjalanan Nyaman,
            <br />
            <span className="text-amber-400">Sampai Tujuan</span> dengan Tenang
          </h1>

          {/* Sub */}
          <p
            className="text-white/80 font-sans text-base sm:text-lg mb-8 max-w-xl"
            style={{ animation: "fadeInUp 0.6s ease-out 0.5s both" }}
          >
            Layanan travel antar kota, paket wisata, dan sewa armada dari Jember.
            Jemput rumah, antar ke tujuan.
          </p>
        </div>

        {/* Search Box */}
        <div
          className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-2xl"
          style={{ animation: "fadeInUp 0.6s ease-out 0.65s both" }}
          data-testid="hero-search-box"
        >
          {/* Tabs */}
          <div className="flex gap-1 mb-5 bg-stone-100 rounded-xl p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setErrors({}); }}
                data-testid={`tab-${tab.id}`}
                className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-sm font-medium font-sans transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* TRAVEL FORM */}
            {activeTab === "travel" && (
              <div className="grid grid-cols-2 gap-3">
                <FormInput icon={MapPin}>
                  <select
                    value={travelForm.origin}
                    onChange={(e) => setTravelForm({ ...travelForm, origin: e.target.value })}
                    data-testid="travel-origin"
                    className={`${inputClass} pl-9`}
                  >
                    <option value="Jember">Dari: Jember</option>
                    <option value="Surabaya">Dari: Surabaya</option>
                    <option value="Malang">Dari: Malang</option>
                  </select>
                </FormInput>
                <FormInput icon={MapPin}>
                  <select
                    value={travelForm.destination}
                    onChange={(e) => setTravelForm({ ...travelForm, destination: e.target.value })}
                    data-testid="travel-destination"
                    className={`${inputClass} pl-9 ${errClass("destination")}`}
                  >
                    <option value="">Tujuan...</option>
                    {destinations.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </FormInput>
                <FormInput icon={Calendar}>
                  <input
                    type="date"
                    value={travelForm.date}
                    onChange={(e) => setTravelForm({ ...travelForm, date: e.target.value })}
                    data-testid="travel-date"
                    className={`${inputClass} pl-9 ${errClass("date")}`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormInput>
                <FormInput icon={Users}>
                  <select
                    value={travelForm.passengers}
                    onChange={(e) => setTravelForm({ ...travelForm, passengers: e.target.value })}
                    data-testid="travel-passengers"
                    className={`${inputClass} pl-9`}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n} Penumpang</option>
                    ))}
                  </select>
                </FormInput>
              </div>
            )}

            {/* WISATA FORM */}
            {activeTab === "wisata" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <FormInput icon={MapPin}>
                    <select
                      value={wisataForm.package}
                      onChange={(e) => setWisataForm({ ...wisataForm, package: e.target.value })}
                      data-testid="wisata-package"
                      className={`${inputClass} pl-9 ${errClass("package")}`}
                    >
                      <option value="">Pilih Destinasi Wisata...</option>
                      <option>Bromo Sunrise</option>
                      <option>Kawah Ijen Blue Fire</option>
                      <option>Papuma Beach</option>
                      <option>Custom / Lainnya</option>
                    </select>
                  </FormInput>
                </div>
                <FormInput icon={Calendar}>
                  <input
                    type="date"
                    value={wisataForm.date}
                    onChange={(e) => setWisataForm({ ...wisataForm, date: e.target.value })}
                    data-testid="wisata-date"
                    className={`${inputClass} pl-9`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormInput>
                <FormInput icon={Users}>
                  <select
                    value={wisataForm.pax}
                    onChange={(e) => setWisataForm({ ...wisataForm, pax: e.target.value })}
                    data-testid="wisata-pax"
                    className={`${inputClass} pl-9`}
                  >
                    {[1,2,3,4,5,6,7,8,9,10,15,20].map(n => (
                      <option key={n} value={n}>{n} Peserta</option>
                    ))}
                  </select>
                </FormInput>
              </div>
            )}

            {/* ARMADA FORM */}
            {activeTab === "armada" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <FormInput icon={Car}>
                    <select
                      value={armadaForm.fleet}
                      onChange={(e) => setArmadaForm({ ...armadaForm, fleet: e.target.value })}
                      data-testid="armada-fleet"
                      className={`${inputClass} pl-9`}
                    >
                      <option value="">Jenis Armada...</option>
                      {fleetOptions.map(f => <option key={f}>{f}</option>)}
                    </select>
                  </FormInput>
                </div>
                <FormInput icon={Calendar}>
                  <input
                    type="date"
                    value={armadaForm.date}
                    onChange={(e) => setArmadaForm({ ...armadaForm, date: e.target.value })}
                    data-testid="armada-date"
                    className={`${inputClass} pl-9`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormInput>
                <FormInput icon={ChevronDown}>
                  <select
                    value={armadaForm.duration}
                    onChange={(e) => setArmadaForm({ ...armadaForm, duration: e.target.value })}
                    data-testid="armada-duration"
                    className={`${inputClass} pl-9`}
                  >
                    {durationOptions.map(d => <option key={d}>{d}</option>)}
                  </select>
                </FormInput>
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Tujuan / Rute pemakaian..."
                    value={armadaForm.destination}
                    onChange={(e) => setArmadaForm({ ...armadaForm, destination: e.target.value })}
                    data-testid="armada-destination"
                    className={`${inputClass} ${errClass("destination")}`}
                  />
                </div>
              </div>
            )}

            {/* ROMBONGAN FORM */}
            {activeTab === "rombongan" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Tujuan perjalanan rombongan..."
                    value={rombForm.destination}
                    onChange={(e) => setRombForm({ ...rombForm, destination: e.target.value })}
                    data-testid="rombongan-destination"
                    className={`${inputClass} ${errClass("destination")}`}
                  />
                </div>
                <FormInput icon={Calendar}>
                  <input
                    type="date"
                    value={rombForm.date}
                    onChange={(e) => setRombForm({ ...rombForm, date: e.target.value })}
                    data-testid="rombongan-date"
                    className={`${inputClass} pl-9`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormInput>
                <input
                  type="text"
                  placeholder="Jumlah peserta (orang)..."
                  value={rombForm.pax}
                  onChange={(e) => setRombForm({ ...rombForm, pax: e.target.value })}
                  data-testid="rombongan-pax"
                  className={inputClass}
                />
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Catatan tambahan (opsional)..."
                    value={rombForm.notes}
                    onChange={(e) => setRombForm({ ...rombForm, notes: e.target.value })}
                    data-testid="rombongan-notes"
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* Error message */}
            {Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-xs mt-2 font-sans">
                Harap isi semua field yang diperlukan.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              data-testid="hero-cta-submit"
              className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded-xl font-medium font-sans text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99]"
            >
              <MessageCircle size={18} />
              {activeTab === "travel" && "Pesan Travel via WhatsApp"}
              {activeTab === "wisata" && "Tanya Paket via WhatsApp"}
              {activeTab === "armada" && "Tanya Harga Sewa via WhatsApp"}
              {activeTab === "rombongan" && "Konsultasi Rombongan via WhatsApp"}
            </button>
            <p className="text-center text-stone-400 text-xs mt-2 font-sans">
              Harga final menyesuaikan titik jemput & tujuan. Konfirmasi via admin.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
