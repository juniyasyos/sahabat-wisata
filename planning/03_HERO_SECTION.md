# 03 — Hero Section Design

## 1. Filosofi Hero Section

Hero section adalah **5 detik pertama** pengunjung melihat website. Dalam waktu itu, mereka harus langsung memahami:

1. **Ini website apa?** (bisnis travel dari/ke Jember)
2. **Ini buat saya?** (sesuai kebutuhan mereka)
3. **Apa yang harus saya lakukan?** (ada CTA yang jelas)

Jika tiga pertanyaan itu tidak terjawab dalam 5 detik → pengunjung pergi.

---

## 2. Hero Homepage (Halaman Utama)

### Konsep Visual

```text
┌─────────────────────────────────────────────────────────────┐
│  [NAVBAR]                                           [Menu]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────── HERO ─────────────────────────┐ │
│  │                                                        │ │
│  │  [FOTO FULL-WIDTH: Pemandangan jalan/destinasi Jember] │ │
│  │  [Overlay gelap gradient dari atas ke bawah]           │ │
│  │                                                        │ │
│  │  H1: Perjalanan Nyaman, Sampai Tujuan dengan Tenang    │ │
│  │  Sub: Layanan travel & wisata dari Jember.             │ │
│  │                                                        │ │
│  │  ┌───────────────────────────────────────────────────┐ │ │
│  │  │ [Tab: Travel] [Tab: Wisata] [Armada] [Rombongan]  │ │ │
│  │  ├───────────────────────────────────────────────────┤ │ │
│  │  │ (Tampilan Form Berdasarkan Tab Aktif)             │ │ │
│  │  │ 📍 Kota Asal          📍 Kota Tujuan              │ │ │
│  │  │ 📅 Tanggal Berangkat  👥 Jumlah Penumpang         │ │ │
│  │  │                                                   │ │ │
│  │  │ [🟢 Pesan via WhatsApp]                           │ │ │
│  │  └───────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Spesifikasi Search Box Tab Layanan (Lead Generation)
**Konteks Bisnis:** Ini BUKAN booking engine. Form ini tidak terhubung ke database ketersediaan tiket/jadwal. Tidak ada pembayaran online. Tujuan form ini murni untuk merangkum intent pengguna ke dalam satu pesan WhatsApp yang terstruktur rapi ke admin.

#### 2.1 Tab 1: Travel Antar Kota (Default)
- **Fields:**
  - `origin` (Select/Dropdown): Asal (Default: Jember, bisa diubah ke kota lain)
  - `destination` (Select/Dropdown): Tujuan (Surabaya, Malang, Bali, dll)
  - `date` (Date Picker): Tanggal keberangkatan
  - `passengers` (Number/Select): Jumlah penumpang (1-10)
- **Submit Action CTA:** "Pesan Travel via WA"
- **WA Template:**
  ```text
  Halo, saya ingin menanyakan ketersediaan Travel Antar Kota:
  - Rute: [Origin] ke [Destination]
  - Tanggal: [Date]
  - Jumlah Penumpang: [Passengers] orang
  
  Apakah ada jadwal yang tersedia?
  ```

#### 2.2 Tab 2: Wisata
- **Fields:**
  - `package` (Select/Dropdown): Pilihan Paket (Bromo, Ijen, Papuma, Custom)
  - `date` (Date Picker): Rencana tanggal
  - `pax` (Number/Select): Jumlah peserta
- **Submit Action CTA:** "Tanya Paket via WA"
- **WA Template:**
  ```text
  Halo, saya tertarik dengan Paket Wisata:
  - Tujuan: [Package]
  - Rencana Tanggal: [Date]
  - Jumlah Peserta: [Pax] orang
  
  Mohon informasi harga dan detail paketnya.
  ```

#### 2.3 Tab 3: Sewa Armada
- **Fields:**
  - `fleet_type` (Select): Jenis Armada (Hiace, Elf, Avanza, Belum Tahu)
  - `start_date` (Date Picker): Mulai Tanggal
  - `usage_duration` (Select): Durasi Sewa (1 Hari, 2 Hari, dll)
  - `destination` (Text/Select): Tujuan / Rute Pemakaian
- **Submit Action CTA:** "Tanya Harga Sewa via WA"
- **WA Template:**
  ```text
  Halo, saya ingin menanyakan ketersediaan Sewa Armada:
  - Jenis Armada: [Fleet_Type]
  - Tanggal Pemakaian: [Start_Date]
  - Durasi: [Usage_Duration]
  - Tujuan: [Destination]
  
  Mohon info ketersediaan dan harganya.
  ```

#### 2.4 Tab 4: Rombongan / Custom Trip
- **Fields:**
  - `destination` (Text): Tujuan Perjalanan
  - `date` (Date Picker): Perkiraan Tanggal
  - `pax` (Number): Estimasi Jumlah Peserta
  - `notes` (Text Input - opsional): Catatan Tambahan Khusus
- **Submit Action CTA:** "Konsultasi Rombongan via WA"
- **WA Template:**
  ```text
  Halo, saya ingin merencanakan perjalanan Rombongan/Custom:
  - Tujuan: [Destination]
  - Rencana Tanggal: [Date]
  - Estimasi Peserta: [Pax] orang
  - Catatan Tambahan: [Notes]
  
  Bisa bantu berikan penawarannya?
  ```

### Flow Submit & Validasi
1. **Validasi Klien:** Pastikan field wajib (seperti origin, destination, date) terisi sebelum pesan dikirim. Jika kosong, tampilkan peringatan visual (border merah / teks error di bawah input).
2. **Data Parsing:** Saat tombol ditekan, ambil (*serialize*) nilai dari form/tab yang sedang aktif.
3. **Template Encoding:** Masukkan nilai ke dalam template string WhatsApp yang sesuai, lalu lakukan URL encoding (ganti spasi jadi `%20`, enter/newline jadi `%0A`).
4. **Redirect:** Arahkan pengguna ke URL `https://wa.me/{nomor_admin}?text={pesan_encoded}` menggunakan target `_blank` agar website utama tidak tertutup.

