import { type Match, MatchPreview, MatchScoreBoard, MatchStatus } from '@entities/match';
import { Message } from '@shared/ui/message';

import { getLiveMatches } from '../../api/get-matches';
import { MatchListItem } from '../match-list-item';
import { PreviewSection } from '../preview-section';

export interface LiveMatchesPreviewProps {
  liveMatches: Match[];
}

export function LiveMatchesPreview({
 liveMatches
}: LiveMatchesPreviewProps) {
  
  if (!liveMatches.length) {
    return <Message>Sorry, the&nbsp;matches haven&apos;t started yet!</Message>;
  }

  const liveMatchList = liveMatches.map((match) => (
    <MatchListItem
      key={match.id}
      matchId={match.id}
      homeTeamName={match.teams.home.name}
      awayTeamName={match.teams.away.name}
    >
      <MatchPreview
        match={match}
        matchInformationSlot={
          <div className="relative flex min-h-8 w-full flex-col items-center rounded-md bg-primary px-2 py-1 text-primary-foreground">
            <MatchScoreBoard
              goals={match.goals}
              penaltyGoals={match.score.penalty}
              matchShortStatus={match.status.short}
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
              <MatchStatus matchStatus={match.status} periods={match.periods} />
            </div>
          </div>
        }
      />
    </MatchListItem>
  ));

  return (
    <PreviewSection title="Live Matches" matchesListSlot={liveMatchList} />
  );
}
