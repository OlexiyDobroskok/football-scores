import { type LeagueType, leagueTypes } from '@entities/league';
import { type Round } from '@entities/round';

import { NextRoundButton } from './next-round-button ';
import { PrevRoundButton } from './prev-round-button';

export interface RoundSwitcherProps {
  selectedRound:Round;
  rounds: Round[];
  leagueType: LeagueType;  
}

const getRoundNumber = (round: string): Round => {
  return round.split(' ').at(-1)!;
};

export async function RoundSwitcher({rounds,selectedRound,leagueType,
 
}: RoundSwitcherProps) {
  const firstRound = rounds.at(0)!;
  const lastRound = rounds.at(-1)!;

  const switcherTitle =
    leagueType === leagueTypes.LEAGUE
      ? `Matchweek ${getRoundNumber(selectedRound)}`
      : selectedRound;

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
      <p className="text-lg font-medium">{switcherTitle}</p>
      <div>
        <NextRoundButton nextRound={nextRound} />
      </div>
    </div>
  );
}
