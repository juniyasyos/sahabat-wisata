import { MapPin, Phone, Mail, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { buildWhatsAppUrl, WA_MESSAGES } from "../utils/whatsapp";
import { siteConfig } from "../data/siteConfig";

const footerLinks = {
  layanan: [
    { label: "Travel Reguler", to: "/travel" },
    { label: "Paket Wisata", to: "/wisata" },
    { label: "Sewa Armada", to: "/sewa-armada" },
    { label: "Rombongan", to: "/rombongan" },
    { label: "FAQ", to: "/faq" },
    { label: "Kontak", to: "/kontak" },
  ],
  rute: [
    { label: "Jember – Surabaya", to: "/travel/jember-surabaya" },
    { label: "Jember – Malang", to: "/travel/jember-malang" },
    { label: "Jember – Bali", to: "/travel/jember-denpasar" },
    { label: "Jember – Juanda", to: "/travel/jember-juanda" },
  ],
};

export default function Footer() {
  const waUrl = buildWhatsAppUrl(WA_MESSAGES.general);

  return (
    <footer className="bg-stone-900 text-stone-400" data-testid="footer">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-stone-900 font-bold text-sm font-heading">SW</span>
              </div>
              <span className="font-heading font-bold text-white text-base">Sahabat Wisata Jember</span>
            </div>
            <p className="font-sans text-sm leading-relaxed mb-4">
              Layanan travel antar kota, paket wisata, dan sewa armada dari Jember yang terpercaya.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-9 h-9 bg-stone-800 hover:bg-amber-500 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                data-testid="footer-tiktok-link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 group-hover:text-white transition-colors">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-9 h-9 bg-stone-800 hover:bg-amber-500 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                data-testid="footer-instagram-link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 group-hover:text-white transition-colors">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-9 h-9 bg-stone-800 hover:bg-amber-500 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                data-testid="footer-facebook-link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 group-hover:text-white transition-colors">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm">Layanan</h4>
            <ul className="space-y-2">
              {footerLinks.layanan.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="font-sans text-sm hover:text-amber-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rute Populer */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm">Rute Populer</h4>
            <ul className="space-y-2">
              {footerLinks.rute.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="font-sans text-sm hover:text-amber-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5">
                <MapPin size={15} className="flex-shrink-0 mt-0.5 text-amber-400" />
                <span className="font-sans text-sm">{siteConfig.address}</span>
              </li>
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2.5 hover:text-teal-400 transition-colors"
                  data-testid="footer-wa-link"
                >
                  <Phone size={15} className="flex-shrink-0 mt-0.5 text-teal-400" />
                  <span className="font-sans text-sm">+62 857-3243-1396</span>
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail size={15} className="flex-shrink-0 mt-0.5 text-stone-400" />
                <span className="font-sans text-sm">{siteConfig.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-sans text-xs text-stone-500">
            © {new Date().getFullYear()} Sahabat Wisata Jember. All rights reserved.
          </p>
          <p className="font-sans text-xs text-stone-600">
            {siteConfig.operatingHours}
          </p>
        </div>
      </div>
    </footer>
  );
}
