'use server';

import {
  getLoggedInUserOrganizationRole,
  getNormalizedOrganizationSubscription,
  getOrganizationById,
  getSlimOrganizationById,
} from '@/data/user/organizations';
import { getSlimProjectById } from '@/data/user/projects';
import { getLoggedInUserTeamRole, getSlimTeamById } from '@/data/user/teams';
import { ApprovalControlActions } from './ApprovalControlActions';

async function fetchData(projectId: string) {
  const projectByIdData = await getSlimProjectById(projectId);
  const [organizationData, maybeTeamData, organizationRole, teamRole] =
    await Promise.all([
      getSlimOrganizationById(projectByIdData.organization_id),
      projectByIdData.team_id ? getSlimTeamById(projectByIdData.team_id) : null,
      getLoggedInUserOrganizationRole(projectByIdData.organization_id),
      projectByIdData.team_id
        ? getLoggedInUserTeamRole(projectByIdData.team_id)
        : null,
      getNormalizedOrganizationSubscription(projectByIdData.organization_id),
    ]);

  return {
    projectByIdData,
    organizationRole,
    teamRole,
    organizationData,
    maybeTeamData,
  };
}

export async function ApprovalControls({ projectId }: { projectId: string }) {
  const data = await fetchData(projectId);
  const isOrganizationManager =
    data.organizationRole === 'admin' || data.organizationRole === 'owner';
  const isTopLevelProject = !data.projectByIdData.team_id;
  const maybeTeamRole = data.teamRole;
  const canManage = isTopLevelProject
    ? isOrganizationManager
    : maybeTeamRole === 'admin' || isOrganizationManager;

  const canOnlyEdit = isTopLevelProject
    ? data.organizationRole === 'member'
    : maybeTeamRole === 'member';

  return (
    <ApprovalControlActions
      projectId={projectId}
      canManage={canManage}
      canOnlyEdit={canOnlyEdit}
      projectStatus={data.projectByIdData.project_status}
    />
  );
}
