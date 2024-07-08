import React from 'react';

export interface DateListItemProps {
  matchDate: string;
  dateTimeAttr: string;
  matchesListSlot: React.ReactNode;
}

export function DateListItem({
  matchDate,
  dateTimeAttr,
  matchesListSlot,
}: DateListItemProps) {
  return (
    <li className="text-center">
      <time
        className="text-2xl font-medium text-primary-foreground/50"
        dateTime={dateTimeAttr}
      >
        {matchDate}
      </time>
      <ul className="pt-3">{matchesListSlot}</ul>
    </li>
  );
}
