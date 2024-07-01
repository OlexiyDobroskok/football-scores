export const routes = {
  HOME: '/',
  EXPLORE: '/explore',
} as const;

export type Routes = typeof routes[keyof typeof routes];



