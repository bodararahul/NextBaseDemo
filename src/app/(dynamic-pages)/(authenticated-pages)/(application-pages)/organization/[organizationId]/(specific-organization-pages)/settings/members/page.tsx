'use server';
import moment from 'moment';
import { Suspense } from 'react';
import { TeamMembersTableProps } from '@/components/presentational/tailwind/TeamMembersTable/types';
import { T } from '@/components/ui/Typography';
import { z } from 'zod';
import {
  getLoggedInUserOrganizationRole,
  getPendingInvitationsInOrganization,
  getTeamMembersInOrganization,
} from '@/data/user/organizations';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import { InviteUser } from './InviteUser';

async function TeamMembers({ organizationId }: { organizationId: string }) {
  const members = await getTeamMembersInOrganization(organizationId);
  const organizationRole =
    await getLoggedInUserOrganizationRole(organizationId);
  const isOrganizationAdmin =
    organizationRole === 'admin' || organizationRole === 'owner';
  const normalizedMembers: TeamMembersTableProps['members'] = members.map(
    (member, index) => {
      const userProfile = Array.isArray(member.user_profiles)
        ? member.user_profiles[0]
        : member.user_profiles;
      if (!userProfile) {
        throw new Error('User profile not found');
      }
      return {
        index: index + 1,
        id: userProfile.id,
        name: userProfile.full_name ?? `User ${userProfile.id}`,
        role: member.member_role,
        created_at: moment(member.created_at).format('DD MMM YYYY'),
      };
    },
  );

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex justify-between items-center">
        <T.H3 className="mt-0">Team Members</T.H3>
        {isOrganizationAdmin ? (
          <InviteUser organizationId={organizationId} />
        ) : null}
      </div>

      <div className="rounded-lg border  shadow-sm overflow-hidden">
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableHead> # </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {normalizedMembers.map((member, index) => {
              return (
                <TableRow key={member.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell className="capitalize">{member.role}</TableCell>
                  <TableCell>{member.created_at}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </ShadcnTable>
      </div>
    </div>
  );
}

async function TeamInvitations({ organizationId }: { organizationId: string }) {
  const invitations = await getPendingInvitationsInOrganization(organizationId);

  const normalizedInvitations = invitations.map((invitation, index) => {
    return {
      index: index + 1,
      id: invitation.id,
      email: invitation.invitee_user_email,
      created_at: moment(invitation.created_at).format('DD MMM YYYY'),
      status: invitation.status,
    };
  });

  return (
    <div className="space-y-4 max-w-4xl">
      <T.H3>Invitations</T.H3>
      <div className="rounded-lg border  shadow-sm overflow-hidden">
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableHead scope="col"> # </TableHead>
              <TableHead scope="col">Email</TableHead>

              <TableHead scope="col">Sent On</TableHead>
              <TableHead scope="col">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {normalizedInvitations.map((invitation, index) => {
              return (
                <TableRow key={invitation.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{invitation.email}</TableCell>

                  <TableCell>{invitation.created_at}</TableCell>
                  <TableCell className="uppercase">
                    <span>
                      {invitation.status === 'active'
                        ? 'pending'
                        : invitation.status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </ShadcnTable>
      </div>
    </div>
  );
}

const paramsSchema = z.object({
  organizationId: z.string(),
});

export default async function OrganizationPage({
  params,
}: {
  params: unknown;
}) {
  const { organizationId } = paramsSchema.parse(params);
  return (
    <div className="space-y-12">
      <Suspense fallback={<T.Subtle>Loading team members...</T.Subtle>}>
        <TeamMembers organizationId={organizationId} />
      </Suspense>
      <Suspense fallback={<T.Subtle>Loading invitations...</T.Subtle>}>
        <TeamInvitations organizationId={organizationId} />
      </Suspense>
    </div>
  );
}
