'use server';

import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

export const getIsAppInMaintenanceMode = async (): Promise<boolean> => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient.rpc(
    'is_app_in_maintenance_mode',
  );

  if (error) {
    throw error;
  }

  return data;
};
