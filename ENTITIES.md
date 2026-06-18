# Entity Reference — Website Travel Jember

Dokumen ini mendefinisikan semua entitas data yang digunakan pada website Travel Jember. Data dikelola menggunakan **Firebase Firestore** sebagai database utama dan **Firebase Storage** untuk aset media (foto armada, wisata, dll).

---

## Stack Data

| Kebutuhan        | Solusi Firebase                       |
| ---------------- | ------------------------------------- |
| Database         | **Cloud Firestore** (NoSQL Document)  |
| File & Foto      | **Firebase Storage**                  |
| Auth Admin       | **Firebase Authentication**           |
| Hosting          | **Firebase Hosting** *(opsional)*     |

---

## Katalog Entitas

- [1. Destination](#1-destination)
- [2. TravelRoute](#2-travelroute)
  - [2.1 RouteSchedule](#21-routeschedule)
- [3. TourPackage](#3-tourpackage)
  - [3.1 ItineraryItem](#31-itineraryitem)
  - [3.2 IncludeExcludeItem](#32-includeexcludeitem)
- [4. Fleet](#4-fleet)
- [5. Faq](#5-faq)
- [6. Post](#6-post)
- [7. SiteConfig](#7-siteconfig)
- [8. Tipe Bersama](#8-tipe-bersama)
- [9. Struktur Koleksi Firestore](#9-struktur-koleksi-firestore)
- [10. Relasi Antar Entitas](#10-relasi-antar-entitas)
- [11. Aturan Firestore (Security Rules)](#11-aturan-firestore-security-rules)

---

## 1. Destination

Master kota, wilayah, bandara, atau destinasi wisata. Digunakan sebagai referensi oleh `TravelRoute` dan `TourPackage`.

**Koleksi Firestore:** `destinations`

**Document ID:** slug kota. Contoh: `jember`, `surabaya`, `juanda`

```ts
type Destination = {
  id: string             // = Document ID Firestore
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

**Contoh dokumen Firestore:**

```json
// destinations/jember
{
  "name": "Jember",
  "slug": "jember",
  "type": "city",
  "province": "Jawa Timur"
}

// destinations/juanda
{
  "name": "Bandara Juanda",
  "slug": "juanda",
  "type": "airport",
  "province": "Jawa Timur",
  "description": "Bandara internasional di Sidoarjo yang melayani penerbangan dari/ke Surabaya."
}
```

---

## 2. TravelRoute

Rute travel antar kota. Setiap dokumen adalah satu halaman landing page di `/travel/{slug}`.

**Koleksi Firestore:** `travel_routes`

**Document ID:** slug rute. Contoh: `jember-surabaya`, `jember-juanda`

```ts
type TravelRoute = {
  id: string                      // = Document ID Firestore
  name: string                    // Contoh: "Travel Jember Surabaya"
  slug: string                    // Untuk URL
  originId: string                // Referensi ke destinations/{id}
  destinationId: string           // Referensi ke destinations/{id}
  basePrice: number | null        // Harga mulai dari (Rupiah). null = "Hubungi admin"
  estimatedDuration: string | null // Contoh: "5–7 jam". null = tidak ditampilkan
  estimatedDistanceKm: number | null
  shortDescription: string        // 1–2 kalimat untuk kartu katalog
  description: string             // Konten detail halaman
  pickupArea: string[]            // Contoh: ["Jember Kota", "Ambulu", "Balung"]
  dropoffArea: string[]           // Area antar di kota tujuan
  facilities: string[]            // Contoh: ["AC", "Door-to-Door", "Bagasi"]
  terms: string                   // Ketentuan booking
  isFeatured: boolean             // Tampil di homepage?
  isActive: boolean               // Tampil di katalog?
  meta: PageMeta
  createdAt: Timestamp            // Firestore server timestamp
  updatedAt: Timestamp
}
```

### 2.1 RouteSchedule

Jadwal keberangkatan. Disimpan sebagai **sub-koleksi** dari `travel_routes`.

**Sub-koleksi Firestore:** `travel_routes/{routeId}/schedules`

```ts
type RouteSchedule = {
  id: string
  label: string | null          // Contoh: "Pagi", "Siang", "Malam"
  departureTime: string | null  // Format "HH:mm". null = jadwal fleksibel
  description: string | null    // Catatan. Contoh: "Hubungi admin untuk konfirmasi"
  sortOrder: number             // Urutan tampil (ascending)
  isActive: boolean
}
```

> **Aturan:** Jika jadwal belum tetap, isi `departureTime: null` dan tulis keterangan di `description`. Jangan membuat jam palsu.

**Contoh dokumen:**

```json
// travel_routes/jember-surabaya/schedules/pagi
{
  "label": "Pagi",
  "departureTime": "06:00",
  "description": null,
  "sortOrder": 1,
  "isActive": true
}

// travel_routes/jember-surabaya/schedules/fleksibel
{
  "label": null,
  "departureTime": null,
  "description": "Jadwal menyesuaikan ketersediaan. Hubungi admin untuk konfirmasi.",
  "sortOrder": 4,
  "isActive": true
}
```

---

## 3. TourPackage

Paket wisata. Setiap dokumen adalah satu halaman di `/wisata/{slug}`.

**Koleksi Firestore:** `tour_packages`

**Document ID:** slug paket. Contoh: `bromo-midnight-sunrise`

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
  images: string[]                   // URL Firebase Storage
  isFeatured: boolean
  isActive: boolean
  meta: PageMeta
  createdAt: Timestamp
  updatedAt: Timestamp
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

**Contoh dokumen Firestore:**

```json
// tour_packages/bromo-midnight-sunrise
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
    "https://storage.googleapis.com/project.appspot.com/wisata/bromo-sunrise.jpg"
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

**Koleksi Firestore:** `fleets`

**Document ID:** slug armada. Contoh: `hiace-commuter`, `elf-long`

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
  images: string[]                // URL Firebase Storage (minimal: eksterior + interior)
  terms: string                   // Ketentuan sewa
  isFeatured: boolean
  isActive: boolean
  meta: PageMeta
  createdAt: Timestamp
  updatedAt: Timestamp
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

**Koleksi Firestore:** `faqs`

```ts
type Faq = {
  id: string
  question: string
  answer: string              // Boleh mengandung HTML sederhana (<b>, <a>, dll)
  scope: FaqScope
  scopeId: string | null      // null jika scope = "global" atau "travel" atau "tour"
  sortOrder: number
  isActive: boolean
}

type FaqScope =
  | "global"        // Halaman /faq
  | "travel"        // Halaman /travel (katalog semua rute)
  | "travel_route"  // Halaman /travel/{slug}. scopeId = TravelRoute.id
  | "tour"          // Halaman /wisata (katalog semua paket)
  | "tour_package"  // Halaman /wisata/{slug}. scopeId = TourPackage.id
  | "fleet"         // Halaman /sewa-armada/{slug}. scopeId = Fleet.id
```

**Query contoh (untuk halaman detail rute):**

```js
// Ambil FAQ global + FAQ spesifik rute ini
const faqsRef = collection(db, "faqs")

const [globalFaqs, routeFaqs] = await Promise.all([
  getDocs(query(faqsRef,
    where("scope", "==", "travel"),
    where("isActive", "==", true),
    orderBy("sortOrder")
  )),
  getDocs(query(faqsRef,
    where("scope", "==", "travel_route"),
    where("scopeId", "==", routeId),
    where("isActive", "==", true),
    orderBy("sortOrder")
  ))
])
```

---

## 6. Post

Artikel blog/edukasi untuk SEO konten jangka panjang.

**Koleksi Firestore:** `posts`

**Document ID:** slug artikel. Contoh: `tips-naik-travel-antar-kota`

```ts
type Post = {
  id: string
  title: string
  slug: string
  excerpt: string             // 1–2 kalimat untuk kartu blog dan meta description
  content: string             // Isi artikel (HTML atau Markdown)
  publishedAt: Timestamp | null // null = draft
  status: "draft" | "published"
  tags: string[]              // Contoh: ["travel", "tips", "wisata"]
  coverImage: string | null   // URL Firebase Storage
  meta: PageMeta
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

**Index Firestore yang diperlukan:**

```
posts: status ASC, publishedAt DESC   → untuk halaman /blog (list artikel)
posts: tags ARRAY_CONTAINS, status    → untuk filter berdasarkan tag
```

---

## 7. SiteConfig

Konfigurasi global website. Disimpan sebagai **satu dokumen tunggal** di Firestore.

**Koleksi Firestore:** `config`

**Document ID:** `site`

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
  defaultOgImage: string    // URL Firebase Storage

  updatedAt: Timestamp
}
```

**Cara membaca di aplikasi:**

```js
import { doc, getDoc } from "firebase/firestore"

const configSnap = await getDoc(doc(db, "config", "site"))
const siteConfig = configSnap.data()
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

## 9. Struktur Koleksi Firestore

```
firestore/
│
├── config/
│   └── site                        ← SiteConfig (dokumen tunggal)
│
├── destinations/
│   ├── jember
│   ├── surabaya
│   ├── juanda
│   └── bromo
│
├── travel_routes/
│   ├── jember-surabaya
│   │   └── schedules/              ← Sub-koleksi RouteSchedule
│   │       ├── pagi
│   │       ├── siang
│   │       └── malam
│   ├── jember-malang
│   │   └── schedules/
│   └── jember-juanda
│       └── schedules/
│
├── tour_packages/
│   ├── bromo-midnight-sunrise
│   ├── kawah-ijen-full-day
│   └── papuma-day-trip
│
├── fleets/
│   ├── hiace-commuter
│   ├── elf-long
│   └── avanza
│
├── faqs/
│   ├── faq-global-001
│   ├── faq-global-002
│   ├── faq-route-jember-surabaya-001
│   └── faq-tour-bromo-001
│
└── posts/
    ├── tips-naik-travel-antar-kota
    └── destinasi-wisata-dekat-jember
```

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

> **Catatan desain:** Firestore tidak mendukung JOIN seperti SQL. Resolusi referensi (misal: mengambil nama kota dari `originId`) dilakukan di sisi aplikasi dengan satu query tambahan, atau dengan menyimpan snapshot nama di dokumen induk (denormalisasi ringan).

---

## 11. Aturan Firestore (Security Rules)

Aturan dasar untuk v1.0.0: **semua data publik bisa dibaca siapa saja, hanya admin terautentikasi yang bisa menulis**.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Fungsi helper: cek apakah user sudah login
    function isAuthenticated() {
      return request.auth != null;
    }

    // Koleksi publik — baca bebas, tulis hanya admin
    match /destinations/{id} {
      allow read: if true;
      allow write: if isAuthenticated();
    }

    match /travel_routes/{id} {
      allow read: if true;
      allow write: if isAuthenticated();

      // Sub-koleksi jadwal
      match /schedules/{scheduleId} {
        allow read: if true;
        allow write: if isAuthenticated();
      }
    }

    match /tour_packages/{id} {
      allow read: if true;
      allow write: if isAuthenticated();
    }

    match /fleets/{id} {
      allow read: if true;
      allow write: if isAuthenticated();
    }

    match /faqs/{id} {
      allow read: if true;
      allow write: if isAuthenticated();
    }

    match /posts/{id} {
      // Artikel publik hanya yang sudah published
      allow read: if resource.data.status == "published" || isAuthenticated();
      allow write: if isAuthenticated();
    }

    // Config global — baca bebas, tulis hanya admin
    match /config/{id} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
  }
}
```

> **Catatan:** Untuk v1.0.0, `isAuthenticated()` sudah cukup. Jika ke depan ada role (admin, editor, dll), tambahkan pengecekan custom claims Firebase Authentication.
