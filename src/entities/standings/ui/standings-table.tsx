import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { appRoutes } from '@shared/config/routes';
import { Message } from '@shared/ui/message';
import { cn } from '@shared/utils';

import { getLeagueStandings } from '../api/get-standings';
import { type TeamPosition } from '../model/types';

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

function Position({
  teamPosition,
  rankCellColor,
}: {
  teamPosition: TeamPosition;
  rankCellColor: string;
}) {
  const { rank, team, played, goalsDiff, points } = teamPosition;

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
}

function Table({
  group,
  children,
}: {
  group: string;
  children: React.ReactNode;
}) {
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
      <tbody>{children}</tbody>
    </table>
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

function ColorDescriptionList({ eventColors }: { eventColors: EventColors }) {
  const colorDescriptionList = Object.entries(eventColors).map(
    ([event, color]) => (
      <li key={event} className="flex items-center gap-2">
        <span className={cn(color, 'h-2 w-2 rounded-full')}></span>
        <span className="text-foreground/70">{event}</span>
      </li>
    ),
  );

  return <ul className="ps-2">{colorDescriptionList}</ul>;
}

export async function StandingsTable({
  leagueId,
  season,
  leagueName,
}: StandingsTableProps) {
  const standings = await getLeagueStandings({ leagueId, season });

  if (!standings.length) {
    return <Message>{`${leagueName} standings are not available.`}</Message>;
  }

  let eventColors: EventColors | null = null;
  const tableList = standings.map(({ group, table, groupEvents }) => {
    eventColors = bindColorsToGroupEvents(groupEvents);
    const teamPositionList = table.map((position) => {
      const rankCellColor =
        position.description && eventColors
          ? eventColors[position.description]
          : '';

      return (
        <Position
          key={position.rank}
          teamPosition={position}
          rankCellColor={rankCellColor}
        />
      );
    });

    return (
      <Table key={group} group={group}>
        {teamPositionList}
      </Table>
    );
  });

  return (
    <article className="space-y-3">
      <h2 className="hidden">{`${leagueName} Standings`}</h2>
      <div>{tableList}</div>
      {eventColors && (
        <div>
          <ColorDescriptionList eventColors={eventColors} />
        </div>
      )}
    </article>
  );
}
