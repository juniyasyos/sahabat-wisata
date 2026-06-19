# 04 — UI Component Library

## 1. Filosofi Komponen

Komponen dirancang dengan prinsip **atomic design** — dari elemen terkecil (atom) hingga section halaman (organism). Setiap komponen harus:

- Konsisten dengan design token di `02_COLOR_TYPOGRAPHY.md`
- Berfungsi baik di mobile maupun desktop
- Punya state yang jelas (default, hover, active, disabled)

---

## 2. Atoms — Elemen Paling Dasar

### 2.1 Badge / Tag

**Tipe:**
| Nama | Background | Text | Penggunaan |
|------|-----------|------|-----------|
| `badge-primary` | Amber 100 | Amber 700 | Kategori utama, highlight |
| `badge-success` | Green 100 | Green 700 | Tersedia, aktif |
| `badge-warning` | Yellow 100 | Yellow 700 | Hampir penuh, perhatian |
| `badge-neutral` | Gray 100 | Gray 600 | Info umum |
| `badge-outline` | Transparan | Amber 600 | Hero badge (di atas foto) |

**Spesifikasi:**
```
Font: Inter 500, text-xs (12px)
Padding: 4px 10px
Border-radius: radius-full (pill shape)
Letter-spacing: 0.025em
```

---

### 2.2 Button

**Tipe Tombol:**

| Variant | BG | Text | Border | Penggunaan |
|---------|----|----|--------|-----------|
| `btn-whatsapp` | `#10B981` | White | — | **CTA utama WhatsApp** |
| `btn-primary` | `#F59E0B` | `#1C1917` | — | Aksi primer (pesan, lihat) |
| `btn-secondary` | White | `#292524` | Gray 200 | Aksi sekunder |
| `btn-ghost` | Transparan | White | White (0.6) | Di atas foto/dark bg |
| `btn-ghost-dark` | Transparan | `#292524` | Gray 300 | Di atas bg terang |

**Ukuran:**
| Size | Height | Padding H | Font Size |
|------|--------|----------|-----------|
| `btn-sm` | 36px | 16px | 14px |
| `btn-md` | 44px | 20px | 15px |
| `btn-lg` | 52px | 24px | 16px |
| `btn-xl` | 60px | 32px | 18px |

**States:**
```
Default: Warna solid
Hover: Gelap 8% + scale(1.01)
Active: Gelap 12% + scale(0.99)
Disabled: Opacity 0.4, cursor not-allowed
Focus: Ring 2px offset 2px, warna primary
```

**Loading State:**
```
Icon: Spinner SVG (animasi rotate)
Text: "Memuat..." atau tetap teks asli
Pointer-events: none
```

---

### 2.3 Icon

**Library:** Lucide Icons (SVG inline atau via CDN)

**Ukuran standar:**
| Token | Size | Penggunaan |
|-------|------|-----------|
| `icon-xs` | 14px | Inline dalam teks |
| `icon-sm` | 16px | Badge, label kecil |
| `icon-md` | 20px | Navigasi, info |
| `icon-lg` | 24px | Card icon, CTA |
| `icon-xl` | 32px | Feature icon besar |
| `icon-2xl` | 48px | Ilustrasi kecil |

**Icon yang paling sering digunakan:**
- `map-pin` — Lokasi / rute
- `clock` — Waktu / jadwal
- `tag` — Harga
- `users` — Kapasitas / orang
- `phone` / `message-circle` — Kontak
- `check-circle` — Fasilitas tersedia
- `car` / `bus` — Armada
- `calendar` — Tanggal / jadwal
- `arrow-right` — Link navigasi
- `star` — Rating / highlight
- `shield-check` — Trust signal

---

### 2.4 Divider

```
Tipe 1 (Line): border-top: 1px solid var(--color-neutral-200)
Tipe 2 (Spacer): Elemen kosong dengan height
Tipe 3 (Section): Background color berganti antara white dan neutral-50
```

---

## 3. Molecules — Kombinasi Atoms