### Mobile Responsive & Tampilan
- **Mobile View:** Input/field di dalam form harus ditumpuk vertikal (1 kolom per baris) di layar HP, atau maksimal 2 kolom berjejer untuk field yang pendek (misal: tanggal & jumlah pax).
- **Tab Responsif:** Tab menu di mobile bisa dibungkus dalam *scrollable horizontal flexbox* agar tidak merusak layout ke bawah jika layar sangat sempit.
- **Touch Target:** Setiap `<input>`, `<select>`, dan `<button>` **wajib** memiliki tinggi minimum 44px untuk kenyamanan tap di layar sentuh.

### Fallback (No-JS)
- Jika JavaScript dimatikan/gagal dimuat, form tabbed interaktif ini tidak akan berfungsi.
- **Solusi No-JS:** Sembunyikan blok `<div id="hero-tab-form">` (misalnya menggunakan `<noscript>`) dan tampilkan 2 tombol CTA standar fallback: `[🟢 Hubungi WhatsApp]` dan `[Lihat Rute →]` (desain lama) yang mengarah ke link WA biasa tanpa pre-fill spesifik.

### Catatan Implementasi Teknis
- **Hindari Data Live di Form Hero:** Karena ini bukan booking engine nyata, dropdown list untuk destinasi atau armada bisa di-hardcode ke pilihan-pilihan utama (yang paling laku) agar waktu muat (load time) hero section tetap super cepat tanpa menunggu fetch dari database (Firestore). Opsi "Lainnya" bisa ditambahkan di ujung dropdown.
- **Form Prevention:** Gunakan `event.preventDefault()` pada aksi submit form agar halaman tidak me-refresh/melakukan POST HTTP standar. Seluruh manipulasi dilakukan *client-side* via JS.
- **Date Picker Native:** Pertimbangkan penggunaan `<input type="date">` native daripada library eksternal (seperti flatpickr/react-datepicker) demi performa maksimal dan UI native bawaan Android/iOS yang sudah dioptimasi untuk mobile.

