# Technical Product Plan — Website Travel Sahabat Wisata Jember

Dokumen ini adalah acuan teknis utama untuk pengembangan website katalog layanan travel berbasis Jember. Selain mendefinisikan **apa yang dibangun**, dokumen ini juga menjelaskan **mengapa setiap bagian dibangun**—berdasarkan perilaku pengguna, logika konversi, dan kebutuhan SEO.

Website ini **bukan booking engine**, melainkan sebuah **lead generation website** — alat yang mengubah pencarian Google menjadi percakapan WhatsApp dengan admin.

---

## Katalog Pembahasan

- [1. Konteks Bisnis & Alasan Membangun Website](#1-konteks-bisnis--alasan-membangun-website)
- [2. Tujuan Produk](#2-tujuan-produk)
- [3. Batasan dan Asumsi Data](#3-batasan-dan-asumsi-data)
  - [Data yang perlu divalidasi sebelum produksi](#data-yang-perlu-divalidasi-sebelum-produksi)
  - [Prinsip konten](#prinsip-konten)
- [4. Positioning Produk](#4-positioning-produk)
- [5. Target Pengguna](#5-target-pengguna)
  - [5.1 Pelanggan Travel Reguler](#51-pelanggan-travel-reguler)
  - [5.2 Pelanggan Wisata](#52-pelanggan-wisata)
  - [5.3 Pelanggan Rombongan](#53-pelanggan-rombongan)
  - [5.4 Pelanggan Sewa Armada](#54-pelanggan-sewa-armada)
- [6. Scope Produk](#6-scope-produk)
  - [6.1 In Scope](#61-in-scope)
  - [6.2 Out of Scope & Alasannya](#62-out-of-scope--alasannya)
- [7. Struktur URL](#7-struktur-url)
  - [7.1 Public Pages](#71-public-pages)
  - [7.2 Admin Pages](#72-admin-pages)
- [8. Struktur Halaman & Rasionalisasi per Section](#8-struktur-halaman--rasionalisasi-per-section)
  - [8.1 Homepage `/`](#81-homepage-)
  - [8.2 Katalog Travel `/travel`](#82-katalog-travel-travel)
  - [8.3 Detail Rute `/travel/{slug}`](#83-detail-rute-travelslug)
  - [8.4 Katalog Wisata `/wisata`](#84-katalog-wisata-wisata)
  - [8.5 Detail Wisata `/wisata/{slug}`](#85-detail-wisata-wisataslug)
  - [8.6 Katalog Armada `/sewa-armada`](#86-katalog-armada-sewa-armada)
  - [8.7 Detail Armada `/sewa-armada/{slug}`](#87-detail-armada-sewa-armadaslug)
- [9. Data Model Awal](#9-data-model-awal)
  - [9.1 `destinations`](#91-destinations)
  - [9.2 `travel_routes`](#92-travel_routes)
  - [9.3 `route_schedules`](#93-route_schedules)
  - [9.4 `tour_packages`](#94-tour_packages)
  - [9.5 `fleets`](#95-fleets)
  - [9.6 `posts`](#96-posts)
  - [9.7 `faqs`](#97-faqs)
  - [9.8 `settings`](#98-settings)
- [10. CMS Admin Scope](#10-cms-admin-scope)
  - [10.1 Resource Minimum MVP](#101-resource-minimum-mvp)
  - [10.2 Field Behavior](#102-field-behavior)
- [11. WhatsApp CTA — Mesin Konversi Utama](#11-whatsapp-cta--mesin-konversi-utama)
  - [11.1 Template Travel Reguler](#111-template-travel-reguler)
  - [11.2 Template Paket Wisata](#112-template-paket-wisata)
  - [11.3 Template Sewa Armada](#113-template-sewa-armada)
  - [11.4 Template Rombongan / Custom Trip](#114-template-rombongan--custom-trip)
- [12. SEO Strategy & Optimasi AI Search](#12-seo-strategy--optimasi-ai-search)
  - [12.1 Keyword Cluster](#121-keyword-cluster)
  - [12.2 SEO Requirements per Page](#122-seo-requirements-per-page)
  - [12.3 Structured Data](#123-structured-data)
  - [12.4 Generative Engine Optimization (GEO)](#124-generative-engine-optimization-geo)
- [13. Performance Requirements](#13-performance-requirements)
- [14. Tech Stack](#14-tech-stack)
  - [14.1 Opsi A — Laravel + Filament + Blade](#141-opsi-a--laravel--filament--blade)
  - [14.2 Opsi B — React Static/SPA + Headless CMS](#142-opsi-b--react-staticspa--headless-cms)
  - [14.3 Rekomendasi Teknis](#143-rekomendasi-teknis)
- [15. MVP Version 1.0](#15-mvp-version-10)
  - [15.1 Public Page MVP](#151-public-page-mvp)
  - [15.2 Admin MVP](#152-admin-mvp)
  - [15.3 Data Awal MVP](#153-data-awal-mvp)
- [16. Prioritas Pengembangan](#16-prioritas-pengembangan)
  - [Phase 1 — Foundation](#phase-1--foundation)
  - [Phase 2 — Public Website](#phase-2--public-website)
  - [Phase 3 — SEO](#phase-3--seo)
  - [Phase 4 — Polish](#phase-4--polish)
- [17. Acceptance Criteria MVP](#17-acceptance-criteria-mvp)
- [18. Risiko Produk](#18-risiko-produk)
- [19. Data Validation Checklist](#19-data-validation-checklist)
- [20. Analytics dan Tracking](#20-analytics-dan-tracking)
- [21. Kesimpulan](#21-kesimpulan)

---

## 1. Konteks Bisnis & Alasan Membangun Website

Bisnis travel antar kota dan wisata di Jember saat ini umumnya berjalan melalui WhatsApp, grup, dan promosi manual di media sosial. Cara ini efektif untuk mempertahankan pelanggan lama, tetapi **tidak menjangkau calon pelanggan baru yang mencari travel secara aktif di Google**.

Tiga masalah nyata yang terjadi tanpa website:

1. **Tidak terlihat di pencarian.** Calon pelanggan yang mengetik "Travel Sahabat Wisata Jember Surabaya" di Google akan menemukan kompetitor, bukan bisnis ini.
2. **Tidak ada sumber kebenaran tunggal.** Harga, jadwal, dan armada tersebar di berbagai media sosial, berpotensi membingungkan pelanggan dan merepotkan admin.
3. **Admin kelelahan menjawab pertanyaan berulang.** Pertanyaan seperti "jam berapa berangkat?" atau "ada gak seat besok?" adalah pertanyaan yang bisa dijawab langsung oleh website — sehingga chat yang masuk adalah chat yang sudah siap konversi.

**Website ini memecahkan ketiga masalah tersebut** dengan menjadi katalog informasi yang bisa ditemukan Google, sekaligus corong (*funnel*) yang mengarahkan pengunjung ke WhatsApp admin dengan konteks yang sudah jelas.

> **Prinsip inti:** Website ini bukan pengganti admin. Website ini adalah asisten admin yang bekerja 24 jam — menjawab pertanyaan dasar dan mengantarkan calon pelanggan yang sudah serius ke pintu WhatsApp.

---

## 2. Tujuan Produk

### Tujuan untuk Pengguna (Pelanggan)

1. Menemukan informasi travel dari/ke Jember langsung dari hasil pencarian Google.
2. Membandingkan rute, estimasi harga, jadwal, dan fasilitas tanpa harus bertanya dulu.
3. Memahami detail layanan wisata, sewa armada, dan rombongan secara mandiri.
4. Menghubungi admin melalui WhatsApp dengan konteks pertanyaan yang sudah otomatis terisi — lebih cepat, lebih nyaman.

### Tujuan Bisnis

1. **Meningkatkan jumlah inquiry WhatsApp** dari kanal organik (pencarian Google), bukan hanya dari kenalan atau pelanggan lama.
2. **Mengurangi beban admin** untuk menjawab pertanyaan berulang soal harga, jadwal, dan fasilitas dasar.
3. **Membangun aset SEO jangka panjang** melalui halaman rute, wisata, armada, dan artikel yang terus bisa ditemukan oleh mesin pencari.
4. **Meningkatkan kepercayaan calon pelanggan** melalui tampilan profesional dan informasi yang terstruktur — tidak hanya mengandalkan brosur WhatsApp.
5. **Mempermudah admin memperbarui konten** (harga, jadwal, nomor WA) secara mandiri tanpa perlu developer.

---

## 3. Batasan dan Asumsi Data

Dokumen ini belum menggunakan data operasional final. Beberapa bagian masih berupa struktur teknis dan asumsi awal yang harus divalidasi bersama owner sebelum website masuk produksi.

### Data yang perlu divalidasi sebelum produksi

1. Daftar rute aktif yang benar-benar beroperasi.
2. Harga dasar setiap rute (bahkan jika berupa range "mulai dari").
3. Jadwal keberangkatan yang berlaku.
4. Area jemput dan antar yang dicakup.
5. Jenis armada yang tersedia untuk setiap layanan.
6. Kapasitas penumpang per armada.
7. Fasilitas armada yang tersedia (AC, bagasi, dll).
8. Paket wisata yang benar-benar dijual dan aktif.
9. Kebijakan pembatalan, DP, refund, dan reschedule.
10. Nomor WhatsApp resmi yang aktif.
11. Nama brand travel yang akan digunakan.
12. Alamat kantor atau area operasional.
13. Legalitas usaha jika ingin ditampilkan untuk membangun kredibilitas.
14. Foto armada dan dokumentasi wisata asli (bukan foto stok).

### Prinsip konten

Semua informasi yang belum pasti **harus menggunakan bahasa yang aman**:

- "mulai dari Rp..."
- "estimasi X–Y jam"
- "menyesuaikan ketersediaan"
- "konfirmasi via admin"
- "harga dapat berubah sewaktu-waktu"

**Hindari klaim yang tidak bisa dibuktikan**, seperti:

- "termurah di Jember"
- "armada nomor satu"
- "paling cepat sampai"
- "selalu tersedia setiap hari"
- "pasti berangkat"

Klaim seperti itu hanya boleh muncul jika ada data atau bukti yang bisa dipertanggungjawabkan. Klaim berlebihan justru menurunkan kepercayaan, karena pelanggan yang kecewa akan meninggalkan ulasan negatif.

---

## 4. Positioning Produk

> Website ini adalah **katalog layanan Travel Sahabat Wisata Jember** — membantu calon pelanggan menemukan informasi rute, wisata, sewa armada, dan perjalanan rombongan secara jelas, lalu menghubungi admin melalui WhatsApp untuk pemesanan.

**Yang diutamakan:**

1. Informasi yang mudah ditemukan dan dicari.
2. CTA WhatsApp yang jelas di setiap titik pengambilan keputusan.
3. Struktur SEO lokal yang bisa mendatangkan traffic organik.
4. CMS ringan yang bisa dioperasikan oleh non-developer.
5. Konten yang mudah diperbarui tanpa mengubah kode.
6. Tampilan cepat dan responsif di mobile.

**Yang tidak diutamakan (sengaja ditunda):**

1. Booking seat otomatis — menambah kompleksitas sistem tanpa nilai nyata di tahap awal.
2. Pembayaran online — alur pembayaran manual sudah berjalan dan tidak menjadi hambatan konversi.
3. Login pelanggan — tidak dibutuhkan untuk use case saat ini.
4. Manajemen inventory real-time — berisiko menampilkan informasi tidak akurat jika tidak dikelola dengan disiplin.

---

## 5. Target Pengguna

### 5.1 Pelanggan Travel Reguler

**Siapa mereka:** Individu atau keluarga yang butuh transportasi antar kota dari/ke Jember — mahasiswa, pekerja, atau orang yang pulang kampung.

**Apa yang mereka cari:**

- Travel Sahabat Wisata Jember ke Surabaya, Malang, Juanda, Bali, Banyuwangi.
- Jadwal keberangkatan pagi/siang/malam.
- Kepastian apakah bisa jemput rumah (*door-to-door*).
- Harga dan ketersediaan seat untuk tanggal tertentu.

**Bagaimana mereka menemukan bisnis ini:** Mayoritas melalui pencarian Google dengan kata kunci spesifik seperti *"Travel Sahabat Wisata Jember Surabaya"* atau *"Travel Sahabat Wisata Jember Juanda harga"*. Ini adalah alasan utama mengapa setiap rute harus punya halaman landing sendiri yang dioptimalkan untuk keyword tersebut.

### 5.2 Pelanggan Wisata

**Siapa mereka:** Individu, pasangan, atau kelompok kecil yang ingin berwisata ke destinasi terdekat (Bromo, Ijen, Papuma, dll) tanpa repot mengurus transportasi sendiri.

**Apa yang mereka cari:**

- Paket wisata dari Jember dengan harga jelas.
- Itinerary dan apa yang sudah termasuk (makan, tiket, guide).
- Berapa minimal peserta agar trip bisa jalan.
- Bisa berangkat kapan, dan apakah ada jadwal tetap.

**Perilaku khas:** Mereka cenderung *riset dulu sebelum tanya*. Artinya halaman wisata harus lengkap — itinerary, include/exclude, ketentuan — sehingga mereka datang ke WhatsApp bukan untuk tanya dasar, melainkan untuk konfirmasi dan booking.

### 5.3 Pelanggan Rombongan

**Siapa mereka:** Koordinator atau panitia dari instansi, sekolah, kampus, atau keluarga besar yang butuh transportasi massal.

**Apa yang mereka cari:**

- Kapasitas kendaraan untuk jumlah peserta tertentu.
- Bisa paket atau tidak (termasuk guide, konsumsi).
- Alur pengajuan proposal atau penawaran harga.
- Bukti bahwa bisnis ini bisa menangani rombongan besar.

**Tantangan khusus:** Pelanggan rombongan tidak ingin banyak bolak-balik tanya. Mereka butuh satu titik kontak yang jelas dan satu alur yang terpandu. Inilah mengapa halaman `/rombongan` harus memuat alur pemesanan yang eksplisit.

### 5.4 Pelanggan Sewa Armada

**Siapa mereka:** Individu atau perusahaan yang butuh kendaraan + driver untuk kebutuhan tertentu — acara keluarga, kunjungan kerja, atau antar jemput.

**Apa yang mereka cari:**

- Jenis kendaraan dan kapasitasnya.
- Apakah harga sudah termasuk BBM, tol, parkir, atau tidak.
- Tersedia atau tidak di tanggal tertentu.

---

## 6. Scope Produk

### 6.1 In Scope

Fitur yang masuk pengembangan pada versi pertama:

1. Homepage.
2. Halaman katalog rute travel.
3. Halaman detail rute travel.
4. Halaman katalog wisata.
5. Halaman detail wisata.
6. Halaman katalog armada.
7. Halaman detail armada.
8. Halaman layanan rombongan.
9. Halaman custom trip.
10. Blog/artikel SEO.
11. FAQ.
12. Halaman kontak.
13. CMS admin untuk mengelola semua konten.
14. Pengaturan nomor WhatsApp dari admin.
15. CTA WhatsApp dinamis (teks sudah terisi otomatis sesuai layanan).
16. Metadata SEO per halaman.
17. Structured data Schema.org dasar.
18. Sitemap otomatis.
19. Robots.txt.

### 6.2 Out of Scope & Alasannya

Fitur berikut **sengaja tidak dikerjakan** pada versi awal, bukan karena tidak penting, tetapi karena belum saatnya:

| Fitur                      | Alasan ditunda                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| Online payment             | Pembayaran via transfer manual sudah berjalan; menambah payment gateway butuh effort besar dan regulasi |
| Login pelanggan            | Tidak ada use case yang membutuhkan data pelanggan tersimpan di tahap ini                        |
| Booking seat otomatis      | Butuh sistem inventory real-time yang kompleks; jika tidak akurat, justru menurunkan kepercayaan |
| Real-time seat inventory   | Sangat berisiko jika data tidak disinkronkan dengan operasional lapangan                         |
| Invoice generator otomatis | Bisa diotomasi di fase berikutnya setelah alur bisnis terbukti                                   |
| Tracking driver            | Butuh integrasi GPS dan aplikasi driver — scope berbeda                                          |
| Aplikasi mobile            | Website mobile-responsive sudah cukup untuk MVP                                                  |
| Dashboard keuangan         | Di luar scope lead generation website                                                            |

---

## 7. Struktur URL

Struktur URL dirancang bukan hanya untuk navigasi, tetapi juga sebagai **strategi SEO**. Setiap URL adalah sebuah sinyal kepada Google bahwa halaman ini relevan untuk keyword tertentu.

**Prinsip desain URL:**
- Pendek, deskriptif, dan berbahasa Indonesia (sesuai target pasar lokal).
- Menggunakan slug yang mengandung keyword pencarian alami.
- Hierarki jelas: `/travel` → `/travel/{slug}`.

### 7.1 Public Pages

| Halaman        | URL                   | Tujuan SEO & Bisnis                                               |
| -------------- | --------------------- | ----------------------------------------------------------------- |
| Homepage       | `/`                   | Brand awareness, layanan utama, CTA cepat                         |
| Travel Reguler | `/travel`             | Index semua rute; target keyword "travel dari Jember"             |
| Detail Rute    | `/travel/{slug}`      | Landing page per rute; target keyword spesifik seperti "Travel Sahabat Wisata Jember Surabaya" |
| Wisata         | `/wisata`             | Index paket wisata; target keyword "paket wisata dari Jember"     |
| Detail Wisata  | `/wisata/{slug}`      | Landing page per paket; target keyword seperti "paket Bromo dari Jember" |
| Sewa Armada    | `/sewa-armada`        | Index armada; target keyword "sewa Hiace Jember"                  |
| Detail Armada  | `/sewa-armada/{slug}` | Detail kendaraan; target keyword spesifik per jenis armada        |
| Rombongan      | `/rombongan`          | Landing page khusus; target keyword "travel rombongan Jember"     |
| Custom Trip    | `/custom-trip`        | Edukasi alur custom trip; mengurangi pertanyaan berulang          |
| Blog           | `/blog`               | Artikel edukasi dan SEO jangka panjang                            |
| Detail Blog    | `/blog/{slug}`        | Artikel tunggal                                                   |
| FAQ            | `/faq`                | Pertanyaan umum; mendukung SEO berbasis pertanyaan (voice search) |
| Tentang Kami   | `/tentang-kami`       | Membangun kepercayaan (E-E-A-T)                                   |
| Kontak         | `/kontak`             | Informasi kontak; sinyal `LocalBusiness` untuk SEO lokal          |

### 7.2 Admin Pages (Filament)

| Modul              | Resource              |
| ------------------ | --------------------- |
| Destinasi          | `DestinationResource` |
| Rute Travel        | `TravelRouteResource` |
| Jadwal             | `ScheduleResource`    |
| Paket Wisata       | `TourPackageResource` |
| Armada             | `FleetResource`       |
| Artikel            | `PostResource`        |
| FAQ                | `FaqResource`         |
| Halaman Statis     | `PageResource`        |
| Pengaturan Website | `SettingResource`     |

---

## 8. Struktur Halaman & Rasionalisasi per Section

Bagian ini menjelaskan **apa yang ada di setiap halaman** dan yang lebih penting, **mengapa setiap elemen ada di sana** — dari sisi perilaku pengguna, strategi konversi, dan kebutuhan SEO.

---

### 8.1 Homepage `/`

**Peran halaman:** Pintu masuk utama. Sebagian besar pengunjung dari iklan atau referral akan mendarat di sini. Tugasnya bukan menjual, tetapi **mengorientasikan** — siapa kami, apa yang kami sediakan, dan apa yang harus dilakukan berikutnya.

**Mengapa homepage tidak boleh terlalu ramai:** Terlalu banyak informasi membuat pengunjung bingung. Setiap elemen yang ada harus punya satu fungsi yang jelas.

#### Section 1: Hero

> **Mengapa dibutuhkan:** Penelitian UX menunjukkan bahwa pengguna membutuhkan waktu kurang dari 5 detik untuk memutuskan apakah akan tetap di sebuah website atau pergi (*bounce*). Hero section adalah satu-satunya kesempatan untuk menjawab pertanyaan paling mendasar: *"Apakah ini tempat yang tepat?"*

Konten:
- **Headline:** Satu kalimat yang menjelaskan bisnis ini. Contoh: *"Layanan Travel Sahabat Wisata Jember — Reguler, Wisata, dan Sewa Armada."*
- **Subheadline:** Satu baris yang memperkuat nilai utama. Contoh: *"Jemput dari rumah, antar ke tujuan, jadwal fleksibel."*
- **CTA Utama → WhatsApp:** Tombol primer yang langsung menghubungkan ke admin. Berwarna kontras, teks jelas, posisi di atas fold.
- **CTA Sekunder → Katalog Layanan:** Tombol sekunder bagi pengguna yang ingin *lihat dulu* sebelum menghubungi.

> **Mengapa ada dua CTA:** Pengguna yang datang dari iklan atau rekomendasi langsung mungkin sudah siap konversi — mereka butuh tombol WhatsApp yang cepat. Pengguna yang baru tahu dan masih ragu butuh jalur eksplorasi. Dua CTA melayani dua jenis niat (*intent*) ini tanpa memaksa.

#### Section 2: Layanan Utama

> **Mengapa dibutuhkan:** Banyak pengunjung belum tahu persis layanan apa yang ingin mereka gunakan. Section ini adalah menu navigasi visual yang membantu mereka mengorientasikan diri ke layanan yang relevan.

Konten: Empat kartu layanan (Travel Reguler, Paket Wisata, Sewa Armada, Rombongan/Custom Trip) — masing-masing dengan ikon, deskripsi satu kalimat, dan tautan ke halaman katalognya.

#### Section 3: Rute Populer

> **Mengapa dibutuhkan:** Menampilkan rute-rute yang paling sering dicari memberikan dua manfaat sekaligus. Pertama, membantu pengguna menemukan rute mereka dengan cepat tanpa harus masuk ke halaman katalog. Kedua, memberi sinyal kepada Google bahwa halaman ini relevan untuk keyword rute tersebut (*internal linking untuk SEO*).

Konten: 3–5 rute paling populer (ditandai `is_featured = true` di database). Tampilkan nama rute, estimasi harga mulai dari, dan tombol CTA.

> **Catatan data:** Rute yang ditampilkan harus divalidasi. Jangan menampilkan rute yang belum aktif beroperasi.

#### Section 4: Paket Wisata Pilihan

> **Mengapa dibutuhkan:** Wisata adalah layanan bernilai tinggi (harga per transaksi lebih besar). Menampilkannya di homepage meningkatkan visibilitas dan memancing rasa penasaran calon pelanggan yang awalnya hanya datang untuk cek travel reguler.

Konten: 2–3 paket wisata aktif dengan foto menarik, harga mulai dari, dan tombol detail.

#### Section 5: Armada

> **Mengapa dibutuhkan:** Calon pelanggan sewa armada perlu melihat *bukti visual* bahwa kendaraan yang tersedia layak dan sesuai kebutuhan mereka. Foto nyata armada adalah salah satu faktor kepercayaan paling kuat.

Konten: Armada aktif dengan foto, kapasitas, dan CTA.

#### Section 6: Alur Pemesanan

> **Mengapa dibutuhkan:** Banyak calon pelanggan ragu menghubungi karena tidak tahu prosesnya seperti apa — *"Nanti tanya apa?"*, *"Bayarnya gimana?"*. Menjelaskan alur 4–5 langkah secara visual **mengurangi kecemasan dan meningkatkan konversi**. Ini bukan hal sepele — ini adalah teknik UX yang terbukti efektif untuk bisnis berbasis layanan.

Alur:
1. Pilih layanan yang sesuai.
2. Hubungi admin via WhatsApp.
3. Konfirmasi jadwal, harga, dan ketersediaan.
4. Bayar DP sesuai kebijakan.
5. Berangkat.

#### Section 7: FAQ Ringkas

> **Mengapa dibutuhkan:** FAQ di homepage menjawab pertanyaan yang paling sering menghambat konversi — tanpa harus menghubungi admin. Ini juga membantu SEO: Google sering menampilkan jawaban dari FAQ dalam fitur *Featured Snippet* dan *People Also Ask*.

#### Section 8: CTA Penutup

> **Mengapa dibutuhkan:** Pengguna yang sudah membaca sampai bawah adalah pengguna yang tertarik. Jangan biarkan mereka bingung harus melakukan apa. CTA penutup adalah kesempatan terakhir — dan seringkali paling efektif karena pengguna sudah *warmed up*.

---

### 8.2 Katalog Travel `/travel`

**Peran halaman:** Index semua rute aktif. Pengguna yang datang ke sini belum tentu tahu mau ke mana — mereka sedang *menjelajahi opsi*.

**Konten minimum:**

1. Judul halaman (`h1`) yang mengandung keyword: contoh *"Katalog Rute Travel dari Jember"*.
2. Deskripsi singkat (1–2 kalimat) untuk SEO dan orientasi pengguna.
3. Filter sederhana: kota asal, kota tujuan, atau kata kunci. *(Dapat ditunda jika rute masih sedikit.)*
4. List rute — setiap kartu menampilkan: nama rute, harga mulai dari, estimasi durasi, status aktif, tombol detail, tombol WhatsApp langsung.
5. FAQ travel umum.

> **Mengapa ada tombol WhatsApp di kartu rute:** Karena sebagian pengguna tidak perlu membaca halaman detail — mereka sudah yakin dan ingin langsung tanya. Jangan paksa mereka melewati satu halaman lagi hanya untuk sampai ke WhatsApp.

---

### 8.3 Detail Rute `/travel/{slug}`

**Peran halaman:** Ini adalah halaman yang paling penting secara SEO. Setiap rute harus punya halaman ini agar bisa muncul di pencarian keyword spesifik seperti *"Travel Sahabat Wisata Jember Surabaya"* atau *"Travel Sahabat Wisata Jember Malang door to door"*.

**Logika konten:** Pengguna yang sampai di halaman ini sudah punya niat yang spesifik. Tugas halaman ini adalah **menjawab semua pertanyaan yang biasanya mereka kirim via chat** — sehingga chat yang masuk ke admin bukan lagi pertanyaan dasar, melainkan chat yang sudah menuju pemesanan.

**Konten minimum:**

1. **Hero Section**
   - Nama rute (sebagai `h1`).
   - Harga mulai dari.
   - Estimasi durasi.
   - **Tombol CTA WhatsApp** — harus ada di atas fold, langsung terlihat tanpa scroll.

   > *Mengapa CTA di hero:* Data konversi pada landing page menunjukkan bahwa penempatan CTA di atas fold meningkatkan click-through rate secara signifikan, terutama di mobile di mana pengguna jarang scroll jauh.

2. **Ringkasan Rute**
   - Kota asal dan tujuan.
   - Estimasi jarak dan waktu tempuh (jika tersedia).

3. **Jadwal**
   - Pagi, siang, malam — atau jadwal custom.
   - Jika jadwal belum tetap: tampilkan *"jadwal menyesuaikan ketersediaan, konfirmasi via admin"* — jangan menampilkan jam palsu.

4. **Titik Jemput dan Antar**
   - Area jemput (kecamatan/kelurahan yang dicakup).
   - Area antar di kota tujuan.
   - Catatan biaya tambahan jika area di luar cakupan.

   > *Mengapa ini penting:* Pertanyaan "bisa jemput di [lokasi]?" adalah salah satu pertanyaan paling sering. Jika dijawab di halaman ini, admin tidak perlu menjawab berulang kali.

5. **Harga**
   - Harga dasar dengan keterangan "mulai dari".
   - Faktor yang memengaruhi harga (jumlah bagasi, lokasi jemput, jam berangkat, dll).

6. **Fasilitas**
   - AC, driver, bagasi, kapasitas — sesuai data aktual armada.

7. **Ketentuan**
   - Cara booking, kebijakan pembatalan, dll.

8. **FAQ Rute**
   - Apakah bisa jemput rumah?
   - Jam berapa berangkat?
   - Berapa lama perjalanan?
   - Apakah bisa antar ke bandara/stasiun?
   - Bagaimana cara booking?

   > *Mengapa FAQ di halaman detail:* Google sering menampilkan FAQ dari halaman ini di fitur *People Also Ask* (PAA) — mendatangkan traffic tambahan tanpa upaya ekstra. Selain itu, FAQ dengan `FAQPage` schema markup meningkatkan kemungkinan muncul di posisi yang lebih mencolok.

9. **CTA Akhir → WhatsApp**
   - Template pesan sudah terisi otomatis: nama rute, sehingga admin langsung tahu konteksnya.

**Acceptance criteria:**
- Hanya menampilkan rute `is_active = true`.
- Slug unik per rute.
- Jika harga kosong → tampilkan *"Hubungi admin untuk informasi harga"*.
- Jika jadwal kosong → tampilkan *"Jadwal menyesuaikan ketersediaan"*.
- CTA WhatsApp membawa nama rute di pesan.
- Meta title dan description bisa diatur dari admin atau fallback otomatis.

---

### 8.4 Katalog Wisata `/wisata`

**Peran halaman:** Index semua paket wisata aktif. Mirip dengan katalog travel, tetapi pengguna di sini cenderung lebih *exploration-minded* — mereka mencari inspirasi, bukan hanya memverifikasi.

**Konten minimum:**
1. Judul halaman (`h1`).
2. Deskripsi singkat.
3. List paket: nama, harga mulai dari, minimal pax, durasi, destinasi utama, tombol detail, tombol WhatsApp.
4. FAQ wisata umum.

> **Mengapa minimal pax ditampilkan di kartu:** Ini adalah salah satu informasi yang paling menentukan apakah seseorang akan melanjutkan atau tidak. Menampilkannya di kartu mencegah pengguna masuk ke halaman detail hanya untuk kecewa karena paket tidak cocok dengan ukuran grup mereka.

---

### 8.5 Detail Wisata `/wisata/{slug}`

**Peran halaman:** Pengguna yang masuk ke sini sudah tertarik. Tugas halaman ini adalah **menghilangkan keraguan terakhir** sebelum mereka menghubungi admin.

**Konten minimum:**

1. **Hero Section** — Nama paket, harga mulai dari, minimal pax, durasi, foto, CTA WhatsApp.
2. **Overview** — Deskripsi paket, destinasi utama, cocok untuk siapa.
3. **Itinerary** — Timeline per hari atau per jam. *Jika itinerary belum final, lebih baik kosong daripada palsu.*
4. **Include** — Apa saja yang sudah termasuk dalam harga (transportasi, driver, BBM, tiket masuk, makan, guide).
5. **Exclude** — Apa yang tidak termasuk (pengeluaran pribadi, tips, tiket tambahan). *Ini sama pentingnya dengan include — menyamakan ekspektasi mencegah kekecewaan.*
6. **Ketentuan** — Minimal peserta, ketentuan DP, kebijakan pembatalan, perubahan jadwal karena cuaca.
7. **FAQ Paket**.
8. **CTA WhatsApp** — Template berisi nama paket.

**Acceptance criteria:**
- Jika `min_pax` kosong → tampilkan *"menyesuaikan paket"*.
- Jika itinerary kosong → jangan tampilkan section itinerary sama sekali.
- Include/exclude berasal dari data admin, bukan hardcoded.
- CTA WhatsApp membawa nama paket di pesan.

---

### 8.6 Katalog Armada `/sewa-armada`

**Peran halaman:** Membantu pengguna memilih kendaraan berdasarkan kapasitas dan kebutuhan mereka.

**Konten minimum:**
1. Judul halaman.
2. Deskripsi singkat.
3. List armada: nama, kapasitas, fasilitas utama, foto, tombol detail, tombol WhatsApp langsung.

> **Mengapa foto adalah elemen wajib di kartu armada:** Pengguna sewa kendaraan sangat visual. Foto yang baik — interior dan eksterior — bisa menjadi penentu konversi lebih dari teks apapun. Armada tanpa foto tampak tidak meyakinkan.

---

### 8.7 Detail Armada `/sewa-armada/{slug}`

**Peran halaman:** Halaman pembuktian — membuktikan bahwa armada ini layak, jelas spesifikasinya, dan mudah dipesan.

**Konten minimum:**

1. **Hero Section** — Nama armada, kapasitas, CTA WhatsApp.
2. **Spesifikasi** — Kapasitas penumpang, ruang bagasi, AC, fitur tambahan.
3. **Galeri Foto** — Eksterior, interior, kursi, bagasi. *Foto asli, bukan stok.*

   > *Mengapa galeri penting:* Pengguna sewa armada ingin tahu persis apa yang mereka bayar. Galeri foto mengurangi ketidakpastian dan meningkatkan kepercayaan.

4. **Cocok Untuk** — Contoh penggunaan: wisata keluarga, rombongan kecil, antar jemput korporat, perjalanan luar kota.
5. **Include/Exclude** — Driver, BBM, tol, parkir, makan driver — sesuai kebijakan aktual.
6. **CTA WhatsApp** — Template berisi nama armada.

**Acceptance criteria:**
- Jika harga sewa tidak tetap → jangan tampilkan nominal. Tampilkan *"harga menyesuaikan tanggal, durasi, dan tujuan"*.
- CTA WhatsApp membawa nama armada di pesan.

---

## 9. Data Model Awal

Data model menggunakan **Cloud Firestore** (Firebase NoSQL) sebagai database utama dan **Firebase Storage** untuk aset media. Definisi lengkap setiap entitas, tipe data, dan contoh dokumen Firestore tersedia di [ENTITIES.md](./ENTITIES.md).

---

### 9.1 `destinations`

Master kota, wilayah, atau destinasi. Digunakan sebagai referensi oleh `travel_routes` dan `tour_packages`.

| Field         | Type    | Required | Notes                                           |
| ------------- | ------- | -------- | ----------------------------------------------- |
| `id`          | bigint  | yes      | Primary key                                     |
| `name`        | varchar | yes      | Nama kota/destinasi                             |
| `slug`        | varchar | yes      | Unique                                          |
| `type`        | enum    | yes      | `city`, `tourism`, `airport`, `station`, `area` |
| `province`    | varchar | no       | Provinsi                                        |
| `description` | text    | no       | Deskripsi SEO                                   |
| `is_active`   | boolean | yes      | Default true                                    |

**Index:** `unique(slug)`, `index(type)`, `index(is_active)`

---

### 9.2 `travel_routes`

Rute travel reguler. Setiap baris adalah satu halaman landing page SEO.

| Field                   | Type    | Required | Notes                          |
| ----------------------- | ------- | -------- | ------------------------------ |
| `id`                    | bigint  | yes      | Primary key                    |
| `origin_id`             | bigint  | yes      | FK destinations                |
| `destination_id`        | bigint  | yes      | FK destinations                |
| `name`                  | varchar | yes      | Contoh: Travel Sahabat Wisata Jember Surabaya |
| `slug`                  | varchar | yes      | Unique — digunakan di URL      |
| `base_price`            | decimal | no       | Harga mulai dari               |
| `estimated_duration`    | varchar | no       | Contoh: 5–7 jam                |
| `estimated_distance_km` | integer | no       | Jika tersedia                  |
| `short_description`     | varchar | no       | Ringkasan untuk kartu katalog  |
| `description`           | text    | no       | Konten detail halaman          |
| `pickup_area`           | json    | no       | Daftar area jemput             |
| `dropoff_area`          | json    | no       | Daftar area antar              |
| `facilities`            | json    | no       | Fasilitas armada               |
| `terms`                 | text    | no       | Ketentuan booking              |
| `meta_title`            | varchar | no       | Override SEO title             |
| `meta_description`      | varchar | no       | Override SEO description       |
| `is_featured`           | boolean | yes      | Default false — untuk homepage |
| `is_active`             | boolean | yes      | Default true                   |

**Index:** `unique(slug)`, `index(origin_id)`, `index(destination_id)`, `index(is_active)`, `index(is_featured)`

---

### 9.3 `route_schedules`

Jadwal keberangkatan per rute. Dipisah dari `travel_routes` agar satu rute bisa punya banyak jadwal.

| Field             | Type    | Required | Notes                            |
| ----------------- | ------- | -------- | -------------------------------- |
| `id`              | bigint  | yes      | Primary key                      |
| `travel_route_id` | bigint  | yes      | FK travel_routes                 |
| `label`           | varchar | no       | Contoh: Pagi, Siang, Malam       |
| `departure_time`  | time    | no       | Jam keberangkatan                |
| `description`     | varchar | no       | Catatan atau keterangan jadwal   |
| `is_active`       | boolean | yes      | Default true                     |
| `sort_order`      | integer | yes      | Urutan tampil                    |

> **Catatan penting:** Jika jadwal belum tetap, gunakan field `description` dengan isi seperti *"Jadwal menyesuaikan ketersediaan"*. **Jangan membuat jam palsu** hanya untuk mengisi halaman — ini menurunkan kepercayaan jika tidak sesuai dengan kondisi nyata.

---

### 9.4 `tour_packages`

Paket wisata. Setiap baris adalah satu halaman landing page wisata.

| Field                 | Type    | Required | Notes                           |
| --------------------- | ------- | -------- | ------------------------------- |
| `id`                  | bigint  | yes      | Primary key                     |
| `name`                | varchar | yes      | Nama paket                      |
| `slug`                | varchar | yes      | Unique                          |
| `base_price`          | decimal | no       | Harga mulai dari                |
| `min_pax`             | integer | no       | Minimal peserta                 |
| `duration`            | varchar | no       | Contoh: 1 hari, 2D1N            |
| `main_destination_id` | bigint  | no       | FK destinations                 |
| `short_description`   | varchar | no       | Ringkasan kartu katalog         |
| `description`         | text    | no       | Konten detail halaman           |
| `itinerary`           | json    | no       | Array rundown kegiatan          |
| `includes`            | json    | no       | Array item yang termasuk        |
| `excludes`            | json    | no       | Array item yang tidak termasuk  |
| `terms`               | text    | no       | Ketentuan paket                 |
| `meta_title`          | varchar | no       | Override SEO title              |
| `meta_description`    | varchar | no       | Override SEO description        |
| `is_featured`         | boolean | yes      | Default false — untuk homepage  |
| `is_active`           | boolean | yes      | Default true                    |

---

### 9.5 `fleets`

Data armada kendaraan.

| Field              | Type    | Required | Notes                          |
| ------------------ | ------- | -------- | ------------------------------ |
| `id`               | bigint  | yes      | Primary key                    |
| `name`             | varchar | yes      | Nama armada                    |
| `slug`             | varchar | yes      | Unique                         |
| `vehicle_type`     | varchar | no       | Hiace, Elf, Bus, Mobil         |
| `capacity`         | integer | no       | Jumlah seat                    |
| `description`      | text    | no       | Detail armada                  |
| `features`         | json    | no       | Fasilitas (AC, reclining, dll) |
| `images`           | json    | no       | Array URL foto                 |
| `terms`            | text    | no       | Ketentuan sewa                 |
| `meta_title`       | varchar | no       | Override SEO title             |
| `meta_description` | varchar | no       | Override SEO description       |
| `is_featured`      | boolean | yes      | Default false                  |
| `is_active`        | boolean | yes      | Default true                   |

---

### 9.6 `posts`

Artikel SEO. Digunakan untuk blog dan konten edukasi jangka panjang.

| Field              | Type     | Required | Notes                |
| ------------------ | -------- | -------- | -------------------- |
| `id`               | bigint   | yes      | Primary key          |
| `title`            | varchar  | yes      | Judul artikel        |
| `slug`             | varchar  | yes      | Unique               |
| `excerpt`          | varchar  | no       | Ringkasan singkat    |
| `content`          | longtext | yes      | Isi artikel          |
| `status`           | enum     | yes      | `draft`, `published` |
| `published_at`     | datetime | no       | Tanggal publikasi    |
| `meta_title`       | varchar  | no       | Override SEO title   |
| `meta_description` | varchar  | no       | Override SEO desc    |

---

### 9.7 `faqs`

FAQ yang bisa digunakan secara polimorfik — untuk global, per rute, per paket wisata, atau per armada.

| Field          | Type    | Required | Notes                              |
| -------------- | ------- | -------- | ---------------------------------- |
| `id`           | bigint  | yes      | Primary key                        |
| `question`     | varchar | yes      | Pertanyaan                         |
| `answer`       | text    | yes      | Jawaban                            |
| `faqable_type` | varchar | no       | Polymorphic: `TravelRoute`, dll    |
| `faqable_id`   | bigint  | no       | Polymorphic ID                     |
| `is_active`    | boolean | yes      | Default true                       |
| `sort_order`   | integer | yes      | Urutan tampil                      |

Relasi polimorfik memungkinkan satu tabel FAQ melayani: FAQ global (halaman `/faq`), FAQ spesifik rute, FAQ paket wisata, dan FAQ armada — tanpa duplikasi tabel.

---

### 9.8 `settings`

Pengaturan global website yang bisa diubah dari admin panel tanpa menyentuh kode.

| Field   | Type      | Required | Notes                         |
| ------- | --------- | -------- | ----------------------------- |
| `id`    | bigint    | yes      | Primary key                   |
| `key`   | varchar   | yes      | Unique                        |
| `value` | json/text | no       | Nilai setting                 |
| `group` | varchar   | no       | General, SEO, Contact, Social |

Contoh key yang wajib ada:
- `site_name`, `site_tagline`
- `whatsapp_number` — digunakan oleh semua CTA di seluruh website
- `contact_email`, `office_address`
- `instagram_url`, `facebook_url`
- `default_meta_title`, `default_meta_description`

---

## 10. Pengelolaan Data (Firebase)

Karena v1.0.0 tidak menggunakan CMS terpisah, semua data dikelola langsung melalui **Firebase Console** atau script seed. Admin yang perlu mengubah data (rute, harga, jadwal, nomor WA) melakukannya langsung di Firestore Console.

### 10.1 Koleksi Firestore

| Koleksi          | Isi                                       |
| ---------------- | ----------------------------------------- |
| `destinations`   | Master kota, bandara, destinasi wisata    |
| `travel_routes`  | Rute travel + sub-koleksi `schedules`     |
| `tour_packages`  | Paket wisata                              |
| `fleets`         | Armada kendaraan                          |
| `faqs`           | FAQ global dan per entitas                |
| `posts`          | Artikel blog/SEO                          |
| `config/site`    | Konfigurasi global (nomor WA, SEO, dll)   |

### 10.2 Aturan Pengelolaan Data

**Slug:**
- Ditentukan saat pertama kali dokumen dibuat.
- Digunakan sebagai Document ID di Firestore.
- *Jangan ubah slug setelah halaman sudah live dan diindex Google* — URL akan berubah dan merusak SEO.

**Status:**
- `isActive: true/false` untuk layanan (travel, wisata, armada).
- `status: "draft" | "published"` untuk artikel blog.

**SEO:**
- Field `meta.title` kosong → fallback ke `name` entitas.
- Field `meta.description` kosong → fallback ke `shortDescription`.

**Foto/Aset:**
- Semua gambar disimpan di **Firebase Storage**.
- URL Firebase Storage disimpan di field `images[]` dokumen Firestore.
- Jangan menyimpan gambar base64 langsung di Firestore.

---

## 11. WhatsApp CTA — Mesin Konversi Utama

WhatsApp adalah channel konversi utama website ini. Setiap tombol CTA menggunakan **WhatsApp API** dengan pesan yang sudah terisi otomatis berdasarkan entitas halaman yang sedang dilihat.

**Mengapa pre-filled message penting:**
Pesan kosong mengharuskan pengguna menulis ulang konteks dari nol — ini menciptakan hambatan (*friction*) yang bisa membuat mereka mundur atau mengirim pesan yang ambigu. Pre-filled message memangkas hambatan ini dan memberi admin konteks langsung tanpa harus tanya balik *"mau tanya apa?"*.

**Format link:**
```
https://wa.me/{phone_number}?text={encoded_message}
```

Nomor harus menggunakan format internasional tanpa simbol atau spasi. Contoh yang benar: `6281234567890`. Contoh yang salah: `081234567890`, `+62 812-3456-7890`.

Nomor bersumber dari dokumen Firestore `config/site` field `whatsappNumber` — satu tempat, mudah diubah kapan saja dari Firebase Console.

---

### 11.1 Template Travel Reguler

```
Halo, saya ingin tanya travel {route_name}.

Tanggal berangkat:
Jumlah penumpang:
Area jemput:
Tujuan turun:
Jam yang diinginkan:

Apakah masih tersedia?
```

- `{route_name}` → otomatis dari `travel_routes.name`.

---

### 11.2 Template Paket Wisata

```
Halo, saya tertarik dengan paket wisata {package_name}.

Tanggal rencana:
Jumlah peserta:
Titik berangkat:
Catatan tambahan:

Mohon info ketersediaan dan estimasi biayanya.
```

- `{package_name}` → otomatis dari `tour_packages.name`.

---

### 11.3 Template Sewa Armada

```
Halo, saya ingin tanya sewa armada {fleet_name}.

Tanggal pemakaian:
Tujuan:
Jumlah penumpang:
Durasi sewa:
Titik jemput:

Mohon info ketersediaan dan estimasi harganya.
```

- `{fleet_name}` → otomatis dari `fleets.name`.

---

### 11.4 Template Rombongan / Custom Trip

```
Halo, saya ingin konsultasi perjalanan rombongan/custom trip.

Nama instansi/rombongan:
Jumlah peserta:
Tujuan:
Tanggal rencana:
Kebutuhan khusus:

Mohon dibantu estimasi paket dan penawarannya.
```

---

## 12. SEO Strategy & Optimasi AI Search

SEO difokuskan pada halaman yang punya **search intent yang jelas** — yaitu halaman detail rute, wisata, dan armada. Selain mesin pencari tradisional (Google), website juga dioptimalkan untuk **AI Search** (ChatGPT, Perplexity, Google AI Overviews).

---

### 12.1 Keyword Cluster

Keyword awal harus divalidasi menggunakan data pencarian nyata (Google Search Console, Google Keyword Planner) atau observasi kompetitor setelah website live.

**Cluster 1 — Travel Reguler:**
- Travel Sahabat Wisata Jember Surabaya
- Travel Sahabat Wisata Jember Juanda
- Travel Sahabat Wisata Jember Malang
- Travel Sahabat Wisata Jember Bali
- Travel Sahabat Wisata Jember Banyuwangi
- Travel Sahabat Wisata Jember door to door

**Cluster 2 — Bandara & Stasiun:**
- Travel Sahabat Wisata Jember Bandara Juanda
- Travel Sahabat Wisata Jember Stasiun Surabaya
- antar jemput bandara dari Jember

**Cluster 3 — Wisata:**
- paket wisata Bromo dari Jember
- paket wisata Ijen dari Jember
- paket wisata Jember 1 hari
- open trip Kawah Ijen Jember

**Cluster 4 — Sewa Armada:**
- sewa Hiace Jember
- sewa Elf Jember
- rental mobil Jember dengan driver
- sewa bus pariwisata Jember

**Cluster 5 — Rombongan:**
- travel rombongan Jember
- sewa kendaraan rombongan Jember
- study tour dari Jember

---

### 12.2 SEO Requirements per Page

Setiap halaman detail wajib memiliki:

1. `<title>` tag yang mengandung keyword utama.
2. `meta_description` yang informatif dan mengundang klik.
3. `canonical_url` untuk mencegah duplikasi konten.
4. `og:title`, `og:description`, `og:image` — untuk tampilan di media sosial dan chat.
5. Struktur heading yang rapi: satu `h1`, beberapa `h2`, `h3` jika dibutuhkan.
6. Internal link ke halaman terkait (contoh: dari detail rute → ke rute terkait atau blog).
7. FAQ section jika relevan.
8. CTA WhatsApp.

---

### 12.3 Structured Data (Schema.org)

Structured data membantu mesin pencari *memahami* konten — bukan sekadar membacanya. Ini adalah salah satu faktor yang bisa meningkatkan tampilan di hasil pencarian (*rich results*).

**Homepage:**
- `LocalBusiness` — nama, alamat, nomor telepon, jam operasional.
- `Organization` — informasi bisnis.
- `WebSite` — dengan sitelinks searchbox jika relevan.

**Detail Rute Travel:**
- `Service` — nama layanan, penyedia, area layanan.
- `FAQPage` — jika ada FAQ section.

**Detail Wisata:**
- `TouristTrip` — jika sesuai dengan skema.
- `Service` — sebagai fallback.
- `FAQPage` — jika ada FAQ.

**Detail Armada:**
- `Service`.
- `FAQPage` jika ada.

**Blog:**
- `Article` — judul, penulis, tanggal publikasi.
- `BreadcrumbList` — untuk navigasi hierarkis.

> **Aturan ketat:** Jangan mengisi field `aggregateRating` atau `Review` dengan data palsu. Jangan menampilkan harga tetap jika harga belum pasti. Pelanggaran ini bisa berujung pada penalti dari Google.

---

### 12.4 Generative Engine Optimization (GEO)

AI Search (ChatGPT Search, Perplexity, Google AI Overviews) menggunakan cara yang berbeda dalam memilih sumber kutipan dibanding Google tradisional. Berikut adalah strategi yang perlu diimplementasikan:

**A. Natural Language Formatting**

AI lebih menyukai teks yang menjawab pertanyaan secara langsung dalam format percakapan. Contoh:

Buruk (terlalu kering):
> Harga: Rp150.000

Baik (LLM-friendly):
> Harga Travel Sahabat Wisata Jember ke Surabaya mulai dari Rp150.000 per orang untuk armada reguler. Harga dapat berbeda tergantung jam keberangkatan, jumlah penumpang, dan area jemput.

**B. Information Density**

Sajikan data penting dalam format yang mudah diekstrak oleh AI:
- Jadwal → dalam tabel.
- Include/Exclude → dalam daftar bullet.
- FAQ → dalam format pertanyaan-jawaban yang eksplisit.

**C. Kredibilitas (E-E-A-T)**

AI Search memprioritaskan sumber yang memiliki bukti otoritas nyata:
- Cantumkan alamat fisik atau area operasional.
- Tampilkan nomor kontak yang aktif.
- Tampilkan ulasan pelanggan asli (bukan testimoni palsu).
- Halaman `/tentang-kami` harus berisi informasi bisnis yang konkret (berdiri sejak kapan, melayani area mana, dll).

**D. Konten yang Menjawab Intent**

Setiap halaman harus menjawab **satu intent utama** secara tuntas. Halaman `/travel/jember-surabaya` harus menjawab: *"Berapa harga, jam berapa berangkat, dan bagaimana cara booking Travel Sahabat Wisata Jember ke Surabaya?"* — semuanya dalam satu halaman, tanpa harus pergi ke halaman lain.

---

## 13. Performance Requirements

Performance bukan hanya soal kecepatan teknis — ini langsung memengaruhi konversi. Setiap detik keterlambatan loading meningkatkan bounce rate, terutama di mobile dengan koneksi yang tidak stabil.

**Target teknis:**
1. **Mobile-first** — desain dan pengembangan dimulai dari ukuran layar terkecil.
2. **Page load ringan** — utamakan kecepatan di koneksi mobile (3G/4G).
3. **Image lazy loading** — gambar di bawah fold baru dimuat saat digulir.
4. **Format gambar WebP** — lebih kecil dari JPG/PNG dengan kualitas yang setara.
5. **CSS dan JS minimal** — hindari library besar yang tidak perlu.
6. **CTA WhatsApp selalu terlihat di mobile** — menggunakan sticky button atau floating button.
7. **Sitemap otomatis** — diperbarui setiap ada entitas baru.
8. **Cache untuk halaman publik** — halaman rute, wisata, armada jarang berubah; cache mengurangi beban server.

| Metric             | Target                   |
| ------------------ | ------------------------ |
| Mobile responsive  | Wajib                    |
| Page load          | Ringan di koneksi mobile |
| Image optimization | Wajib (WebP)             |
| SEO metadata       | Wajib per halaman        |
| Sitemap            | Wajib, otomatis          |
| WhatsApp CTA       | Wajib, selalu visible    |
| Firebase Firestore | Wajib sebagai database   |

---

## 14. Tech Stack

### 14.1 Stack yang Digunakan (v1.0.0)

```
Next.js (App Router) + Tailwind CSS + Firebase (Firestore + Storage + Auth)
```

| Layer       | Teknologi                       | Peran                                                      |
| ----------- | ------------------------------- | ---------------------------------------------------------- |
| Frontend    | **Next.js** (App Router)        | UI, routing, SSG/SSR per halaman                           |
| Styling     | **Tailwind CSS**                | Utility-first styling, responsif                           |
| Database    | **Cloud Firestore**             | Penyimpanan data rute, wisata, armada, FAQ, artikel, config |
| File/Media  | **Firebase Storage**            | Foto armada, destinasi wisata, OG image                    |
| Auth        | **Firebase Authentication**     | Login admin untuk akses Firebase Console                   |
| Hosting     | **Vercel** *(rekomendasi)*      | Deploy Next.js, CDN global, preview per branch             |

### 14.2 Mengapa Firebase?

| Kelebihan                                              | Kekurangan                                              |
| ------------------------------------------------------ | ------------------------------------------------------- |
| Setup cepat — tidak perlu konfigurasi server           | Query kompleks (JOIN) tidak native → harus denormalisasi |
| Realtime update jika suatu saat dibutuhkan             | Cost bisa meningkat seiring volume baca/tulis tinggi    |
| Storage terintegrasi dalam satu ekosistem              | Struktur NoSQL butuh perencanaan skema yang matang      |
| Firebase Console bisa dipakai admin untuk edit data    | Tidak ada UI admin yang user-friendly out-of-the-box    |
| Free tier (Spark) cukup untuk MVP awal                 |                                                         |

### 14.3 Mengapa Next.js?

1. **SSG (Static Site Generation)** untuk halaman yang jarang berubah (rute, wisata, armada) → cepat, SEO-friendly.
2. **SSR (Server-Side Rendering)** untuk halaman yang perlu data fresh saat diakses.
3. **App Router** memudahkan layout bersama, loading state, dan error boundary.
4. **Image Optimization** bawaan — otomatis konversi ke WebP dan lazy load.
5. **Vercel** sebagai hosting memberikan deployment yang sangat mudah dan preview otomatis setiap push.

---

## 15. MVP Version 1.0

MVP harus fokus pada halaman yang langsung mendukung traffic dan konversi. Tidak semua yang ada di scope harus selesai di versi pertama.

### 15.1 Public Page MVP

**Wajib (tanpa ini website tidak siap produksi):**
1. Homepage.
2. Katalog travel.
3. Detail rute travel.
4. Katalog wisata.
5. Detail wisata.
6. Katalog armada.
7. Detail armada.
8. Halaman rombongan.
9. Custom trip.
10. Kontak.
11. FAQ.
12. Blog index + detail.

**Opsional (setelah MVP):**
1. Galeri foto.
2. Halaman testimoni/ulasan.
3. Promo/penawaran khusus.
4. Halaman karier/mitra pengemudi.
5. Download proposal PDF.

---

### 15.2 Pengelolaan Data MVP

Pada v1.0.0, pengelolaan data dilakukan langsung melalui **Firebase Console** (Firestore UI). Tidak ada admin panel terpisah.

**Data yang wajib diisi sebelum launch:**
1. Dokumen `config/site` — nomor WhatsApp, nama brand, SEO default.
2. Minimal 3 dokumen di `travel_routes` + jadwal masing-masing.
3. Minimal 2 dokumen di `tour_packages`.
4. Minimal 2 dokumen di `fleets` dengan foto di Firebase Storage.
5. Minimal 5 dokumen di `faqs` (scope: global).
6. Semua dokumen destinasi yang direferensikan (`destinations`).

---

### 15.3 Data Awal MVP

Data awal harus kecil tetapi **valid dan sudah diverifikasi** dengan owner.

**Minimum:**
- 3 rute travel aktif.
- 2 paket wisata aktif.
- 2 armada aktif.
- 5 FAQ umum.
- 3 artikel awal.
- Nomor WhatsApp resmi yang aktif.
- Alamat atau area layanan.
- Foto armada dan destinasi yang asli.

> **Aturan wajib:** Jangan menggunakan data contoh (`Lorem ipsum`, harga fiktif, jam palsu) di produksi. Data produksi harus dikonfirmasi langsung ke owner/admin travel sebelum website live.

---

## 16. Prioritas Pengembangan

### Phase 1 — Foundation

**Deliverable:** Database dan CMS berfungsi. Admin bisa input data.

1. Setup project Laravel + Filament.
2. Setup database dan jalankan migration.
3. Buat semua model Eloquent.
4. Buat resource CMS (CRUD) di Filament.
5. Buat helper untuk generate link WhatsApp.
6. Setup setting global (nomor WA, nama brand, SEO default).

---

### Phase 2 — Public Website

**Deliverable:** Website sudah bisa digunakan untuk lead generation.

1. Homepage dengan semua section.
2. Katalog travel + detail rute.
3. Katalog wisata + detail wisata.
4. Katalog armada + detail armada.
5. Halaman rombongan dan custom trip.
6. Halaman kontak.
7. CTA WhatsApp dinamis di semua halaman.

---

### Phase 3 — SEO

**Deliverable:** Website siap diindex mesin pencari.

1. Metadata per halaman (title, description, canonical, OG tags).
2. Sitemap otomatis.
3. Robots.txt.
4. Structured data Schema.org.
5. Breadcrumb navigasi.
6. FAQ schema.
7. Publikasi 3 artikel SEO awal.

---

### Phase 4 — Polish

**Deliverable:** Website lebih siap produksi — cepat, bersih, dan terlacak.

1. Optimasi tampilan dan layout mobile.
2. Kompresi dan konversi gambar ke WebP.
3. Loading state dan skeleton screen.
4. Empty state yang informatif (rute belum ada, wisata belum tersedia).
5. Halaman error 404 yang terpandu.
6. Integrasi Google Analytics.
7. Setup Google Search Console.

---

## 17. Acceptance Criteria MVP

Website dianggap selesai dan siap produksi jika **semua** kriteria berikut terpenuhi:

1. Admin bisa login ke CMS dengan akun yang aman.
2. Admin bisa menambah, mengubah, dan menonaktifkan rute travel.
3. Admin bisa menambah, mengubah, dan menonaktifkan paket wisata.
4. Admin bisa menambah, mengubah, dan menonaktifkan armada.
5. Admin bisa mengubah nomor WhatsApp tanpa menyentuh kode.
6. Halaman publik hanya menampilkan data dengan `is_active = true`.
7. Setiap halaman detail layanan memiliki CTA WhatsApp yang berfungsi.
8. Link WhatsApp membuka chat dengan pesan yang sudah terisi sesuai layanan.
9. Semua halaman utama responsive di mobile (layar 375px ke atas).
10. Setiap halaman detail memiliki meta title dan meta description.
11. Sitemap tersedia dan bisa diakses di `/sitemap.xml`.
12. **Tidak ada data palsu** di halaman publik — tidak ada harga fiktif, jam palsu, atau testimoni yang tidak valid.
13. Jika data kosong, halaman menampilkan fallback yang aman (bukan error atau halaman kosong).
14. Website dapat diakses tanpa login oleh publik.

---

## 18. Risiko Produk

| Risiko                         | Dampak                                        | Mitigasi                                                              |
| ------------------------------ | --------------------------------------------- | --------------------------------------------------------------------- |
| Data harga tidak valid         | Pengguna kecewa saat tanya ke admin           | Gunakan "mulai dari" dan wajibkan konfirmasi admin                    |
| Jadwal sering berubah          | Informasi halaman cepat usang                 | Jadwal dibuat editable dari CMS, bukan hardcoded                      |
| Foto armada tidak tersedia     | Website terlihat kurang profesional           | Prioritaskan foto asli; hindari foto stok yang generik                |
| SEO terlalu broad              | Sulit ranking karena bersaing dengan brand besar | Fokus pada micro landing page per rute dengan keyword spesifik     |
| Admin tidak rutin update konten| Website usang dan menampilkan info yang tidak akurat | CMS dibuat semudah mungkin; panduan penggunaan disediakan         |
| Klaim berlebihan di konten     | Menurunkan kepercayaan jika tidak terbukti    | Gunakan bahasa objektif dan berbasis data                             |
| Terlalu banyak fitur di MVP    | MVP lambat selesai; lebih lama monetisasi     | Fitur kompleks (payment, login, booking) dikeluarkan dari scope MVP   |
| Slug diubah setelah go-live    | Merusak SEO dan link yang sudah tersebar      | Edukasi admin bahwa slug tidak boleh diubah setelah halaman live      |

---

## 19. Data Validation Checklist

Checklist ini wajib diselesaikan bersama owner travel **sebelum website live di produksi**.

### Rute Travel
- [ ] Nama rute benar dan sesuai kata pencarian yang umum.
- [ ] Kota asal benar.
- [ ] Kota tujuan benar.
- [ ] Harga dasar sudah dikonfirmasi (meskipun berupa range "mulai dari").
- [ ] Jadwal keberangkatan sesuai kondisi nyata.
- [ ] Area jemput sudah dikonfirmasi.
- [ ] Area antar sudah dikonfirmasi.
- [ ] Estimasi durasi realistis.
- [ ] Fasilitas sesuai armada aktual yang digunakan.
- [ ] Ketentuan sudah disetujui owner.

### Wisata
- [ ] Nama paket benar.
- [ ] Destinasi benar.
- [ ] Harga dasar sudah dikonfirmasi.
- [ ] Minimal pax sudah dikonfirmasi.
- [ ] Itinerary sudah diverifikasi.
- [ ] Daftar include sudah diverifikasi.
- [ ] Daftar exclude sudah diverifikasi.
- [ ] Ketentuan pembatalan sudah disetujui owner.

### Armada
- [ ] Nama kendaraan benar.
- [ ] Kapasitas penumpang benar.
- [ ] Foto yang digunakan adalah foto asli armada ini.
- [ ] Fasilitas sesuai kondisi aktual.
- [ ] Ketentuan sewa sudah disetujui owner.

### Kontak
- [ ] Nomor WhatsApp aktif dan bisa diterima.
- [ ] Format nomor benar (format internasional tanpa simbol).
- [ ] Uji buka link WhatsApp dari template — pesan muncul dengan benar.
- [ ] Alamat atau area operasional benar.
- [ ] Akun media sosial (jika ditampilkan) aktif dan benar.

---

## 20. Analytics dan Tracking

Tracking dipasang sejak awal untuk memahami halaman mana yang mendatangkan inquiry paling banyak — data ini akan menentukan konten mana yang perlu diprioritaskan untuk pengembangan berikutnya.

**Event yang wajib dicatat:**

```
click_whatsapp_home               — klik CTA dari homepage
click_whatsapp_travel_detail      — klik CTA dari halaman detail rute
click_whatsapp_tour_detail        — klik CTA dari halaman detail wisata
click_whatsapp_fleet_detail       — klik CTA dari halaman detail armada
click_whatsapp_custom_trip        — klik CTA dari halaman custom trip
click_whatsapp_contact            — klik CTA dari halaman kontak
```

**Tools yang direkomendasikan:**

| Tool                  | Kelebihan                                       |
| --------------------- | ----------------------------------------------- |
| Google Analytics 4    | Gratis, powerful, integrasi Search Console      |
| Google Search Console | Wajib — memantau performa keyword dan indexing  |
| Plausible Analytics   | Privasi-first, tanpa cookie, ringan             |
| Umami Analytics       | Open source, self-hosted, tanpa tracking pihak ketiga |

> Minimal gunakan **Google Analytics 4** dan **Google Search Console**. Keduanya gratis dan memberikan data yang cukup untuk pengambilan keputusan di tahap awal.

---

## 21. Kesimpulan

Website Travel Sahabat Wisata Jember ini dibangun dengan satu tujuan yang jelas: **mengubah pencarian Google menjadi percakapan WhatsApp yang berujung pemesanan**.

Keputusan desain — dari struktur URL, isi setiap section halaman, pre-filled template WhatsApp, hingga pilihan tech stack — semuanya didasarkan pada logika konversi dan kebutuhan SEO lokal, bukan asumsi atau kebiasaan semata.

**Prioritas utama yang tidak boleh dikompromikan:**

1. **Data valid** — tidak ada informasi palsu, fiktif, atau tidak terkonfirmasi.
2. **Halaman detail rute lengkap** — ini aset SEO terpenting bisnis ini.
3. **CTA WhatsApp yang jelas** — di setiap titik pengambilan keputusan pengguna.
4. **SEO lokal yang terstruktur** — setiap rute, wisata, dan armada punya halaman sendiri.
5. **Admin bisa mandiri** — website tidak boleh bergantung pada developer untuk update konten rutin.

Fitur kompleks seperti payment gateway, login pelanggan, seat inventory real-time, dan invoice otomatis **tidak masuk MVP** — bukan karena tidak penting, tetapi karena nilai bisnisnya belum terbukti di tahap ini dan kompleksitasnya bisa menunda waktu launch secara signifikan.

Bangun dulu. Validasi. Baru kembangkan.
