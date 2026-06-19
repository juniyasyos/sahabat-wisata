# PRD — Sahabat Wisata Jember Website

## Project Overview
Lead generation website untuk bisnis travel lokal Jember. Tujuan: mengubah pencarian Google → percakapan WhatsApp admin.

**Repository Referensi:** https://github.com/juniyasyos/sahabat-wisata

---

## Architecture
- **Frontend:** React.js + Tailwind CSS (Create React App) + React Router DOM v7
- **Backend:** FastAPI minimal (hanya health check)
- **Data:** Static JS files di `src/data/`
- **Hosting:** Supervisor-managed (frontend port 3000, backend port 8001)

---

## User Personas
1. **Masyarakat Jember** yang cari travel ke Surabaya/Malang/Bali
2. **Wisatawan** yang mau ke Bromo/Ijen dari Jember
3. **Korporat/Instansi** yang butuh sewa armada untuk acara

---

## Core Requirements (Static)
- WhatsApp Number: 6285732431396
- Light mode only (warm white background)
- Mobile-first (360px+ support)
- Semua CTA mengarah ke WhatsApp
- Tidak ada backend/booking engine

---

## What's Been Implemented

### 2026-06-19 — Full Multi-Page Website (v2.0.0) — 100% Test Pass
- **React Router DOM** — Multi-page routing, ScrollToTop, IntersectionObserver animasi
- **Homepage** — Hero split layout + 4-tab search box + Trust Bar + Layanan + Rute + Wisata + Armada + Kenapa Kami + Cara Pesan + Testimoni + FAQ + CTA + Footer
- **Halaman /travel** — Katalog 4 rute aktif dengan gambar, harga, WA CTA
- **Halaman /travel/:slug** — Detail rute: jadwal, titik jemput/tujuan, fasilitas, kebijakan, StickyCard
- **Halaman /wisata** — Katalog 4 paket wisata (Bromo, Ijen, Bromo+Ijen, Papuma)
- **Halaman /wisata/:slug** — Detail paket: itinerary timeline, include/exclude, FAQ, StickyCard
- **Halaman /sewa-armada** — Katalog 3 armada + Cara Sewa section
- **Halaman /sewa-armada/:slug** — Detail armada: fasilitas, cocok untuk, armada lain
- **Halaman /rombongan** — Use cases, pilihan paket, inquiry form
- **Halaman /faq** — Accordion dengan 6 filter kategori, 8 FAQ
- **Halaman /kontak** — Info kontak, form pesan kirim via WA
- **Halaman 404** — Not found page dengan back button
- **Navbar** — NavLink dengan active state highlight, full responsive
- **Footer** — Router Links ke semua halaman
- **Floating WA Button** — Pulse animation, semua halaman
- **Breadcrumb** — Di semua inner pages
- **StickyBookingCard** — Di semua detail pages (Travel, Wisata, Armada)

### 2026-06-19 — Hero Section Redesign (v1.1.0)
- Split layout: kiri white bg + text/CTA, kanan foto Bali vivid
- Floating cards destinasi di foto

### 2026-06-19 — Homepage (v1.0.0)
- Initial homepage dengan semua section

---

## Prioritized Backlog

### P1 (Backlog)
- [ ] SEO meta tags per halaman (title, description, OG tags)
- [ ] Schema.org structured data (LocalBusiness, TouristTrip, Product)
- [ ] Halaman Custom Trip (`/custom-trip`)
- [ ] Counter animasi di stats row
- [ ] Sitemap.xml

### P2 (Nice to Have)
- [ ] Google Analytics integration
- [ ] Image carousel di hero
- [ ] Google Maps embed di halaman Kontak
- [ ] WhatsApp click tracking
- [ ] Halaman konfirmasi booking

---

## Tech Stack Detail
```
Frontend: React.js 19 + Tailwind CSS 3 + Lucide React + React Router DOM v7
Backend: FastAPI (minimal health check only)
Data: Static JS files in src/data/ (5 files)
Build: Create React App
```
