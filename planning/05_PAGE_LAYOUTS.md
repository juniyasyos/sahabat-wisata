# 05 — Page Layouts & Wireframes

## 1. Layout Prinsip Global

- **Max-width container:** 1280px, centered
- **Section padding vertical:** `4rem` (desktop) / `2.5rem` (mobile)
- **Section alternating background:** White ↔ neutral-50 untuk visual rhythm

---

## 2. Homepage ( / )

### Layout Keseluruhan

```
[NAVBAR — Sticky, transparan lalu solid]
│
[HERO — Full viewport height]
│  Background foto penuh
│  Overlay gelap
│  Headline + Subheadline
│  Search Box (4 Tab: Travel, Wisata, Armada, Rombongan)
│  4 Quick-Access Cards (di bawah, floating)
│
[TRUST BAR — Tipis, background amber-50]
│  4 trust point horizontal
│
[SECTION: LAYANAN KAMI]
│  Heading + Sub
│  4 kartu layanan: Travel | Wisata | Armada | Rombongan
│
[SECTION: RUTE POPULER — bg neutral-50]
│  Heading + Sub
│  Grid 3 kartu rute
│  "Lihat Semua Rute →"
│
[SECTION: PAKET WISATA PILIHAN]
│  Heading + Sub
│  Grid 3 kartu wisata
│  "Lihat Semua Paket →"
│
[SECTION: KENAPA PILIH KAMI — bg neutral-50]
│  3–4 fitur keunggulan
│  Foto armada atau tim (opsional)
│
[SECTION: TESTIMONI]
│  3 kartu testimoni pelanggan
│
[SECTION: CTA BANNER]
│  Latar amber gradient
│  Teks ajakan + Tombol WhatsApp
│
[FOOTER]
```

### Section Breakdown

| # | Section | Background | Layout |
|---|---------|-----------|--------|
| 1 | Hero | Foto + overlay | Full-width, 100svh. Ada Search Box Form |
| 2 | Trust Bar | Amber-50 | Flex row |
| 3 | Layanan | White | 2x2 grid (mobile) / 4 col (desktop) |
| 4 | Rute Populer | Neutral-50 | 3 col grid |
| 5 | Paket Wisata | White | 3 col grid |
| 6 | Kenapa Kami | Neutral-50 | 2 col (teks + foto) atau 3 feature cards |
| 7 | Testimoni | White | 3 col grid |
| 8 | CTA Banner | Amber gradient | Full-width, centered teks |
| 9 | Footer | Near-black | 4 col (desktop) |

---

## 3. Halaman Katalog Travel ( /travel )

### Layout Keseluruhan

```
[NAVBAR]
│
[HERO — Compact, 40vh]
│  Foto armada / perjalanan
│  H1 + daftar rute
│
[SECTION: FILTER / SEARCH — opsional]
│  Filter: Kota Tujuan | Jenis Layanan
│
[SECTION: GRID RUTE]
│  Heading: "Semua Rute Tersedia"
│  Grid kartu rute (3 col desktop, 1 col mobile)
│  Pagination atau Load More
│
[SECTION: FAQ TRAVEL]
│  5-7 pertanyaan umum tentang travel
│
[SECTION: CTA BANNER]
│
[FOOTER]
```

### Grid Rute

```
Mobile (< 640px):   1 kartu per baris
Tablet (640-1023):  2 kartu per baris
Desktop (≥ 1024):   3 kartu per baris
```

---

## 4. Halaman Detail Rute ( /travel/{slug} )

### Layout Keseluruhan

```
[NAVBAR]
│
[HERO — Medium, 50-55vh]
│  Foto kota tujuan
│  Breadcrumb
│  H1 nama rute
│  Info cepat: Harga | Durasi | Seat
│  CTA "Pesan via WA"
│
[SECTION: DETAIL RUTE — 2 kolom desktop]
│  KIRI (60%): Deskripsi rute, layanan
│  KANAN (40%): Card ringkasan + CTA sticky
│
[SECTION: AREA JANGKAUAN & TITIK TURUN]
│  Daftar titik penjemputan di kota asal (beserta biaya tambahan jika ada)
│  Daftar titik penurunan/pengantaran di kota tujuan
│
[SECTION: JADWAL KEBERANGKATAN]
│  Tabel/list jadwal per hari
│
[SECTION: ARMADA YANG DIGUNAKAN]
│  Foto + spesifikasi armada untuk rute ini
│
[SECTION: FASILITAS]
│  Checklist fasilitas (AC, WiFi, dll)
│
[SECTION: KEBIJAKAN]
│  Pembatalan, DP, reschedule (jika ada)
│
[SECTION: FAQ RUTE INI]
│  FAQ spesifik untuk rute ini
│
[SECTION: RUTE LAIN YANG MUNGKIN MENARIK]
│  3 kartu rute rekomendasi
│
[CTA BANNER]
│
[FOOTER]
```

