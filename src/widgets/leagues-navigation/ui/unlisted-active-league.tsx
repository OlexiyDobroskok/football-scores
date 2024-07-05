import React from 'react';

import { type League } from '@entities/league';

import { staticLeagues } from '../model/navigation-data';

import { NavItem } from './nav-item';

export function UnlistedActiveLeague({ league }: { league: League }) {
  const isDefaultLeague = staticLeagues.find(
    (defaultLeague) => defaultLeague.id === league.id,
  );

  return isDefaultLeague ? <></> : <NavItem league={league} />;
}
