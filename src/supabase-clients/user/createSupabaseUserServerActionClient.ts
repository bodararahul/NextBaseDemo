import { Database } from '@/lib/database.types';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createSupabaseUserServerActionClient = () =>
  createServerActionClient<Database>(
    {
      cookies,
    },
    {
      options: {
        global: {
          fetch,
        },
      },
    },
  );
