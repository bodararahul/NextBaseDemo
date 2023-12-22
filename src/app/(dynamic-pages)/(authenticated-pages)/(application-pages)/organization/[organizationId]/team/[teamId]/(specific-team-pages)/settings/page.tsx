import { z } from 'zod';
import { Suspense } from 'react';
import { T } from '@/components/ui/Typography';
import { AutomaticTeamAdmins, TeamMembers } from './TeamMembers';

const paramsSchema = z.object({
  teamId: z.coerce.number(),
  organizationId: z.string(),
});

export default async function TeamSettingsPage({
  params,
}: {
  params: unknown;
}) {
  const parsedParams = paramsSchema.parse(params);
  const { teamId, organizationId } = parsedParams;

  return (
    <div className="space-y-16">
      <Suspense fallback={<T.P>Loading...</T.P>}>
        <AutomaticTeamAdmins organizationId={organizationId} />
      </Suspense>
      <Suspense fallback={<T.P>Loading...</T.P>}>
        <TeamMembers teamId={teamId} organizationId={organizationId} />
      </Suspense>
    </div>
  );
}
