'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  icon: string
  label: string
  href: string
  comingSoon?: boolean
}

const navItems: NavItem[] = [
  {
    icon: '🕌',
    label: 'Shalat',
    href: '/',
    comingSoon: false,
  },
  {
    icon: '🧭',
    label: 'Kiblat',
    href: '/qibla',
    comingSoon: true,
  },
  {
    icon: '📿',
    label: 'Tasbih',
    href: '/tasbeeh',
    comingSoon: true,
  },
  {
    icon: '📖',
    label: 'Quran',
    href: '/quran',
    comingSoon: true,
  },
  {
    icon: '⚙️',
    label: 'Pengaturan',
    href: '/settings',
    comingSoon: true,
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="glass-effect border-t border-[var(--ios-separator)] backdrop-blur-2xl">
        <div className="max-w-4xl mx-auto px-2">
          <div className="flex justify-around items-center h-20">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.comingSoon ? '#' : item.href}
                  className={`
                    relative flex flex-col items-center justify-center
                    min-w-[60px] py-1 px-2
                    transition-all duration-200
                    ${item.comingSoon ? 'cursor-not-allowed opacity-60' : 'active:scale-95'}
                    ${isActive && !item.comingSoon ? 'text-[var(--ios-blue)]' : 'text-gray-600 dark:text-gray-400'}
                  `}
                  onClick={(e) => {
                    if (item.comingSoon) {
                      e.preventDefault()
                    }
                  }}
                >
                  {/* Coming Soon Badge */}
                  {item.comingSoon && (
                    <div className="absolute -top-1 -right-1 bg-[var(--ios-blue)] text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                      Segera
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`
                    text-2xl mb-1 transition-transform duration-200
                    ${isActive && !item.comingSoon ? 'scale-110' : ''}
                  `}>
                    {item.icon}
                  </div>

                  {/* Label */}
                  <span className={`
                    text-[10px] font-medium
                    ${isActive && !item.comingSoon ? 'font-semibold' : ''}
                  `}>
                    {item.label}
                  </span>

                  {/* Active Indicator */}
                  {isActive && !item.comingSoon && (
                    <div className="absolute bottom-0 w-1 h-1 bg-[var(--ios-blue)] rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
