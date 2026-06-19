import { Component } from "react";
import { MessageCircle } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error("ErrorBoundary caught:", err, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-3xl">😵</span>
          </div>
          <h1 className="font-heading font-bold text-stone-900 text-2xl mb-2">Oops, ada yang error</h1>
          <p className="font-sans text-stone-500 text-sm mb-6 max-w-sm">Halaman ini mengalami masalah teknis. Silakan refresh atau hubungi kami via WhatsApp.</p>
          <div className="flex gap-3">
            <button onClick={() => window.location.reload()} className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium font-sans text-sm transition-colors">Refresh Halaman</button>
            <a href="https://wa.me/6285732431396" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium font-sans text-sm transition-colors"><MessageCircle size={15} />Chat WA</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
