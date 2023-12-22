'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
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
import PlusIcon from 'lucide-react/dist/esm/icons/plus';
import OrganizationIcon from 'lucide-react/dist/esm/icons/network';

type CreateOrganizationDialogProps = {
  onConfirm: (organizationTitle: string) => void;
  isLoading: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
};

export function CreateOrganizationDialog({
  onConfirm,
  isLoading,
  variant,
  className,
  isDialogOpen,
  setIsDialogOpen,
}: CreateOrganizationDialogProps) {
  const [organizationTitle, setOrganizationTitle] = useState<string>('');
  // const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm(organizationTitle);
    // setOpen(false);
    setIsDialogOpen?.(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="default"
            className="w-full flex space-x-1"
          >
            <PlusIcon />
            <span>New Organization</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
              <OrganizationIcon className=" w-6 h-6" />
            </div>
            <div className="p-1">
              <DialogTitle className="text-lg">Create Organization</DialogTitle>
              <DialogDescription className="text-base mt-0">
                Create a new organization and get started.
              </DialogDescription>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <Label className="text-muted-foreground">Organization Name</Label>
              <Input
                value={organizationTitle}
                onChange={(event) => {
                  setOrganizationTitle(event.target.value);
                }}
                required
                className="mt-1.5 shadow appearance-none border h-11 rounded-lg w-full py-2 px-3 focus:ring-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base"
                id="name"
                type="text"
                placeholder="Organization Name"
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
                  setIsDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                Create Organization
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
