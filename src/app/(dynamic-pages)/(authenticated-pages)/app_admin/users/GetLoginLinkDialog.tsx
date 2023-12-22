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
import GetLinkIcon from 'lucide-react/dist/esm/icons/link';
import { useToastMutation } from '@/hooks/useToastMutation';
import { appAdminGetUserImpersonationUrl } from '@/data/admin/user';

export const GetLoginLinkDialog = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);
  const { mutate: onConfirm, isLoading } = useToastMutation<URL>(
    async () => {
      return await appAdminGetUserImpersonationUrl(userId);
    },
    {
      onSuccess: (url) => {
        navigator.clipboard.writeText(url.toString());
      },
      loadingMessage: 'Generating login link...',
      successMessage: 'Login link copied to clipboard!',
      errorMessage: 'Failed to generate login link',
    },
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="primaryLink"
          className="text-sm font-medium underline underline-offset-4 "
          aria-disabled={isLoading}
        >
          Get login link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
            <GetLinkIcon className=" w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Get Login Link</DialogTitle>
            <DialogDescription className="text-base mt-0">
              Are you sure you want to generate a login link for the user?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            aria-disabled={isLoading}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            className="w-full"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            aria-disabled={isLoading}
          >
            Get Login Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
