'use server';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { type User } from '@supabase/supabase-js';

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

export const ensureAppAdmin = async () => {
  const user = await serverGetLoggedInUser();
  if (!user) {
    throw new Error('User not logged in');
  }

  const isAppAdmin = await getIsAppAdmin(user);

  if (!isAppAdmin) {
    throw new Error('User is not an app admin');
  }

  return true;
};

export async function isLoggedInUserAppAdmin(): Promise<boolean> {
  const authUser = await serverGetLoggedInUser();
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
