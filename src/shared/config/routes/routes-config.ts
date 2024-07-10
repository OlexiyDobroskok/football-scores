export const appRoutes = {
  HOME: '/',
  EXPLORE: '/explore',
  MATCH: '/match',
  TEAM: '/team',
  FAVORITE: '/favorite',
  PROFILE: '/profile',
} as const;

export type Routes = (typeof appRoutes)[keyof typeof appRoutes];
