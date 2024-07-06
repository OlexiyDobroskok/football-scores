export const leagueType = {
  LEAGUE: 'League',
  CUP: 'Cup',
} as const;

export type LeagueType = (typeof leagueType)[keyof typeof leagueType];

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
