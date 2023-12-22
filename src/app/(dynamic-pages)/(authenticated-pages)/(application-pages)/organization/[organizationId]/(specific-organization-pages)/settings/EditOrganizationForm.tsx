'use client';
import { Button } from '@/components/presentational/tailwind/Button';
import { T } from '@/components/ui/Typography';
import { updateOrganizationTitle } from '@/data/user/organizations';
import { useToastMutation } from '@/hooks/useToastMutation';
import { classNames } from '@/utils/classNames';
import { useState, useTransition } from 'react';

export function EditOrganizationForm({
  initialTitle,
  organizationId,
}: {
  initialTitle: string;
  organizationId: string;
}) {
  const [pending, startTransition] = useTransition();
  const { mutate, isLoading } = useToastMutation(
    async (organizationTitle: string) => {
      return await updateOrganizationTitle(organizationId, organizationTitle);
    },
    {
      loadingMessage: 'Updating organization title...',
      successMessage: 'Organization title updated!',
      errorMessage: 'Failed to update organization title',
    },
  );

  const [organizationTitle, setOrganizationTitle] =
    useState<string>(initialTitle);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <T.H4>Edit Organization Title</T.H4>
        <T.P className="text-muted-foreground">
          This is the title that will be displayed on the organization page.
        </T.P>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          startTransition(() => {
            mutate(organizationTitle);
          });
        }}
        className="space-y-4 max-w-md"
      >
        <input
          value={organizationTitle}
          type="text"
          name="organization-title"
          id="organization-title"
          onChange={(e) => {
            setOrganizationTitle(e.target.value);
          }}
          className="block px-3 py-2 appearance-none w-full rounded-md border bg-transparent h-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <div className="inline-block">
          <Button
            withMaintenanceMode
            disabled={isLoading}
            type="submit"
            id="update-organization-title-button"
            className={classNames(
              'flex w-full justify-center rounded-lg border border-transparent py-3 px-4 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
              'bg-gray-900 hover:bg-gray-700 dark:bg-gray-50 hover:dark:bg-gray-200 text-white dark:text-black',
            )}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </div>
  );
}
