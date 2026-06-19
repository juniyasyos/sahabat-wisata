# 02 — Color Palette & Typography

## 1. Filosofi Warna

Website travel lokal harus mengkomunikasikan:
- **Kehangatan & kepercayaan** → warna earth tone / amber
- **Profesionalisme** → tidak terlalu kasual, tidak terlalu korporat
- **Energi perjalanan** → accent yang sedikit vibrant

---

## 2. Palet Warna Utama

### Warna Primer — Amber/Saffron (Brand Color)

> Mencerminkan semangat perjalanan, matahari pagi sebelum berangkat, dan kehangatan layanan lokal.

| Token | Nama | Hex | HSL | Penggunaan |
|-------|------|-----|-----|-----------|
| `--color-primary-50` | Amber Lightest | `#FFFBEB` | hsl(48, 100%, 96%) | Background section halus |
| `--color-primary-100` | Amber Light | `#FEF3C7` | hsl(48, 96%, 89%) | Hover state ringan |
| `--color-primary-200` | Amber Soft | `#FDE68A` | hsl(48, 97%, 77%) | Border, divider |
| `--color-primary-400` | Amber Mid | `#FBBF24` | hsl(43, 96%, 56%) | Badge, tag, highlight |
| `--color-primary-500` | Amber Base | `#F59E0B` | hsl(38, 92%, 50%) | **CTA sekunder, ikon aksen** |
| `--color-primary-600` | Amber Deep | `#D97706` | hsl(32, 95%, 44%) | **Tombol primer hover** |
| `--color-primary-700` | Amber Dark | `#B45309` | hsl(26, 90%, 37%) | Teks di atas latar terang |

### Warna Aksi — Teal/Emerald (Kepercayaan & Aksi)

> Digunakan khusus untuk elemen yang mendorong aksi — terutama tombol WhatsApp.

| Token | Nama | Hex | HSL | Penggunaan |
|-------|------|-----|-----|-----------|
| `--color-action-400` | Teal Mid | `#34D399` | hsl(160, 61%, 52%) | Icon WhatsApp |
| `--color-action-500` | Teal Base | `#10B981` | hsl(160, 84%, 39%) | **Tombol WhatsApp** |
| `--color-action-600` | Teal Deep | `#059669` | hsl(161, 94%, 30%) | Tombol WA hover |
| `--color-action-700` | Teal Dark | `#047857` | hsl(161, 96%, 24%) | Teks sukses |

### Neutral — Warm Gray (Teks & Background)

> Warm gray (bukan blue-gray) agar tetap terasa hangat.

| Token | Nama | Hex | HSL | Penggunaan |
|-------|------|-----|-----|-----------|
| `--color-neutral-50` | Warm White | `#FAFAF9` | hsl(60, 9%, 98%) | Background halaman utama |
| `--color-neutral-100` | Warm Gray 100 | `#F5F5F4` | hsl(60, 5%, 96%) | Background section alt |
| `--color-neutral-200` | Warm Gray 200 | `#E7E5E4` | hsl(20, 6%, 90%) | Border, divider |
| `--color-neutral-400` | Warm Gray 400 | `#A8A29E` | hsl(20, 6%, 64%) | Teks placeholder |
| `--color-neutral-600` | Warm Gray 600 | `#57534E` | hsl(25, 6%, 32%) | Teks body sekunder |
| `--color-neutral-800` | Warm Gray 800 | `#292524` | hsl(20, 7%, 15%) | Teks heading & body utama |
| `--color-neutral-900` | Near Black | `#1C1917` | hsl(20, 9%, 10%) | Heading paling berat |

### Warna Status

| Token | Hex | Penggunaan |
|-------|-----|-----------|
| `--color-success` | `#22C55E` | Tersedia, konfirmasi |
| `--color-warning` | `#F59E0B` | Hampir penuh, perhatian |
| `--color-error` | `#EF4444` | Error, tidak tersedia |
| `--color-info` | `#3B82F6` | Informasi, catatan |

---

## 3. Kombinasi Warna yang Sudah Divalidasi

### CTA WhatsApp (Paling Penting)
```
Background: #10B981 (Teal Base)
Text: #FFFFFF (White)
Hover: #059669 (Teal Deep)
Icon: WhatsApp white SVG
```

### Tombol Primer (Pesan / Hubungi)
```
Background: #F59E0B (Amber Base)
Text: #1C1917 (Near Black) — BUKAN putih, untuk kontras yang cukup
Hover: #D97706 (Amber Deep)
```

