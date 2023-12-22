'use server';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { AuthProvider } from '@/types';
import { toSiteURL } from '@/utils/helpers';
import { redirect } from 'next/navigation';

export const signUp = async (email: string, password: string) => {
  const supabase = createSupabaseUserServerActionClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: toSiteURL('/auth/callback'),
    },
  });

  if (error) {
    throw error;
  }
};

export const signInWithPassword = async (email: string, password: string) => {
  const supabase = createSupabaseUserServerActionClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }
};

export const signInWithMagicLink = async (email: string, next?: string) => {
  const supabase = createSupabaseUserServerActionClient();
  const redirectUrl = new URL(toSiteURL('/auth/callback'));
  if (next) {
    redirectUrl.searchParams.set('next', next);
  }
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectUrl.toString(),
    },
  });

  if (error) {
    throw error;
  }
};

export const signInWithProvider = async (
  provider: AuthProvider,
  next?: string,
) => {
  const supabase = createSupabaseUserServerActionClient();
  const redirectToURL = new URL(toSiteURL('/auth/callback'));
  if (next) {
    redirectToURL.searchParams.set('next', next);
  }
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectToURL.toString(),
    },
  });
  if (data && data.url) {
    redirect(data.url);
  }
  if (error) {
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  const supabase = createSupabaseUserServerActionClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: toSiteURL('/update-password'),
  });

  if (error) {
    throw error;
  }
};
