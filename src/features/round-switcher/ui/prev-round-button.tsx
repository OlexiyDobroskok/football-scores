'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { type Round } from '@entities/round';
import {
  appSearchParams,
  useCreateSearchQuery,
} from '@shared/config/search-params';
import { Icon } from '@shared/ui/icon';

export interface PrevRoundButtonProps {
  prevRound: Round;
}

export function PrevRoundButton({ prevRound }: PrevRoundButtonProps) {
  const pathname = usePathname();
  const createSearchQuery = useCreateSearchQuery();

  const searchQuery = createSearchQuery({
    name: appSearchParams.ROUND,
    value: prevRound,
  });
  const href = pathname + searchQuery;

  return (
    <Link href={href} aria-label={prevRound}>
      <Icon type="common" name="arrowPrev" size="medium" />
    </Link>
  );
}
