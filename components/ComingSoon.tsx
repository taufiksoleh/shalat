'use client'

interface ComingSoonProps {
  icon: string
  title: string
  description: string
  features?: string[]
}

export default function ComingSoon({ icon, title, description, features }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50 shadow-soft">
        <div className="max-w-4xl mx-auto px-5">
          <div className="h-11" />
          <div className="py-4">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              {title}
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-5 pt-8 animate-fade-in">
        {/* Coming Soon Card */}
        <div className="modern-card p-10 text-center bg-white dark:bg-gray-800 mb-8">
          {/* Icon with gradient background */}
          <div className="w-28 h-28 mx-auto mb-6 rounded-3xl gradient-primary flex items-center justify-center text-6xl shadow-soft-lg">
            {icon}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-black mb-3 text-gradient">
            Segera Hadir
          </h2>

          {/* Description */}
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-md mx-auto">
            {description}
          </p>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2.5 gradient-accent text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-soft-lg hover:shadow-soft transition-all">
            <span className="text-lg">🚀</span>
            <span>Dalam Pengembangan</span>
          </div>
        </div>

        {/* Features Preview */}
        {features && features.length > 0 && (
          <div className="mb-8 animate-slide-up">
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
              Fitur yang Akan Datang
            </h3>
            <div className="modern-card p-2 bg-white dark:bg-gray-800">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold shadow-soft">
                    {index + 1}
                  </div>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="modern-card bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 p-5 border-2 border-primary-200 dark:border-primary-800">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xl shadow-soft">
              💡
            </div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Fitur ini sedang dalam tahap pengembangan. Nantikan update selanjutnya!
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-success-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </main>
    </div>
  )
}
