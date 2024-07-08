import { matchShortStatuses } from '../lib/match-statuses';
import { type Goals, type MatchShortStatus } from '../model/types';

export interface MatchScoreBoardProps {
  goals: Goals;
  penaltyGoals: Goals | null;
  matchShortStatus: MatchShortStatus;
}

export function MatchScoreBoard({
  goals,
  penaltyGoals,
  matchShortStatus,
}: MatchScoreBoardProps) {
  const withPenalty =
    matchShortStatus === matchShortStatuses.PEN ||
    matchShortStatus === matchShortStatuses.P;

  return (
    <div
      className={
        withPenalty ? 'flex flex-col items-center justify-center gap-0.5' : ''
      }
    >
      <div className="flex gap-2">
        <span className="text-xl">{goals.home ?? 0}</span>
        <span>:</span>
        <span className="text-xl">{goals.away ?? 0}</span>
      </div>
      {withPenalty && (
        <span className="text-sm">
          {`(${penaltyGoals?.home ?? 0}:${penaltyGoals?.away ?? 0})`}
        </span>
      )}
    </div>
  );
}
