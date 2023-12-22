'use client';

import { updateTeamRole } from '@/data/user/teams';
import { useToastMutation } from '@/hooks/useToastMutation';
import { Enum } from '@/types';
import { ProjectTeamMemberRoleSelect } from './ProjectTeamMemberRoleSelect';

export function ChangeRole({
  role,
  userId,
  teamId,
}: {
  role: Enum<'project_team_member_role'>;
  userId: string;
  teamId: number;
}) {
  const changeRole = useToastMutation(updateTeamRole, {
    loadingMessage: 'Changing role...',
    successMessage: 'Role changed!',
    errorMessage: 'Failed to change role',
  });

  return (
    <ProjectTeamMemberRoleSelect
      value={role}
      isLoading={changeRole.isLoading}
      onChange={(newRole) => {
        changeRole.mutate({
          userId,
          role: newRole,
          teamId,
        });
      }}
    />
  );
}
