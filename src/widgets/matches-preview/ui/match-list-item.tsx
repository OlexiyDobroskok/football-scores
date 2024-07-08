import Link from 'next/link';
import React from 'react';

import { appRoutes } from '@shared/config/routes';

export interface MatchListItemProps {
  homeTeamName: string;
  awayTeamName: string;
  matchId: string;
  children: React.ReactNode;
}

export function MatchListItem({
  matchId,
  homeTeamName,
  awayTeamName,
  children,
}: MatchListItemProps) {
  return (
    <li className="relative bg-secondary/30 px-2 shadow-sm shadow-secondary/50">
      {children}
      <Link
        className="absolute inset-0"
        href={`${appRoutes.MATCH}/${matchId}`}
        aria-label={`Go to ${homeTeamName} vs ${awayTeamName} match information`}
      />
    </li>
  );
}
