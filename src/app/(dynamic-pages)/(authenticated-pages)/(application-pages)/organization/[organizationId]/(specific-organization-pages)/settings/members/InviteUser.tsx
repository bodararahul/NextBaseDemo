'use client';

import { InviteOrganizationMemberDialog } from '@/app/(dynamic-pages)/(authenticated-pages)/(application-pages)/organization/[organizationId]/(specific-organization-pages)/settings/members/InviteOrganizationMemberDialog';
import { createInvitationHandler } from '@/data/user/invitation';
import { useToastMutation } from '@/hooks/useToastMutation';
import { Enum } from '@/types';

export function InviteUser({ organizationId }: { organizationId: string }) {
  const { mutate, isLoading } = useToastMutation(
    async ({
      email,
      role,
    }: {
      email: string;
      role: Enum<'organization_member_role'>;
    }) => {
      return await createInvitationHandler({
        email,
        organizationId,
        role,
      });
    },
    {
      loadingMessage: 'Inviting user...',
      errorMessage: 'Failed to invite user',
      successMessage: 'User invited!',
    },
  );

  return (
    <>
      <InviteOrganizationMemberDialog
        onInvite={(email, role) => {
          mutate({
            email,
            role,
          });
        }}
        isLoading={isLoading}
      />
    </>
  );
}
