import Link from 'next/link';

import { MatchPreview, matchShortStatuses } from '@entities/match';
import { getCurrentRound } from '@entities/round';
import { appRoutes } from '@shared/config/routes';
import { Message } from '@shared/ui/message';

import { getUpcomingMatches } from '../../api/get-matches';

import { MatchTime } from './match-time';

export interface UpcomingMatchesPreviewProps {
  league: string;
  season: string;
  round: string | null;
}

export async function UpcomingMatchesPreview({
  league,
  round,
  season,
}: UpcomingMatchesPreviewProps) {
  const currentRound = round
    ? round
    : await getCurrentRound({ league, season });

  if (!currentRound) {
    throw new Error('Round not found');
  }

  const upcomingMatches = await getUpcomingMatches({
    league,
    round: currentRound,
    season,
  });

  if (!upcomingMatches.length) {
    return (
      <Message>
        Sorry, no upcoming matches or matches will be added later!
      </Message>
    );
  }

  const matchesList = upcomingMatches.map((matchesByDay) => {
    const { matches, matchDate, dateTimeAttr } = matchesByDay;
    const matchesList = matches.map((match) => (
      <li
        className="relative bg-secondary px-2 shadow-md shadow-primary"
        key={match.id}
      >
        <MatchPreview
          match={match}
          matchInformationSlot={
            <div className="flex min-h-8 w-full rounded-md bg-primary px-2 py-1 text-primary-foreground">
              <MatchTime
                date={match.date}
                isTBDStatus={match.status.short === matchShortStatuses.TBD}
              />
            </div>
          }
        />
        <Link
          className="absolute inset-0"
          href={`${appRoutes.MATCH}/${match.id}`}
          aria-label={`Go to ${match.teams.home.name} vs ${match.teams.away.name} match information`}
        />
      </li>
    ));

    return (
      <li className="text-center" key={matchDate}>
        <time
          className="text-2xl font-medium text-primary-foreground/50"
          dateTime={dateTimeAttr}
        >
          {matchDate}
        </time>
        <ul className="pt-3">{matchesList}</ul>
      </li>
    );
  });

  return (
    <section className="px-2 py-3">
      <h3 className="hidden">Upcoming matches</h3>
      <ul className="flex flex-col gap-3">{matchesList}</ul>
    </section>
  );
}
