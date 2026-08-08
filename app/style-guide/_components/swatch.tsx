export function Swatch({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className ?? 'flex flex-col gap-1'}>
      {children}
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
