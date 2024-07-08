import React, { Suspense } from 'react';

import { type LeagueType } from '@entities/league';
import { getCurrentRound, getRounds } from '@entities/round';
import { RoundSwitcher } from '@features/round-switcher';
import { Tab } from '@shared/ui/tab';

import { matchStatuses } from '../../model/types';
import { FinishedMatchesPreview } from '../finished/finished-matches-preview';
import { UpcomingMatchesPreview } from '../upcoming/upcoming-matches-preview';

import { TabLink } from './tab-link';

export interface MatchesPreviewProps {
  matchStatusQuery: PageSearchParam;
  roundQuery: PageSearchParam;
  leagueId: string;
  season: string;
  leagueType: LeagueType;
  leagueName: string;
  isFinishedSeason: boolean;
}

export async function MatchesPreview({
  leagueId,
  roundQuery,
  season,
  matchStatusQuery,
  leagueType,
  leagueName,
  isFinishedSeason,
}: MatchesPreviewProps) {
  const roundsData = getRounds({ league: leagueId, season });
  const currentRoundData = getCurrentRound({
    league: leagueId,
    season,
  });

  const [rounds, currentRound] = await Promise.all([
    roundsData,
    currentRoundData,
  ]);

  if (!rounds.length) {
    return <></>;
  }

  const selectedRound = roundQuery
    ? roundQuery
    : currentRound
      ? currentRound
      : rounds.at(-1)!;

  const selectedTab = matchStatusQuery
    ? matchStatusQuery
    : isFinishedSeason
      ? matchStatuses.FINISHED
      : matchStatuses.UPCOMING;

  const currentRoundIndex = currentRound ? rounds.indexOf(currentRound) : -1;
  const selectedRoundIndex = rounds.indexOf(selectedRound);
  const isUpcomingRound =
    currentRoundIndex !== -1 &&
    selectedRoundIndex !== -1 &&
    selectedRoundIndex > currentRoundIndex;
  const isFinishedRound =
    currentRoundIndex === -1 ||
    (currentRoundIndex !== -1 &&
      selectedRoundIndex !== -1 &&
      selectedRoundIndex < currentRoundIndex);

  const enabledTabs = isFinishedRound
    ? [matchStatuses.FINISHED]
    : isUpcomingRound
      ? [matchStatuses.UPCOMING]
      : [matchStatuses.LIVE, matchStatuses.UPCOMING, matchStatuses.FINISHED];

  const tabList = enabledTabs.map((tabTitle,_,tabs) => (
    <li className="flex-1 text-center" key={tabTitle}>
      <Tab isActive={tabTitle === selectedTab} isSingle={tabs.length === 1}>
        <TabLink status={tabTitle}>
          <span className="capitalize text-primary-foreground">{tabTitle}</span>
        </TabLink>
      </Tab>
    </li>
  ));

  const isUpcomingActive = selectedTab === matchStatuses.UPCOMING;
  const isLiveActive = selectedTab === matchStatuses.LIVE;
  const isFinishedActive = selectedTab === matchStatuses.FINISHED;

  return (
    <article className="">
      <h2 className="hidden">{`${selectedRound} matches of the ${leagueName}`}</h2>
      <div className="flex justify-center">
        <RoundSwitcher
          rounds={rounds}
          selectedRound={selectedRound}
          leagueType={leagueType}
        />
      </div>
      <ul className="flex bg-primary">{tabList}</ul>
      <div className="bg-primary">
        {isUpcomingActive && (
          <Suspense fallback={<div>Loading...</div>}>
            <UpcomingMatchesPreview
              leagueId={leagueId}
              season={season}
              round={selectedRound}
            />
          </Suspense>
        )}
        {isFinishedActive && (
          <Suspense fallback={<div>Loading...</div>}>
            <FinishedMatchesPreview
              leagueId={leagueId}
              season={season}
              round={selectedRound}
            />
          </Suspense>
        )}
      </div>
    </article>
  );
}
