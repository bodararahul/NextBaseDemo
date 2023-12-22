// src/app/(dynamic-pages)/(authenticated-pages)/(user-pages)/settings/security/UpdateEmail.tsx

'use client';
import { Label } from '@/components/ui/Label';
import { classNames } from '@/utils/classNames';
import { Button } from '@/components/ui/Button';
import { useInput } from 'rooks';
import { useToastMutation } from '@/hooks/useToastMutation';
import { updateEmailAction } from '@/data/user/security';

export const UpdateEmail = ({
  initialEmail,
}: {
  initialEmail?: string | undefined;
}) => {
  const emailInput = useInput(initialEmail ?? '');

  const { mutate: updateEmail, isLoading } = useToastMutation(
    async () => {
      await updateEmailAction(emailInput.value);
    },
    {
      loadingMessage: 'Updating email...',
      successMessage: 'Email updated!',
      errorMessage: 'Failed to update email',
    },
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>
        <div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            {...emailInput}
            className="block w-full appearance-none rounded-md border bg-gray-50/10 dark:bg-gray-800/20 h-10 px-3 py-3 placeholder-muted-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <Button
          aria-disabled={isLoading}
          type="button"
          onClick={() => {
            updateEmail();
          }}
          className={classNames(
            'flex w-full justify-center rounded-lg border border-transparent py-3 text-white dark:text-black px-4 text-sm font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
            isLoading
              ? 'bg-yellow-300 dark:bg-yellow-700 '
              : 'bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100  ',
          )}
        >
          {isLoading ? 'Updating...' : 'Update Email'}
        </Button>
      </div>
    </div>
  );
};
