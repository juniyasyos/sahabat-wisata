import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, Phone, X, Bot, User, ChevronRight } from "lucide-react";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import { siteConfig } from "../data/siteConfig";

const PREDEFINED_QUESTIONS = [
  {
    id: "q1",
    text: "Berapa harga tiket travel?",
    answer: "Harga tiket travel reguler kami bervariasi mulai dari Rp 150.000, tergantung rute dan jenis armada. Untuk informasi rute spesifik, silakan hubungi admin kami.",
    waMessage: "Halo, saya ingin menanyakan daftar harga tiket travel reguler untuk berbagai rute."
  },
  {
    id: "q2",
    text: "Bagaimana cara menyewa armada?",
    answer: "Untuk menyewa mobil atau bus, Anda bisa menginformasikan jenis armada yang diinginkan, tanggal pemakaian, durasi, dan tujuan. Kami akan mengecek ketersediaan dan memberikan penawaran terbaik.",
    waMessage: "Halo, saya ingin menanyakan prosedur dan harga sewa armada."
  },
  {
    id: "q3",
    text: "Apakah ada paket wisata?",
    answer: "Tentu! Kami menyediakan berbagai paket wisata populer seperti Bromo, Kawah Ijen, dan City Tour. Kami juga bisa menyesuaikan rencana perjalanan (custom itinerary) sesuai keinginan Anda.",
    waMessage: "Halo, boleh minta informasi detail dan katalog paket wisata yang tersedia?"
  },
  {
    id: "q4",
    text: "Di mana alamat kantornya?",
    answer: "Kantor operasional Sahabat Wisata berada di Jember. Anda bisa menghubungi kami terlebih dahulu untuk membuat janji temu atau berkonsultasi langsung via WhatsApp.",
    waMessage: "Halo, saya ingin tahu alamat lengkap kantor Sahabat Wisata Jember."
  }
];

export default function CTABanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: `Halo! 👋 Selamat datang di ${siteConfig.brandName}. Ada yang bisa kami bantu? Silakan pilih pertanyaan di bawah ini:` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    setIsMounted(true);

    let timeoutId;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 700);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleQuestionClick = (q) => {
    setHasInteracted(true);
    setMessages(prev => [...prev, { type: 'user', text: q.text }]);
    setIsTyping(true);
    
    // Simulate thinking delay with typing indicator
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          type: 'bot', 
          text: q.answer,
          action: {
            label: "Lanjutkan ke WhatsApp",
            url: buildWhatsAppUrl(q.waMessage)
          }
        }
      ]);
    }, 1200);
  };

  const chatWidget = (
    <div className="fixed bottom-5 right-5 z-[9999] pointer-events-auto flex flex-col items-end">
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .typing-dot {
          animation: typing 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        .animate-pulse-soft {
          animation: pulseSoft 2.5s infinite;
        }
        @keyframes pulseSoft {
          0% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.5); }
          70% { box-shadow: 0 0 0 15px rgba(20, 184, 166, 0); }
          100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0); }
        }
      `}</style>
      
      {/* Chat Window */}
      <div 
        className={`
          mb-4 w-[350px] max-w-[calc(100vw-40px)] bg-white rounded-2xl shadow-2xl overflow-hidden
          transition-all duration-300 origin-bottom-right flex flex-col border border-stone-100
          ${isOpen ? 'scale-100 opacity-100 h-[500px] max-h-[70vh]' : 'scale-90 opacity-0 h-0 pointer-events-none'}
        `}
      >
        {/* Header */}
        <div className="bg-teal-600 text-white p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-base leading-none mb-1">Customer Service</h3>
              <p className="text-xs text-teal-50">Online & Siap Membantu</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close Chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 max-w-[90%] animate-slide-up ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.type === 'user' ? 'bg-amber-500 text-white' : 'bg-teal-100 text-teal-600'}`}>
                {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="flex flex-col gap-2">
                <div className={`p-3 text-sm leading-relaxed ${msg.type === 'user' ? 'bg-amber-500 text-white rounded-2xl rounded-tr-sm' : 'bg-white border border-stone-200 text-stone-700 rounded-2xl rounded-tl-sm shadow-sm'}`}>
                  {msg.text}
                </div>
                {msg.action && (
                  <a 
                    href={msg.action.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-2 rounded-xl transition-colors self-start shadow-sm"
                  >
                    {msg.action.label}
                    <ChevronRight size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2 max-w-[90%] animate-slide-up">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 bg-teal-100 text-teal-600">
                <Bot size={16} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-4 bg-white border border-stone-200 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center h-[42px]">
                  <div className="w-2 h-2 bg-teal-400 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Question Options */}
        <div className="p-4 bg-white border-t border-stone-100 shrink-0">
          <p className="text-xs text-stone-500 mb-3 font-medium">Pilih pertanyaan Anda:</p>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[140px] pr-1">
            {PREDEFINED_QUESTIONS.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => handleQuestionClick(q)}
                className="text-left w-full text-sm text-stone-700 hover:text-teal-700 bg-white hover:bg-teal-50 border border-stone-200 hover:border-teal-200 px-3.5 py-2.5 rounded-xl transition-colors shadow-sm animate-slide-up"
                style={{ animationDelay: `${isOpen ? (idx * 0.1) + 0.2 : 0}s`, animationFillMode: 'both' }}
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setHasInteracted(true); }}
        aria-label="Tanya kami"
        className={`
          flex h-14 w-14 items-center justify-center
          rounded-full bg-teal-500 text-white
          shadow-[0_8px_30px_rgb(20,184,166,0.35)]
          transition-all duration-300
          hover:-translate-y-1 hover:bg-teal-600
          hover:shadow-[0_8px_40px_rgb(20,184,166,0.45)]
          active:scale-95
          ${(!hasInteracted && !isOpen && !isScrolling) ? 'animate-pulse-soft' : ''}
          ${isScrolling && !isOpen ? "translate-x-24 opacity-0" : "translate-x-0 opacity-100"}
        `}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );

  return (
    <>
      <section
        id="cta-banner"
        className="py-10 sm:py-16 lg:py-24 bg-amber-500 relative overflow-hidden"
        data-testid="cta-section"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div data-animate>
            <h2 className="font-heading font-extrabold text-stone-900 text-3xl sm:text-4xl mb-4 leading-tight">
              Punya Pertanyaan atau Siap Memesan?
            </h2>

            <p className="font-sans text-stone-800 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Tim kami siap membantu. Gunakan fitur <span className="font-semibold">chatbot kami di pojok kanan bawah</span> untuk jawaban instan, atau hubungi langsung via telepon.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href={`tel:+${siteConfig.whatsappNumber}`}
                data-testid="cta-banner-phone-btn"
                className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white hover:bg-stone-800 px-8 py-4 rounded-2xl font-medium font-sans text-base transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-stone-900/20"
              >
                <Phone size={20} />
                Telepon Langsung
              </a>
              <button
                onClick={() => { setIsOpen(true); setHasInteracted(true); }}
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-stone-900 border border-stone-900/10 px-8 py-4 rounded-2xl font-medium font-sans text-base transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
              >
                <Bot size={20} />
                Tanya Chatbot
              </button>
            </div>

            <p className="mt-6 font-sans text-stone-800/70 text-sm font-medium">
              {siteConfig.operatingHours}
            </p>
          </div>
        </div>
      </section>

      {isMounted && createPortal(chatWidget, document.body)}
    </>
  );
}