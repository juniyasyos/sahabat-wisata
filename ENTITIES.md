# Entity Reference — Website Travel Jember

Dokumen ini mendefinisikan semua entitas data yang digunakan pada website Travel Jember. Pada **v1.0.0**, untuk menghindari over-engineering dan mempercepat rilis, **semua data di-*hardcode* sebagai statis dummy data (TypeScript/JSON file)**. Tidak ada CMS atau database backend.

---

## Stack Data (v1.0.0)

| Kebutuhan        | Solusi MVP v1.0.0                     |
| ---------------- | ------------------------------------- |
| Database         | **Lokal JSON / TypeScript Array**     |
| File & Foto      | **Lokal Assets (public/images)**      |
| Auth Admin       | **Tidak Ada (Hardcoded Data)**        |
| Hosting          | Vercel / Netlify (SSG/SSR optimized)  |

---

## Katalog Entitas

- [1. Destination](#1-destination)
- [2. TravelRoute](#2-travelroute)
- [3. TourPackage](#3-tourpackage)
- [4. Fleet](#4-fleet)
- [5. Faq](#5-faq)
- [6. SiteConfig](#6-siteconfig)
- [7. Struktur Folder Data](#7-struktur-folder-data)

---

## 1. Destination

Master kota, wilayah, bandara, atau destinasi wisata. Digunakan sebagai referensi oleh `TravelRoute` dan `TourPackage`.

**File:** `data/destinations.json`

**Format:** Array of `Destination`. Setiap item diidentifikasi oleh field `id` (= nilai slug).

```ts
type Destination = {
  id: string             // slug kota. Contoh: "jember", "juanda"
  name: string           // Nama tampilan. Contoh: "Jember", "Bandara Juanda"
  slug: string           // Untuk URL. Contoh: "jember", "juanda"
  type: DestinationType
  province?: string      // Contoh: "Jawa Timur"
  description?: string   // Deskripsi singkat untuk SEO (opsional)
}

type DestinationType =
  | "city"      // Kota. Contoh: Jember, Surabaya, Malang
  | "tourism"   // Destinasi wisata. Contoh: Bromo, Kawah Ijen
  | "airport"   // Bandara. Contoh: Juanda, Banyuwangi
  | "station"   // Stasiun kereta. Contoh: Gubeng, Pasar Turi
  | "area"      // Area/kawasan umum
```

**Contoh data JSON:**

```json
// data/destinations.json (sebagian)
// CONTOH TEKNIS — JANGAN DIGUNAKAN SEBAGAI DATA PRODUKSI
[
  {
    "id": "jember",
    "name": "Jember",
    "slug": "jember",
    "type": "city",
    "province": "Jawa Timur"
  },
  {
    "id": "juanda",
    "name": "Bandara Juanda",
    "slug": "juanda",
    "type": "airport",
    "province": "Jawa Timur",
    "description": "Bandara internasional di Sidoarjo yang melayani penerbangan dari/ke Surabaya."
  }
]
```

---

## 2. TravelRoute

Rute travel antar kota. Setiap file JSON mewakili satu rute.

**File:** `data/travel_routes.json`

```ts
type TravelRoute = {
  id: string                      // Contoh: "jember-surabaya"
  name: string                    // Contoh: "Travel Jember Surabaya"
  slug: string                    // Untuk URL
  originId: string                // Referensi ke destinations.id
  destinationId: string           // Referensi ke destinations.id
  basePrice: number | null        // Harga mulai dari (Rupiah). null = "Hubungi admin"
  estimatedDuration: string | null // Contoh: "5–7 jam". null = tidak ditampilkan
  estimatedDistanceKm: number | null
  shortDescription: string        // 1–2 kalimat untuk kartu katalog
  description: string             // Konten detail halaman
  pickupPoints: CoveragePoint[]   // Titik/area penjemputan di kota asal
  dropoffPoints: CoveragePoint[]  // Titik/area pengantaran di kota tujuan
  facilities: string[]            // Contoh: ["AC", "Door-to-Door", "Bagasi"]
  terms: string                   // Ketentuan booking
  schedules: string[]             // Contoh: ["06:00", "15:00", "21:00", "Menyesuaikan penumpang"]
  isFeatured: boolean             // Tampil di homepage?
  isActive: boolean               // Tampil di katalog?
  meta: PageMeta
}

type CoveragePoint = {
  name: string           // Contoh: "Surabaya Pusat", "Bandara Juanda", "ITS"
  description?: string   // Contoh: "Gratis penjemputan", "Termasuk area Sidoarjo"
  additionalFee?: number // Biaya tambahan jika lokasi di luar zona utama (0 = gratis)
}
```

> **Aturan Jadwal (`schedules`):** Jika jadwal belum tetap, masukkan string deskriptif seperti "Menyesuaikan ketersediaan. Hubungi admin untuk konfirmasi." Jangan membuat jam palsu.

---

## 3. TourPackage

Paket wisata. Setiap dokumen adalah satu halaman di `/wisata/{slug}`.

**File:** `data/tour_packages.json`

**Format:** Array of `TourPackage`. Setiap item diidentifikasi oleh field `id` (= slug paket).

```ts
type TourPackage = {
  id: string
  name: string                       // Contoh: "Bromo Midnight Sunrise"
  slug: string
  basePrice: number | null           // Per orang. null = "Hubungi admin"
  minPax: number | null              // Minimal peserta. null = "Menyesuaikan paket"
  duration: string | null            // Contoh: "1 Hari", "2D1N"
  mainDestinationId: string          // Referensi ke destinations/{id}
  shortDescription: string
  description: string
  highlights: string[]               // Poin daya tarik utama paket
  itinerary: ItineraryItem[]         // Array — disimpan inline dalam dokumen
  includes: IncludeExcludeItem[]     // Array inline
  excludes: IncludeExcludeItem[]     // Array inline
  terms: string                      // Ketentuan: DP, pembatalan, reschedule
  images: string[]                   // Path lokal. Contoh: "/images/wisata/bromo-sunrise.jpg"
  isFeatured: boolean
  isActive: boolean
  meta: PageMeta
}
```

### 3.1 ItineraryItem

```ts
type ItineraryItem = {
  time: string        // Label waktu. Contoh: "05:00", "Hari 1 — Pagi"
  title: string       // Nama kegiatan. Contoh: "Tiba di Penanjakan"
  description: string // Detail kegiatan
}
```

### 3.2 IncludeExcludeItem

```ts
type IncludeExcludeItem = {
  label: string    // Contoh: "Transportasi PP", "Tiket masuk Bromo"
  notes?: string   // Keterangan tambahan
}
```

**Contoh data JSON:**

```json
// data/tour_packages.json (salah satu item dalam array)
// CONTOH TEKNIS — JANGAN DIGUNAKAN SEBAGAI DATA PRODUKSI
{
  "name": "Bromo Midnight Sunrise",
  "slug": "bromo-midnight-sunrise",
  "basePrice": 350000,
  "minPax": 4,
  "duration": "1 Hari",
  "mainDestinationId": "bromo",
  "shortDescription": "Saksikan matahari terbit dari Penanjakan dan jelajahi lautan pasir Bromo.",
  "highlights": ["Sunrise di Penanjakan", "Lautan pasir Bromo", "Kawah aktif Bromo"],
  "itinerary": [
    { "time": "23:00", "title": "Berangkat dari Jember", "description": "Penjemputan sesuai titik kesepakatan." },
    { "time": "03:00", "title": "Tiba di Penanjakan", "description": "Persiapan menuju titik sunrise." },
    { "time": "05:00", "title": "Matahari Terbit", "description": "Menikmati sunrise dari Penanjakan 1." },
    { "time": "07:00", "title": "Lautan Pasir & Kawah", "description": "Turun ke kawah Bromo." },
    { "time": "10:00", "title": "Perjalanan Kembali", "description": "Berangkat menuju Jember." }
  ],
  "includes": [
    { "label": "Transportasi PP dari Jember" },
    { "label": "Driver berpengalaman rute Bromo" },
    { "label": "BBM" }
  ],
  "excludes": [
    { "label": "Tiket masuk kawasan Bromo", "notes": "Dibayar langsung di loket" },
    { "label": "Jeep lokal", "notes": "Opsional, sewa di lokasi" },
    { "label": "Makan dan minum" },
    { "label": "Pengeluaran pribadi" }
  ],
  "terms": "Minimal 4 orang. DP 50% saat konfirmasi booking. Pembatalan H-3 DP dikembalikan penuh.",
  "images": [
    "/images/wisata/bromo-sunrise.jpg"
  ],
  "isFeatured": true,
  "isActive": true,
  "meta": {
    "title": "Paket Wisata Bromo Midnight Sunrise dari Jember — Mulai Rp350.000/orang",
    "description": "Saksikan sunrise spektakuler di Bromo dari Jember. Berangkat tengah malam. Min. 4 orang."
  }
}
```

---

## 4. Fleet

Armada kendaraan untuk disewa. Setiap dokumen adalah satu halaman di `/sewa-armada/{slug}`.

**File:** `data/fleets.json`

**Format:** Array of `Fleet`. Setiap item diidentifikasi oleh field `id` (= slug armada).

```ts
type Fleet = {
  id: string
  name: string                    // Contoh: "Toyota Hiace Commuter"
  slug: string
  vehicleType: VehicleType
  capacity: number                // Jumlah seat penumpang
  shortDescription: string
  description: string
  features: string[]              // Contoh: ["AC Double Blower", "Reclining Seat"]
  suitableFor: string[]           // Contoh: ["Wisata keluarga", "Korporat"]
  includes: IncludeExcludeItem[]  // Contoh: Driver, BBM
  excludes: IncludeExcludeItem[]  // Contoh: Tol, Parkir
  images: string[]                // Path lokal (min: eksterior + interior). Contoh: "/images/armada/hiace-eksterior.jpg"
  terms: string                   // Ketentuan sewa
  isFeatured: boolean
  isActive: boolean
  meta: PageMeta
}

type VehicleType =
  | "hiace"    // Toyota Hiace (12–16 seat)
  | "elf"      // Isuzu Elf (9–15 seat)
  | "avanza"   // Toyota Avanza / Xenia (6–7 seat)
  | "innova"   // Toyota Innova (7 seat)
  | "bus"      // Bus pariwisata (25–59 seat)
  | "other"
```

---

## 5. Faq

Pertanyaan & jawaban. Satu koleksi digunakan untuk semua konteks (global dan per entitas).

**File:** `data/faqs.json`

**Format:** Array of `Faq`. Satu file menampung semua FAQ dari semua scope.

```ts
type Faq = {
  id: string
  question: string
  answer: string              // Boleh mengandung HTML sederhana (<b>, <a>, dll)
  scope: FaqScope
  scopeId: string | null      // null jika scope = "global" | "travel" | "tour"
  sortOrder: number
  isActive: boolean
}

type FaqScope =
  | "global"        // Halaman /faq
  | "homepage"      // Khusus untuk di-pin di homepage
  | "travel"        // Halaman /travel (katalog semua rute)
  | "travel_route"  // Halaman /travel/{slug}. scopeId = TravelRoute.id
  | "tour"          // Halaman /wisata (katalog semua paket)
  | "tour_package"  // Halaman /wisata/{slug}. scopeId = TourPackage.id
  | "fleet"         // Halaman /sewa-armada/{slug}. scopeId = Fleet.id
```

**Contoh penggunaan di komponen (filter dari JSON lokal):**

```ts
// src/lib/faqs.ts
import allFaqs from '@/data/faqs.json'

// Ambil FAQ untuk halaman detail rute
export function getFaqsForRoute(routeId: string) {
  return allFaqs
    .filter(f =>
      (f.scope === 'travel' || (f.scope === 'travel_route' && f.scopeId === routeId))
      && f.isActive
    )
    .sort((a, b) => a.sortOrder - b.sortOrder)
}
```

---

## 6. Post

Artikel blog/edukasi untuk SEO konten jangka panjang.

> **Catatan v1.0.0:** Entitas `Post` (Blog/Artikel) **tidak diimplementasi di v1.0.0**. Blog ditunda ke versi berikutnya setelah bisnis tervalidasi. Definisi tipe di bawah ini untuk referensi v2.0.

**File (v2.0):** `data/posts.json`

```ts
type Post = {
  id: string
  title: string
  slug: string
  excerpt: string             // 1–2 kalimat untuk kartu blog dan meta description
  content: string             // Isi artikel (HTML atau Markdown)
  publishedAt: string | null  // ISO date string. null = draft
  status: "draft" | "published"
  tags: string[]              // Contoh: ["travel", "tips", "wisata"]
  coverImage: string | null   // Path lokal. Contoh: "/images/blog/cover.jpg"
  meta: PageMeta
}
```

---

## 7. SiteConfig

Konfigurasi global website. Disimpan sebagai **satu objek tunggal** dalam file JSON.

**File:** `data/site_config.json`

**Format:** Object tunggal (bukan array).

```ts
type SiteConfig = {
  siteName: string
  siteTagline: string
  siteUrl: string

  // Kontak
  whatsappNumber: string    // Format internasional tanpa simbol. Contoh: "6281234567890"
  contactEmail?: string
  officeAddress?: string
  operatingHours?: string   // Contoh: "Setiap hari, 05:00–22:00 WIB"

  // Media Sosial
  instagramUrl?: string
  facebookUrl?: string
  tiktokUrl?: string

  // SEO Default (fallback untuk halaman tanpa meta sendiri)
  defaultMetaTitle: string
  defaultMetaDescription: string
  defaultOgImage: string    // Path lokal. Contoh: "/images/og-default.jpg"
}
```

**Cara membaca di aplikasi:**

```ts
import siteConfig from '@/data/site_config.json'
// siteConfig.whatsappNumber, siteConfig.siteName, dst.
```

---

## 8. Tipe Bersama

### PageMeta

Digunakan oleh semua entitas yang punya halaman publik.

```ts
type PageMeta = {
  title?: string        // Override meta title. Kosong → fallback ke nama entitas
  description?: string  // Override meta description. Kosong → fallback ke shortDescription
  ogImage?: string      // Override OG image. Kosong → fallback ke SiteConfig.defaultOgImage
}
```

---

## 9. Struktur File Data (v1.0.0)

Semua data disimpan sebagai file JSON statis di dalam folder `data/` di root project.

```
data/
├── destinations.json       ← Array of Destination
├── travel_routes.json      ← Array of TravelRoute (schedules[] inline)
├── tour_packages.json      ← Array of TourPackage (itinerary, includes, excludes inline)
├── fleets.json             ← Array of Fleet
├── faqs.json               ← Array of Faq (semua scope dalam satu file)
└── site_config.json        ← Object SiteConfig tunggal
```

> **Catatan:** Pada v1.0.0, jadwal rute (`schedules`) disimpan **inline** di dalam objek `TravelRoute` sebagai field `schedules: string[]`, bukan sebagai sub-koleksi terpisah. Ini menyederhanakan struktur tanpa memerlukan join/relasi.

> **Untuk v2.0 (dengan database):** Struktur Firestore dan migration guide akan didefinisikan di dokumen roadmap v2.0.

---

## 10. Relasi Antar Entitas

```
destinations/{id}
  ← originId          travel_routes
  ← destinationId     travel_routes
  ← mainDestinationId tour_packages

travel_routes/{id}
  → schedules/        sub-koleksi RouteSchedule

tour_packages/{id}
  → itinerary[]       array inline ItineraryItem
  → includes[]        array inline IncludeExcludeItem
  → excludes[]        array inline IncludeExcludeItem

fleets/{id}
  → includes[]        array inline IncludeExcludeItem
  → excludes[]        array inline IncludeExcludeItem

faqs/{id}
  → scopeId?          referensi ke TravelRoute.id | TourPackage.id | Fleet.id
```

> **Catatan desain:** Karena data bersifat statis (JSON lokal), resolusi referensi (misal: mengambil nama kota dari `originId`) dilakukan di sisi aplikasi dengan `Array.find()` pada array `destinations`. Ini efisien karena data berukuran kecil dan sudah dimuat sepenuhnya saat build time.

---

## 11. Keamanan Data (v1.0.0)

Pada v1.0.0 yang menggunakan **static JSON lokal**, tidak diperlukan Security Rules karena tidak ada database backend. Data bersifat read-only dan sudah tertanam di build time.

**Implikasi keamanan v1.0.0:**
- Data publik (rute, wisata, armada, FAQ) dapat dibaca siapa saja — ini memang tujuannya.
- Tidak ada operasi tulis dari sisi klien — semua perubahan dilakukan developer dengan mengedit file `data/*.json` dan deploy ulang.
- Nomor WhatsApp dan informasi kontak ditampilkan secara publik — ini *by design*.

> **Untuk v2.0 (dengan Firebase):** Security Rules Firestore akan ditambahkan saat migrasi ke database backend. Pola aturannya: semua koleksi bisa dibaca publik, hanya admin terautentikasi yang bisa menulis.