---

## 3. Hero Halaman Katalog Travel (/travel)

### Konsep Visual

```text
┌─────────────────────────────────────────────────────────────┐
│  [Foto armada atau suasana keberangkatan — lebih pendek]    │
│  Overlay lebih terang                                       │
│                                                             │
│  BADGE: "Rute Tersedia"                                     │
│  H1: Jadwal & Rute Travel                                   │
│      Sahabat Wisata Jember                                  │
│                                                             │
│  Jember → Surabaya • Malang • Juanda • Bali • Banyuwangi   │
│                                                             │
│  [Breadcrumb: Beranda / Travel]                             │
└─────────────────────────────────────────────────────────────┘
```

### Spesifikasi Detail
- **Tinggi:** `40vh` — lebih pendek, karena konten utamanya ada di bawah
- **Headline:** Nama halaman yang jelas dan mengandung keyword
- **Sub-text:** Daftar rute utama (SEO-friendly, juga membantu user orientasi)
- **Tidak ada CTA button di hero ini** — pengguna sudah tahu mereka mau melihat rute

---

## 4. Hero Halaman Detail Rute (/travel/{slug})

### Konsep Visual

```text
┌─────────────────────────────────────────────────────────────┐
│  [Foto: Suasana kota tujuan atau armada di jalan raya]      │
│                                                             │
│  BADGE: "Travel Reguler"                                    │
│                                                             │
│  H1: Travel Jember – Surabaya                               │
│      Door-to-Door                                           │
│                                                             │
│  ⭐ Mulai Rp 150.000  •  🕐 Estimasi 3–4 jam               │
│  📍 Jemput dari area Jember                                 │
│                                                             │
│  [🟢 Pesan via WhatsApp]                                    │
│                                                             │
│  [Breadcrumb: Beranda / Travel / Jember–Surabaya]           │
└─────────────────────────────────────────────────────────────┘
```

### Spesifikasi Detail
- **Tinggi:** `55vh` (sedang) — cukup impresif, tapi konten detail ada di bawah
- **Info key:** Harga & estimasi waktu langsung terlihat di hero
- **CTA utama:** Tombol WhatsApp sudah muncul di hero (untuk yang sudah yakin pesan)
- **Breadcrumb:** Membantu SEO dan navigasi user

---

## 5. Hero Halaman Katalog Wisata (/wisata)

### Konsep Visual

```text
┌─────────────────────────────────────────────────────────────┐
│  [Foto: Destinasi wisata populer — Bromo/Ijen/Papuma]       │
│  Overlay lebih ringan (foto lebih estetik)                  │
│                                                             │
│  BADGE: "Paket Wisata"                                      │
│  H1: Jelajahi Destinasi Wisata                              │
│      Bersama Sahabat Wisata Jember                          │
│                                                             │
│  Bromo • Ijen • Papuma • Bali & lebih banyak lagi          │
│                                                             │
│  [✨ Lihat Semua Paket]                                     │
└─────────────────────────────────────────────────────────────┘
```

### Spesifikasi Detail
- **Tinggi:** `50vh`
- **Foto:** Prioritaskan foto destinasi yang paling eye-catching (Bromo sunrise atau Ijen blue fire)
- **Overlay:** Lebih tipis dari homepage — foto wisata harus tetap terlihat indah
- **Tone:** Sedikit lebih aspirational / dreamy dibanding halaman travel reguler

---

## 6. Hero Halaman Detail Wisata (/wisata/{slug})

