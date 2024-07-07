import { getCurrentRound, getRounds } from '@entities/round';

import { type Matchweek } from '../model/types';

import { NextMatchweekButton } from './next-matchweek-button ';
import { PrevMatchweekButton } from './prev-matchweek-button';

const getRoundNumber = (round: string): Matchweek => {
  return +round.split(' ').at(-1)!;
};

export interface MatchweekSwitcherProps {
  leagueId: string;
  season: string;
  chosenMatchweek: string | null;
}

export async function MatchweekSwitcher({
  leagueId,
  season,
  chosenMatchweek,
}: MatchweekSwitcherProps) {
  const matchweeksData = getRounds({ league: leagueId, season });
  const currentLeagueMatchweekData = getCurrentRound({
    league: leagueId,
    season,
  });

  const [matchweeks, currentLeagueMatchweek] = await Promise.all([
    matchweeksData,
    currentLeagueMatchweekData,
  ]);

  if (!matchweeks.length) {
    return <></>;
  }
  const matchweekNumbers = matchweeks.map((matchweek) =>
    getRoundNumber(matchweek),
  );
  const currentMatchweekNumber = currentLeagueMatchweek
    ? getRoundNumber(currentLeagueMatchweek)
    : 1;

  const latestMatchweek = Math.max(...matchweekNumbers);
  const selectedMatchweek = chosenMatchweek
    ? +chosenMatchweek
    : currentMatchweekNumber;

  return (
    <div className="flex items-center gap-6 px-4 py-2 text-primary-foreground">
      <div className="rounded px-4 py-1 active:bg-accent">
        <PrevMatchweekButton selectedMatchweek={selectedMatchweek} />
      </div>
      <p className="text-lg font-medium">Matchweek {selectedMatchweek}</p>
      <div className="rounded px-4 py-1 active:bg-accent">
        <NextMatchweekButton
          latestMatchweek={latestMatchweek}
          selectedMatchweek={selectedMatchweek}
        />
      </div>
    </div>
  );
}
