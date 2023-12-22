import { Search } from '@/components/Search';
import { appAdminUserFiltersSchema } from './schema';
import { Suspense } from 'react';
import { UserList } from './UsersList';
import Pagination from '@/components/Pagination/Pagination';
import { getUsersTotalPages } from '@/data/admin/user';
import { AppAdminCreateUserDialog } from './AppAdminCreateUserDialog';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';

export const metadata = {
  title: 'User List | Admin Panel | Nextbase',
};

export default async function AdminUsersListPage({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const validatedSearchParams = appAdminUserFiltersSchema.parse(searchParams);
  const suspenseKey = JSON.stringify(validatedSearchParams);
  const totalPages = await getUsersTotalPages(validatedSearchParams);
  return (
    <div className="space-y-4 max-w-[1296px]">
      <PageHeading
        title="Users"
        subTitle="View all users in your app. Perform actions such as creating new users, sending users login links, debug bugs your users face by logging in as them and more!"
      ></PageHeading>
      <div className="flex space-x-3  justify-between">
        <Search placeholder="Search Users... " />
        <AppAdminCreateUserDialog />
      </div>
      <Suspense key={suspenseKey} fallback={<div>Loading...</div>}>
        <UserList filters={validatedSearchParams} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
