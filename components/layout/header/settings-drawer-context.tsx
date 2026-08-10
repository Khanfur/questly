'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type SettingsDrawerContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const SettingsDrawerContext = createContext<SettingsDrawerContextValue | undefined>(undefined)

export function SettingsDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const value = useMemo(() => ({ open, setOpen }), [open])

  return <SettingsDrawerContext.Provider value={value}>{children}</SettingsDrawerContext.Provider>
}

export function useSettingsDrawer() {
  const context = useContext(SettingsDrawerContext)

  if (!context) {
    throw new Error('useSettingsDrawer must be used within a SettingsDrawerProvider')
  }

  return context
}
