'use server';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { SupabaseFileUploadOptions, Table } from '@/types';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { User } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import urlJoin from 'url-join';

export async function getIsAppAdmin(authUser: User): Promise<boolean> {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: isUserAppAdmin, error } = await supabaseClient
    .rpc('check_if_user_is_app_admin', {
      user_id: authUser.id,
    })
    .single();
  if (error) {
    throw error;
  }

  return isUserAppAdmin;
}

export const getUserProfile = async (
  userId: string,
): Promise<Table<'user_profiles'>> => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
export const getUserFullName = async (userId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('user_profiles')
    .select('full_name')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data.full_name;
};

export const getUserAvatarUrl = async (userId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('user_profiles')
    .select('avatar_url')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data.avatar_url;
};

export const getUserPendingInvitationsByEmail = async (userEmail: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('organization_join_invitations')
    .select(
      '*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*), organization:organizations(*)',
    )
    .ilike('invitee_user_email', `%${userEmail}%`)
    .eq('status', 'active');

  if (error) {
    throw error;
  }

  return data || [];
};

export const getUserPendingInvitationsById = async (userId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
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
};

export const uploadPublicUserAvatar = async (
  file: File,
  fileName: string,
  fileOptions?: SupabaseFileUploadOptions | undefined,
): Promise<string> => {
  'use server';
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();
  const userId = user.id;
  const userImagesPath = `${userId}/images/${fileName}`;

  const { data, error } = await supabaseClient.storage
    .from('public-user-assets')
    .upload(userImagesPath, file, fileOptions);

  if (error) {
    throw new Error(error.message);
  }

  const { path } = data;

  const filePath = path.split(',')[0];
  const supabaseFileUrl = urlJoin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    '/storage/v1/object/public/public-user-assets',
    filePath,
  );
  return supabaseFileUrl;
};

export const updateUserProfileNameAndAvatar = async ({
  fullName,
  avatarUrl,
}: {
  fullName?: string;
  avatarUrl?: string;
}) => {
  'use server';
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();
  const { data, error } = await supabaseClient
    .from('user_profiles')
    .update({
      full_name: fullName,
      avatar_url: avatarUrl,
    })
    .eq('id', user.id)
    .single();

  if (error) {
    throw error;
  }

  revalidatePath('/');

  return data;
};
