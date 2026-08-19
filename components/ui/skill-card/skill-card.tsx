import Image from 'next/image'

import type { SkillInfo } from '@/lib/types/skill/skill'
import { cn } from '@/lib/utils'
import { toDataUrl } from '@dava96/osrs-icons'

export function SkillCard({
  skill,
  className,
  loading = false,
}: {
  skill: SkillInfo
  className?: string
  loading?: boolean
}) {
  return (
    <div className={cn('stat-card items-center justify-center gap-1 px-3 py-3', className)}>
      {loading ? (
        <>
          <div className="size-7 animate-pulse rounded-full bg-muted" aria-hidden="true" />
          <div className="h-[1em] w-6 animate-pulse rounded bg-muted" aria-hidden="true" />
        </>
      ) : (
        <>
          {skill.icon && (
            <Image
              src={toDataUrl(skill.icon)}
              alt={skill.name}
              width={28}
              height={28}
              style={{ width: '28px', height: '28px' }}
            />
          )}
          <span className="stat-value tabular-nums">{skill.level}</span>
        </>
      )}
    </div>
  )
}