### 3.1 Kartu Rute Travel

```
┌──────────────────────────────────────────────────────┐
│  [BADGE: Travel Reguler]                             │
│                                                      │
│  🚌 Jember → Surabaya                               │
│                                                      │
│  📍 Door-to-door Jember  ⏱️ 3–4 jam  💺 7 seat    │
│                                                      │
│  Mulai Rp 150.000                                    │
│                                                      │
│  [🟢 Pesan via WA]    [Lihat Detail →]              │
└──────────────────────────────────────────────────────┘
```

**Spesifikasi:**
```
Background: White
Border-radius: radius-xl (16px)
Border: 1px solid neutral-200
Shadow: shadow-sm
Hover: shadow-md + translateY(-2px)
Transition: 200ms ease
Padding: 20px 24px
```

---

### 3.2 Kartu Paket Wisata

```
┌──────────────────────────────────────────────────────┐
│  [FOTO: 240px height, rounded atas]                  │
│  [BADGE: "Open Trip" di atas foto, pojok kiri atas]  │
├──────────────────────────────────────────────────────┤
│  H3: Paket Bromo Sunrise                             │
│  📅 2 Hari 1 Malam                                   │
│                                                      │
│  ✓ Transport  ✓ Guide  ✓ Hotel                       │
│                                                      │
│  Mulai Rp 450.000 / orang                            │
│                                                      │
│  [🟢 Tanya via WA]          [Lihat Detail →]         │
└──────────────────────────────────────────────────────┘
```

---

### 3.3 Kartu Armada

```
┌──────────────────────────────────────────────────────┐
│  [FOTO ARMADA: eksterior / interior]                 │
├──────────────────────────────────────────────────────┤
│  Toyota HiAce Premio                                 │
│  👥 12 Penumpang  ❄️ AC  🎵 Audio                   │
│                                                      │
│  Cocok untuk: Wisata rombongan, perjalanan jauh      │
│                                                      │
│  [🟢 Tanya Sewa via WA]                              │
└──────────────────────────────────────────────────────┘
```

---

### 3.4 Info Titik Antar/Jemput (Coverage Point)

```
┌─────────────────────────────────────────────────────┐
│  📍 Surabaya Pusat                                   │
│     Gratis penjemputan di area pusat kota            │
│  ───────────────────────────────────────────────────│
│  📍 Bandara Juanda                                   │
│     Titik kumpul di Terminal 1 & 2                  │
│     [+ Rp 25.000]                                   │
└─────────────────────────────────────────────────────┘
```

Digunakan di halaman detail rute untuk menampilkan daftar area penjemputan atau penurunan dengan jelas.

---

### 3.5 Info Row (Jadwal/Harga)

```
┌─────────────────────────────────────────────────────┐
│  ⏰ 06.00 WIB    │    🚌 Jember → Surabaya    │  ─→  │
│  ⏰ 14.00 WIB    │    🚌 Jember → Malang      │  ─→  │
│  ⏰ 21.00 WIB    │    🚌 Jember → Bali        │  ─→  │
└─────────────────────────────────────────────────────┘
```

Digunakan di halaman detail rute untuk menampilkan jadwal keberangkatan.

---

### 3.5 Trust Signal Bar

```
┌─────────────────────────────────────────────────────────────┐
│  ✅ Armada Nyaman   |   💬 Respons Cepat   |   📍 Jemput Rumah   |   ⭐ 5+ Tahun Beroperasi  │
└─────────────────────────────────────────────────────────────┘
```

**Posisi:** Di bawah hero section pada homepage.
**Design:** Background solid (amber-50 atau neutral-50), border atas dan bawah tipis.

---

### 3.6 FAQ Item (Accordion)

```
┌──────────────────────────────────────────────────────────────┐
│  Apakah ada layanan jemput rumah (door-to-door)?  [▼ / ▲]  │
│─────────────────────────────────────────────────────────────│
│  Ya, kami menyediakan layanan jemput dari lokasi             │
│  Anda di area Jember. Konfirmasi area jemput via             │
│  WhatsApp untuk detail lebih lanjut.                         │
└──────────────────────────────────────────────────────────────┘
```