### Sticky Card (Sidebar Kanan, Desktop)

```
┌────────────────────────────────┐
│  Pesan Sekarang                │
│                                │
│  Mulai Rp 150.000 / orang      │
│  ⏱️ Estimasi 3–4 jam           │
│  🕐 Keberangkatan: 3x sehari   │
│                                │
│  [🟢 Pesan via WhatsApp]       │
│                                │
│  💬 Chat langsung dengan admin │
└────────────────────────────────┘
```

Sticky behavior: `position: sticky; top: 100px`

---

## 5. Halaman Katalog Wisata ( /wisata )

### Layout Keseluruhan

```
[NAVBAR]
│
[HERO — Medium, 50vh]
│  Foto destinasi terbaik
│  H1 + daftar destinasi
│
[SECTION: FILTER]
│  Filter: Durasi | Tipe Trip (Open/Private)
│
[SECTION: GRID PAKET WISATA]
│  Grid kartu wisata (3 col desktop)
│
[SECTION: FAQ WISATA]
│
[CTA BANNER]
│
[FOOTER]
```

---

## 6. Halaman Detail Wisata ( /wisata/{slug} )

### Layout Keseluruhan

```
[NAVBAR]
│
[HERO — Besar, 60-65vh]
│  Foto destinasi immersive
│  Overlay bottom-only
│  Breadcrumb + Badge + H1
│  Harga + Durasi + CTA
│
[SECTION: DETAIL — 2 kolom desktop]
│  KIRI (65%):
│    ─ Tentang Paket (deskripsi)
│    ─ Itinerary hari per hari
│    ─ Yang Sudah Termasuk (checklist ✓)
│    ─ Yang Belum Termasuk (checklist ✗)
│    ─ Syarat & Ketentuan
│    ─ FAQ paket ini
│  KANAN (35%): Sticky booking card
│
[SECTION: GALERI FOTO]
│  Grid foto (masonry atau uniform)
│
[SECTION: PAKET WISATA LAINNYA]
│
[CTA BANNER]
│
[FOOTER]
```

---

## 7. Halaman Katalog Armada ( /sewa-armada )

### Layout Keseluruhan

```
[NAVBAR]
│
[HERO — Compact, 45vh]
│  Foto armada
│  H1 + deskripsi singkat
│
[SECTION: GRID ARMADA]
│  Grid kartu armada (3 col desktop)
│  Setiap kartu: Foto, nama, kapasitas, fasilitas, tombol WA
│
[SECTION: CARA SEWA]
│  3-4 langkah singkat (numbered steps)
│
[SECTION: FAQ ARMADA]
│
[CTA BANNER]
│
[FOOTER]
```

---

## 8. Halaman Detail Armada ( /sewa-armada/{slug} )

### Layout Keseluruhan

```
[NAVBAR]
│
[HERO — Medium, 50vh]
│  Foto armada eksterior/interior
│  H1 nama armada
│  Kapasitas + CTA
│
[SECTION: DETAIL — 2 kolom]
│  KIRI: Galeri foto armada (swiper/grid)
│  KANAN: Spesifikasi + Fasilitas + Sticky booking card
│
[SECTION: COCOK UNTUK]
│  Apa yang armada ini cocok untuk (wisata, perjalanan jauh, dll)
│
[SECTION: ARMADA LAINNYA]
│
[CTA BANNER]
│
[FOOTER]
```

---

## 9. Spacing Antar Section

```css
/* Section padding standar */
.section {
  padding: 5rem 0;    /* Desktop */
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;  /* Mobile */
  }
}

/* Section heading */
.section-heading {
  text-align: center;
  margin-bottom: 3rem;  /* Desktop */
}

@media (max-width: 768px) {
  .section-heading {
    margin-bottom: 2rem;
  }
}
```

---

## 10. Urutan Prioritas Konten (Above the Fold)

Ini adalah urutan elemen yang harus **terlihat tanpa scroll** di mobile:

1. Logo dan nama bisnis (di navbar)
2. Foto latar yang menarik
3. Headline yang jelas (bisnis apa, untuk siapa)
4. Sub-teks singkat
5. **Tombol WhatsApp** — WAJIB visible tanpa scroll di mobile

> **Rule of thumb:** Jika tombol WhatsApp tidak terlihat tanpa scroll di mobile, desain perlu direvisi.
