import Image from 'next/image'

import { SkillInfo } from '@/app/page'
import { cn } from '@/lib/utils'
import { toDataUrl } from '@dava96/osrs-icons'

export function SkillCard({ skill, className }: { skill: SkillInfo; className?: string }) {
  return (
    <div className={cn('stat-card items-center justify-center gap-1 px-3 py-3', className)}>
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
    </div>
  )
}
