'use server';

import { revalidateTag } from 'next/cache';

import { MATCHES_KEY } from './get-matches';

export const revalidateMatches = () => {
  revalidateTag(MATCHES_KEY);
};
