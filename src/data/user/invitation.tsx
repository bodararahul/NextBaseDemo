'use server';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { Enum } from '@/types';
import { toSiteURL } from '@/utils/helpers';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { renderAsync } from '@react-email/render';
import TeamInvitationEmail from 'emails/TeamInvitation';
import { sendEmail } from '@/utils/api-routes/utils';
import { revalidatePath } from 'next/cache';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { redirect } from 'next/navigation';
import { uniqBy } from 'lodash';
import { getUserProfile } from './user';

// This function allows an application admin with service_role
// to check if a user with a given email exists in the auth.users table
export const appAdminGetUserIdByEmail = async (
  email: string,
): Promise<string | null> => {
  const { data, error } = await supabaseAdminClient.rpc(
    'app_admin_get_user_id_by_email',
    {
      emailarg: email,
    },
  );

  if (error) {
    throw error;
  }

  return data;
};

async function setupInviteeUserDetails(email: string): Promise<{
  type: 'USER_CREATED' | 'USER_EXISTS';
  userId: string;
}> {
  const inviteeUserId = await appAdminGetUserIdByEmail(email);
  if (!inviteeUserId) {
    const { data, error } = await supabaseAdminClient.auth.admin.createUser({
      email: email,
    });
    if (error) {
      throw error;
    }
    return {
      type: 'USER_CREATED',
      userId: data.user.id,
    };
  }

  return {
    type: 'USER_EXISTS',
    userId: inviteeUserId,
  };
}

async function getMagicLink(email: string): Promise<string> {
  const response = await supabaseAdminClient.auth.admin.generateLink({
    email,
    type: 'magiclink',
  });

  if (response.error) {
    throw response.error;
  }

  const generateLinkData = response.data;

  if (generateLinkData) {
    const {
      properties: { hashed_token },
    } = generateLinkData;

    if (process.env.NEXT_PUBLIC_SITE_URL !== undefined) {
      // change the origin of the link to the site url

      const tokenHash = hashed_token;
      const searchParams = new URLSearchParams({
        token_hash: tokenHash,
        next: '/dashboard',
      });

      const url = new URL(process.env.NEXT_PUBLIC_SITE_URL);
      url.pathname = `/auth/confirm`;
      url.search = searchParams.toString();

      return url.toString();
    } else {
      throw new Error('Site URL is not defined');
    }
  } else {
    throw new Error('No data returned');
  }
}

async function getViewInvitationUrl(
  invitationId: string,
  inviteeDetails: {
    type: 'USER_CREATED' | 'USER_EXISTS';
    userId: string;
  },
  email: string,
): Promise<string> {
  if (inviteeDetails.type === 'USER_CREATED') {
    const magicLink = await getMagicLink(email);
    return magicLink;
  }

  return toSiteURL('/api/invitations/view/' + invitationId);
}

export async function createInvitationHandler({
  organizationId,
  email,
  role,
}: {
  organizationId: string;
  email: string;
  role: Enum<'organization_member_role'>;
}) {
  'use server';
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();
  // check if organization exists
  const organizationResponse = await supabaseClient
    .from('organizations')
    .select('*')
    .eq('id', organizationId)
    .single();

  if (organizationResponse.error) {
    throw organizationResponse.error;
  }

  const inviteeUserDetails = await setupInviteeUserDetails(email);
  // check if already invited
  const existingInvitationResponse = await supabaseClient
    .from('organization_join_invitations')
    .select('*')
    .eq('invitee_user_id', inviteeUserDetails.userId)
    .eq('inviter_user_id', user.id)
    .eq('status', 'active')
    .eq('organization_id', organizationId);

  if (existingInvitationResponse.error) {
    throw existingInvitationResponse.error;
  } else if (existingInvitationResponse.data.length > 0) {
    throw new Error('User already invited');
  }

  const invitationResponse = await supabaseClient
    .from('organization_join_invitations')
    .insert({
      invitee_user_email: email,
      invitee_user_id: inviteeUserDetails.userId,
      inviter_user_id: user.id,
      status: 'active',
      organization_id: organizationId,
      invitee_organization_role: role,
    })
    .select('*')
    .single();

  if (invitationResponse.error) {
    throw invitationResponse.error;
  }

  const viewInvitationUrl = await getViewInvitationUrl(
    invitationResponse.data.id,
    inviteeUserDetails,
    email,
  );

  const userProfileData = await supabaseClient
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (userProfileData.error) {
    throw userProfileData.error;
  }

  const inviterName = userProfileData.data?.full_name || `User [${user.email}]`;

  // send email
  const invitationEmailHTML = await renderAsync(
    <TeamInvitationEmail
      viewInvitationUrl={viewInvitationUrl}
      inviterName={`${inviterName}`}
      isNewUser={inviteeUserDetails.type === 'USER_CREATED'}
      organizationName={organizationResponse.data.title}
    />,
  );

  if (process.env.NODE_ENV === 'development') {
    // In development, we log the email to the console instead of sending it.
    console.log({
      viewInvitationUrl,
    });
  } else {
    await sendEmail({
      to: email,
      subject: `Invitation to join ${organizationResponse.data.title}`,
      html: invitationEmailHTML,
      //TODO: Modify this to your app's admin email
      // Make sure you have verified this email in your Sendgrid (mail provider) account
      from: process.env.ADMIN_EMAIL,
    });
  }

  revalidatePath('/organization/[organizationId]');

  return invitationResponse.data;
}

