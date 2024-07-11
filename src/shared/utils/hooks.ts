'use client';

import React from 'react';

export const useIsClient = (): boolean => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

const scrollDirections = {
  UP: 'up',
  DOWN: 'down',
  IDLE: 'idle',
} as const;

export type ScrollDirection =
  (typeof scrollDirections)[keyof typeof scrollDirections];

export const useScrollDirection = (): {
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  scrollDirection: ScrollDirection;
} => {
  const [scrollDirection, setScrollDirection] = React.useState<ScrollDirection>(
    scrollDirections.IDLE,
  );
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const direction =
        currentScrollY > lastScrollY.current
          ? scrollDirections.DOWN
          : scrollDirections.UP;

      setScrollDirection(direction);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return {
    isScrollingUp: scrollDirection === scrollDirections.UP,
    isScrollingDown: scrollDirection === scrollDirections.DOWN,
    scrollDirection,
  };
};
