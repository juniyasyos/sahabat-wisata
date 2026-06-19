import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { buildWhatsAppUrl, WA_MESSAGES } from "../utils/whatsapp";
import { siteConfig } from "../data/siteConfig";

const navLinks = [
  { label: "Travel",  href: "#layanan" },
  { label: "Wisata",  href: "#wisata" },
  { label: "Armada",  href: "#armada" },
  { label: "FAQ",     href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waUrl = buildWhatsAppUrl(WA_MESSAGES.general);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled || menuOpen ? "shadow-md border-b border-stone-100" : "border-b border-stone-100"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-stone-900 font-heading font-extrabold text-xs">SW</span>
            </div>
            <div className="leading-tight">
              <p className="font-heading font-bold text-stone-900 text-sm">Sahabat Wisata</p>
              <p className="font-sans text-stone-400 text-xs">Jember</p>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="font-sans font-medium text-sm text-stone-600 hover:text-amber-500 transition-colors duration-200 relative after:absolute after:bottom-[-3px] after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-amber-500 after:transition-all after:duration-200">
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            data-testid="navbar-wa-btn"
            className="hidden md:flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2.5 rounded-full text-sm font-medium font-sans transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <Phone size={14} />
            Hubungi WA
          </a>

          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            data-testid="mobile-menu-btn"
            className="md:hidden p-2 text-stone-600 rounded-lg hover:bg-stone-100 transition-colors">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 pb-4">
          <div className="flex flex-col gap-0.5 pt-2">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl text-stone-700 hover:bg-stone-50 hover:text-amber-600 font-medium text-sm transition-colors">
                {link.label}
              </a>
            ))}
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              data-testid="navbar-mobile-cta-wa"
              className="mt-2 flex items-center justify-center gap-2 bg-teal-500 text-white py-3 rounded-xl font-medium text-sm">
              <Phone size={15} />
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
