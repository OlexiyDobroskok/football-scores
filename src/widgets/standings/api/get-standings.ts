import { footballApiService } from '@shared/api/football-api';

import 'server-only';

import { mapStandings } from '../lib/map-standings';
import { type Standings } from '../model/types';

export const STANDINGS_KEY = 'standings';

export const getLeagueStandings = async ({
  leagueId,
  season,
}: {
  leagueId: string;
  season: string;
}): Promise<Standings[]> => {
  const standings = await footballApiService.getStandings(
    {
      league: leagueId,
      season,
    },
    { next: { revalidate: 86400, tags: [STANDINGS_KEY] } },
  );

  return standings ? mapStandings(standings) : [];
};
