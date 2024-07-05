'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { type LeagueSeason } from '@entities/league';
import {
  appSearchParams,
  useAppSearchParams,
  useCreateSearchQuery,
} from '@shared/config/search-params';
import { Icon } from '@shared/ui/icon';

export function SeasonSwitcher({ seasons }: { seasons: LeagueSeason[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { season: seasonQuery } = useAppSearchParams();
  const createSearchQuery = useCreateSearchQuery();
  const [isOpen, setIsOpen] = React.useState(false);

  const creteSeasonName = (startDate: string, endDate: string): string => {
    const seasonStartDate = new Date(startDate);
    const seasonEndDate = new Date(endDate);

    return `${seasonStartDate.getFullYear()}-${seasonEndDate.getFullYear()}`;
  };

  const currentSeason = seasonQuery
    ? seasons.find((season) => season.year === seasonQuery)
    : seasons.find((season) => season.current);

  if (!currentSeason) {
    throw new Error('Current season not found');
  }

  React.useEffect(() => {
    if (!seasonQuery) {
      const searchQuery = createSearchQuery({
        name: appSearchParams.SEASON,
        value: currentSeason.year,
      });
      const href = pathname + searchQuery;
      router.push(href);
    }
  }, []);

  const changeSeason = (season: string) => {
    const searchQuery = createSearchQuery({
      name: appSearchParams.SEASON,
      value: season,
    });
    const href = pathname + searchQuery;
    router.push(href);
    setIsOpen(false);
  };

  const seasonList = seasons.map((season) => {
    const seasonName = creteSeasonName(season.start, season.end);
    return (
      <li
        className="px-2 py-1 text-center shadow-md hover:bg-accent"
        key={season.year}
        onClick={() => changeSeason(season.year)}
      >
        {seasonName}
      </li>
    );
  });

  const currentSeasonName = creteSeasonName(
    currentSeason.start,
    currentSeason.end,
  );

  const toggleSwitcher = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="relative bg-secondary">
      <button
        className="flex items-center gap-2 px-7 py-1"
        onClick={toggleSwitcher}
      >
        <span>{currentSeasonName}</span>
        <div className="absolute right-1">
          <Icon
            type="common"
            name={isOpen ? 'arrowUp' : 'arrowDown'}
            size="small"
          />
        </div>
      </button>
      {isOpen && (
        <div className="overflow-hidden">
          <ul className="scrollbar-hidden absolute left-0 right-0 h-[30svh] overflow-y-auto bg-secondary pb-2 first:border-t-2 first:border-t-primary">
            {seasonList}
          </ul>
        </div>
      )}
    </div>
  );
}
