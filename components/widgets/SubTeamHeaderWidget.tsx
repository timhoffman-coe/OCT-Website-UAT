'use client';

import Link from 'next/link';
import { resolveIcon } from '@/lib/icon-resolver';

interface SubTeamHeaderWidgetProps {
  teamName: string;
  description: string;
  iconName: string;
  parentTeam: string;
  parentTeamHref: string;
}

export default function SubTeamHeaderWidget({
  teamName,
  description,
  iconName,
  parentTeam,
  parentTeamHref,
}: SubTeamHeaderWidgetProps) {
  const Icon = resolveIcon(iconName);
  return (
    <section className="bg-structural-light-gray rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 mb-8">
      <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
        {/* eslint-disable-next-line react-hooks/static-components -- resolveIcon returns a stable reference from a static map */}
        <Icon className="w-10 h-10 text-primary-blue" />
      </div>
      <div className="text-center md:text-left">
        <div className="mb-2">
          <Link
            href={parentTeamHref}
            className="font-sans text-sm text-primary-blue hover:underline"
          >
            &larr; {parentTeam}
          </Link>
        </div>
        <h1 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-2">
          {teamName}
        </h1>
        <p className="font-sans text-text-secondary max-w-3xl">
          {description}
        </p>
      </div>
    </section>
  );
}
