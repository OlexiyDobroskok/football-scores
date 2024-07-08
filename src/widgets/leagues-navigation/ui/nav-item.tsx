'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  appSearchParams,
  useAppSearchParams,
  useCreateSearchQuery,
} from '@shared/config/search-params';
import { cn } from '@shared/utils';

import { type NavLeague } from '../model/navigation-data';

export function NavItem({ league }: { league: NavLeague }) {
  const pathname = usePathname();
  const createSearchQuery = useCreateSearchQuery();
  const { league: currentLeagueId } = useAppSearchParams();

  const { id, logo, name } = league;
  const searchQuery = createSearchQuery(
    {
      name: appSearchParams.LEAGUE,
      value: id,
    },
    { name: appSearchParams.ROUND, clear: true },
    { name: appSearchParams.MATCHES_STATUS, clear: true },
  );
  const href = pathname + searchQuery;
  const isActive = currentLeagueId === id;

  return (
    <li
      className={cn('min-w-14 p-2 transition-all', {
        'min-w-36 flex-1 bg-accent': isActive,
      })}
    >
      <Link
        className={cn(
          'inline-flex h-full w-full items-center justify-center text-sm text-primary-foreground',
          { 'gap-2': isActive },
        )}
        href={href}
        aria-label={isActive ? '' : `Go to ${name}`}
      >
        <Image src={logo} alt={`${name} logo`} width={24} height={24} />
        <span className={cn('line-clamp-2 w-0', { 'w-auto': isActive })}>
          {name}
        </span>
      </Link>
    </li>
  );
}
