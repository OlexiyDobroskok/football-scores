'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  appSearchParams,
  useCreateSearchQuery,
} from '@shared/config/search-params';
import { Icon } from '@shared/ui/icon';

export interface NextMatchweekButtonProps {
  selectedMatchweek: number;
  latestMatchweek: number;
}

export function NextMatchweekButton({
  selectedMatchweek,
  latestMatchweek,
}: NextMatchweekButtonProps) {
  const pathname = usePathname();
  const createSearchQuery = useCreateSearchQuery();

  const nextMatchweek =
    selectedMatchweek < latestMatchweek
      ? selectedMatchweek + 1
      : latestMatchweek;

  const searchQuery = createSearchQuery({
    name: appSearchParams.MATCHWEEK,
    value: nextMatchweek.toString(),
  });
  const href = pathname + searchQuery;

  return (
    <Link href={href} aria-label={`Matchweek - ${nextMatchweek}`}>
      <Icon type="common" name="arrowNext" size="medium" />
    </Link>
  );
}
