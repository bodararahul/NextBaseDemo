'use server';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { Enum, Table } from '@/types';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { revalidatePath } from 'next/cache';
import {
  getLoggedInUserOrganizationRole,
  getOrganizationAdmins,
  getTeamMembersInOrganization,
} from './organizations';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';

export async function getSlimTeamById(teamId: number) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('teams')
    .select('id,name,organization_id')
    .eq('id', teamId)
    .single();
  if (error) {
    throw error;
  }
  return data;
}

export const getTeamsInOrganization = async (
  organizationId: string,
): Promise<Table<'teams'>[]> => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from('teams')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('No teams found for organization');
  }
  return data;
};

export const createTeamAction = async (
  organizationId: string,
  name: string,
) => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from('teams')
    .insert({
      name,
      organization_id: organizationId,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/organization/${organizationId}`);

  return data;
};

export async function getOrganizationOfTeam(teamId: number) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('teams')
    .select('organization_id')
    .eq('id', teamId)
    .single();
  if (error) {
    throw error;
  }
  return data.organization_id;
}

export const getUserTeamRole = async (
  userId: string,
  teamId: number,
): Promise<Enum<'project_team_member_role'> | null> => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('user_id', userId)
    .eq('team_id', teamId);

  const row = data?.[0];

  if (error) {
    throw error;
  }

  return row?.role ?? null;
};

export const getLoggedInUserTeamRole = async (teamId: number) => {
  const user = await serverGetLoggedInUser();
  return getUserTeamRole(user.id, teamId);
};

export const getTeamById = async (teamId: number) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', teamId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getTeamNameById = async (teamId: number) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('teams')
    .select('name')
    .eq('id', teamId)
    .single();

  if (error) {
    throw error;
  }

  return data.name;
};

export const getTeamMembersByTeamId = async (teamId: number) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('team_members')
    .select('*, user_profiles(*)')
    .eq('team_id', teamId);

  if (error) {
    throw error;
  }

  return data.map((member) => {
    const { user_profiles, ...rest } = member;
    if (!user_profiles) {
      throw new Error('No user profile found for member');
    }
    return {
      ...rest,
      user_profiles: user_profiles,
    };
  });
};

export const getCanLoggedInUserManageTeam = async (
  organizationId: string,
  teamId: number,
) => {
  const [teamRole, orgRole] = await Promise.all([
    getLoggedInUserTeamRole(teamId),
    getLoggedInUserOrganizationRole(organizationId),
  ]);

  let canUserManageTeam = false;

  if (teamRole === 'admin' || orgRole === 'owner' || orgRole === 'admin') {
    canUserManageTeam = true;
  }
  return {
    canUserManageTeam,
    teamRole,
    orgRole,
  };
};

export const updateTeamRole = async ({
  userId,
  teamId,
  role,
}: {
  userId: string;
  teamId: number;
  role: Enum<'project_team_member_role'>;
}) => {
  const supabase = createSupabaseUserServerActionClient();
  const organizationId = await getOrganizationOfTeam(teamId);
  const { data, error } = await supabase
    .from('team_members')
    .update({ role: role })
    .eq('user_id', userId)
    .eq('team_id', teamId);

  if (error) {
    throw error;
  }

  revalidatePath(`/organization/${organizationId}/team/${teamId}`);

  return data;
};

export const removeUserFromTeam = async ({
  userId,
  teamId,
}: {
  userId: string;
  teamId: number;
}) => {
  const supabase = createSupabaseUserServerActionClient();
  const organizationId = await getOrganizationOfTeam(teamId);

  const { data, error } = await supabase
    .from('team_members')
    .delete()
    .eq('user_id', userId)
    .eq('team_id', teamId);

  if (error) {
    throw error;
  }
  revalidatePath(`/organization/${organizationId}/team/${teamId}`);
  return data;
};

export const getAddableMembers = async ({
  organizationId,
  teamId,
}: {
  organizationId: string;
  teamId: number;
}) => {
  const [orgMembers, teamMembers, admins] = await Promise.all([
    getTeamMembersInOrganization(organizationId),
    getTeamMembersByTeamId(teamId),
    getOrganizationAdmins(organizationId),
  ]);

  return orgMembers.filter((member) => {
    const isMember = teamMembers.find(
      (teamMember) => teamMember.user_profiles.id === member.user_profiles.id,
    );
    const isAdmin = admins.find(
      (admin) => admin.user_profiles.id === member.user_profiles.id,
    );
    return !isMember && !isAdmin;
  });
};

export const addUserToTeamAction = async ({
  userId,
  teamId,
  role,
  organizationId,
}: {
  userId: string;
  organizationId: string;
  teamId: number;
  role: Enum<'project_team_member_role'>;
}) => {
  const supabase = createSupabaseUserServerActionClient();
  const rowCount = await supabase
    .from('team_members')
    .select('id')
    .eq('user_id', userId)
    .eq('team_id', teamId);

  if (rowCount.error || rowCount.data?.length > 0) {
    throw new Error('User already in team');
  }

  const { data, error } = await supabase
    .from('team_members')
    .insert({
      user_id: userId,
      role: role,
      team_id: teamId,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }
  revalidatePath(`/organization/${organizationId}/team/${teamId}`);
  return data;
};
