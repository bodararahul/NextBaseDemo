'use server';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

export const serverGetLoggedInUser = async () => {
  const supabase = createSupabaseUserServerComponentClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (!session?.user) {
    throw new Error('serverGetLoggedInUser: Not logged in');
  }

  return session.user;
};
