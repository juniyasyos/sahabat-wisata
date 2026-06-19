# 06 — CTA WhatsApp Design & Strategy

## 1. Mengapa WhatsApp adalah CTA Utama

Website ini adalah **lead generation website** — tujuan akhirnya bukan agar user membaca semua halaman, tapi agar user menghubungi admin via WhatsApp. Setiap elemen desain harus bekerja menuju tujuan ini.

WhatsApp dipilih karena:
- Pengguna lokal Jember sangat familiar dengan WhatsApp
- Tidak ada hambatan teknis (tidak perlu login, daftar, dll)
- Admin bisa merespons dengan cepat dan personal
- Pesan bisa langsung ter-preisi dengan konteks (rute, paket, armada)

---

## 2. Jenis CTA WhatsApp

### 2.1 Floating WhatsApp Button (Global)

**Posisi:** Fixed, pojok kanan bawah di semua halaman.

```
Ukuran: 56px x 56px (circle)
Background: #10B981 (Teal Base)
Icon: WhatsApp SVG (putih)
Shadow: shadow-lg
Z-index: 9999

Animasi: Pulse ring setiap 4 detik
  ─ Ring pertama: scale(1.4), opacity 0.3
  ─ Ring kedua: scale(1.8), opacity 0
  ─ Durasi: 1.5s, ease-out
  
Tooltip (hover): "Chat via WhatsApp"
  ─ Muncul ke kiri button
  ─ Background: dark, teks putih, rounded
  
Mobile: Ukuran 52px, bottom 16px, right 16px
Desktop: Ukuran 56px, bottom 24px, right 24px
```

**Link format:**
```
https://wa.me/62XXXXXXXXXX?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20travel.
```

---

### 2.2 CTA Button Inline (Dalam Halaman)

**Digunakan di:** Hero section, kartu rute, kartu wisata, kartu armada, sidebar sticky.

```
Design: btn-whatsapp (lihat 04_COMPONENTS.md)
Size: Umumnya btn-lg (52px)
Icon: WhatsApp icon di kiri teks
Teks: Bervariasi per konteks (lihat bagian 3)
```

---

### 2.3 CTA Banner Section

**Digunakan di:** Bagian bawah hampir semua halaman, sebelum footer.

```
┌──────────────────────────────────────────────────────────────────┐
│  [Background: Amber gradient atau foto dengan overlay amber]      │
│                                                                   │
│  Ada Pertanyaan atau Siap Memesan?                                │
│  Tim kami siap membantu melalui WhatsApp,                         │
│  setiap hari dari pagi hingga malam.                              │
│                                                                   │
│  [🟢 Hubungi Kami via WhatsApp]                                   │
│                                                                   │
│  (atau hubungi langsung: 0XXX-XXXX-XXXX)                         │
└──────────────────────────────────────────────────────────────────┘

Padding: 80px vertikal (desktop), 48px (mobile)
Teks warna: putih atau near-black, tergantung background
```

---

## 3. Pre-filled WhatsApp Message per Konteks

### 3.1 Homepage / Umum

```
Halo, saya ingin mengetahui lebih lanjut tentang layanan travel Sahabat Wisata Jember. Bisa bantu saya?
```

URL:
```
https://wa.me/62XXXXXXXXXX?text=Halo%2C+saya+ingin+mengetahui+lebih+lanjut+tentang+layanan+travel+Sahabat+Wisata+Jember.+Bisa+bantu+saya%3F
```

---

### 3.2 Halaman Rute Spesifik

Template:
```
Halo, saya ingin memesan travel rute [RUTE]. 
Mohon informasi jadwal dan ketersediaan seat untuk:
- Tanggal: [TANGGAL]
- Jumlah penumpang: [JUMLAH]
- Titik jemput: [AREA_JEMPUT]
- Titik turun: [AREA_TURUN]
Terima kasih.
```

Contoh untuk Jember–Surabaya:
```
Halo, saya ingin memesan travel rute Jember–Surabaya. 
Mohon informasi jadwal dan ketersediaan seat untuk titik turun di [PILIH_TITIK_TURUN].
Terima kasih.
```

> **Aturan UI Tambahan:** Di dekat tombol/form WA ini, harus ada teks disclaimer kecil: *"Harga final menyesuaikan titik jemput & turun. Beberapa area mungkin dikenakan biaya tambahan."* untuk menghindari pelanggan merasa dijebak jika admin menyebutkan harga yang berbeda.

