'use client';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { T } from '@/components/ui/Typography';
// convert the imports above into modularized imports
// import Check from 'lucide-react/dist/esm/icons/check';
import AddUserIcon from 'lucide-react/dist/esm/icons/user-plus';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProjectTeamMemberRoleSelect } from './ProjectTeamMemberRoleSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrganizationUsersSelect } from './OrganizationUsersSelect';
import { Table } from '@/types';
import { Label } from '@/components/ui/Label';
import { useToastMutation } from '@/hooks/useToastMutation';
import { addUserToTeamAction } from '@/data/user/teams';

const addUserSchema = z.object({
  userId: z.string(),
  role: z.enum(['readonly', 'member', 'admin']),
});

type AddUserFormType = z.infer<typeof addUserSchema>;

type AddableMember = Table<'organization_members'> & {
  user_profiles: Table<'user_profiles'>;
};

export const AddUserToTeamDialog = ({
  organizationId,
  teamId,
  addableMembers,
}: {
  organizationId: string;
  teamId: number;
  addableMembers: Array<AddableMember>;
}) => {
  const [open, setOpen] = useState(false);

  const { control, formState, handleSubmit } = useForm<AddUserFormType>({
    defaultValues: {
      role: 'member',
    },
    resolver: zodResolver(addUserSchema),
  });

  const addUserMutation = useToastMutation(addUserToTeamAction, {
    loadingMessage: 'Adding user...',
    successMessage: 'User added!',
    errorMessage: 'Failed to add user',
    onSuccess: () => {
      setOpen(false);
    },
  });

  const users = addableMembers.map((member) => ({
    value: member.user_profiles.id,
    label: member.user_profiles.full_name ?? `User ${member.user_profiles.id}`,
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="default">
          <AddUserIcon className="mr-2 w-5 h-5" /> Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={handleSubmit((data) => {
            addUserMutation.mutate({
              role: data.role,
              teamId,
              userId: data.userId,
              organizationId,
            });
            setOpen(false);
          })}
        >
          <DialogHeader>
            <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
              <AddUserIcon className="w-6 h-6" />
            </div>
            <div className="p-1 mb-4">
              <DialogTitle className="text-lg">Add to Team</DialogTitle>
              <DialogDescription className="text-base">
                Add user to team
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex flex-col gap-6 mt-4 mb-4">
            {!users.length ? (
              <T.Subtle>Loading...</T.Subtle>
            ) : (
              <Controller
                control={control}
                name="userId"
                render={({ field }) => {
                  const selectedUser = users.find(
                    (user) => user.value === field.value,
                  );
                  return (
                    <OrganizationUsersSelect
                      value={selectedUser}
                      onChange={(newUser) => {
                        field.onChange(newUser.value);
                      }}
                      users={users}
                    />
                  );
                }}
              ></Controller>
            )}
            <Controller
              control={control}
              name="role"
              render={({ field }) => {
                return (
                  <div className="flex flex-col space-y-2 justify-start w-full mb-4">
                    <Label className="text-muted-foreground">
                      Select a role
                    </Label>
                    <ProjectTeamMemberRoleSelect
                      isLoading={addUserMutation.isLoading}
                      value={field.value}
                      onChange={(newRole) => {
                        field.onChange(newRole);
                      }}
                    />
                  </div>
                );
              }}
            ></Controller>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={'outline'}
              onClick={() => {
                setOpen(false);
              }}
              className="w-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formState.isValid}
              variant="default"
              className="w-full"
            >
              Yes, add to team
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
