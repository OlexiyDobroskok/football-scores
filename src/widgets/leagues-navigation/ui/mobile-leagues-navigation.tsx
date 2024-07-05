import React from 'react';

import { leagues } from '../model/navigation-data';

import { NavItem } from './nav-item';

export function MobileLeaguesNavigation({
  untrackedLeagueSlot,
}: {
  untrackedLeagueSlot?: React.ReactNode;
}) {
  const navigationList = leagues.map((league) => (
    <NavItem key={league.id} league={league} />
  ));

  return (
    <nav className="overflow-hidden">
      <ul className="scrollbar-hidden flex overflow-x-scroll bg-secondary">
        {untrackedLeagueSlot}
        {navigationList}
      </ul>
    </nav>
  );
}
