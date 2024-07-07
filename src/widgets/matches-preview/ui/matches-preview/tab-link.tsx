'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import {
  appSearchParams,
  useCreateSearchQuery,
} from '@shared/config/search-params';

export interface TabLinkProps {
  children: React.ReactNode;
  status: string;
  className?: string;
}

export function TabLink({ status, className, children }: TabLinkProps) {
  const pathname = usePathname();
  const createSearchQuery = useCreateSearchQuery();
  const searchQuery = createSearchQuery({
    name: appSearchParams.MATCHES_STATUS,
    value: status,
  });
  const href = pathname + searchQuery;

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
