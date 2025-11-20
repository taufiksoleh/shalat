import ComingSoon from '@/components/ComingSoon'

export default function QiblaPage() {
  return (
    <ComingSoon
      icon="🧭"
      title="Arah Kiblat"
      description="Temukan arah kiblat dengan mudah menggunakan kompas digital yang akurat. Fitur ini akan membantu Anda menentukan arah shalat di mana pun Anda berada."
      features={[
        'Kompas digital dengan indikator arah kiblat',
        'Perhitungan otomatis berdasarkan lokasi GPS',
        'Tampilan visual Ka\'bah 3D',
        'Jarak ke Makkah dari lokasi Anda',
        'Mode kalibrasi untuk akurasi maksimal',
      ]}
    />
  )
}
