const BREAKPOINTS = [
  { name: 'sm', value: '40rem / 640px' },
  { name: 'md', value: '48rem / 768px' },
  { name: 'lg', value: '64rem / 1024px' },
  { name: 'xl', value: '80rem / 1280px' },
  { name: '2xl', value: '96rem / 1536px' },
] as const

// Visualizes the 12-column grid used within `Container` (max-w-7xl, responsive gutters).
export function GridExample() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <span className="section-heading">12-column grid</span>
        <div className="mt-2 grid grid-cols-12 gap-2 rounded-md border border-border bg-card p-4">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="flex h-12 items-center justify-center rounded-sm bg-muted text-xs text-muted-foreground"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div>
        <span className="section-heading">Container &amp; breakpoints</span>
        <p className="mt-1 text-sm text-muted-foreground">
          Page content sits in <code>Container</code>: <code>max-w-7xl</code> (80rem) with{' '}
          <code>px-4 sm:px-6 lg:px-8</code> gutters.
        </p>
        <div className="mt-2 flex flex-col gap-1">
          {BREAKPOINTS.map((bp) => (
            <div key={bp.name} className="flex items-center gap-4 text-xs">
              <span className="w-10 shrink-0 font-medium text-foreground">{bp.name}</span>
              <span className="text-muted-foreground">{bp.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
