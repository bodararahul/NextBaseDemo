import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { getOrganizationTitle } from '@/data/user/organizations';

export async function OrganizationPageHeading({
  organizationId,
}: {
  organizationId: string;
}) {
  const organizationTitle = await getOrganizationTitle(organizationId);
  return (
    <PageHeading
      title={organizationTitle}
      titleHref={`/organization/${organizationId}`}
    />
  );
}
