'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';

import { cn } from '@/lib/utils';

const Drawer = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;

function DrawerPortal(props: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Backdrop>) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-backdrop"
      className={cn(
        'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
        className
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Popup> & {
  side?: 'left' | 'right';
}) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        className={cn('fixed inset-y-0 z-50', side === 'right' ? 'right-0' : 'left-0')}
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          className={cn(
            'flex h-full w-72 max-w-[85vw] flex-col gap-6 bg-card p-6 shadow-lg transition-transform duration-300 ease-out',
            side === 'right'
              ? 'border-l border-border data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full'
              : 'border-r border-border data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full',
            className
          )}
          {...props}
        >
          {children}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}

export { Drawer, DrawerTrigger, DrawerClose, DrawerPortal, DrawerBackdrop, DrawerContent };
