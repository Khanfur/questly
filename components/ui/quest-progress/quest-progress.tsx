import React from 'react'

import { Progress } from '@/components/ui/shadcn/progress'

type QuestProgressStatus = 'completed' | 'in-progress' | 'not-started'

const PROGRESS_VARIANT: Record<QuestProgressStatus, 'default' | 'secondary' | 'muted'> = {
  completed: 'secondary',
  'in-progress': 'default',
  'not-started': 'muted',
}

const PROGRESS_VALUE: Record<QuestProgressStatus, number> = {
  completed: 100,
  'in-progress': 50,
  'not-started': 0,
}

interface QuestProgressProps extends Omit<
  React.ComponentProps<typeof Progress>,
  'children' | 'value'
> {
  questName: string
  status: QuestProgressStatus
}

function QuestProgress({ questName, status, ...props }: QuestProgressProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="label">
        {questName} — {status}
      </span>
      <Progress value={PROGRESS_VALUE[status]} variant={PROGRESS_VARIANT[status]} {...props} />
    </div>
  )
}

export { QuestProgress }
export type { QuestProgressProps }
