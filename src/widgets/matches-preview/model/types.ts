import { type Match } from "@entities/match";

export const matchStatuses = {
  UPCOMING: 'upcoming',
  LIVE: 'live',
  FINISHED: 'finished',
} as const;

export type MatchStatus = typeof matchStatuses[keyof typeof matchStatuses];

export interface MatchesByDate {
  matchDate: string;
  dateTimeAttr:string;
  matches: Match[];
}