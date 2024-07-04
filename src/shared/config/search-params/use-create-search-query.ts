'use client';

import { useSearchParams } from 'next/navigation';

interface SearchParam {
  name: string;
  value: string;
}

type CreateSearchQuery = (...args: SearchParam[]) => string;

export const useCreateSearchQuery = (): CreateSearchQuery => {
  const searchParams = useSearchParams().toString();

  return (...args: SearchParam[]) => {
    const params = new URLSearchParams(searchParams);
    args.forEach(({ name, value }) => params.set(name, value));

    return `?${params.toString()}`;
  };
};
