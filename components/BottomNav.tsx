'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tabbar, TabbarLink } from 'konsta/react'

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
    <Tabbar labels icons className="fixed left-0 bottom-0 w-full">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        if (item.comingSoon) {
          return (
            <TabbarLink
              key={item.href}
              active={false}
              label={item.label}
              icon={
                <div className="relative">
                  <div className="absolute -top-2 -right-2 bg-ios-blue text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap z-10">
                    Segera
                  </div>
                  <div className="text-2xl opacity-60">
                    {item.icon}
                  </div>
                </div>
              }
              onClick={(e) => e.preventDefault()}
            />
          )
        }

        return (
          <Link key={item.href} href={item.href} className="contents">
            <TabbarLink
              active={isActive}
              label={item.label}
              icon={
                <div className="text-2xl">
                  {item.icon}
                </div>
              }
            />
          </Link>
        )
      })}
    </Tabbar>
  )
}
