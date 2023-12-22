'use client';
import { Label } from '@/components/ui/Label';
import { classNames } from '@/utils/classNames';
import { Button } from '@/components/ui/Button';
import { useInput } from 'rooks';
import { useToastMutation } from '@/hooks/useToastMutation';
import { updatePasswordAction } from '@/data/user/security';

export const UpdatePassword = () => {
  const passwordInput = useInput('');
  const { mutate: updatePassword, isLoading } = useToastMutation(
    async () => {
      await updatePasswordAction(passwordInput.value);
    },
    {
      loadingMessage: 'Updating password...',
      successMessage: 'Password updated!',
      errorMessage: 'Failed to update password',
    },
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-muted-foreground">
          Password
        </Label>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            {...passwordInput}
            className="block w-full appearance-none rounded-md border bg-gray-50/10 dark:bg-gray-800/20 h-10 px-3 py-3 placeholder-muted-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <Button
          aria-disabled={isLoading}
          type="button"
          onClick={() => {
            updatePassword();
          }}
          className={classNames(
            'flex w-full justify-center rounded-lg border border-transparent py-3 text-white dark:text-black px-4 text-sm font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
            isLoading
              ? 'bg-yellow-300 dark:bg-yellow-700 '
              : 'bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100  ',
          )}
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </Button>
      </div>
    </div>
  );
};
