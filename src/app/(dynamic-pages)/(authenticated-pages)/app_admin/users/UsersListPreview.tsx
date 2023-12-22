import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/Dialog';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { T } from '@/components/ui/Typography';
import CheckIcon from 'lucide-react/dist/esm/icons/check';
import CloseIcon from 'lucide-react/dist/esm/icons/x';
import MailIcon from 'lucide-react/dist/esm/icons/mail';
import { format } from 'date-fns';
export const UsersListPreview = () => {
  const users = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    full_name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    is_app_admin: Math.random() > 0.5,
    created_at: new Date(),
    is_confirmed: Math.random() > 0.5,
  }));

  return (
    <div
      className="space-y-2 rounded-lg border [&_a]:pointer-events-none"
      style={{ overflowX: 'auto' }}
    >
      <ShadcnTable>
        <TableHeader>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Confirmed</TableCell>
            <TableCell>Contact User</TableCell>
            <TableCell>Send Login Link</TableCell>
            <TableCell>Debug</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.is_app_admin ? (
                  <CheckIcon className="text-green-500 dark:text-green-400" />
                ) : (
                  <CloseIcon className="text-red-500 dark:text-red-400" />
                )}
              </TableCell>
              <TableCell>{format(new Date(user.created_at), 'PPpp')}</TableCell>
              <TableCell>
                {' '}
                {user.is_confirmed ? (
                  <CheckIcon className="text-green-500 dark:text-green-400" />
                ) : (
                  <CloseIcon className="text-red-500 dark:text-red-400" />
                )}
              </TableCell>
              <TableCell>
                <span className="flex items-center space-x-4">
                  <a
                    title="Contact User by email"
                    className="flex items-center "
                    href={`mailto:${user.email}`}
                    target="_blank"
                  >
                    <MailIcon className="h-5 w-5 mr-2 " />{' '}
                    <T.Small className=" font-medium underline underline-offset-4 ">
                      Contact User by email
                    </T.Small>
                  </a>
                </span>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="primaryLink"
                      className="text-sm font-medium underline underline-offset-4 "
                    >
                      Send login link
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="space-y-2">
                      <T.P>Login in link sent</T.P>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="default"
                            className="w-full"
                          >
                            Ok
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="primaryLink"
                      className="text-sm font-medium underline underline-offset-4 "
                    >
                      Get login link
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="space-y-2">
                      <T.P>Login in link copied!</T.P>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="default"
                            className="w-full"
                          >
                            Ok
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
    </div>
  );
};
