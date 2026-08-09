import { cn } from '@/lib/utils'
import { Progress as ProgressPrimitive } from '@base-ui/react/progress'
import { type VariantProps, cva } from 'class-variance-authority'

const progressIndicatorVariants = cva('h-full rounded-full transition-all', {
  variants: {
    variant: {
      default: 'bg-primary',
      secondary: 'bg-secondary',
      muted: 'bg-muted-foreground/40',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function Progress({
  className,
  value,
  variant,
  ...props
}: import('react').ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressIndicatorVariants>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn('w-full', className)}
      {...props}
    >
      <ProgressPrimitive.Track
        data-slot="progress-track"
        className="block h-1.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(progressIndicatorVariants({ variant }))}
          style={{ width: `${value ?? 0}%` }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
