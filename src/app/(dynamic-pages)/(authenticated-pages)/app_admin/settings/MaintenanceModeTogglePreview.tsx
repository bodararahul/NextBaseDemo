'use client';
import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';
import { Switch } from '@headlessui/react';

export function MaintenanceModeTogglePreview() {
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
          disabled
          className={cn(
            'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            )}
          />
        </Switch>
      </Switch.Group>
    </div>
  );
}
