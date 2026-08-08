const SPACING_TOKENS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32] as const

// Tailwind's base spacing unit is 0.25rem (4px); each token is a multiple of that unit.
export function SpacingScale() {
  return (
    <div className="flex w-full flex-col gap-2">
      {SPACING_TOKENS.map((token) => {
        const rem = token * 0.25
        const px = token * 4
        return (
          <div key={token} className="flex items-center gap-4">
            <span className="w-10 shrink-0 text-xs font-medium text-foreground">{token}</span>
            <div className={`h-4 rounded-sm bg-primary`} style={{ width: `${rem}rem` }} />
            <span className="text-xs text-muted-foreground">
              {rem}rem &middot; {px}px
            </span>
          </div>
        )
      })}
    </div>
  )
}
