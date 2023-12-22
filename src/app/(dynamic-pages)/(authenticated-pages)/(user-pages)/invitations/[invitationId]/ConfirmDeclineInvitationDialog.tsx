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
import { declineInvitationAction } from '@/data/user/invitation';
import { useToastMutation } from '@/hooks/useToastMutation';
import X from 'lucide-react/dist/esm/icons/x';
import { useState } from 'react';

export const ConfirmDeclineInvitationDialog = ({
  invitationId,
}: {
  invitationId: string;
}) => {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useToastMutation(declineInvitationAction, {
    loadingMessage: 'Declining invitation...',
    successMessage: 'Invitation declined!',
    errorMessage: 'Failed to decline invitation.',
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="default">
          <X className="mr-2 h-5 w-5" /> Decline Invitation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <X className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Decline Invitation</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to decline this invitation?
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
            variant="destructive"
            className="w-full"
            onClick={() => {
              mutate(invitationId);
              setOpen(false);
            }}
          >
            {isLoading ? 'Declining...' : 'Decline'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
