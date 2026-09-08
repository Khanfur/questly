'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { fetchHiscores } from '@/lib/integrations/osrs-hiscores'
import { AccountDetails, DEFAULT_ACCOUNT_DETAILS } from '@/lib/types/account'
import type { OsrsHiscores } from '@/lib/types/osrs-hiscores'

const ACCOUNT_DETAILS_STORAGE_KEY = 'questly:account-details'
const HISCORES_STORAGE_KEY = 'questly:hiscores'

// Module-scoped (not per-hook-instance) so the automatic hiscores refresh
// below fires once per site load, not once per mount of every component
// that happens to call `useAccountDetails` (e.g. the home page *and* the
// settings drawer, the latter of which lazily mounts `HeaderAccountDetails`
// each time it's opened). A plain module variable naturally resets on a
// full page reload, which is what we want: refresh again next time the
// site loads, but don't refetch just because a component remounted.
let hasAutoFetchedHiscoresThisLoad = false

/**
 * Test-only: resets the guard above so each test starts with a clean
 * "hasn't auto-fetched yet" state, mirroring a fresh page load.
 */
export function __resetHiscoresAutoFetchGuardForTests() {
  hasAutoFetchedHiscoresThisLoad = false
}

/**
 * Reads/writes the player's account details (RuneScape username,
 * membership status and account type) to `localStorage`, so the settings
 * drawer remembers them across visits. Hiscores can also be fetched
 * on-demand via the returned `refetchHiscores()` function. In addition,
 * once the persisted account details have hydrated, a saved username
 * triggers a single automatic hiscores refresh per site load (see the
 * module-level guard below) so a returning player's stats are refreshed
 * as soon as the site loads, without needing to re-open the settings
 * drawer and click "Fetch".
 */
export function useAccountDetails() {
  const [accountDetails, setAccountDetails, accountDetailsHydrated] =
    useLocalStorage<AccountDetails>(ACCOUNT_DETAILS_STORAGE_KEY, DEFAULT_ACCOUNT_DETAILS)
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

  // Refresh hiscores once, automatically, as soon as the persisted account
  // details have hydrated and a username is on record — so a returning
  // player's stats are up to date the moment the site loads, rather than
  // only showing whatever was last cached in localStorage. Guarded by the
  // module-level flag above (not just the hydrated flag) so it fires
  // exactly once per site load, regardless of how many components mount
  // this hook or how many times one of them remounts (e.g. the settings
  // drawer being opened after the initial page load already refreshed it).
  useEffect(() => {
    if (!accountDetailsHydrated || hasAutoFetchedHiscoresThisLoad) return
    hasAutoFetchedHiscoresThisLoad = true

    if (accountDetails.username && accountDetails.username.trim() !== '') {
      // `refetchHiscores` itself updates state (loading/error/hiscores)
      // asynchronously in response to the fetch it kicks off here, not
      // synchronously within this effect — safe to disable the rule below.
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      void refetchHiscores()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountDetailsHydrated])

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