export async function acceptInvitationAction(invitationId: string) {
  'use server';
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();

  const invitationResponse = await supabaseClient
    .from('organization_join_invitations')
    .update({
      status: 'finished_accepted',
      invitee_user_id: user.id, // Add this information here, so that our database function can add this id to the team members table
    })
    .eq('id', invitationId)
    .select('*')
    .single();

  if (invitationResponse.error) {
    throw invitationResponse.error;
  }

  const userProfile = await getUserProfile(user.id);

  revalidatePath('/');
  redirect('/dashboard');
}

export async function declineInvitationAction(invitationId: string) {
  'use server';
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();

  const invitationResponse = await supabaseClient
    .from('organization_join_invitations')
    .update({
      status: 'finished_declined',
      invitee_user_id: user.id, // Add this information here, so that our database function can add this id to the team members table
    })
    .eq('id', invitationId)
    .select('*')
    .single();

  if (invitationResponse.error) {
    throw invitationResponse.error;
  }
  revalidatePath('/');
  redirect('/dashboard');
}

export async function getPendingInvitationsOfUser() {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();

  async function emailInvitations(email: string) {
    const { data, error } = await supabaseClient
      .from('organization_join_invitations')
      .select(
        '*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*), organization:organizations(*)',
      )
      .ilike('invitee_user_email', `%${user.email}%`)
      .eq('status', 'active');

    if (error) {
      throw error;
    }

    return data || [];
  }

  async function idInvitations(userId: string) {
    const { data, error } = await supabaseClient
      .from('organization_join_invitations')
      .select(
        '*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*), organization:organizations(*)',
      )
      .eq('invitee_user_id', userId)
      .eq('status', 'active');

    if (error) {
      throw error;
    }

    return data || [];
  }

  const emailInvitationsData = user.email
    ? await emailInvitations(user.email)
    : [];
  const idInvitationsData = await idInvitations(user.id);

  const invitations = [...emailInvitationsData, ...idInvitationsData];

  return uniqBy(
    invitations.filter((invitation) => {
      return Boolean(invitation.organization) && Boolean(invitation.inviter);
    }),
    'id',
  );
}

export const getInvitationById = async (invitationId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from('organization_join_invitations')
    .select(
      '*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*), organization:organizations(*)',
    )
    .eq('id', invitationId)
    .eq('status', 'active')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export async function getPendingInvitationCountOfUser() {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();

  async function emailInvitations(email: string) {
    const { count, error } = await supabaseClient
      .from('organization_join_invitations')
      .select('id', { count: 'exact' })
      .ilike('invitee_user_email', `%${user.email}%`)
      .eq('status', 'active');

    if (error) {
      throw error;
    }

    return count || 0;
  }

  async function idInvitations(userId: string) {
    const { count, error } = await supabaseClient
      .from('organization_join_invitations')
      .select('id', { count: 'exact' })
      .eq('invitee_user_id', userId)
      .eq('status', 'active');

    if (error) {
      throw error;
    }

    return count || 0;
  }

  const emailInvitationsCount = user.email
    ? await emailInvitations(user.email)
    : 0;
  const idInvitationsCount = await idInvitations(user.id);

  return emailInvitationsCount + idInvitationsCount;
}
