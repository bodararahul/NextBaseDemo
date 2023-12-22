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
import { useState } from 'react';
import TrashIcon from 'lucide-react/dist/esm/icons/trash';
import { useToastMutation } from '@/hooks/useToastMutation';
import { removeUserFromTeam } from '@/data/user/teams';
import { useRouter } from 'next/navigation';

type Props = {
  teamId: number;
  userId: string;
  isSameUser: boolean;
};

export const RemoveUserDialog = ({ isSameUser, teamId, userId }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const removeUserMutation = useToastMutation(removeUserFromTeam, {
    loadingMessage: 'Removing user from team...',
    successMessage: 'User removed from team!',
    errorMessage: 'Failed to remove user from team',
    onSuccess: () => {
      if (isSameUser) {
        router.push(`/dashboard`);
      }
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="default">
          <TrashIcon size={16} className="stroke-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isSameUser ? 'Leave Team' : 'Remove User From Team'}
          </DialogTitle>
          <DialogDescription>
            {isSameUser
              ? 'Are you sure you want to leave this team?'
              : 'Are you sure you want to remove this user from the team?'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            disabled={removeUserMutation.isLoading}
            variant="destructive"
            onClick={() => {
              removeUserMutation.mutate({
                teamId,
                userId,
              });
              setOpen(false);
            }}
          >
            Yes
          </Button>
          <Button
            disabled={removeUserMutation.isLoading}
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
