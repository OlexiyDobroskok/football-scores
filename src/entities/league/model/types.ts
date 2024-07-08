export const leagueTypes = {
  LEAGUE: 'League',
  CUP: 'Cup',
} as const;

export type LeagueType = (typeof leagueTypes)[keyof typeof leagueTypes];

export interface League {
  id: string;
  name: string;
  logo: string;
  type: LeagueType;
  country: Country;
  currentSeason: LeagueSeason | null;
  seasons: LeagueSeason[];
}

interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}

export interface LeagueSeason {
  year: string;
  start: string;
  end: string;
  current: boolean;
}
