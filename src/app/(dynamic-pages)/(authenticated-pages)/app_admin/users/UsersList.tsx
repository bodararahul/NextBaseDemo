'use server';

import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { getPaginatedUserList } from '@/data/admin/user';
import { AppAdminUserFiltersSchema } from './schema';
import CheckIcon from 'lucide-react/dist/esm/icons/check';
import CloseIcon from 'lucide-react/dist/esm/icons/x';
import MailIcon from 'lucide-react/dist/esm/icons/mail';
import { format } from 'date-fns';
import { T } from '@/components/ui/Typography';
import { ConfirmSendLoginLinkDialog } from './ConfirmSendLoginLinkDialog';
import { GetLoginLinkDialog } from './GetLoginLinkDialog';
import { Suspense } from 'react';
export async function UserList({
  filters,
}: {
  filters: AppAdminUserFiltersSchema;
}) {
  const users = await getPaginatedUserList(filters);
  return (
    <div className="space-y-2 rounded-lg border" style={{ overflowX: 'auto' }}>
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
              <TableCell> {user.full_name ?? '-'} </TableCell>
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
                <Suspense>
                  <ConfirmSendLoginLinkDialog userEmail={user.email} />
                </Suspense>
              </TableCell>
              <TableCell>
                <Suspense>
                  <GetLoginLinkDialog userId={user.id} />
                </Suspense>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
    </div>
  );
}
