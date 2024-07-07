import Image from 'next/image';
import { Suspense } from 'react';

import { getLeagueInformation, leagueType } from '@entities/league';
import { MatchweekSwitcher } from '@features/matchweek-switcher';
import { RoundSwitcher } from '@features/round-switcher';
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
    league: leagueId,
    season,
    mw: chosenMatchweek,
    ms: matchesStatus,
  } = searchParams;
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
  
  const isCup = league.type === leagueType.CUP;
  const isLeague = league.type === leagueType.LEAGUE;
  const roundQuery = isLeague && chosenMatchweek
    ? `Regular Season - ${chosenMatchweek}`
    : chosenMatchweek

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
          <div>
            <MatchesPreview
              league={leagueId ?? defaultLeague}
              season={selectedSeason.year}
              round={roundQuery}
              selectedMatchesStatus={matchesStatus}
              roundSwitcherSlot={
                <Suspense fallback={<div>Loading...</div>}>
                  {isCup ? (
                    <RoundSwitcher
                      leagueId={leagueId ?? defaultLeague}
                      season={selectedSeason.year}
                      chosenRound={chosenMatchweek}
                    />
                  ) : (
                    <MatchweekSwitcher
                      leagueId={leagueId ?? defaultLeague}
                      season={selectedSeason.year}
                      chosenMatchweek={chosenMatchweek}
                    />
                  )}
                </Suspense>
              }
            />
          </div>
        </div>
      </main>
    </>
  );
}
