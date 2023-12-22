'use server';

import { SetDefaultOrganizationButton } from './SetDefaultOrganizationButton';
import Check from 'lucide-react/dist/esm/icons/check';
import { getDefaultOrganization } from '@/data/user/organizations';
import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <T.H3 className="dark:text-white">Default Organization</T.H3>
        <T.Subtle className="text-sm text-muted-foreground max-w-lg">
          If you have multiple organizations, you can set a default
          organization, which will be the organization that you are first taken
          to when you log in.
        </T.Subtle>
      </div>
      {children}
    </div>
  );
}

export async function SetDefaultOrganizationPreference({
  organizationId,
}: {
  organizationId: string;
}) {
  const defaultOrganizationId = await getDefaultOrganization();

  const isDefaultOrganization = defaultOrganizationId === organizationId;
  if (isDefaultOrganization) {
    return (
      <Wrapper>
        <Button
          variant="success"
          className="space-x-2 pointer-events-none select-none"
        >
          <Check className="w-4 h-4 mr-2" />
          <span>This is your default organization</span>
        </Button>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <SetDefaultOrganizationButton organizationId={organizationId} />
      </Wrapper>
    );
  }
}