### Konsep Visual

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [FOTO BESAR: Foto destinasi spesifik — full immersive]     │
│  Overlay minimal di bagian bawah saja                       │
│                                                             │
│                                    BADGE: "Open Trip"       │
│                                    H1: Paket Wisata         │
│                                    Bromo Sunrise            │
│                                                             │
│                                    ⭐ Mulai Rp 450.000/orang│
│                                    📅 2 Hari 1 Malam        │
│                                                             │
│                                    [🟢 Tanya via WA]        │
└─────────────────────────────────────────────────────────────┘
```

### Spesifikasi Detail
- **Layout:** Teks rata kanan (atau bawah kanan) — foto mendominasi area kiri
- **Tinggi:** `65vh` — hero besar karena wisata butuh visual impact yang kuat
- **Foto:** **Harus** foto nyata dari destinasi, bukan stock photo
- **Overlay:** Gradient dari bawah saja `linear-gradient(to top, rgba(28,25,23,0.85), transparent)`

---

## 7. Hero Halaman Armada (/sewa-armada)

### Konsep Visual

```text
┌─────────────────────────────────────────────────────────────┐
│  [Foto: Armada (Hiace / Elf) tampak eksterior — bersih]     │
│                                                             │
│  BADGE: "Sewa Armada"                                       │
│  H1: Sewa Armada Nyaman                                     │
│      untuk Perjalanan Anda                                  │
│                                                             │
│  Hiace • Elf • Avanza • dan armada lainnya                  │
│  Dengan atau tanpa supir. Harga negosiasi.                  │
│                                                             │
│  [🟢 Tanya Ketersediaan via WA]                             │
└─────────────────────────────────────────────────────────────┘
```

### Spesifikasi Detail
- **Tinggi:** `45vh`
- **Foto:** Foto armada yang bersih dan rapi — ini membangun kepercayaan
- **USP:** "Dengan atau tanpa supir" harus terlihat jelas — ini diferensiator

---

## 8. Elemen Universal Hero

### Badge (Selalu Ada)
```text
Design: Rounded pill, background semi-transparan (frosted glass)
Color: Amber light / white
Contoh teks: "Travel Terpercaya dari Jember" | "Paket Wisata" | "Rute Tersedia"
```

### Breadcrumb (Halaman dalam)
```text
Format: Beranda / [Kategori] / [Nama Halaman]
Color: White dengan opacity 0.7
Ukuran: text-sm (14px)
Separator: " / "
```

### Trust Bar (di bawah hero, bukan di dalam hero)
```text
Konten: ✓ Armada Nyaman   ✓ Harga Jelas   ✓ Respons Cepat   ✓ Pengalaman X Tahun
Design: Row horizontal, background solid terang, icon + teks kecil
```

---

## 9. Pertimbangan Mobile (Hero)

| Elemen | Desktop | Mobile |
|--------|---------|--------|
| Tinggi hero | 100svh | 75svh |
| Headline size | 4rem | 2.25rem |
| Form Box | Flex bar sebaris | Kolom bertumpuk / grid 2x2 |
| Tabs | Rata di atas form | Scroll horizontal / Dropdown |
| Foto focus | Center | Center top |

---

## 10. Checklist Validasi Hero

Sebelum implementasi:
- [ ] Foto background resolusi tinggi tersedia (min. 1920x1080)
- [ ] Versi mobile foto sudah dipertimbangkan (crop yang tepat)
- [ ] Overlay cukup gelap sehingga teks terbaca dengan mudah
- [ ] Search Box Tabs merangkum intent dengan baik (tanpa koneksi server real-time)
- [ ] Validasi form jalan, cegah user klik WA form kosong
- [ ] Format pesan WhatsApp rapi dan encode URL sempurna
- [ ] Headline mengandung keyword utama halaman
- [ ] Hero tidak lambat karena foto terlalu besar (gunakan WebP, lazy load untuk di bawah fold)
- [ ] Di mobile, form tabbed tidak tertutup keyboard
