import { Settings, X } from 'lucide-react'

import { useSettingsDrawer } from '@/components/layout/header/settings-drawer-context'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/shadcn/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/shadcn/drawer'

export function HeaderSettingsDrawer() {
  const { open, setOpen } = useSettingsDrawer()

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

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
