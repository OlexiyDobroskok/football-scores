'use client';

import { useSearchParams } from 'next/navigation';

type SearchParam =
  | {
      name: string;
      value: string;
    }
  | {
      name: string;
      clear: boolean;
    };

type CreateSearchQuery = (...params: SearchParam[]) => string;

export const useCreateSearchQuery = (): CreateSearchQuery => {
  const currentSearchParams = useSearchParams().toString();

  return (...params: SearchParam[]) => {
    const searchParams = new URLSearchParams(currentSearchParams);
    params.forEach((param) => {
      'clear' in param
        ? searchParams.delete(param.name)
        : searchParams.set(param.name, param.value);
    });

    return `?${searchParams.toString()}`;
  };
};
