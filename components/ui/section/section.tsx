import { cn } from '@/lib/utils'

interface Section {
  title: string
  className?: string
  children: import('react').ReactNode
}

export function Section({ title, className, children }: Section) {
  return (
    <>
      <h2 className="mt-6">{title}</h2>
      <div className={cn('flex flex-wrap items-center gap-2', className)}>{children}</div>
    </>
  )
}
