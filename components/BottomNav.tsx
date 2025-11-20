'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tabbar, TabbarLink } from 'konsta/react'

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
    <Tabbar
      labels
      icons
      className="fixed left-0 bottom-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link key={item.href} href={item.href} className="contents">
            <TabbarLink
              active={isActive}
              label={item.label}
              icon={
                <div className="relative">
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full z-10"></div>
                  )}
                  <div className={`text-2xl ${item.comingSoon ? 'opacity-40' : ''}`}>
                    {item.icon}
                  </div>
                </div>
              }
              onClick={(e) => {
                if (item.comingSoon) {
                  e.preventDefault()
                }
              }}
            />
          </Link>
        )
      })}
    </Tabbar>
  )
}
