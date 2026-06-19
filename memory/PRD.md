# PRD — Sahabat Wisata Jember Website

## Project Overview
Lead generation website untuk bisnis travel lokal Jember. Tujuan: mengubah pencarian Google → percakapan WhatsApp admin.

**Repository Referensi:** https://github.com/juniyasyos/sahabat-wisata

---

## Architecture
- **Frontend:** React.js + Tailwind CSS (Create React App)
- **Backend:** FastAPI minimal (hanya health check)
- **Data:** Static JSON/JS files (tidak perlu database untuk v1.0.0)
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
- Tidak ada backend/booking engine (v1.0.0)

---

## What's Been Implemented

### 2026-06-19 - Homepage (v1.0.0)
- **Navbar** — Transparan → solid saat scroll, mobile menu, WA CTA
- **Hero Section** — Background image + 4-tab search box (Travel/Wisata/Armada/Rombongan)
- **Trust Bar** — 4 trust points
- **Services Section** — 4 kartu layanan dengan WA CTA
- **Routes Section** — 3 rute populer dengan harga
- **Tours Section** — 2 paket wisata (Bromo, Ijen) dengan gambar
- **Fleet Section** — 3 armada kendaraan
- **Booking Flow** — 4 langkah pemesanan
- **FAQ Section** — Accordion 5 pertanyaan
- **CTA Banner** — Call to action penutup
- **Footer** — 4 kolom, info kontak
- **Floating WA Button** — Pulse animation, selalu visible

---

## Prioritized Backlog

### P0 (Halaman Wajib Berikutnya)
- [ ] Halaman Katalog Travel (`/travel`) — list semua rute dengan filter
- [ ] Halaman Detail Rute (`/travel/{slug}`)
- [ ] Halaman Katalog Wisata (`/wisata`)
- [ ] Halaman Detail Wisata (`/wisata/{slug}`)

### P1 (Halaman Penting)
- [ ] Halaman Sewa Armada (`/sewa-armada`)
- [ ] Halaman Detail Armada (`/sewa-armada/{slug}`)
- [ ] Halaman Rombongan (`/rombongan`)
- [ ] Halaman Kontak (`/kontak`)
- [ ] Halaman FAQ Lengkap (`/faq`)

### P2 (Nice to Have)
- [ ] React Router DOM untuk navigasi multi-halaman
- [ ] SEO meta tags per halaman
- [ ] Schema.org structured data
- [ ] Sitemap.xml
- [ ] Google Analytics integration

---

## Tech Stack Detail
```
Frontend: React.js 19 + Tailwind CSS 3 + Lucide React
Backend: FastAPI (minimal health check only)
Data: Static JS files in src/data/
Build: Create React App
```

## Next Tasks
1. Setup React Router DOM untuk navigasi halaman
2. Buat halaman-halaman P0
3. Implementasi SEO meta tags
