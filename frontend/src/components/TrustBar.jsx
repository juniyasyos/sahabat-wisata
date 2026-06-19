import { ShieldCheck, Wrench, UserCheck, Banknote } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, label: "Berpengalaman", desc: "5+ Tahun Beroperasi" },
  { icon: Wrench, label: "Armada Terawat", desc: "Servis Berkala" },
  { icon: UserCheck, label: "Driver Profesional", desc: "Sopir Berpengalaman" },
  { icon: Banknote, label: "Harga Jujur", desc: "Transparan & Fair" },
];

export default function TrustBar() {
  return (
    <section
      data-testid="trust-bar"
      className="bg-amber-50 border-y border-amber-100 py-5"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <item.icon size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="font-heading font-semibold text-stone-800 text-sm leading-tight">{item.label}</p>
                <p className="font-sans text-stone-500 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
