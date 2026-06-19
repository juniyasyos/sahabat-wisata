import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, WA_MESSAGES } from "../utils/whatsapp";

export default function FloatingWAButton() {
  const waUrl = buildWhatsAppUrl(WA_MESSAGES.general);

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-wa-btn"
      title="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl group"
      style={{ animation: "wa-pulse 3s ease-out infinite" }}
    >
      <MessageCircle size={24} className="text-white" />
      {/* Tooltip */}
      <span className="absolute right-16 bg-stone-900 text-white text-xs font-sans font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat via WhatsApp
      </span>
    </a>
  );
}
