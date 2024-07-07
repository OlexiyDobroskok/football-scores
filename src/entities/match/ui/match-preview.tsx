import Image from 'next/image';
import React from 'react';

import { cn } from '@shared/utils';

import { type Match } from '../model/types';

interface TeamProps {
  name: string;
  logo: string;
  className?: string;
}

function Team({ logo, name, className }: TeamProps) {
  return (
    <section
      className={cn(
        className,
        'flex flex-col-reverse gap-1.5 text-center text-secondary-foreground',
      )}
    >
      <h5 className="line-clamp-1">{name}</h5>
      <div className="mx-auto">
        <Image src={logo} alt={`${name} logo`} width={40} height={40} />
      </div>
    </section>
  );
}

export interface MatchPreviewProps {
  match: Match;
  matchInformationSlot: React.ReactNode;
}

export function MatchPreview({
  match,
  matchInformationSlot,
}: MatchPreviewProps) {
  const { teams } = match;
  return (
    <article className="flex min-h-28">
      <h4 className="hidden">{`${teams.home.name} vs ${teams.away.name}`}</h4>
      <div className="flex w-2/5 items-center justify-center">
        <Team logo={teams.home.logo} name={teams.home.name} />
      </div>
      <div className="flex items-center justify-center">
        {matchInformationSlot}
      </div>
      <div className="flex w-2/5 items-center justify-center">
        <Team logo={teams.away.logo} name={teams.away.name} />
      </div>
    </article>
  );
}
