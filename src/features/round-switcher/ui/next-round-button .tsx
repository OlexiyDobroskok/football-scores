'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { type Round } from '@entities/round';
import {
  appSearchParams,
  useCreateSearchQuery,
} from '@shared/config/search-params';
import { Icon } from '@shared/ui/icon';

export interface NextRoundButtonProps {
  nextRound: Round;
}

export function NextRoundButton({ nextRound }: NextRoundButtonProps) {
  const pathname = usePathname();
  const createSearchQuery = useCreateSearchQuery();

  const searchQuery = createSearchQuery({
    name: appSearchParams.ROUND,
    value: nextRound,
  });
  const href = pathname + searchQuery;

  return (
    <Link href={href} aria-label={nextRound}>
      <Icon type="common" name="arrowNext" size="medium" />
    </Link>
  );
}
