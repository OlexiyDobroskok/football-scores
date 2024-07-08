import Image from 'next/image';
import { Suspense } from 'react';

import { getLeagueInformation } from '@entities/league';
import { SeasonSwitcher } from '@features/season-switcher';
import {
  type AppSearchParams,
  defaultLeague,
} from '@shared/config/search-params';
import { MobileLeaguesNavigation } from '@widgets/leagues-navigation';
import { MatchesPreview } from '@widgets/matches-preview';

export default async function Home({
  searchParams,
}: {
  searchParams: AppSearchParams;
}) {
  const {
    league: leagueQuery,
    season: seasonQuery,
    mr: matchRoundQuery,
    ms: matchesStatusQuery,
  } = searchParams;

  const leagueId = leagueQuery ?? defaultLeague;
  const league = await getLeagueInformation(leagueId);

  if (!league) {
    throw new Error('League not found');
  }

  const selectedSeason = seasonQuery
    ? league.seasons.find(
        (seasonInformation) => seasonInformation.year === seasonQuery,
      )
    : league.currentSeason;

  if (!selectedSeason) {
    throw new Error('Season not found');
  }

  const isFinishedSeason =
    !!seasonQuery && seasonQuery !== league.currentSeason?.year;

  return (
    <>
      <header className="space-y-2">
        <div>
          <MobileLeaguesNavigation league={league} />
        </div>
        {league && (
          <div className="flex items-center bg-primary px-4 text-primary-foreground">
            {league.country.flag && (
              <Image
                src={league.country.flag}
                alt={`${league.country.name} flag`}
                width={24}
                height={24}
              />
            )}
            <p className="px-2">{league.country.name}</p>
            <div className="ml-auto flex items-center gap-4">
              <span>Season:</span>
              <SeasonSwitcher
                seasons={league.seasons}
                selectedSeason={selectedSeason}
              />
            </div>
          </div>
        )}
      </header>
      <main className="px-5">
        <div className="pt-4">
          <Suspense fallback={<div>Loading...</div>}>
            <MatchesPreview
              leagueId={leagueId}
              season={selectedSeason.year}
              leagueType={league.type}
              leagueName={league.name}
              roundQuery={matchRoundQuery}
              matchStatusQuery={matchesStatusQuery}
              isFinishedSeason={isFinishedSeason}
            />
          </Suspense>
        </div>
      </main>
    </>
  );
}
