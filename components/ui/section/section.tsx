import { cn } from '@/lib/utils'

export function Section({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <>
      <h2 className="mt-6">{title}</h2>
      <div className={cn('flex flex-wrap items-center gap-2', className)}>
        {children}
      </div>
    </>
  )
}
