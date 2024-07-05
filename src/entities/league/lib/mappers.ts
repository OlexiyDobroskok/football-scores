import {
  getCountryFlag,
  getLeagueLogo,
  type LeaguesDTO,
} from '@shared/api/football-api';

import { type League } from '../model/types';

export const mapLeague = (leagueDto: LeaguesDTO): League => {
  const { league, country, seasons } = leagueDto;
  const leagueLogo = getLeagueLogo(league.id);
  const countryFlag = country.code ? getCountryFlag(country.code) : null;
  
  return {
    id: league.id.toString(),
    name: league.name,
    logo: leagueLogo,
    country: {
      name: country.name,
      code: country.code,
      flag: countryFlag,
    },
    seasons: seasons.map((season) => ({
      year: season.year.toString(),
      start: season.start,
      end: season.end,
      current: season.current,
    })),
  };
};
