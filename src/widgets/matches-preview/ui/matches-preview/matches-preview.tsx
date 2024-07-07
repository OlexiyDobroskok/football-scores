import React, { Suspense } from 'react';

import { Tab } from '@shared/ui/tab';

import { matchStatuses } from '../../model/types';
import { UpcomingMatchesPreview } from '../upcoming/upcoming-matches-preview';

import { TabLink } from './tab-link';

export interface MatchesPreviewProps {
  roundSwitcherSlot: React.ReactNode;
  selectedMatchesStatus: PageSearchParam;
  league: string;
  round: string | null;
  season: string;
}

export function MatchesPreview({
  league,
  round,
  season,
  selectedMatchesStatus,
  roundSwitcherSlot,
}: MatchesPreviewProps) {
  const selectedTab = selectedMatchesStatus ?? matchStatuses.UPCOMING;
  const tabList = [
    matchStatuses.LIVE,
    matchStatuses.UPCOMING,
    matchStatuses.FINISHED,
  ].map((tabTitle) => (
    <li className="flex-1 text-center" key={tabTitle}>
      <Tab isActive={tabTitle === selectedTab}>
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
      <h2 className="hidden">Matches of the Round</h2>
      <div className="flex justify-center">{roundSwitcherSlot}</div>
      <ul className="flex bg-primary">{tabList}</ul>
      <div className='bg-primary'>
        {isUpcomingActive && (
          <Suspense fallback={<div>Loading...</div>}>
            <UpcomingMatchesPreview
              league={league}
              round={round}
              season={season}
            />
          </Suspense>
        )}
      </div>
    </article>
  );
}
