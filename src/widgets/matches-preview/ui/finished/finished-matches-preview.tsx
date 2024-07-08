import { MatchPreview, MatchScoreBoard } from '@entities/match';
import { Message } from '@shared/ui/message';

import { getFinishedMatches } from '../../api/get-matches';
import { DateListItem } from '../date-list-item';
import { MatchListItem } from '../match-list-item';
import { PreviewSection } from '../preview-section';

export interface FinishedMatchesPreviewProps {
  leagueId: string;
  season: string;
  round: string;
}

export async function FinishedMatchesPreview({
  leagueId,
  round,
  season,
}: FinishedMatchesPreviewProps) {
  const finishedMatches = await getFinishedMatches({
    league: leagueId,
    round,
    season,
  });

  if (!finishedMatches.length) {
    return (
      <Message>
        Sorry, the&nbsp;matches are still going&nbsp;on or haven&apos;t started
        yet!
      </Message>
    );
  }

  const finishedMatchList = finishedMatches.map((matchesByDay) => {
    const { matches, matchDate, dateTimeAttr } = matchesByDay;
    const matchList = matches.map((match) => (
      <MatchListItem
        key={match.id}
        matchId={match.id}
        homeTeamName={match.teams.home.name}
        awayTeamName={match.teams.away.name}
      >
        <MatchPreview
          match={match}
          matchInformationSlot={
            <div className="flex min-h-8 w-full rounded-md bg-primary px-2 py-1 text-primary-foreground">
              <MatchScoreBoard
                goals={match.goals}
                penaltyGoals={match.score.penalty}
                matchShortStatus={match.status.short}
              />
            </div>
          }
        />
      </MatchListItem>
    ));

    return (
      <DateListItem
        key={matchDate}
        matchDate={matchDate}
        dateTimeAttr={dateTimeAttr}
        matchesListSlot={matchList}
      />
    );
  });

  return (
    <PreviewSection
      title="Upcoming Matches"
      matchesListSlot={finishedMatchList}
    />
  );
}
