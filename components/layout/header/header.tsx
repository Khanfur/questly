'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Container } from '@/components/layout/container/container'
import { HeaderSettingsDrawer } from '@/components/layout/header/header-settings-drawer'

import { HeaderMobileNavDrawer } from './header-mobile-nav-drawer'
import Image from "next/image"

const NAV_LINKS = [
  { href: '/', label: 'Stats' },
  { href: '/quests', label: 'Quests' },
  { href: '/ask-the-sage', label: 'Ask the Sage' },
] as const

export function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-border bg-card">
      <Container className="flex h-[70px] items-center justify-between gap-4">
        <HeaderMobileNavDrawer links={NAV_LINKS} />
        <Link href="/" className="items-center gap-2 sm:flex hidden">
          <Image src="/favicon.png" alt="Questly Logo" width={32} height={32} />
          <span className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
            Questly
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'label rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground',
                  isActive && 'bg-muted text-foreground'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <HeaderSettingsDrawer />
          
        </div>
      </Container>
    </header>
  )
}
