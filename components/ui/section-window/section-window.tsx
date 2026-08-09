import { cn } from '@/lib/utils'

interface SectionWindow {
  title: string
  className?: string
  children: import('react').ReactNode
}

export function SectionWindow({ title, className, children }: SectionWindow) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div
        className={
          'flex rounded-t-sm border border-muted-foreground/35 border-b-0 bg-muted px-4 py-3'
        }
      >
        <h3>{title}</h3>
      </div>
      <div
        className={
          'flex flex-col gap-1 rounded-sm border border-muted-foreground/35 border-t-0 px-4 py-3'
        }
      >
        {children}
      </div>
    </div>
  )
}
