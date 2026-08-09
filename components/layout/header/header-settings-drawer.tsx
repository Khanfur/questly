import { useState } from 'react'

import { Settings, X } from 'lucide-react'

import { Button } from '@/components/ui/shadcn/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/shadcn/drawer'

export function HeaderSettingsDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} swipeDirection={'right'}>
      <DrawerTrigger
        render={
          <Button size="icon" variant="outline" className="bg-sidebar" aria-label="Settings">
            <Settings />
          </Button>
        }
      />

      <DrawerContent aria-label="Settings" className="gap-4 p-4">
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
            Settings
          </span>

          <DrawerClose
            render={
              <Button size="icon" variant="ghost" aria-label="Close menu">
                <X />
              </Button>
            }
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
