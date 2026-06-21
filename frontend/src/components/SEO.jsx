import { Helmet } from "react-helmet-async";

const SITE_NAME = "Sahabat Wisata Jember";
const SITE_URL = "https://sahabatwisatajember.com";
const DEFAULT_IMAGE = "/images/travel-hero.jpg";

/**
 * SEO component — pasang di setiap halaman.
 * Props:
 *  title        — judul halaman (akan di-append dengan "| Sahabat Wisata Jember")
 *  description  — meta description (maks 155 karakter)
 *  keywords     — array string keyword
 *  image        — OG image URL
 *  url          — canonical path (ex: "/travel/jember-surabaya")
 *  type         — OG type: "website" | "article"
 *  noAppend     — jika true, title tidak di-append site name
 *  schema       — JSON-LD object atau array of objects
 */
export default function SEO({
  title,
  description,
  keywords = [],
  image = DEFAULT_IMAGE,
  url = "",
  type = "website",
  noAppend = false,
  schema,
}) {
  const fullTitle = noAppend ? title : `${title} | ${SITE_NAME}`;
  const canonical = `${SITE_URL}${url}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : [schema])}
        </script>
      )}
    </Helmet>
  );
}
