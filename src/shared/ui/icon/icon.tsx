import { cn } from '@shared/utils';

import { CommonIcons } from './icon-names';

export const iconSizes = {
  SM: 'small',
  MD: 'medium',
  LG: 'large',
  CUSTOM: 'custom',
} as const;

export type IconSizes = (typeof iconSizes)[keyof typeof iconSizes];

export interface SpritesMap {
  common: CommonIcons;
}

export interface IconProps<Group extends keyof SpritesMap> {
  name: SpritesMap[Group];
  type: Group;
  size?: IconSizes;
  className?: string;
}

export const Icon = <Group extends keyof SpritesMap>({
  type,
  name,
  size = iconSizes.CUSTOM,
  className,
}: IconProps<Group>) => (
  <svg
    className={cn(className, {
      'h-5 w-5': size === iconSizes.SM,
      'h-7 w-7': size === iconSizes.MD,
      'h-9 w-9': size === iconSizes.LG,
    })}
  >
    <use href={`/svg-sprites/${type}.svg#${name}`} />
  </svg>
);
