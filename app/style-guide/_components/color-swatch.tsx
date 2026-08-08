export function ColorSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex w-20 flex-col gap-1">
      <div className={`h-10 w-20 rounded-md border border-border ${className}`} />
      <span className="text-xs text-muted-foreground">{name}</span>
    </div>
  )
}

export function ColorGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-foreground">{title}</span>
      <div className="flex w-full flex-wrap items-start gap-2">{children}</div>
    </div>
  )
}

export function ColorPalette() {
  return (
    <>
      <ColorGroup title="Base">
        <ColorSwatch name="background" className="bg-background" />
        <ColorSwatch name="foreground" className="bg-foreground" />
        <ColorSwatch name="card" className="bg-card" />
        <ColorSwatch name="card-foreground" className="bg-card-foreground" />
        <ColorSwatch name="popover" className="bg-popover" />
        <ColorSwatch name="popover-foreground" className="bg-popover-foreground" />
        <ColorSwatch name="border" className="bg-border" />
        <ColorSwatch name="input" className="bg-input" />
        <ColorSwatch name="ring" className="bg-ring" />
      </ColorGroup>

      <ColorGroup title="Brand">
        <ColorSwatch name="primary" className="bg-primary" />
        <ColorSwatch name="primary-foreground" className="bg-primary-foreground" />
        <ColorSwatch name="secondary" className="bg-secondary" />
        <ColorSwatch name="secondary-foreground" className="bg-secondary-foreground" />
        <ColorSwatch name="accent" className="bg-accent" />
        <ColorSwatch name="accent-foreground" className="bg-accent-foreground" />
      </ColorGroup>

      <ColorGroup title="Feedback">
        <ColorSwatch name="muted" className="bg-muted" />
        <ColorSwatch name="muted-foreground" className="bg-muted-foreground" />
        <ColorSwatch name="destructive" className="bg-destructive" />
        <ColorSwatch name="destructive-foreground" className="bg-destructive-foreground" />
      </ColorGroup>

      <ColorGroup title="Charts">
        <ColorSwatch name="chart-1" className="bg-chart-1" />
        <ColorSwatch name="chart-2" className="bg-chart-2" />
        <ColorSwatch name="chart-3" className="bg-chart-3" />
        <ColorSwatch name="chart-4" className="bg-chart-4" />
        <ColorSwatch name="chart-5" className="bg-chart-5" />
      </ColorGroup>

      <ColorGroup title="Sidebar">
        <ColorSwatch name="sidebar" className="bg-sidebar" />
        <ColorSwatch name="sidebar-foreground" className="bg-sidebar-foreground" />
        <ColorSwatch name="sidebar-primary" className="bg-sidebar-primary" />
        <ColorSwatch name="sidebar-primary-foreground" className="bg-sidebar-primary-foreground" />
        <ColorSwatch name="sidebar-accent" className="bg-sidebar-accent" />
        <ColorSwatch name="sidebar-accent-foreground" className="bg-sidebar-accent-foreground" />
        <ColorSwatch name="sidebar-border" className="bg-sidebar-border" />
        <ColorSwatch name="sidebar-ring" className="bg-sidebar-ring" />
      </ColorGroup>
    </>
  )
}

export function ThemeColorPalette({ theme, label }: { theme: 'light' | 'dark'; label: string }) {
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} flex flex-col gap-4 rounded-lg border border-border bg-background p-4 text-foreground`}>
      <span className="text-sm font-semibold">{label}</span>
      <ColorPalette />
    </div>
  )
}
