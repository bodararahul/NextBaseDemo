'use client';
import { T } from '@/components/ui/Typography';
import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';
import { useDidMount } from 'rooks';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  useDidMount(async () => {
    await supabaseUserClientComponentClient.auth.signOut();
    router.refresh();
    router.replace('/');
  });

  return <T.P>Signing out...</T.P>;
}
