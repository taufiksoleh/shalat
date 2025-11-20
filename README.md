# 🕌 Jadwal Shalat Indonesia

Aplikasi jadwal waktu shalat modern untuk seluruh kota di Indonesia dengan data akurat dari Kementerian Agama Republik Indonesia.

## ✨ Fitur

- 📱 **Mobile-Friendly**: Desain responsif yang sempurna di semua perangkat
- 🎨 **UI/UX Modern**: Antarmuka yang bersih, simple, dan mudah digunakan
- ⏰ **Real-time Clock**: Jam digital yang update setiap detik
- 🕐 **Countdown Timer**: Hitung mundur waktu ke shalat berikutnya
- 🌍 **25+ Kota**: Mendukung 25 kota besar di Indonesia
- ✅ **Data Akurat**: Menggunakan metode perhitungan Kemenag RI
- 📅 **Tanggal Hijriyah**: Menampilkan tanggal Islam
- 🎯 **Next Prayer Highlight**: Menandai waktu shalat berikutnya secara otomatis

## 🏙️ Kota yang Didukung

Jakarta, Surabaya, Bandung, Medan, Semarang, Makassar, Palembang, Tangerang, Depok, Bekasi, Yogyakarta, Bogor, Malang, Batam, Pekanbaru, Bandar Lampung, Padang, Denpasar, Samarinda, Banjarmasin, Pontianak, Manado, Balikpapan, Jambi, dan Cirebon.

## 🚀 Getting Started

### Prasyarat

- Node.js 18.x atau lebih baru
- npm atau yarn

### Instalasi

```bash
# Clone repository
git clone <repository-url>
cd shalat

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Build untuk Production

```bash
# Build aplikasi
npm run build

# Jalankan production server
npm start
```

## 🛠️ Teknologi

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Aladhan Prayer Times API
- **Method**: Kementerian Agama Republik Indonesia

## 📁 Struktur Proyek

```
shalat/
├── app/
│   ├── api/
│   │   └── prayer-times/
│   │       └── route.ts          # API endpoint untuk prayer times
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── LocationSelector.tsx      # Komponen pemilih kota
│   └── PrayerCard.tsx           # Komponen kartu waktu shalat
├── lib/
│   └── indonesian-cities.ts     # Data kota-kota Indonesia
├── types/
│   └── prayer.ts                # TypeScript types
└── package.json
```

## 🎨 Fitur UI/UX

- **Gradient Background**: Latar belakang gradasi yang menenangkan
- **Card Design**: Kartu waktu shalat dengan shadow dan hover effects
- **Color Coding**: Shalat berikutnya ditandai dengan warna khusus
- **Icons & Emojis**: Setiap waktu shalat memiliki icon yang sesuai
- **Responsive Layout**: Otomatis menyesuaikan dengan ukuran layar
- **Smooth Animations**: Transisi dan animasi yang halus

## 📱 Mobile Optimization

- Viewport yang dioptimalkan untuk mobile
- Touch-friendly UI elements
- Readable fonts pada layar kecil
- Efficient data loading

## 🔄 API Integration

Aplikasi ini menggunakan [Aladhan API](https://aladhan.com/prayer-times-api) dengan metode perhitungan #11 (Kementerian Agama Republik Indonesia) untuk memastikan akurasi waktu shalat sesuai dengan standar yang berlaku di Indonesia.

## 📝 Lisensi

MIT License

## 🤝 Kontribusi

Kontribusi, issues, dan feature requests sangat diterima!

## 📧 Kontak

Untuk pertanyaan atau saran, silakan buka issue di repository ini.