export const appSearchParams = {
  LEAGUE: 'league',
  SEASON: 'season',
} as const;

export type AppSearchParam =
  (typeof appSearchParams)[keyof typeof appSearchParams];

export type AppSearchParams = {
  [key in AppSearchParam]: string | null;
};

export const defaultLeague = "39"