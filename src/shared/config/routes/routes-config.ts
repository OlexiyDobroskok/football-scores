export const appRoutes = {
  HOME: '/',
  EXPLORE: '/explore',
  MATCH: '/match',
  TEAM: '/team',
} as const;

export type Routes = (typeof appRoutes)[keyof typeof appRoutes];
