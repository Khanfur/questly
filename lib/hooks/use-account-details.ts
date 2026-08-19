'use client'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { AccountDetails, DEFAULT_ACCOUNT_DETAILS } from '@/lib/types/account'

const ACCOUNT_DETAILS_STORAGE_KEY = 'questly:account-details'

/**
 * Reads/writes the player's account details (RuneScape username,
 * membership status and account type) to `localStorage`, so the settings
 * drawer remembers them across visits.
 */
export function useAccountDetails() {
  const [accountDetails, setAccountDetails] = useLocalStorage<AccountDetails>(
    ACCOUNT_DETAILS_STORAGE_KEY,
    DEFAULT_ACCOUNT_DETAILS
  )

  const updateAccountDetails = (patch: Partial<AccountDetails>) => {
    setAccountDetails((previous) => ({ ...previous, ...patch }))
  }

  return { accountDetails, updateAccountDetails }
}
