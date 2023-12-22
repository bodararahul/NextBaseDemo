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
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Plus from 'lucide-react/dist/esm/icons/plus';
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useToastMutation } from '@/hooks/useToastMutation';
import { createUserAction } from '@/data/admin/user';
import { useInput } from 'rooks';
import { z } from 'zod';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useRouter } from 'next/navigation';

export const AppAdminCreateUserDialog = () => {
  const emailInput = useInput('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate: createUser, isLoading } = useToastMutation<
    User,
    unknown,
    string
  >(
    async (email) => {
      return await createUserAction(email);
    },
    {
      loadingMessage: 'Creating user...',
      successMessage: 'User created!',
      errorMessage: 'Failed to create user',
      onSuccess: () => {
        setOpen(false);
        router.refresh();
      },
    },
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="mr-2" /> Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <Plus className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Create User</DialogTitle>
            <DialogDescription className="text-base">
              Create a new user by entering their email address.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="grid gap-4">
          <Label className="space-y-2">
            <span>Email</span>
            <Input type="email" name="email" {...emailInput} />
          </Label>
        </div>
        <DialogFooter className="mt-8">
          <Button
            onClick={() => {
              try {
                const validEmail = z.string().email().parse(emailInput.value);
                createUser(validEmail);
              } catch (error) {
                const message = getErrorMessage(error);
                toast.error(message);
              }
            }}
            aria-disabled={isLoading}
            type="button"
            className="w-full"
          >
            {isLoading ? 'Loading...' : 'Create User'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
