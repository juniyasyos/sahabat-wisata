import { ShieldCheck, Clock, MapPin, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Terpercaya & Aman",
    desc: "Beroperasi sejak 2019, ratusan pelanggan puas setiap bulannya. Driver terverifikasi dan armada terawat rutin.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Clock,
    title: "Tepat Waktu",
    desc: "Kami menghargai waktu Anda. Driver selalu datang tepat waktu dan memastikan Anda tiba sesuai jadwal.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: MapPin,
    title: "Door-to-Door Service",
    desc: "Dijemput dari pintu rumah Anda dan diantarkan langsung ke tujuan tanpa harus ke pool/agen.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Headphones,
    title: "Responsif 24 Jam",
    desc: "Admin WA kami siap membantu setiap hari, pagi hingga malam. Respons cepat, solusi tepat.",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function WhyUsSection() {
  return (
    <section id="kenapa-kami" className="py-16 sm:py-24 bg-white" data-testid="why-us-section">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div data-animate>
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-medium font-sans px-3 py-1 rounded-full mb-4">
              Kenapa Pilih Kami?
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-stone-900 mb-4 leading-tight">
              Perjalanan Nyaman Dimulai dari Kepercayaan
            </h2>
            <p className="font-sans text-stone-500 text-base mb-6 leading-relaxed">
              Di Sahabat Wisata Jember, kami percaya bahwa perjalanan yang baik bukan hanya tentang sampai di tujuan —
              tapi tentang kenyamanan, keamanan, dan kepercayaan sepanjang perjalanan.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="font-heading font-extrabold text-3xl text-stone-900">500+</p>
                <p className="font-sans text-stone-500 text-xs">Penumpang/Bulan</p>
              </div>
              <div className="w-px h-12 bg-stone-200" />
              <div className="text-center">
                <p className="font-heading font-extrabold text-3xl text-stone-900">5+</p>
                <p className="font-sans text-stone-500 text-xs">Tahun Beroperasi</p>
              </div>
              <div className="w-px h-12 bg-stone-200" />
              <div className="text-center">
                <p className="font-heading font-extrabold text-3xl text-stone-900">4.9</p>
                <p className="font-sans text-stone-500 text-xs">Rating Pelanggan</p>
              </div>
            </div>
          </div>

          {/* Right: Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-stone-50 rounded-2xl p-5 border border-stone-100 card-hover" data-animate>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${f.color}`}>
                  <f.icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-stone-900 text-base mb-1">{f.title}</h3>
                <p className="font-sans text-stone-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