URL:
```
https://wa.me/62XXXXXXXXXX?text=Halo%2C+saya+ingin+memesan+travel+rute+Jember%E2%80%93Surabaya.+%0AMohon+informasi+jadwal+dan+ketersediaan+seat.%0ATerima+kasih.
```

---

### 3.3 Halaman Paket Wisata

Template:
```
Halo, saya tertarik dengan [NAMA PAKET WISATA].
Bisa bantu informasi ketersediaan untuk:
- Tanggal: [TANGGAL]
- Jumlah peserta: [JUMLAH]
Terima kasih.
```

Contoh untuk Paket Bromo:
```
Halo, saya tertarik dengan Paket Wisata Bromo Sunrise.
Bisa bantu informasi ketersediaan dan harga?
Terima kasih.
```

---

### 3.4 Halaman Armada

Template:
```
Halo, saya ingin menanyakan sewa [NAMA ARMADA].
Keperluan: [TUJUAN]
Tanggal: [TANGGAL]
Durasi: [DURASI]
Terima kasih.
```

---

### 3.5 Halaman Rombongan / Custom Trip

```
Halo, saya ingin menanyakan paket perjalanan rombongan.
Jumlah peserta: [JUMLAH]
Tujuan: [TUJUAN]
Tanggal: [TANGGAL]
Mohon informasi lebih lanjut. Terima kasih.
```

---

## 4. Teks Label CTA per Konteks

| Konteks | Teks CTA |
|---------|----------|
| Hero Homepage | "Hubungi WhatsApp" |
| Kartu Rute | "Pesan via WhatsApp" |
| Kartu Wisata | "Tanya via WhatsApp" |
| Kartu Armada | "Tanya Sewa via WhatsApp" |
| Sticky Sidebar Rute | "Pesan Sekarang via WA" |
| Sticky Sidebar Wisata | "Konsultasi via WhatsApp" |
| CTA Banner | "Hubungi Kami via WhatsApp" |
| Floating Button | (icon only, + tooltip) |
| FAQ Section | "Masih ada pertanyaan? Chat WA" |
| 404 Page | "Kembali ke halaman utama atau chat WA" |

---

## 5. Prinsip Desain CTA WhatsApp

### DO ✅

- Tampilkan icon WhatsApp di kiri teks tombol (bukan kanan)
- Gunakan warna hijau yang konsisten (teal #10B981)
- CTA tombol selalu visible tanpa scroll di mobile (pada halaman penting)
- Pre-fill pesan dengan konteks yang relevan
- Floating button selalu ada di semua halaman

### DON'T ❌

- Jangan sembunyikan nomor WA — tampilkan di footer dan contact page
- Jangan gunakan kata "Klik di sini" tanpa konteks
- Jangan buat tombol WA terlihat sama dengan tombol navigasi biasa
- Jangan gunakan warna WA yang berbeda-beda di halaman berbeda
- Jangan tambahkan form sebelum bisa menghubungi WA — langsung saja

---

## 6. Posisi CTA di Setiap Halaman

### Homepage
- [x] Hero section (inline button)
- [x] Kartu layanan (per kartu)
- [x] Kartu rute populer (per kartu)
- [x] CTA Banner section
- [x] Floating button
- [x] Footer (nomor WA tertulis)

### Halaman Rute
- [x] Hero section
- [x] Sticky sidebar (desktop)
- [x] After jadwal section
- [x] CTA Banner

### Halaman Wisata Detail
- [x] Hero section
- [x] Sticky sidebar
- [x] After include/exclude section
- [x] CTA Banner

### Rule: Tidak boleh lebih dari **2 scroll** tanpa terlihat CTA WhatsApp.

---

## 7. Analytics untuk CTA

Event yang perlu di-track (Google Analytics / GTM):

| Event | Trigger |
|-------|---------|
| `wa_click_hero` | Klik CTA di hero section |
| `wa_click_card` | Klik CTA di kartu layanan |
| `wa_click_floating` | Klik floating button |
| `wa_click_banner` | Klik CTA di CTA banner |
| `wa_click_sidebar` | Klik CTA di sticky sidebar |

Dengan tracking ini, kita bisa tahu titik mana yang paling banyak convert.
