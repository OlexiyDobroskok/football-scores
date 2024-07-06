import Image from 'next/image';
import { Suspense } from 'react';

import { getLeagueInformation } from '@entities/league';
import { MatchweekSwitcher } from '@features/matchweek-switcher';
import { SeasonSwitcher } from '@features/season-switcher';
import {
  type AppSearchParams,
  defaultLeague,
} from '@shared/config/search-params';
import { MobileLeaguesNavigation } from '@widgets/leagues-navigation';

export default async function Home({
  searchParams,
}: {
  searchParams: AppSearchParams;
}) {
  const { league: leagueId, season, mw: chosenMatchweek } = searchParams;

  const league = await getLeagueInformation(leagueId ?? defaultLeague);

  if (!league) {
    throw new Error('League not found');
  }

  const selectedSeason = season
    ? league.seasons.find(
        (seasonInformation) => seasonInformation.year === season,
      )
    : league.currentSeason;

  if (!selectedSeason) {
    throw new Error('Season not found');
  }

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
      <main>
        <div className="flex justify-center pt-4">
          <Suspense fallback={<div>Loading...</div>}>
            <MatchweekSwitcher
              leagueId={leagueId ?? defaultLeague}
              season={selectedSeason.year}
              chosenMatchweek={chosenMatchweek}
            />
          </Suspense>
        </div>
      </main>
    </>
  );
}
