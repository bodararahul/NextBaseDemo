'use client';
import { T } from '@/components/ui/Typography';
import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';
import { useDidMount } from 'rooks';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  useDidMount(async () => {
    try {
      await supabaseUserClientComponentClient.auth.signOut();

      router.refresh();
      router.replace('/login');
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  });

  return <T.P>Signing out...</T.P>;
}
