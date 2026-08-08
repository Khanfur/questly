import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Separator className="flex-1" />
      <span className="size-1.5 rotate-45 bg-primary" aria-hidden="true" />
      <Separator className="flex-1" />
    </div>
  );
}

export { SectionDivider };
