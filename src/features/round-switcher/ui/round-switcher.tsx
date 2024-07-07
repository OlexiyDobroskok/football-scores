import { getCurrentRound, getRounds } from '@entities/round';

import { NextRoundButton } from './next-round-button ';
import { PrevRoundButton } from './prev-round-button';

export interface RoundSwitcherProps {
  leagueId: string;
  season: string;
  chosenRound: string | null;
}

export async function RoundSwitcher({
  leagueId,
  season,
  chosenRound,
}: RoundSwitcherProps) {
  const roundsData = getRounds({ league: leagueId, season });
  const currentRoundData = getCurrentRound({
    league: leagueId,
    season,
  });

  const [rounds, currentRound] = await Promise.all([
    roundsData,
    currentRoundData,
  ]);

  if (!rounds.length) {
    return <></>;
  }

  const firstRound = rounds.at(0)!;
  const lastRound = rounds.at(-1)!;
  const selectedRound = chosenRound
    ? chosenRound
    : currentRound
      ? currentRound
      : lastRound;

  const selectedRoundIndex = rounds.findIndex(
    (round) => round === selectedRound,
  );

  if (selectedRoundIndex === -1) {
    return <></>;
  }

  const previousRound =
    firstRound === selectedRound ? firstRound : rounds[selectedRoundIndex - 1];
  const nextRound =
    lastRound === selectedRound ? lastRound : rounds[selectedRoundIndex + 1];

  return (
    <div className="flex items-center gap-6 px-4 py-2 text-primary-foreground">
      <div>
        <PrevRoundButton prevRound={previousRound} />
      </div>
      <p className="text-lg font-medium">{selectedRound}</p>
      <div>
        <NextRoundButton nextRound={nextRound} />
      </div>
    </div>
  );
}
