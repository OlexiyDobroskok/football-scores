'use client';

import { shortTime, useIsClient } from '@shared/utils';

export interface MatchStartTimeProps {
  date: string;
  isTBDStatus: boolean;
}

export function MatchStartTime({ date, isTBDStatus }: MatchStartTimeProps) {
  const isClient = useIsClient();

  if (isTBDStatus) {
    return <span className="">- : -</span>;
  }

  const matchDate = new Date(date);
  const matchFormattedTime = shortTime.format(matchDate);

  return isClient ? (
    <time dateTime={matchFormattedTime}>{matchFormattedTime}</time>
  ) : (
    <span className="blur">12:00</span>
  );
}
