'use client'

import { useCallback } from 'react'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'

const DIARY_PROGRESS_STORAGE_KEY = 'questly:diary-progress'

/**
 * Persists the player's self-reported completion status for each individual
 * diary task (keyed by `diaryTaskKey` — region/tier/index) to `localStorage`.
 * There's no OSRS API that exposes per-task diary completion, so tracking is
 * entirely local/manual, via `toggleDiaryTask` — mirrors `useQuestProgress`.
 */
export function useDiaryProgress() {
  const [completedByTask, setCompletedByTask, diaryProgressHydrated] = useLocalStorage<
    Record<string, boolean>
  >(DIARY_PROGRESS_STORAGE_KEY, {})

  const toggleDiaryTask = useCallback(
    (taskKey: string) => {
      setCompletedByTask((previous) => ({ ...previous, [taskKey]: !previous[taskKey] }))
    },
    [setCompletedByTask]
  )

  return { completedByTask, toggleDiaryTask, diaryProgressHydrated }
}
