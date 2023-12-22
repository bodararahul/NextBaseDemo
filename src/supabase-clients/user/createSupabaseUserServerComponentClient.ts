import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createSupabaseUserServerComponentClient = () =>
  createServerComponentClient<Database>(
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
