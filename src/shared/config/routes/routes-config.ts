export const appRoutes = {
  HOME: '/',
  EXPLORE: '/explore',
  MATCH: '/match',
} as const;

export type Routes = (typeof appRoutes)[keyof typeof appRoutes];
