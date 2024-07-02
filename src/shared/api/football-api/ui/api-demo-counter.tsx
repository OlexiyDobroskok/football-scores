'use client';

import React from 'react';

import { cn } from '@shared/utils';

import { getFootballApiAccountStatus } from '../actions/api-account-status-action';
import { type AccountRequests } from '../response-schemas/account-status';

const initialState: AccountRequests | null = { current: 0, limit_day: 100 };

export const useFootballApiAccountStatus = (
  checkTime: number = 30000,
): { accountStatus: AccountRequests | null; isPending: boolean } => {
  const [accountStatus, checkAccountStatus, isPending] = React.useActionState(
    getFootballApiAccountStatus,
    initialState,
  );

  const intervalId = React.useRef<number | null>(null);

  React.useEffect(() => {
    intervalId.current = window.setInterval(() => {
      checkAccountStatus();
    }, checkTime);

    return () => {
      if (intervalId.current) {
        window.clearInterval(intervalId.current);
      }
    };
  }, [checkTime, checkAccountStatus]);

  return { accountStatus, isPending };
};

const StatusArea = ({
  isWarning,
  isPending,
  children,
}: {
  isPending: boolean;
  children: React.ReactNode;
  isWarning?: boolean;
}) => {
  return (
    <div
      className={cn('rounded-md bg-green-600 px-4 py-2 text-white', {
        'bg-red-600': isWarning,
        'opacity-80': isPending,
      })}
    >
      {children}
    </div>
  );
};

export function ApiDemoCounter() {
  const { accountStatus, isPending } = useFootballApiAccountStatus();
  if (!accountStatus) {
    return (
      <StatusArea isPending={isPending} isWarning>
        <p className="text-center">Something went wrong</p>
      </StatusArea>
    );
  }

  const warningLimit = accountStatus.limit_day - 20;
  const isWarning = accountStatus.current > warningLimit;

  return (
    <StatusArea isPending={isPending} isWarning={isWarning}>
      <p>
        {accountStatus.current} / {accountStatus.limit_day}
      </p>
    </StatusArea>
  );
}
