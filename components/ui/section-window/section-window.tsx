import Image from 'next/image'

import { cn } from '@/lib/utils'
import { toDataUrl } from '@dava96/osrs-icons'

interface SectionWindow {
  title: string
  icon?: string
  className?: string
  children: import('react').ReactNode
}

export function SectionWindow({ title, icon, className, children }: SectionWindow) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className={'flex rounded-t-sm border border-muted-foreground/35 bg-muted px-4 py-3'}>
        {icon && (
          <Image
            src={toDataUrl(icon)}
            alt={title}
            width={28}
            height={28}
            style={{ width: '28px', height: '28px' }}
          />
        )}
        <h3 className="ml-2">{title}</h3>
      </div>
      <div
        className={
          'flex flex-col gap-1 rounded-sm border border-muted-foreground/35 border-t-0 bg-card px-4 py-3'
        }
      >
        {children}
      </div>
    </div>
  )
}
