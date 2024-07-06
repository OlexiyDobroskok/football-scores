import {
  getCountryFlag,
  getLeagueLogo,
  type LeaguesDTO,
} from '@shared/api/football-api';

import type { League, LeagueSeason } from '../model/types';

export const mapLeague = (leagueDto: LeaguesDTO): League => {
  const { league, country, seasons } = leagueDto;
  const leagueLogo = getLeagueLogo(league.id);
  const countryFlag = country.code ? getCountryFlag(country.code) : null;
  const currentSeasonDTO = seasons.find((season) => season.current);
  const currentSeason: LeagueSeason | null = currentSeasonDTO
    ? { ...currentSeasonDTO, year: currentSeasonDTO.year.toString() }
    : null;

  return {
    id: league.id.toString(),
    type: league.type,
    name: league.name,
    logo: leagueLogo,
    country: {
      name: country.name,
      code: country.code,
      flag: countryFlag,
    },
    currentSeason,
    seasons: seasons
      .map((season) => ({
        year: season.year.toString(),
        start: season.start,
        end: season.end,
        current: season.current,
      }))
      .toSorted(
        (prevSeason, nextSeason) =>
          Number(nextSeason.year) - Number(prevSeason.year),
      ),
  };
};
