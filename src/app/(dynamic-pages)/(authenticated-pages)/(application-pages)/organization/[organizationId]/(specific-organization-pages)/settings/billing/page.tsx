import { z } from 'zod';
import { OrganizationSubscripionDetails } from './OrganizationSubscripionDetails';
import {
  getLoggedInUserOrganizationRole,
  getNormalizedOrganizationSubscription,
} from '@/data/user/organizations';
import { Suspense } from 'react';
import { T } from '@/components/ui/Typography';

const paramsSchema = z.object({
  organizationId: z.string(),
});

async function Subscription({ organizationId }: { organizationId: string }) {
  const normalizedSubscription =
    await getNormalizedOrganizationSubscription(organizationId);
  const organizationRole =
    await getLoggedInUserOrganizationRole(organizationId);
  return (
    <OrganizationSubscripionDetails
      organizationId={organizationId}
      organizationRole={organizationRole}
      normalizedSubscription={normalizedSubscription}
    />
  );
}

export default async function OrganizationSettingsPage({
  params,
}: {
  params: unknown;
}) {
  const { organizationId } = paramsSchema.parse(params);
  return (
    <Suspense fallback={<T.Subtle>Loading billing details...</T.Subtle>}>
      <Subscription organizationId={organizationId} />;
    </Suspense>
  );
}
