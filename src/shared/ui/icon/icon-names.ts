export const commonIcons = {
  LOADER: 'loader',
  SEARCH: 'search',
  ARROW_UP: 'arrowUp',
  ARROW_DOWN: 'arrowDown',
  ARROW_PREV: 'arrowPrev',
  ARROW_NEXT: 'arrowNext',
  HOME: 'home',
  FAVORITE: 'favorite',
  USER: 'user',
} as const;

export type CommonIcons = (typeof commonIcons)[keyof typeof commonIcons];
