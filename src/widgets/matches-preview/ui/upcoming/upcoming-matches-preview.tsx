import {
  MatchPreview,
  matchShortStatuses,
  MatchStartTime,
} from '@entities/match';
import { getCurrentRound } from '@entities/round';
import { Message } from '@shared/ui/message';

import { getUpcomingMatches } from '../../api/get-matches';
import { DateListItem } from '../date-list-item';
import { MatchListItem } from '../match-list-item';
import { PreviewSection } from '../preview-section';

export interface UpcomingMatchesPreviewProps {
  leagueId: string;
  season: string;
  round: string;
}

export async function UpcomingMatchesPreview({
  leagueId,
  round,
  season,
}: UpcomingMatchesPreviewProps) {
  const upcomingMatches = await getUpcomingMatches({
    league:leagueId,
    round,
    season,
  });

  if (!upcomingMatches.length) {
    return (
      <Message>
        Sorry, no upcoming matches or matches will be added later!
      </Message>
    );
  }

  const upcomingMatchList = upcomingMatches.map((matchesByDay) => {
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
              <MatchStartTime
                date={match.date}
                isTBDStatus={match.status.short === matchShortStatuses.TBD}
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
      matchesListSlot={upcomingMatchList}
    />
  );
}
