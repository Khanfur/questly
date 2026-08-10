'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/shadcn/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/shadcn/drawer'

type NavLink = { readonly href: string; readonly label: string }

type HeaderMobileNavDrawerProps = {
  links: readonly NavLink[]
}

export function HeaderMobileNavDrawer({ links }: HeaderMobileNavDrawerProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} swipeDirection="left">
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
      <DrawerContent aria-label="Mobile navigation" className="gap-4 p-4">
        <div className="flex items-center justify-between">
          <div className={'flex gap-2'}>
            <Image src="/favicon.png" alt="Questly Logo" width={32} height={32} />
            <span className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
              Questly
            </span>
          </div>

          <DrawerClose
            render={
              <Button size="icon" variant="ghost" aria-label="Close menu">
                <X />
              </Button>
            }
          />
        </div>
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
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
  )
}