**Behavior:** Click untuk expand/collapse dengan animasi height.

---

### 3.7 WhatsApp Floating Button

```
Posisi: Fixed, bottom-right (bottom: 24px, right: 24px)
Design: Circle 56px, background #10B981, shadow-lg
Icon: WhatsApp SVG putih 28px
Animasi: Pulse ring setiap 3 detik (attention-grabbing)
Tooltip: "Chat via WhatsApp" (muncul saat hover)
```

---

## 4. Organisms — Section Halaman

### 4.1 Navbar

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]        [Travel] [Wisata] [Armada] [Blog]   [🟢 WA] │
└─────────────────────────────────────────────────────────────┘
```

**Behavior:**
- Default: Transparan (di atas hero foto)
- Setelah scroll 80px: Background white + shadow-sm + backdrop-blur
- Mobile: Hamburger menu → Slide-in drawer dari kanan
- Active link: Underline amber / teks amber

---

### 4.2 Section Layanan (Homepage)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADING: Layanan Kami                                      │
│  Sub: Pilih layanan yang sesuai kebutuhan Anda             │
│                                                             │
│  [Kartu Travel]  [Kartu Wisata]  [Kartu Armada]  [Kartu Rombongan]
└─────────────────────────────────────────────────────────────┘
```

---

### 4.3 Section Rute Populer (Homepage)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADING: Rute Populer                                      │
│                                                             │
│  [Kartu Rute 1]  [Kartu Rute 2]  [Kartu Rute 3]           │
│                                                             │
│  [→ Lihat Semua Rute]                                       │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.4 Section CTA Banner

```
┌─────────────────────────────────────────────────────────────┐
│  [Background: Amber gradient atau foto dengan overlay terang]│
│                                                             │
│  Siap Berangkat?                                            │
│  Hubungi kami sekarang dan kami siapkan perjalanan Anda.   │
│                                                             │
│  [🟢 Hubungi via WhatsApp]                                  │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.5 Footer

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]                                                     │
│  Travel Sahabat Wisata Jember                               │
│  Layanan travel antar kota & wisata dari Jember            │
│                                                             │
│  Layanan          Rute Populer       Ikuti Kami             │
│  ─ Travel         ─ Jember–SBY       ─ Instagram            │
│  ─ Wisata         ─ Jember–Malang    ─ Facebook             │
│  ─ Sewa Armada    ─ Jember–Bali      ─ TikTok               │
│  ─ Rombongan                                                │
│                                                             │
│  📍 Jember, Jawa Timur                                      │
│  📱 [Nomor WA]                                              │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  © 2025 Travel Sahabat Wisata Jember. All rights reserved. │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Responsive Breakpoints

| Breakpoint | Token | Width | Keterangan |
|-----------|-------|-------|------------|
| Mobile S | `xs` | < 480px | Ponsel kecil |
| Mobile | `sm` | 480–767px | Ponsel standar |
| Tablet | `md` | 768–1023px | Tablet |
| Desktop | `lg` | 1024–1279px | Laptop |
| Desktop L | `xl` | 1280–1535px | Desktop |
| Desktop XL | `2xl` | ≥ 1536px | Monitor lebar |

**Target utama:** `sm` (Mobile) dan `lg` (Desktop). Tablet (`md`) otomatis mengikuti.

---

## 6. Grid System

```css
/* Container */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem; /* mobile */
}

@media (min-width: 768px) {
  .container { padding: 0 1.5rem; }
}

@media (min-width: 1024px) {
  .container { padding: 0 2rem; }
}

/* Grid umum */
.grid-cards {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr; /* mobile */
}

@media (min-width: 640px) {
  .grid-cards { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid-cards { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1280px) {
  .grid-cards-4 { grid-template-columns: repeat(4, 1fr); }
}
```
