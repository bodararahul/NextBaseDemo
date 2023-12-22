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
import { acceptInvitationAction } from '@/data/user/invitation';
import { useToastMutation } from '@/hooks/useToastMutation';
import Check from 'lucide-react/dist/esm/icons/check';
import { useState } from 'react';

export const ConfirmAcceptInvitationDialog = ({
  invitationId,
}: {
  invitationId: string;
}) => {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useToastMutation(acceptInvitationAction, {
    loadingMessage: 'Accepting invitation...',
    successMessage: 'Invitation accepted!',
    errorMessage: 'Failed to accept invitation.',
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="success" size="default">
          <Check className="mr-2 h-5 w-5" /> Accept Invitation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <Check className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Accept Invitation</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to accept this invitation?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            type="button"
            disabled={isLoading}
            variant="outline"
            className="w-full"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            variant="success"
            className="w-full"
            onClick={() => {
              mutate(invitationId);
              setOpen(false);
            }}
          >
            {isLoading ? 'Accepting...' : 'Accept'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
