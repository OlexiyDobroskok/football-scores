import { type FixtureDTO, getTeamLogo } from '@shared/api/football-api';

import { type Match } from '../model/types';

export const mapMatch = (fixtureDTO: FixtureDTO): Match => {
  const { fixture, goals, league, teams, score } = fixtureDTO;

  return {
    id: fixture.id.toString(),
    date: fixture.date,
    referee: fixture.referee,
    timestamp: fixture.timestamp,
    timezone: fixture.timezone,
    status: {
      long: fixture.status.long,
      short: fixture.status.short,
      elapsed: fixture.status.elapsed,
    },
    periods: {
      first: fixture.periods.first,
      second: fixture.periods.second,
    },
    venue: {
      id: fixture.venue.id ? fixture.venue.id.toString() : null,
      name: fixture.venue.name,
      city: fixture.venue.city,
    },
    teams: {
      home: {
        id: teams.home.id.toString(),
        name: teams.home.name,
        logo: getTeamLogo(teams.home.id),
        winner: teams.home.winner,
      },
      away: {
        id: teams.away.id.toString(),
        name: teams.away.name,
        logo: getTeamLogo(teams.away.id),
        winner: teams.away.winner,
      },
    },
    goals: {
      home: goals.home,
      away: goals.away,
    },
    score: {
      halftime: {
        home: score.halftime.home,
        away: score.halftime.away,
      },
      fulltime: {
        home: score.fulltime.home,
        away: score.fulltime.away,
      },
      extratime: score.extratime
        ? {
            home: score.extratime.home,
            away: score.extratime.away,
          }
        : null,
      penalty: score.penalty
        ? {
            home: score.penalty.home,
            away: score.penalty.away,
          }
        : null,
    },
  };
};
