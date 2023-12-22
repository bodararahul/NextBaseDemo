'use client';
import { setDefaultOrganization } from '@/data/user/organizations';
import { Button } from '@/components/ui/Button';
import { useToastMutation } from '@/hooks/useToastMutation';

export function SetDefaultOrganizationButton({
  organizationId,
}: {
  organizationId: string;
}) {
  const { mutate, isLoading } = useToastMutation(
    async () => {
      return await setDefaultOrganization(organizationId);
    },
    {
      loadingMessage: 'Setting as default organization...',
      errorMessage: 'Failed to set as default organization',
      successMessage: 'Organization set as default!',
    },
  );
  return (
    <Button aria-disabled={isLoading} onClick={() => mutate()}>
      {isLoading ? 'Updating...' : 'Set as default'}
    </Button>
  );
}
