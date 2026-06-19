/**
 * Schema.org JSON-LD generators untuk Sahabat Wisata Jember.
 * Semua fungsi mengembalikan object yang bisa langsung dipasang ke prop `schema` di <SEO />.
 */

const SITE_URL = "https://sahabatwisatajember.com";
const WA_NUMBER = "+62857-3243-1396";
const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Jl. Hayam Wuruk No. 123, Kaliwates",
  addressLocality: "Jember",
  addressRegion: "Jawa Timur",
  postalCode: "68131",
  addressCountry: "ID",
};

/** LocalBusiness — TravelAgency. Dipakai di Homepage & Kontak */
export function schemaLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TravelAgency"],
    "@id": `${SITE_URL}/#business`,
    name: "Sahabat Wisata Jember",
    description:
      "Layanan travel antar kota, paket wisata Bromo & Ijen, dan sewa armada dari Jember. Door-to-door service, driver profesional, beroperasi sejak 2019.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo192.png`,
    image: "https://images.unsplash.com/photo-1560103104-4623c14a473b?w=1200&q=80",
    telephone: WA_NUMBER,
    address: ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.1721,
      longitude: 113.7,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "05:00",
        closes: "22:00",
      },
    ],
    priceRange: "Rp 140.000 – Rp 650.000",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Transfer Bank",
    areaServed: ["Jember", "Surabaya", "Malang", "Bali", "Banyuwangi", "Lumajang"],
    hasMap: "https://maps.google.com/?q=Jember+Jawa+Timur",
    sameAs: [
      "https://instagram.com/sahabatwisata",
      "https://facebook.com/sahabatwisata",
      `https://wa.me/6285732431396`,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "124",
      bestRating: "5",
    },
  };
}

/** BreadcrumbList — dipakai di semua inner page */
export function schemaBreadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: SITE_URL,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.name,
        item: item.url ? `${SITE_URL}${item.url}` : undefined,
      })),
    ],
  };
}

/** Product/Service untuk Travel Route */
export function schemaTravelRoute(route) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/travel/${route.slug}`,
    name: route.name,
    description: route.description,
    provider: {
      "@type": "TravelAgency",
      name: "Sahabat Wisata Jember",
      url: SITE_URL,
    },
    areaServed: [route.origin, route.destination],
    offers: {
      "@type": "Offer",
      price: route.basePrice,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: route.basePrice,
        priceCurrency: "IDR",
        unitText: "per orang",
      },
    },
    serviceType: "Transportation",
    url: `${SITE_URL}/travel/${route.slug}`,
  };
}

/** TouristTrip untuk paket wisata */
export function schemaTouristTrip(pkg) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${SITE_URL}/wisata/${pkg.slug}`,
    name: pkg.name,
    description: pkg.description,
    url: `${SITE_URL}/wisata/${pkg.slug}`,
    image: pkg.image,
    touristType: "Adventure",
    provider: {
      "@type": "TravelAgency",
      name: "Sahabat Wisata Jember",
      url: SITE_URL,
      telephone: WA_NUMBER,
    },
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: pkg.price,
        priceCurrency: "IDR",
        unitText: "per orang",
      },
    },
    itinerary: pkg.itinerary?.map((step) => ({
      "@type": "TouristAttraction",
      name: step.activity,
    })),
    includesObject: pkg.includes?.map((item) => ({
      "@type": "Trip",
      name: item,
    })),
  };
}

/** FAQPage schema */
export function schemaFAQ(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** ItemList untuk halaman katalog */
export function schemaItemList(items) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
      image: item.image,
      description: item.shortDescription,
    })),
  };
}

/** Product schema untuk sewa armada */
export function schemaRentalVehicle(fleet) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/sewa-armada/${fleet.slug}`,
    name: `Sewa ${fleet.name} dengan Driver – Jember`,
    description: fleet.shortDescription,
    image: fleet.image,
    brand: { "@type": "Brand", name: "Sahabat Wisata Jember" },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "TravelAgency",
        name: "Sahabat Wisata Jember",
        telephone: WA_NUMBER,
        url: SITE_URL,
      },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Kapasitas", value: `${fleet.capacity} penumpang` },
      { "@type": "PropertyValue", name: "Fasilitas", value: fleet.facilities.join(", ") },
    ],
  };
}
