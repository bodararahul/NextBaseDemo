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
import { Enum } from '@/types';
import { OrganizationMemberRoleSelect } from '@/components/presentational/tailwind/OrganizationMemberRoleSelect';
import AddUserIcon from 'lucide-react/dist/esm/icons/user-plus';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

type Props = {
  onInvite: (email: string, role: Enum<'organization_member_role'>) => void;
  isLoading: boolean;
};

export const InviteOrganizationMemberDialog = ({
  onInvite,
  isLoading,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Enum<'organization_member_role'>>('member');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="default">
          <AddUserIcon className="mr-2 w-5 h-5" />
          Invite user{' '}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
            <AddUserIcon className=" w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Invite user</DialogTitle>
            <DialogDescription className="text-base mt-0">
              Invite a user to your organization.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onInvite(email, role);
            setEmail('');
            setOpen(false);
          }}
        >
          <div className="mb-8">
            <div className="flex flex-col space-y-2 justify-start w-full mb-4">
              <Label className="text-muted-foreground">Select a role</Label>
              <OrganizationMemberRoleSelect
                value={role}
                onChange={(newRole) => setRole(newRole)}
              />
            </div>
            <Label className="text-muted-foreground">Enter Email</Label>
            <Input
              className="mt-1.5 shadow appearance-none border h-11 rounded-lg w-full py-2 px-3 focus:ring-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              disabled={isLoading}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
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
              {isLoading ? 'Inviting User' : 'Invite'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
