import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm font-sans" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
        <Home size={13} />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <ChevronRight size={13} className="text-white/50" />
          {item.href && idx < items.length - 1 ? (
            <Link to={item.href} className="text-white/70 hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
