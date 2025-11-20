import ComingSoon from '@/components/ComingSoon'

export default function SettingsPage() {
  return (
    <ComingSoon
      icon="⚙️"
      title="Pengaturan"
      description="Personalisasi aplikasi sesuai kebutuhan Anda. Atur notifikasi adzan, tema, dan berbagai preferensi lainnya."
      features={[
        'Notifikasi adzan dengan pilihan suara',
        'Reminder shalat sunnah (Tahajud, Dhuha)',
        'Pilihan metode perhitungan waktu shalat',
        'Pengaturan tema (terang, gelap, otomatis)',
        'Bahasa aplikasi',
        'Widget untuk home screen',
        'Backup dan restore data',
      ]}
    />
  )
}
