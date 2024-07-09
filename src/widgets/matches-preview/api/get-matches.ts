import {
  finishedStatusesQuery,
  mapMatch,
  type Match,
  upcomingStatusesQuery,
} from '@entities/match';
import { footballApiService } from '@shared/api/football-api';
import { formatDateTimeAttrDate, shortDate } from '@shared/utils';

import { type MatchesByDate } from '../model/types';

const sortMatchesByDate = (matches: Match[]): MatchesByDate[] => {
  let sortedMatches: MatchesByDate[] = [];
  let tempMatches: MatchesByDate = {
    matchDate: '',
    dateTimeAttr: '',
    matches: [],
  };

  matches.forEach((match, index) => {
    const date = new Date(match.date);
    const formattedDate = shortDate.format(date).replace(/,/g, '');
    const dateTimeAttr = formatDateTimeAttrDate(date);

    if (index === 0 || formattedDate !== tempMatches.matchDate) {
      if (tempMatches.matchDate) {
        sortedMatches.push({ ...tempMatches });
      }

      tempMatches = {
        matchDate: formattedDate,
        dateTimeAttr: dateTimeAttr,
        matches: [match],
      };
    } else {
      tempMatches.matches.push(match);
    }
  });

  if (tempMatches.matchDate) {
    sortedMatches.push(tempMatches);
  }

  return sortedMatches;
};

export const MATCHES_KEY = 'matches';
export const LIVE_MATCHES_KEY = 'live-matches';
export const UPCOMING_MATCHES_KEY = 'upcoming-matches';
export const FINISHED_MATCHES_KEY = 'finished-matches';

export const getLiveMatches = async (params: {
  league: string;
  season: string;
  round: string;
}): Promise<Match[]> => {
  const matches = await footballApiService.getFixtures(
    { ...params, live: 'all' },
    { next: { revalidate: 86400, tags: [LIVE_MATCHES_KEY, MATCHES_KEY] } },
  );

  return matches ? matches.map((matchDTO) => mapMatch(matchDTO)) : [];
};

export const getUpcomingMatches = async (params: {
  league: string;
  season: string;
  round: string;
}): Promise<MatchesByDate[]> => {
  const matchesDTO = await footballApiService.getFixtures(
    {
      ...params,
      status: upcomingStatusesQuery,
    },
    { next: {revalidate: 86400, tags: [UPCOMING_MATCHES_KEY, MATCHES_KEY] } },
  );

  const matches = matchesDTO
    ? matchesDTO.map((matchDTO) => mapMatch(matchDTO))
    : [];

  return sortMatchesByDate(matches);
};

export const getFinishedMatches = async (params: {
  league: string;
  season: string;
  round: string;
}): Promise<MatchesByDate[]> => {
  const matchesDTO = await footballApiService.getFixtures(
    {
      ...params,
      status: finishedStatusesQuery,
    },
    { next: { revalidate: 86400, tags: [FINISHED_MATCHES_KEY, MATCHES_KEY] } },
  );

  const matches = matchesDTO
    ? matchesDTO.map((matchDTO) => mapMatch(matchDTO))
    : [];

  return sortMatchesByDate(matches);
};
