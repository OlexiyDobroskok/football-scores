'use client';

import React from 'react';

import { cn } from '@shared/utils';

import { getFootballApiAccountStatus } from '../actions/api-account-status-action';
import {
  type AccountRequests,
  type AccountStatusResponse,
} from '../response-schemas/account-status';

const defaultRequestsStatus: AccountRequests = { current: 0, limit_day: 100 };

export const useFootballApiAccountStatus = (
  initialState: AccountRequests | null = defaultRequestsStatus,
  checkTime: number = 30000,
): { accountRequests: AccountRequests | null; isPending: boolean } => {
  const [accountRequests, checkAccountStatus, isPending] = React.useActionState(
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

  return { accountRequests, isPending };
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

export function ApiDemoCounter({
  accountStatusData,
}: {
  accountStatusData: Promise<AccountStatusResponse | null>;
}) {
  const accountStatus = React.use(accountStatusData);
  const { accountRequests, isPending } = useFootballApiAccountStatus(
    accountStatus?.requests,
  );
  if (!accountRequests) {
    return (
      <StatusArea isPending={isPending} isWarning>
        <p className="text-center">Something went wrong</p>
      </StatusArea>
    );
  }

  const warningLimit = accountRequests.limit_day - 20;
  const isWarning = accountRequests.current > warningLimit;

  return (
    <StatusArea isPending={isPending} isWarning={isWarning}>
      <p>
        {accountRequests.current} / {accountRequests.limit_day}
      </p>
    </StatusArea>
  );
}
