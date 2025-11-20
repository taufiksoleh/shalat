'use client'

interface ComingSoonProps {
  icon: string
  title: string
  description: string
  features?: string[]
}

export default function ComingSoon({ icon, title, description, features }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[var(--background)]/80 border-b border-[var(--ios-separator)]">
        <div className="max-w-4xl mx-auto px-5">
          <div className="h-11" /> {/* Status bar spacing */}
          <div className="py-4">
            <h1 className="text-[34px] font-bold leading-[41px] tracking-tight">
              {title}
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-5 pt-6">
        {/* Coming Soon Card */}
        <div className="bg-white/90 dark:bg-[var(--ios-gray)] rounded-[20px] p-8 glass-effect ios-shadow text-center">
          {/* Icon */}
          <div className="text-7xl mb-4">
            {icon}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            Segera Hadir
          </h2>

          {/* Description */}
          <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {description}
          </p>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--ios-blue)] to-[var(--ios-teal)] text-white px-6 py-3 rounded-full text-sm font-semibold">
            <span>🚀</span>
            <span>Dalam Pengembangan</span>
          </div>
        </div>

        {/* Features Preview */}
        {features && features.length > 0 && (
          <div className="mt-6">
            <h3 className="text-[13px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
              Fitur yang Akan Datang
            </h3>
            <div className="bg-white/90 dark:bg-[var(--ios-gray)] rounded-[20px] glass-effect ios-shadow overflow-hidden">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`
                    px-5 py-4 flex items-center gap-3
                    ${index < features.length - 1 ? 'border-b border-[var(--ios-separator)]' : ''}
                  `}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[var(--ios-blue)] to-[var(--ios-teal)] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-[15px] text-gray-900 dark:text-white">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-[16px] p-4 border border-blue-100 dark:border-blue-800">
          <p className="text-[13px] text-blue-800 dark:text-blue-200 text-center">
            💡 Fitur ini sedang dalam tahap pengembangan. Nantikan update selanjutnya!
          </p>
        </div>
      </main>
    </div>
  )
}
