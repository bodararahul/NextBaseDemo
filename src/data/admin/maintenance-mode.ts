'use server';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { revalidatePath } from 'next/cache';

export const enableMaintenanceModeAction = async () => {
  const { error } = await supabaseAdminClient
    .rpc('enable_maintenance_mode')
    .single();

  if (error) {
    throw error;
  }
  revalidatePath('/');
};

export const disableMaintenanceModeAction = async () => {
  const { error } = await supabaseAdminClient
    .rpc('disable_maintenance_mode')
    .single();

  if (error) {
    throw error;
  }
  revalidatePath('/');
};
