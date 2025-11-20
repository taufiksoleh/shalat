import ComingSoon from '@/components/ComingSoon'

export default function QuranPage() {
  return (
    <ComingSoon
      icon="📖"
      title="Al-Quran Digital"
      description="Baca, dengarkan, dan pelajari Al-Quran dengan fitur lengkap. Dilengkapi terjemahan Bahasa Indonesia dan audio murottal berkualitas tinggi."
      features={[
        'Teks Arab dengan tajwid warna',
        'Terjemahan Bahasa Indonesia (Kemenag RI)',
        'Audio murottal dari berbagai qari terkenal',
        'Bookmark dan catatan pribadi',
        'Pencarian ayat dan topik',
        'Mode membaca malam (night mode)',
        'Tafsir ringkas per ayat',
      ]}
    />
  )
}
