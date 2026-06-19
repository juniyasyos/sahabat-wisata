# 07 — Mobile UX Design

## 1. Mengapa Mobile-First

Data perilaku pengguna travel lokal Indonesia:
- **80-85%** pencarian travel lokal dilakukan dari ponsel
- Pengguna biasanya mencari di sela-sela aktivitas (di jalan, istirahat kerja)
- Konversi via ponsel lebih tinggi karena WhatsApp langsung bisa dibuka

**Implikasi:** Desain mobile bukan afterthought — itu adalah desain **primer**. Desktop adalah enhancement.

---

## 2. Target Resolusi Mobile

| Perangkat | Lebar (px) | Prioritas |
|-----------|-----------|-----------|
| Samsung Galaxy A (seri A) | 360-390px | ⭐ Tertinggi |
| iPhone SE / 12 Mini | 375px | ⭐ Tinggi |
| iPhone 14 / 15 | 390-393px | ⭐ Tinggi |
| Samsung Galaxy S | 360-414px | Tinggi |
| Tablet (entry) | 600-768px | Menengah |

**Safe zone:** Desain harus sempurna di 360px width.

---

## 3. Mobile Navigation

### Navbar Mobile

```
┌──────────────────────────────────────────┐
│  [LOGO / Brand Name]          [≡ Menu]   │
└──────────────────────────────────────────┘
```

- Logo: Kiri, max-height 36px
- Hamburger: Kanan, 44x44px touch target
- Background: Transparan di hero, solid white setelah scroll

### Drawer Menu (Slide-in dari kanan)

```
┌───────────────────────────────────┐
│  [×] Tutup                        │
│  ─────────────────────────────    │
│  Travel Antar Kota         [→]    │
│  Paket Wisata              [→]    │
│  Sewa Armada               [→]    │
│  Blog / Tips Perjalanan    [→]    │
│  ─────────────────────────────    │
│  [🟢 Hubungi via WhatsApp]        │
│                                   │
│  📍 Jember, Jawa Timur            │
│  📱 0XXX-XXXX-XXXX               │
└───────────────────────────────────┘

Width: 280px atau 85vw (mana yang lebih kecil)
Background: White
Overlay background: rgba(0,0,0,0.5) dengan backdrop-blur
Animasi: translateX dari kanan, 300ms ease
```

---

## 4. Hero Mobile

### Penyesuaian dari Desktop

| Elemen | Desktop | Mobile |
|--------|---------|--------|
| Tinggi hero | `100svh` | `75svh` min |
| Font H1 | 3-4rem | 2rem (clamp) |
| Sub-headline | 18px | 15px |
| CTA buttons | Side-by-side | Stack vertikal |
| Quick-access cards | 4 col horizontal | 2x2 grid |

### Teknikal

```css
/* Hero mobile adjustment */
@media (max-width: 767px) {
  .hero {
    min-height: 75svh;
    padding-bottom: 120px; /* space untuk quick access cards */
  }

  .hero-headline {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
  }

  .hero-cta-group {
    flex-direction: column;
    gap: 0.75rem;
  }

  .hero-cta-group .btn {
    width: 100%;
    justify-content: center;
  }

  .quick-access-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## 5. Kartu & Grid Mobile

### Grid Responsif

```
Mobile (< 640px):   1 kolom
Mobile L (≥ 480px): 1 kolom (kartu lebih lebar)
Tablet (≥ 640px):   2 kolom
Desktop (≥ 1024px): 3 kolom
```

### Kartu Mobile

```
─ Padding internal: 16px (bukan 24px seperti desktop)
─ Font judul: 16px (bukan 18px)
─ Tombol: Full-width di mobile
─ Foto kartu wisata: 180px height (bukan 240px)
─ Icon: 20px (bukan 24px)
```

---

## 6. Touch Target & Aksesibilitas

**Aturan minimum touch target:** 44px x 44px (Apple HIG) atau 48x48dp (Google Material)

| Elemen | Min Touch Size |
|--------|---------------|
| Tombol CTA | 52px height, full-width atau min 200px |
| Link navigasi | 44px height |
| Hamburger icon | 44x44px |
| FAQ accordion | 48px height |
| Kartu (seluruh area) | Seluruh kartu clickable |
| Icon link | 44x44px area klik |

```css
/* Ensure all clickable elements have sufficient touch area */
.btn, a, button {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}

