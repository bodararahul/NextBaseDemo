import { Suspense } from 'react';
import { EditOrganizationForm } from './EditOrganizationForm';
import { getOrganizationTitle } from '@/data/user/organizations';
import { T } from '@/components/ui/Typography';
import { SetDefaultOrganizationPreference } from './SetDefaultOrganizationPreference';

async function EditOrganization({
  organizationId,
}: {
  organizationId: string;
}) {
  const organizationTitle = await getOrganizationTitle(organizationId);
  return (
    <EditOrganizationForm
      organizationId={organizationId}
      initialTitle={organizationTitle}
    />
  );
}

export default async function EditOrganizationPage({
  params,
}: {
  params: {
    organizationId: string;
  };
}) {
  const { organizationId } = params;
  return (
    <div className="space-y-4">
      <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
        <EditOrganization organizationId={organizationId} />
      </Suspense>
      <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
        <SetDefaultOrganizationPreference organizationId={organizationId} />
      </Suspense>
    </div>
  );
}
