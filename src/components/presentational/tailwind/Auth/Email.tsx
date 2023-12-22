'use client';
import { Anchor } from '@/components/Anchor';
import { classNames } from '@/utils/classNames';
import { PropsOf } from '@headlessui/react/dist/types';
import { useMemo } from 'react';
import { useState } from 'react';
import { Button } from '../Button';
import { Label } from '@/components/ui/Label';
import { T } from '@/components/ui/Typography';

export const Email = ({
  onSubmit,
  view,
  isLoading,
  successMessage,
  label = 'Email address',
  withMaintenanceMode,
  defaultValue,
}: {
  onSubmit: (email: string) => void;
  view: 'sign-in' | 'sign-up' | 'update-email' | 'forgot-password';
  isLoading: boolean;
  successMessage?: string | null | undefined;
  label?: string;
  defaultValue?: string;
} & Pick<PropsOf<typeof Button>, 'withMaintenanceMode'>) => {
  const [email, setEmail] = useState<string>(defaultValue ?? '');

  const buttonLabelText = useMemo(() => {
    switch (view) {
      case 'sign-in':
        return 'Login with Magic Link';
      case 'sign-up':
        return 'Sign up';
      case 'update-email':
        return 'Update Email';
      case 'forgot-password':
        return 'Reset password';
    }
  }, [view]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(email);
      }}
    >
      <div className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-muted-foreground">
            {label}
          </Label>
          <div>
            <input
              id={`${view}-email`}
              name="email"
              type="email"
              value={email}
              disabled={isLoading}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete={'email'}
              placeholder="placeholder@email.com"
              required
              className="block w-full appearance-none rounded-md border bg-gray-50/10 dark:bg-gray-800/20 h-10 px-3 py-3 placeholder-muted-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          {view === 'forgot-password' ?
            <div className="text-sm">
              <Anchor
                href="/login"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
              >
                Log in instead?
              </Anchor>
            </div>
            : null}
        </div>
        <div>
          <Button
            withMaintenanceMode={withMaintenanceMode}
            type="submit"
            className={classNames(
              'flex w-full justify-center rounded-lg border border-transparent py-2 text-white dark:text-black px-4 text-sm font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
              isLoading
                ? 'bg-yellow-300 dark:bg-yellow-700 '
                : 'bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100  ',
            )}
          >
            {buttonLabelText}
          </Button>
        </div>
        <div>
          {successMessage ? (
            <T.P className="text-green-500 dark:text-green-400 text-center">
              {successMessage}
            </T.P>
          ) : null}
        </div>
      </div>
    </form>
  );
};
