'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import UsersIcon from 'lucide-react/dist/esm/icons/users';
import { PlusIcon } from '@radix-ui/react-icons';
import { useToastMutation } from '@/hooks/useToastMutation';
import { createTeamAction } from '@/data/user/teams';
import { useRouter } from 'next/navigation';

type CreateTeamDialogProps = {
  organizationId: string;
};

export function CreateTeamDialog({ organizationId }: CreateTeamDialogProps) {
  const [teamTitle, setTeamTitle] = useState<string>('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate, isLoading } = useToastMutation(
    async () => {
      return await createTeamAction(organizationId, teamTitle);
    },
    {
      loadingMessage: 'Creating team...',
      successMessage: 'Team created!',
      errorMessage: 'Failed to create team.',
      onSuccess: (data) => {
        setOpen(false);
        router.push(`/organization/${organizationId}/team/${data.id}`);
      },
    },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="xs">
            <PlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
              <UsersIcon className=" w-6 h-6" />
            </div>
            <div className="p-1">
              <DialogTitle className="text-lg">Create Team</DialogTitle>
              <DialogDescription className="text-base mt-0">
                Collaborate with your team members on your project.
              </DialogDescription>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <Label className="text-muted-foreground">Team Name</Label>
              <Input
                value={teamTitle}
                onChange={(event) => {
                  setTeamTitle(event.target.value);
                }}
                required
                className="mt-1.5 shadow appearance-none border h-11 rounded-lg w-full py-2 px-3 focus:ring-0 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline text-base"
                id="name"
                type="text"
                placeholder="Team Name"
                disabled={isLoading}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                className="w-full"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Team...' : 'Create Team'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
