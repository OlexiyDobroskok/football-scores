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
    <li className="relative bg-secondary px-2 shadow-md shadow-primary">
      {children}
      <Link
        className="absolute inset-0"
        href={`${appRoutes.MATCH}/${matchId}`}
        aria-label={`Go to ${homeTeamName} vs ${awayTeamName} match information`}
      />
    </li>
  );
}
