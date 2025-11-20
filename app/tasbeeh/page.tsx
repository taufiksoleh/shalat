import ComingSoon from '@/components/ComingSoon'

export default function TasbeehPage() {
  return (
    <ComingSoon
      icon="📿"
      title="Tasbih Digital"
      description="Hitung dzikir dan wirid Anda dengan mudah menggunakan tasbih digital. Catat dan lacak amalan harian Anda dengan praktis."
      features={[
        'Counter dzikir digital dengan haptic feedback',
        'Berbagai bacaan dzikir pilihan',
        'Riwayat hitungan harian, mingguan, dan bulanan',
        'Target dan pengingat dzikir',
        'Mode vibrasi untuk hitungan tanpa melihat layar',
        'Statistik dan progress amalan',
      ]}
    />
  )
}
