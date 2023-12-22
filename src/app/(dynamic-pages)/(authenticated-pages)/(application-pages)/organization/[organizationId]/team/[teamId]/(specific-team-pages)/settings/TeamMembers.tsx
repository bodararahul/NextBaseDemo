import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import { T } from '@/components/ui/Typography';
import {
  getOrganizationAdmins,
  getOrganizationTitle,
} from '@/data/user/organizations';
import {
  getCanLoggedInUserManageTeam,
  getTeamMembersByTeamId,
} from '@/data/user/teams';
import { ChangeRole } from './ChangeRole';
import { RemoveUserDialog } from './RemoveUserDialog';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { AddUserToTeamDialog } from './AddUserToTeamDialog';
import { getAddableMembers } from '@/data/user/teams';
import { Suspense } from 'react';
import { Anchor } from '@/components/Anchor';

async function AddUserToTeam({
  organizationId,
  teamId,
}: {
  organizationId: string;
  teamId: number;
}) {
  const addableMembers = await getAddableMembers({
    organizationId,
    teamId,
  });

  if (addableMembers.length === 0) {
    return (
      <div>
        <T.H3>Want to invite a member to this team? </T.H3>
        <T.Subtle>
          No more users to add. Invite users to the organization first{' '}
          <Anchor
            className="text-blue-500 underline cursor-pointer"
            href={`/organization/${organizationId}/settings/members`}
          >
            here
          </Anchor>
          .
        </T.Subtle>
      </div>
    );
  }

  return (
    <AddUserToTeamDialog
      organizationId={organizationId}
      teamId={teamId}
      addableMembers={addableMembers}
    />
  );
}

export async function AutomaticTeamAdmins({
  organizationId,
}: {
  organizationId: string;
}) {
  const teamAdmins = await getOrganizationAdmins(organizationId);
  const organizationTitle = await getOrganizationTitle(organizationId);
  const autoTeamAdminList = teamAdmins.map((admin, index) => {
    const userProfile = Array.isArray(admin.user_profiles)
      ? admin.user_profiles[0]
      : admin.user_profiles;
    if (!userProfile) {
      throw new Error('userProfile is undefined');
    }
    return {
      rowNo: index + 1,
      name: userProfile.full_name,
      role: admin.member_role,
      id: admin.id,
    };
  });

  return (
    <div className="space-y-2">
      <div className="space-y-2 max-w-2xl">
        <T.H2>Team Admins</T.H2>
        <T.Subtle>
          Below are organization admins of the organization{' '}
          <strong>{organizationTitle} </strong>. As they are organization
          admins, they are automatically team admins of all teams in the
          organization.
        </T.Subtle>
      </div>

      <div className="overflow-hidden shadow border sm:rounded-lg mt-8 max-w-2xl">
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">User</TableHead>{' '}
              <TableHead scope="col">Name</TableHead>
              <TableHead scope="col">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {autoTeamAdminList.map((member, index) => {
              return (
                <TableRow key={member.id}>
                  <TableCell>{member.rowNo}</TableCell>{' '}
                  <TableCell>{member.name}</TableCell>
                  <TableCell className="uppercase">{member.role}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </ShadcnTable>
      </div>
    </div>
  );
}

export async function TeamMembers({
  teamId,
  organizationId,
}: {
  teamId: number;
  organizationId: string;
}) {
  const teamMembers = await getTeamMembersByTeamId(teamId);
  const loggedInUser = await serverGetLoggedInUser();
  const { canUserManageTeam } = await getCanLoggedInUserManageTeam(
    organizationId,
    teamId,
  );
  const teamMemberList = teamMembers.map((member, index) => {
    const userProfile = Array.isArray(member.user_profiles)
      ? member.user_profiles[0]
      : member.user_profiles;
    if (!userProfile) {
      throw new Error('userProfile is undefined');
    }
    return {
      rowNo: index + 1,
      name: userProfile.full_name,
      role: member.role,
      id: member.id,
      userId: userProfile.id,
    };
  });
  return (
    <div className="space-y-8">
      <div>
        <div className="space-y-2 max-w-lg">
          <T.H2>Team Members</T.H2>
          {teamMemberList.length ? (
            <T.Subtle>
              Below are team members who have been manually added to the team.
            </T.Subtle>
          ) : (
            <T.Subtle>There are no team members in this team.</T.Subtle>
          )}
        </div>

        {teamMemberList.length ? (
          <div className="overflow-hidden shadow border sm:rounded-lg mt-8 max-w-xl">
            <ShadcnTable>
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">User</TableHead>{' '}
                  <TableHead scope="col">Name</TableHead>
                  {canUserManageTeam ? (
                    <>
                      <TableHead scope="col">Change Role</TableHead>
                      <TableHead scope="col">Actions</TableHead>
                    </>
                  ) : (
                    <TableHead scope="col">Role</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMemberList.map((member, index) => {
                  return (
                    <TableRow key={member.id}>
                      <TableCell>{member.rowNo}</TableCell>{' '}
                      <TableCell>{member.name}</TableCell>
                      {canUserManageTeam ? (
                        <>
                          <TableCell>
                            <ChangeRole
                              userId={member.userId}
                              teamId={teamId}
                              role={member.role}
                            />
                          </TableCell>
                          <TableCell>
                            <RemoveUserDialog
                              isSameUser={member.userId === loggedInUser.id}
                              teamId={teamId}
                              userId={member.userId}
                            />
                          </TableCell>
                        </>
                      ) : (
                        <TableCell>{member.role}</TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </ShadcnTable>
          </div>
        ) : null}
      </div>

      {canUserManageTeam ? (
        <Suspense fallback={<T.P>Loading...</T.P>}>
          <AddUserToTeam organizationId={organizationId} teamId={teamId} />
        </Suspense>
      ) : null}
    </div>
  );
}
