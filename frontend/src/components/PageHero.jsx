import Breadcrumb from "./Breadcrumb";

export default function PageHero({ title, subtitle, image, badge, breadcrumbs, height = "h-64 sm:h-80", children }) {
  return (
    <section className={`relative ${height} flex items-end`} data-testid="page-hero">
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-stone-900/20" />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {breadcrumbs && (
          <div className="mb-3">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        {badge && (
          <span className="inline-block bg-amber-500 text-stone-900 text-xs font-medium font-sans px-3 py-1 rounded-full mb-3">
            {badge}
          </span>
        )}
        <h1 className="font-heading font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl mb-2 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="font-sans text-white/80 text-sm sm:text-base max-w-xl">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
