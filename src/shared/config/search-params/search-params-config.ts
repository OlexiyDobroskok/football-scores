export const appSearchParams = {
  LEAGUE: 'league',
} as const;

export type AppSearchParam =
  (typeof appSearchParams)[keyof typeof appSearchParams];

export type AppSearchParams = {
  [key in AppSearchParam]: string | null;
};
