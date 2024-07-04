'use client';

import { useSearchParams } from 'next/navigation';

import { type AppSearchParams, appSearchParams } from './search-params-config';

export const useAppSearchParams = (): AppSearchParams => {
  const searchParams = useSearchParams();
  const params = Object.values(appSearchParams);
  const foundSearchParams = {} as AppSearchParams;

  params.forEach((param) => {
    foundSearchParams[param] = searchParams.get(param);
  });

  return foundSearchParams;
};
