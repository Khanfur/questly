'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Menu, Settings, X } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/shadcn/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/shadcn/drawer'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Stats' },
  { href: '/quests', label: 'Quests' },
  { href: '/ask-the-sage', label: 'Ask the Sage' },
] as const

export function Header() {
  const pathname = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <header className="border-b border-border bg-card">
      <Container className="flex h-[70px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BookOpen className="size-4" />
          </span>
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
          <Button size="icon" variant="outline" className="bg-sidebar" aria-label="Settings">
            <Settings />
          </Button>

          <Drawer open={mobileNavOpen} onOpenChange={setMobileNavOpen} swipeDirection="right">
            <DrawerTrigger
              render={
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-sidebar sm:hidden"
                  aria-label="Open menu"
                >
                  <Menu />
                </Button>
              }
            />
            <DrawerContent aria-label="Mobile navigation">
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
                  Menu
                </span>
                <DrawerClose
                  render={
                    <Button size="icon" variant="ghost" aria-label="Close menu">
                      <X />
                    </Button>
                  }
                />
              </div>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        'label rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground',
                        isActive && 'bg-muted text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </Container>
    </header>
  )
}