/* Expand touch area without changing visual size */
.icon-link {
  padding: 12px;
  margin: -12px;
}
```

---

## 7. Tipografi Mobile

| Element | Desktop | Mobile |
|---------|---------|--------|
| H1 (hero) | 4rem | `clamp(1.75rem, 5.5vw, 2.5rem)` |
| H1 (page) | 2.25rem | `clamp(1.5rem, 5vw, 2rem)` |
| H2 (section) | 1.875rem | 1.5rem |
| H3 (card) | 1.25rem | 1.125rem |
| Body | 1rem | 1rem (tidak dikecilkan) |
| Caption | 0.875rem | 0.875rem |

> **Rule:** Body text jangan pernah di bawah 14px di mobile. Keterbacaan adalah prioritas.

---

## 8. Scrolling & Navigation

### Infinite Scroll vs Pagination

Untuk katalog rute dan wisata:
- **Mobile:** Load More button (bukan infinite scroll — menghindari "jebakan scroll")
- **Desktop:** Pagination biasa atau Load More

### Sticky Elements di Mobile

| Elemen | Perilaku |
|--------|----------|
| Navbar | Sticky setelah scroll 80px |
| Floating WA button | Selalu visible |
| Sidebar (detail page) | Berubah menjadi bottom bar di mobile |

### Bottom Action Bar (Mobile, halaman detail)

Di halaman detail rute/wisata, sidebar berubah menjadi bottom bar:

```
┌──────────────────────────────────────────────────────┐
│  Mulai Rp 150.000 / orang    [🟢 Pesan via WA]      │
└──────────────────────────────────────────────────────┘

Position: Fixed, bottom: 0
Height: 64px
Background: White
Border-top: 1px solid neutral-200
Padding: 0 16px
Z-index: 100
```

---

## 9. Form & Input Mobile

Untuk form apapun yang ada (misal: search, filter):

- Input height: minimal 44px
- Font-size input: minimal 16px (mencegah auto-zoom di iOS)
- Label di atas input (bukan floating label yang menyulitkan)
- Keyboard type: `inputmode="tel"` untuk nomor, `inputmode="email"` untuk email
- Tombol submit: Full-width

```css
input, select, textarea {
  font-size: 16px; /* Prevent iOS zoom */
  min-height: 44px;
  padding: 12px 16px;
}
```

---

## 10. Performance Mobile

### Image Optimization

```html
<!-- Foto hero: responsive images -->
<img
  src="hero-mobile.webp"
  srcset="hero-mobile.webp 768w, hero-desktop.webp 1920w"
  sizes="(max-width: 768px) 100vw, 100vw"
  loading="eager"   <!-- hero: eager -->
  decoding="async"
  alt="..."
/>

<!-- Foto lainnya: lazy load -->
<img loading="lazy" ... />
```

### Target Performa

| Metrik | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5 detik |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| Total page weight | < 1.5MB (mobile) |
| Waktu interaktif | < 3 detik di jaringan 4G |

### Prioritasi Mobile

1. Foto hero di-compress ke WebP, max 300KB untuk mobile
2. Font di-preload (Plus Jakarta Sans + Inter)
3. CSS kritis di-inline, sisanya di-defer
4. JavaScript diminimalkan — tidak ada library besar yang tidak perlu

---

## 11. Testing Checklist Mobile

Sebelum launch, test di perangkat fisik (atau emulator):

- [ ] Samsung Galaxy A14/A34 (Android, Chrome)
- [ ] iPhone (iOS 16+, Safari)
- [ ] Xiaomi Redmi (Android, Chrome)
- [ ] Koneksi 4G (simulasi throttle di DevTools)
- [ ] Koneksi 3G (untuk worst case)

Checklist per halaman:
- [ ] Tidak ada horizontal scroll (max-width terjaga)
- [ ] Semua teks terbaca tanpa zoom
- [ ] Tombol CTA terlihat tanpa scroll pertama
- [ ] Floating WA button tidak menutup konten penting
- [ ] Foto tidak terlalu berat, loading cepat
- [ ] Form tidak ter-zoom saat diklik (font-size 16px)
- [ ] Drawer menu bisa ditutup dengan swipe atau klik overlay
