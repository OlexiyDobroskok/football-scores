import { matchShortStatuses } from '../lib/match-statuses';

export type MatchShortStatus =
  (typeof matchShortStatuses)[keyof typeof matchShortStatuses];

interface Periods {
  first: number | null;
  second: number | null;
}

interface Venue {
  id: string | null;
  name: string | null;
  city: string | null;
}

interface Status {
  long: string;
  short: MatchShortStatus;
  elapsed: number | null;
}

interface Team {
  id: string;
  name: string;
  logo: string;
  winner: boolean | null;
}

interface Teams {
  home: Team;
  away: Team;
}

interface Goals {
  home: number | null;
  away: number | null;
}

interface Score {
  halftime: Goals;
  fulltime: Goals;
  extratime: Goals | null;
  penalty: Goals | null;
}

export interface Match {
  id: string;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: Periods;
  venue: Venue;
  status: Status;
  teams: Teams;
  goals: Goals;
  score: Score;
}