// https://github.com/vercel/next.js/issues/58272
import { Anchor } from '@/components/Anchor';
import { Badge } from '@/components/ui/Badge';
import { T } from '@/components/ui/Typography';
import { getTeamNameById } from '@/data/user/teams';
import TeamIcon from 'lucide-react/dist/esm/icons/folder';

import { Suspense } from 'react';
import { z } from 'zod';

const paramsSchema = z.object({
  organizationId: z.string(),
  teamId: z.coerce.number(),
});

async function Title({ teamId }: { teamId: number }) {
  const title = await getTeamNameById(teamId);
  return (
    <div className="flex items-center gap-2">
      <TeamIcon className="w-4 h-4" />
      <T.P>{title}</T.P>
      <div className="flex items-center gap-2 p-0.5 px-2 rounded-full text-xs font-normal  text-gray-600 dark:text-slate-300 border border-gray-600 dark:border-slate-300  uppercase ">
        Team
      </div>
    </div>
  );
}

export default async function OrganizationNavbar({
  params,
}: {
  params: unknown;
}) {
  const { organizationId, teamId } = paramsSchema.parse(params);
  return (
    <div className="flex items-center">
      <Anchor href={`/organization/${organizationId}/team/${teamId}`}>
        <span className="space-x-2 flex items-center">
          <Suspense fallback={<span>Loading...</span>}>
            <Title teamId={teamId} />
          </Suspense>
        </span>
      </Anchor>
    </div>
  );
}
