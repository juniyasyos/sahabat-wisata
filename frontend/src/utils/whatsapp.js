import { siteConfig } from "../data/siteConfig";

export const buildWhatsAppUrl = (message) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
};

export const formatPrice = (price) => {
  if (!price) return "Hubungi Admin";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const WA_MESSAGES = {
  general: `Halo, saya ingin mengetahui lebih lanjut tentang layanan travel Sahabat Wisata Jember. Bisa bantu saya?`,
  travel: (origin, destination, date, passengers) =>
    `Halo, saya ingin menanyakan ketersediaan Travel Antar Kota:\n- Rute: ${origin} ke ${destination}\n- Tanggal: ${date || "[isi tanggal]"}\n- Jumlah Penumpang: ${passengers || "[isi jumlah]"} orang\n\nApakah ada jadwal yang tersedia?`,
  wisata: (packageName, date, pax) =>
    `Halo, saya tertarik dengan Paket Wisata ${packageName}.\n- Rencana Tanggal: ${date || "[isi tanggal]"}\n- Jumlah Peserta: ${pax || "[isi jumlah]"} orang\n\nMohon informasi harga dan detail paketnya.`,
  armada: (fleetType, startDate, duration, destination) =>
    `Halo, saya ingin menanyakan ketersediaan Sewa Armada:\n- Jenis Armada: ${fleetType || "[isi jenis]"}\n- Tanggal Pemakaian: ${startDate || "[isi tanggal]"}\n- Durasi: ${duration || "[isi durasi]"}\n- Tujuan: ${destination || "[isi tujuan]"}\n\nMohon info ketersediaan dan harganya.`,
  rombongan: (destination, date, pax, notes) =>
    `Halo, saya ingin merencanakan perjalanan Rombongan:\n- Tujuan: ${destination || "[isi tujuan]"}\n- Rencana Tanggal: ${date || "[isi tanggal]"}\n- Estimasi Peserta: ${pax || "[isi jumlah]"} orang\n- Catatan: ${notes || "-"}\n\nBisa bantu berikan penawarannya?`,
};