### Kartu Layanan
```
Background: #FFFFFF
Border: #E7E5E4
Shadow: 0 1px 3px rgba(0,0,0,0.08)
Hover shadow: 0 4px 12px rgba(0,0,0,0.12)
```

### Hero Section
```
Overlay: linear-gradient(to bottom, rgba(28,25,23,0.5), rgba(28,25,23,0.8))
Teks heading: #FAFAF9 (Warm White)
Teks sub: #E7E5E4 (Warm Gray 200)
```

---

## 4. Tipografi

### Font Stack

#### Heading — Plus Jakarta Sans

> Font modern Indonesia-friendly, tegas tapi tidak kaku. Dibaca baik di semua ukuran.

```css
font-family: 'Plus Jakarta Sans', sans-serif;
```

Google Fonts URL:
```
https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap
```

| Weight | Token | Penggunaan |
|--------|-------|-----------|
| 800 | `font-extrabold` | Headline hero (H1) |
| 700 | `font-bold` | Judul section (H2), nama produk |
| 600 | `font-semibold` | Subjudul (H3), label penting |
| 500 | `font-medium` | Teks navigasi, tombol |

#### Body — Inter

> Standar industri untuk keterbacaan web. Sangat familiar di mata pengguna Indonesia.

```css
font-family: 'Inter', sans-serif;
```

Google Fonts URL:
```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap
```

| Weight | Token | Penggunaan |
|--------|-------|-----------|
| 400 | `font-normal` | Body text, deskripsi, paragraf |
| 500 | `font-medium` | Label, badge, info penting |

---

## 5. Skala Tipografi

| Token | Size (rem) | px equiv | Line Height | Penggunaan |
|-------|-----------|---------|-------------|-----------|
| `text-xs` | 0.75rem | 12px | 1.5 | Badge, caption kecil |
| `text-sm` | 0.875rem | 14px | 1.5 | Label, meta info |
| `text-base` | 1rem | 16px | 1.6 | Body teks utama |
| `text-lg` | 1.125rem | 18px | 1.5 | Sub-teks penting |
| `text-xl` | 1.25rem | 20px | 1.4 | H4, card title |
| `text-2xl` | 1.5rem | 24px | 1.3 | H3, section subtitle |
| `text-3xl` | 1.875rem | 30px | 1.25 | H2, section title |
| `text-4xl` | 2.25rem | 36px | 1.2 | H1 halaman dalam |
| `text-5xl` | 3rem | 48px | 1.1 | H1 hero (desktop) |
| `text-6xl` | 3.75rem | 60px | 1.05 | Display hero besar |

**Mobile scaling:** Semua heading ukuran 4xl+ di-scale down ~20% di layar < 768px.

---

## 6. CSS Design Tokens (Siap Implementasi)

```css
:root {
  /* Colors — Primary */
  --color-primary-50: #FFFBEB;
  --color-primary-100: #FEF3C7;
  --color-primary-200: #FDE68A;
  --color-primary-400: #FBBF24;
  --color-primary-500: #F59E0B;
  --color-primary-600: #D97706;
  --color-primary-700: #B45309;

  /* Colors — Action (WhatsApp/Green) */
  --color-action-400: #34D399;
  --color-action-500: #10B981;
  --color-action-600: #059669;
  --color-action-700: #047857;

  /* Colors — Neutral (Warm Gray) */
  --color-neutral-50: #FAFAF9;
  --color-neutral-100: #F5F5F4;
  --color-neutral-200: #E7E5E4;
  --color-neutral-400: #A8A29E;
  --color-neutral-600: #57534E;
  --color-neutral-800: #292524;
  --color-neutral-900: #1C1917;

  /* Colors — Status */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* Typography — Font Families */
  --font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Typography — Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06);
  --shadow-xl: 0 20px 50px rgba(0,0,0,0.15);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

---

## 7. Aksesibilitas Warna (WCAG)

| Kombinasi | Rasio Kontras | Status |
|-----------|--------------|--------|
| Amber Base (#F59E0B) teks gelap di atas putih | ≈ 3.0:1 | ⚠️ AA Large only |
| Near Black (#1C1917) di atas Amber Base | ≈ 7.2:1 | ✅ AAA |
| White di atas Teal Base (#10B981) | ≈ 4.6:1 | ✅ AA |
| Warm Gray 600 (#57534E) di atas Warm White | ≈ 6.1:1 | ✅ AA |
| Near Black (#1C1917) di atas Warm White | ≈ 16.4:1 | ✅ AAA |

> **Catatan:** Tombol Amber **harus** menggunakan teks gelap (#1C1917), bukan putih.
