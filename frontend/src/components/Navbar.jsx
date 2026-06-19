import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { buildWhatsAppUrl, WA_MESSAGES } from "../utils/whatsapp";
import { siteConfig } from "../data/siteConfig";

const navLinks = [
  { label: "Travel", href: "#layanan" },
  { label: "Wisata", href: "#wisata" },
  { label: "Armada", href: "#armada" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const waUrl = buildWhatsAppUrl(WA_MESSAGES.general);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-stone-900 font-bold text-sm font-heading">SW</span>
            </div>
            <div>
              <span
                className={`font-heading font-bold text-sm leading-tight block transition-colors duration-300 ${
                  scrolled || menuOpen ? "text-stone-900" : "text-white"
                }`}
              >
                Sahabat Wisata
              </span>
              <span
                className={`font-sans text-xs transition-colors duration-300 ${
                  scrolled || menuOpen ? "text-stone-500" : "text-white/80"
                }`}
              >
                Jember
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-sans font-medium text-sm transition-colors duration-200 hover:text-amber-500 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-amber-500 after:transition-all after:duration-200 ${
                  scrolled ? "text-stone-700" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="navbar-cta-wa"
            className="hidden md:flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <Phone size={15} />
            Hubungi WA
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="navbar-mobile-menu-btn"
            className={`md:hidden p-2 rounded-md transition-colors ${
              scrolled || menuOpen ? "text-stone-700" : "text-white"
            }`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-3 rounded-lg text-stone-700 hover:bg-stone-50 hover:text-amber-600 font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="navbar-mobile-cta-wa"
              className="mt-2 flex items-center justify-center gap-2 bg-teal-500 text-white py-3 rounded-xl font-medium text-sm"
            >
              <Phone size={16} />
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
