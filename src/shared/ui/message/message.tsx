import React from 'react';

import { cn } from '@shared/utils';

export function Message({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn(className, 'p-4 text-center text-lg text-foreground')}>
      {children}
    </p>
  );
}
