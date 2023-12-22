import { Search } from '@/components/Search';
import Pagination from '@/components/Pagination/Pagination';
import { Suspense } from 'react';
import { getOrganizationsTotalPages } from '@/data/admin/organizations';
import { appAdminOrganizationsFiltersSchema } from './schema';
import { OrganizationList } from './OrganizationList';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';

export const metadata = {
  title: 'Organizations List | Admin Panel | Nextbase',
};

export default async function AdminOrganizationsList({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const validatedSearchParams =
    appAdminOrganizationsFiltersSchema.parse(searchParams);
  const totalPages = await getOrganizationsTotalPages(validatedSearchParams);
  const suspenseKey = JSON.stringify(validatedSearchParams);

  return (
    <div className="space-y-4 max-w-[1296px]">
      <PageHeading
        title="Organizations"
        subTitle="View all organizations created by users in your app."
      ></PageHeading>
      <div className="flex space-x-3  justify-between">
        <Search placeholder="Search Organizations... " />
        <div />
      </div>
      <Suspense key={suspenseKey} fallback={<div>Loading...</div>}>
        <OrganizationList filters={validatedSearchParams} />
        <div />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
