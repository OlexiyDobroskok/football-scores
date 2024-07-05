import { getLeagueInformation } from '@entities/league';
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
    <header className="">
      <MobileLeaguesNavigation league={league} />
    </header>
  );
}
