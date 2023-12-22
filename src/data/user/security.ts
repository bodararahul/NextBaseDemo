'use server';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';

export async function updatePasswordAction(password: string) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { error } = await supabaseClient.auth.updateUser({
    password,
  });

  if (error) {
    throw error;
  }
}

export async function updateEmailAction(email: string) {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { error } = await supabaseClient.auth.updateUser({
    email,
  });

  if (error) {
    throw error;
  }
}
