'use client';
import { Password } from '@/components/presentational/tailwind/Auth/Password';
import { updatePasswordAction } from '@/data/user/security';
import { useToastMutation } from '@/hooks/useToastMutation';
import { useRouter } from 'next/navigation';

export function UpdatePassword() {
  const router = useRouter();
  const updatePasswordMutation = useToastMutation(
    async (password: string) => {
      return await updatePasswordAction(password);
    },
    {
      loadingMessage: 'Updating password...',
      successMessage: 'Password updated!',
      errorMessage: 'Failed to update password',
      onSuccess: () => {
        router.push('/auth/callback');
      },
    },
  );

  return (
    <div className="container h-full grid items-center text-left max-w-lg mx-auto overflow-auto">
      <div className="space-y-8 ">
        {/* <Auth providers={['twitter']} supabaseClient={supabase} /> */}
        <div className="flex flex-col items-start gap-0 w-[320px]">
          <p className="text-xl font-[700]">Reset Password</p>
          <p className="text-base text-left font-[400]">
            Create a strong new password for your account
          </p>
        </div>

        <Password
          isLoading={updatePasswordMutation.isLoading}
          onSubmit={updatePasswordMutation.mutate}
          label="Create your new Password"
          withMaintenanceMode
          buttonLabel="Confirm Password"
        />
      </div>
    </div>
  );
}
