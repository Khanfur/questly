'use client'

import { useCallback, useRef, useState } from 'react'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { fetchHiscores } from '@/lib/integrations/osrs-hiscores'
import { AccountDetails, DEFAULT_ACCOUNT_DETAILS } from '@/lib/types/account'
import type { OsrsHiscores } from '@/lib/types/osrs-hiscores'

const ACCOUNT_DETAILS_STORAGE_KEY = 'questly:account-details'
const HISCORES_STORAGE_KEY = 'questly:hiscores'

/**
 * Reads/writes the player's account details (RuneScape username,
 * membership status and account type) to `localStorage`, so the settings
 * drawer remembers them across visits. Hiscores are fetched on-demand via
 * the returned `refetchHiscores()` function, not automatically.
 */
export function useAccountDetails() {
  const [accountDetails, setAccountDetails] = useLocalStorage<AccountDetails>(
    ACCOUNT_DETAILS_STORAGE_KEY,
    DEFAULT_ACCOUNT_DETAILS
  )
  const [hiscores, setHiscores, hiscoresHydrated] = useLocalStorage<OsrsHiscores | null>(
    HISCORES_STORAGE_KEY,
    null
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)

  const updateAccountDetails = useCallback(
    (patch: Partial<AccountDetails>) => {
      setAccountDetails((previous) => ({ ...previous, ...patch }))
    },
    [setAccountDetails]
  )

  const refetchHiscores = useCallback(async () => {
    if (!accountDetails.username || accountDetails.username.trim() === '') {
      setError('Please enter a username first')
      return
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const result = await fetchHiscores(accountDetails.username.trim(), {
        baseUrl: '/api/osrs-hiscores',
        signal: controller.signal,
      })
      if (!controller.signal.aborted) {
        setHiscores(result)
        setLoading(false)
      }
    } catch (err) {
      if (controller.signal.aborted) return

      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Failed to fetch hiscores. Please check the username and try again.'
      setError(errorMsg)
      setLoading(false)
    }
  }, [accountDetails.username, setHiscores])

  return {
    accountDetails,
    updateAccountDetails,
    hiscores,
    hiscoresHydrated,
    refetchHiscores,
    loading,
    error,
  }
}
