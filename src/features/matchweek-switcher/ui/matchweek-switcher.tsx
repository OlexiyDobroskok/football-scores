import {
  getCurrentMatchweek,
  getLeagueMatchweeks,
} from '../api/get-league-matchweeks';

import { NextMatchweekButton } from './next-matchweek-button ';
import { PrevMatchweekButton } from './prev-matchweek-button';

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
  const matchweeksData = getLeagueMatchweeks({ league: leagueId, season });
  const currentLeagueMatchweekData = getCurrentMatchweek({
    league: leagueId,
    season,
  });

  const [matchweeks, currentLeagueMatchweek] = await Promise.all([
    matchweeksData,
    currentLeagueMatchweekData,
  ]);

  if (!matchweeks) {
    return <></>;
  }

  const latestMatchweek = Math.max(...matchweeks);
  const selectedMatchweek = chosenMatchweek
    ? +chosenMatchweek
    : currentLeagueMatchweek
      ? currentLeagueMatchweek
      : 1;

  return (
    <div className="flex items-center gap-6 px-4 py-2 text-primary-foreground">
      <div>
        <PrevMatchweekButton selectedMatchweek={selectedMatchweek} />
      </div>
      <p className="text-lg font-medium">Matchweek {selectedMatchweek}</p>
      <div>
        <NextMatchweekButton
          latestMatchweek={latestMatchweek}
          selectedMatchweek={selectedMatchweek}
        />
      </div>
    </div>
  );
}
