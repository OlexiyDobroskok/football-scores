import React from 'react';

import { type League } from '@entities/league';

import { leagues } from '../model/navigation-data';

import { NavItem } from './nav-item';

export function UnlistedActiveLeague({
  leagueData,
}: {
  leagueData: Promise<League | null>;
}) {
  const league = React.use(leagueData);

  if (!league) {
    return <></>;
  }

  const isDefaultLeague = leagues.find(
    (defaultLeague) => defaultLeague.id === league.id,
  );

  return isDefaultLeague ? <></> : <NavItem league={league} />;
}
