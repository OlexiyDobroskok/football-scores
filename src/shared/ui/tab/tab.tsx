import React from 'react';

import { cn } from '@shared/utils';

export interface TabProps {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
  isSingle?: boolean;
}

export function Tab({ className, isActive, isSingle, children }: TabProps) {
  return (
    <div className={cn(className, 'space-y-2 pt-3')}>
      <div>{children}</div>
      <div
        className={cn('h-1 bg-accent/10 px-0.5 transition-all', {
          'bg-transparent': isActive && !isSingle,
        })}
      >
        <div
          className={cn('mx-auto h-1 w-0 rounded transition-all', {
            'w-full bg-accent shadow-md shadow-accent/60':
              isActive && !isSingle,
          })}
        ></div>
      </div>
    </div>
  );
}
