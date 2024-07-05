import Image from 'next/image';

import { getLeagueInformation } from '@entities/league';
import { SeasonSwitcher } from '@features/season-switcher';
import {
  type AppSearchParams,
  defaultLeague,
} from '@shared/config/search-params';
import { MobileLeaguesNavigation } from '@widgets/leagues-navigation';

export default async function Home({
  searchParams,
}: {
  searchParams: AppSearchParams;
}) {
  const leagueId = searchParams.league ?? defaultLeague;

  const leagueData = getLeagueInformation(leagueId);

  const [league] = await Promise.all([leagueData]);

  return (
    <header className="space-y-2">
      <div>
        <MobileLeaguesNavigation league={league} />
      </div>
      {league && (
        <div className="flex items-center bg-primary px-4 text-primary-foreground">
          {league.country.flag && (
            <Image
              src={league.country.flag}
              alt={`${league.country.name} flag`}
              width={24}
              height={24}
            />
          )}
          <p className="px-2">{league.country.name}</p>
          <div className="flex gap-4 items-center ml-auto">
            <span>Season:</span>
            <SeasonSwitcher seasons={league.seasons} />
          </div>
        </div>
      )}
    </header>
  );
}
