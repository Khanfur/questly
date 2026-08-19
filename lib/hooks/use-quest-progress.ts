'use client'

import { useCallback } from 'react'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import type { QuestStatus } from '@/lib/types/quest'

const QUEST_PROGRESS_STORAGE_KEY = 'questly:quest-progress'

/**
 * Persists the player's self-reported completion status for each quest
 * (keyed by quest title) to `localStorage`. There's no OSRS API that exposes
 * per-quest completion — only aggregate quest points via Hiscores — so
 * tracking status is entirely local/manual, via `setQuestStatus`.
 */
export function useQuestProgress() {
  const [statusByQuest, setStatusByQuest, hydrated] = useLocalStorage<Record<string, QuestStatus>>(
    QUEST_PROGRESS_STORAGE_KEY,
    {}
  )

  const setQuestStatus = useCallback(
    (questName: string, status: QuestStatus) => {
      setStatusByQuest((previous) => ({ ...previous, [questName]: status }))
    },
    [setStatusByQuest]
  )

  return { statusByQuest, setQuestStatus, hydrated }
}
