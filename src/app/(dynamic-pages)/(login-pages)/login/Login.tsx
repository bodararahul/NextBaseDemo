'use client';
import { RenderProviders } from '@/components/presentational/tailwind/Auth/RenderProviders';
import { Email } from '@/components/presentational/tailwind/Auth/Email';
import { EmailAndPassword } from '@/components/presentational/tailwind/Auth/EmailAndPassword';
import { useState } from 'react';
import { useToastMutation } from '@/hooks/useToastMutation';
import {
  signInWithMagicLink,
  signInWithProvider,
  signInWithPassword,
} from '@/data/auth/auth';
import { AuthProvider } from '@/types';
import { useRouter } from 'next/navigation';

export function Login({
  next,
  nextActionType,
}: {
  next?: string;
  nextActionType?: string;
}) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  function redirectToDashboard() {
    router.refresh();
    if (next) {
      router.push(`/auth/callback?next=${next}`);
    } else {
      router.push('/auth/callback');
    }
  }
  const magicLinkMutation = useToastMutation(
    async (email: string) => {
      return await signInWithMagicLink(email, next);
    },
    {
      loadingMessage: 'Sending magic link...',
      errorMessage: 'Failed to send magic link',
      successMessage: 'Magic link sent!',
      onSuccess: () => {
        setSuccessMessage('A magic link has been sent to your email!');
      },
      onMutate: () => {
        setSuccessMessage(null);
      },
    },
  );
  const passwordMutation = useToastMutation(
    async ({ email, password }: { email: string; password: string }) => {
      return await signInWithPassword(email, password);
    },
    {
      onSuccess: redirectToDashboard,
      loadingMessage: 'Logging in...',
      errorMessage: 'Failed to login',
      successMessage: 'Logged in!',
    },
  );
  const providerMutation = useToastMutation(
    async (provider: AuthProvider) => {
      return signInWithProvider(provider, next);
    },
    {
      loadingMessage: 'Requesting login...',
      successMessage: 'Redirecting...',
      errorMessage: 'Failed to login',
    },
  );
  return (
    <div className="container h-full grid items-center text-left max-w-lg mx-auto overflow-auto">
      {successMessage ? (
        <p className="text-blue-500 text-sm">{successMessage}</p>
      ) : (
        <div className="space-y-8 ">
          <div className="flex flex-col items-start gap-0 w-[320px]">
            <p className="text-xl font-[700]">Login to Nextbase</p>
            <p className="text-base text-left font-[400]">
              Login with the account you used to signup.
            </p>
          </div>
          <RenderProviders
            providers={['google']}
            onProviderLoginRequested={providerMutation.mutate}
            isLoading={providerMutation.isLoading}
          />
          <hr />
          <Email
            onSubmit={magicLinkMutation.mutate}
            isLoading={magicLinkMutation.isLoading}
            view="sign-in"
          />
          <hr />
          <EmailAndPassword
            isLoading={passwordMutation.isLoading}
            onSubmit={(data) => {
              passwordMutation.mutate(data);
            }}
            view="sign-in"
          />
        </div>
      )}
    </div>
  );
}
