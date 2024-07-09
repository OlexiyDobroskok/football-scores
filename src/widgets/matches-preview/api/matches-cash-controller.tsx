'use client';

import React from 'react';

import { revalidateMatches } from './revalidate-matches-action';

export interface MatchesCashControllerProps {
  isLive: boolean;
}

export function MatchesCashController({ isLive }: MatchesCashControllerProps) {
  const intervalId = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (isLive) {
      revalidateMatches();
      intervalId.current = window.setInterval(revalidateMatches, 30000);
    }

    return () => {
      if (intervalId.current) {
        window.clearInterval(intervalId.current);
      }
    };
  }, [isLive]);

  return <></>;
}
