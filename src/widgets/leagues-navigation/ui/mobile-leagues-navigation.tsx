import React from 'react';

import { type League } from '@entities/league';

import { staticLeagues } from '../model/navigation-data';

import { NavItem } from './nav-item';
import { UnlistedActiveLeague } from './unlisted-active-league';

export function MobileLeaguesNavigation({ league }: { league: League | null }) {
  const navigationList = staticLeagues.map((staticLeague) => (
    <NavItem key={staticLeague.id} league={staticLeague} />
  ));

  return (
    <nav className="overflow-hidden">
      <ul className="scrollbar-hidden flex overflow-x-scroll bg-secondary/50">
        {league && <UnlistedActiveLeague league={league} />}
        {navigationList}
      </ul>
    </nav>
  );
}
