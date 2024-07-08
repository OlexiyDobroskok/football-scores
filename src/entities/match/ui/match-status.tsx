import { cn } from '@shared/utils';

import { matchShortStatuses } from '../lib/match-statuses';
import { Periods, Status } from '../model/types';

export interface MatchStatusProps {
  matchStatus: Status;
  periods: Periods;
}

export function MatchStatus({ matchStatus, periods }: MatchStatusProps) {
  const matchInProgress =
    matchStatus.short === matchShortStatuses['1H'] ||
    matchStatus.short === matchShortStatuses['2H'] ||
    matchStatus.short === matchShortStatuses.ET;

  const shownStatus = matchInProgress
    ? `${matchStatus.elapsed}'`
    : matchStatus.short;

  return (
    <span
      className={cn('text-secondary-foreground', {
        'animate-pulse': matchInProgress,
      })}
    >
      {shownStatus}
    </span>
  );
}
