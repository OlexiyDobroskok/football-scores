import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { appRoutes } from '@shared/config/routes';
import { Message } from '@shared/ui/message';
import { cn } from '@shared/utils';

import { getLeagueStandings } from '../api/get-standings';

function Cell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <td className={cn(className, 'p-2 shadow-sm shadow-secondary/30')}>
      {children}
    </td>
  );
}

export interface StandingsTableProps {
  leagueId: string;
  season: string;
  leagueName: string;
}

const TEAM_RELEGATION = 'relegation';
const PROMOTION_COLORS = [
  'bg-green-600/30',
  'bg-blue-600/30',
  'bg-orange-600/30',
];
const RELEGATION_COLORS = ['bg-red-600/30'];

type EventColors = Record<string, string>;

const bindColorsToGroupEvents = (events: string[]): EventColors => {
  const eventColors = {} as EventColors;
  const relegationEvent = events.find((event) =>
    event.toLocaleLowerCase().includes(TEAM_RELEGATION),
  );
  const promotionEvents = events.filter(
    (event) => event.toLowerCase() !== relegationEvent,
  );

  promotionEvents.forEach((event, index) => {
    eventColors[event] = PROMOTION_COLORS[index];
  });

  if (relegationEvent) {
    eventColors[relegationEvent] = RELEGATION_COLORS.at(0)!;
  }

  return eventColors;
};

export async function StandingsTable({
  leagueId,
  season,
  leagueName,
}: StandingsTableProps) {
  const standings = await getLeagueStandings({ leagueId, season });
  let eventColors: EventColors | null = null;
  const tableList = !!standings.length ? (
    standings.map(({ group, table, groupEvents }) => {
      eventColors = bindColorsToGroupEvents(groupEvents);
      const teamPositionList = table.map(
        ({ rank, team, played, goalsDiff, points, description }) => {
          const rankCellColor =
            description && eventColors ? eventColors[description] : '';

          return (
            <tr key={rank}>
              <Cell className={rankCellColor}>{rank}</Cell>
              <Cell>
                <Link
                  className="line-clamp-1 flex items-center gap-2"
                  href={`${appRoutes.TEAM}/${team.id}`}
                >
                  <Image
                    src={team.logo}
                    alt={`${team.name} logo`}
                    width={24}
                    height={24}
                  />
                  {team.name}
                </Link>
              </Cell>
              <Cell>{played}</Cell>
              <Cell>{goalsDiff}</Cell>
              <Cell>{points}</Cell>
            </tr>
          );
        },
      );

      return (
        <table
          key={group}
          className="w-full whitespace-nowrap bg-primary text-center text-primary-foreground"
        >
          <caption className="px-2 py-2 text-2xl font-medium capitalize">
            {group}
          </caption>
          <thead>
            <tr className="capitalize shadow-sm shadow-secondary/30">
              <th>pos</th>
              <th>club</th>
              <th>pl</th>
              <th>gd</th>
              <th>pts</th>
            </tr>
          </thead>
          <tbody>{teamPositionList}</tbody>
        </table>
      );
    })
  ) : (
    <Message>{`${leagueName} standings are not available.`}</Message>
  );

  const colorDescriptionList = Object.entries(eventColors ?? {}).map(
    ([event, color]) => {
      if (typeof color === 'string') {
        return <li key={event} className='flex gap-2 items-center'>
          <span className={cn(color,'w-2 h-2 rounded-full')}></span>
          <span>{event}</span>
        </li>;
      }

      return null;
    },
  );

  return (
    <article>
      <h2 className="hidden">{`${leagueName} Standings`}</h2>
      <div>{tableList}</div>
      {colorDescriptionList && <ul className='pt-2 ps-2'>{colorDescriptionList}</ul>}
    </article>
  );
}
