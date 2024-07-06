'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  appSearchParams,
  useCreateSearchQuery,
} from '@shared/config/search-params';
import { Icon } from '@shared/ui/icon';

export interface PrevMatchweekButtonProps {
  selectedMatchweek: number;
}

export function PrevMatchweekButton({
  selectedMatchweek,
}: PrevMatchweekButtonProps) {
  const pathname = usePathname();
  const createSearchQuery = useCreateSearchQuery();
  const firstMatchweek = 1;

  const previousMatchweek =
    selectedMatchweek > firstMatchweek ? selectedMatchweek - 1 : firstMatchweek;

  const searchQuery = createSearchQuery({
    name: appSearchParams.MATCHWEEK,
    value: previousMatchweek.toString(),
  });
  const href = pathname + searchQuery;

  return (
    <Link href={href} aria-label={`Matchweek - ${previousMatchweek}`}>
      <Icon type="common" name="arrowPrev" size="medium" />
    </Link>
  );
}
