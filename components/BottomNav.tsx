'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  icon: string
  label: string
  href: string
  comingSoon?: boolean
  badge?: boolean
}

const navItems: NavItem[] = [
  {
    icon: '☀️',
    label: 'Hari ini',
    href: '/',
    comingSoon: false,
  },
  {
    icon: '🕌',
    label: 'Sholat',
    href: '/prayer',
    comingSoon: true,
  },
  {
    icon: '📖',
    label: "Al-Qur'an",
    href: '/quran',
    comingSoon: true,
  },
  {
    icon: '🎥',
    label: 'Video',
    href: '/video',
    comingSoon: true,
  },
  {
    icon: '👥',
    label: 'Umat',
    href: '/community',
    comingSoon: true,
    badge: true,
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 right-0 bottom-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 safe-area-inset-bottom shadow-soft-lg">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (item.comingSoon) {
                  e.preventDefault()
                }
              }}
              className={`
                flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200
                ${isActive ? 'bg-primary-100 dark:bg-primary-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                ${item.comingSoon ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="relative">
                {item.badge && (
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full z-10 shadow-soft animate-pulse"></div>
                )}
                <div className={`
                  text-2xl transition-all duration-200
                  ${isActive ? 'scale-110' : 'scale-100'}
                  ${item.comingSoon && !isActive ? 'opacity-30 grayscale' : ''}
                `}>
                  {item.icon}
                </div>
              </div>
              <span className={`
                text-[10px] font-semibold transition-all duration-200
                ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}
                ${item.comingSoon && !isActive ? 'opacity-30' : ''}
              `}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
