'use client';
import { T } from '@/components/ui/Typography';
import {
  disableMaintenanceModeAction,
  enableMaintenanceModeAction,
} from '@/data/admin/maintenance-mode';
import { useToastMutation } from '@/hooks/useToastMutation';
import { classNames } from '@/utils/classNames';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export function MaintenanceModeToggle({
  isAppInMaintenanceMode,
}: {
  isAppInMaintenanceMode: boolean;
}) {
  const enableToastRef = useRef<string | null>(null);
  const disableToastRef = useRef<string | null>(null);
  const router = useRouter();
  const { mutate: enableMaintenanceModeMutation, isLoading: isEnabling } =
    useToastMutation(
      async () => {
        return enableMaintenanceModeAction();
      },
      {
        loadingMessage: 'Enabling maintenance mode...',
        successMessage: 'App is now in maintenance mode',
        errorMessage: 'Failed to set app maintenance mode',
      },
    );
  const { mutate: disableMaintenanceModeMutation, isLoading: isDisabling } =
    useToastMutation(
      async () => {
        return disableMaintenanceModeAction();
      },
      {
        loadingMessage: 'Disabling maintenance mode...',
        successMessage: 'App is no longer in maintenance mode',
        errorMessage: 'Failed to set app maintenance mode',
      },
    );

  const toggleMaintenanceMode = async (checked: boolean) => {
    if (checked) {
      return enableMaintenanceModeMutation();
    }
    return disableMaintenanceModeMutation();
  };

  return (
    <div className="flex space-x-4">
      <div className="space-y-4">
        <div className="space-y-2 max-w-xl">
          <T.H3 className="dark:text-white">Maintenance mode</T.H3>
          <T.P className="text-muted-foreground">
            This will show a maintenance page to all logged in users. You can
            modify the message shown in the
            <span className="mx-1 bg-gray-200 dark:bg-gray-700/50 text-gray-700 font-semibold dark:text-gray-400 p-1.5 pb-2 rounded-lg">
              MaintenanceModeBanner
            </span>
            component.
          </T.P>
        </div>
      </div>
      <Switch.Group as="div" className="flex items-center">
        <Switch
          disabled={isEnabling || isDisabling}
          checked={isAppInMaintenanceMode}
          onChange={toggleMaintenanceMode}
          className={classNames(
            isAppInMaintenanceMode ? 'bg-green-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              isAppInMaintenanceMode ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            )}
          />
        </Switch>
      </Switch.Group>
    </div>
  );
}
