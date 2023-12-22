'use client';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { CreateOrganizationDialog } from '@/components/presentational/tailwind/CreateOrganizationDialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/Command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { useState } from 'react';
import ChevronUpDown from 'lucide-react/dist/esm/icons/chevrons-up-down';
import CheckIcon from 'lucide-react/dist/esm/icons/check';
import UsersIcon from 'lucide-react/dist/esm/icons/users-2';
import { Button } from '@/components/ui/Button';
import { useToastMutation } from '@/hooks/useToastMutation';
import { createOrganization } from '@/data/user/organizations';

export function OrganizationSwitcher({
  slimOrganizations,
  currentOrganizationId,
}: {
  slimOrganizations: Array<{
    id: string;
    title: string;
  }>;
  currentOrganizationId: string;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const currentOrganization = slimOrganizations.find(
    (organization) => organization.id === currentOrganizationId,
  );
  const { mutate, isLoading } = useToastMutation(
    async (organizationTitle: string) => {
      return await createOrganization(organizationTitle);
    },
    {
      loadingMessage: 'Creating organization...',
      errorMessage: 'Failed to create organization',
      successMessage: 'Organization created!',
      onSuccess: (organization) => {
        router.push(`/organization/${organization.id}`);
      },
    },
  );

  const onConfirm = (organizationTitle: string) => {
    mutate(organizationTitle);
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={(isCurrentOpen) => {
        setIsPopoverOpen(isCurrentOpen);
        if (!isCurrentOpen) {
          setIsDialogOpen(false);
        }
      }}
    >
      <PopoverTrigger asChild className="w-fit">
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          className="mx-0 px-2 py-5 border hover:border-neutral-700 dark:hover:border-gray-500 hover:bg-transparent rounded-sm font-normal text-gray-500 dark:text-gray-300 text-sm justify-between truncate w-full "
        >
          <div className="flex items-center gap-1">
            <UsersIcon className="mr-2 h-4 w-4 mt-0.5" />
            {currentOrganization?.title ?? 'Select Organization'}
          </div>
          <ChevronUpDown className=" h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="w-[238px] border -ml-1 my-2 rounded-lg p-0 bg-white dark:bg-slate-900"
      >
        <Command>
          <CommandList>
            <CommandEmpty>No Organization found.</CommandEmpty>
            <CommandGroup heading="Organizations">
              {slimOrganizations.map((organization) => (
                <CommandItem
                  key={organization.id}
                  onSelect={() => {
                    setIsPopoverOpen(false);
                    router.push(`/organization/${organization.id}`);
                  }}
                  className="text-sm flex items-start"
                >
                  {/* <UsersIcon className="mr-2 h-4 w-4 mt-0.5" /> */}
                  {organization.title}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      organization.id === currentOrganizationId
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem className="px-1 py-0 w-full">
                <CreateOrganizationDialog
                  isLoading={isLoading}
                  onConfirm={onConfirm}
                  variant="ghost"
                  className="p-0 py-0 focus:ring-0 dark:focus:ring-0 hover:bg-transparent w-full"
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={(isCurrentOpen) => {
                    setIsDialogOpen(isCurrentOpen);
                    setIsPopoverOpen(isCurrentOpen);
                  }}
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
