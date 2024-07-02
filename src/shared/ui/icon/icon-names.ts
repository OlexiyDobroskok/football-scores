export const commonIcons = {
  LOADER: 'loader',
} as const

export type CommonIcons = typeof commonIcons[keyof typeof commonIcons]