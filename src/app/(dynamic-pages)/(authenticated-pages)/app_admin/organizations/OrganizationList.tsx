'use server';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import { AppAdminOrganizationsFiltersSchema } from './schema';
import { getPaginatedOrganizationList } from '@/data/admin/organizations';
import { format } from 'date-fns';
import { Anchor } from '@/components/Anchor';
import MailIcon from 'lucide-react/dist/esm/icons/mail';

export async function OrganizationList({
  filters,
}: {
  filters: AppAdminOrganizationsFiltersSchema;
}) {
  const organizations = await getPaginatedOrganizationList(filters);
  return (
    <div className="rounded-lg overflow-hidden border">
      <ShadcnTable>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Team Member Count</TableHead>

            <TableHead>Owner Name</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map((organization) => (
            <TableRow key={organization.id}>
              <TableCell>{organization.title ?? '-'}</TableCell>
              <TableCell>
                {format(new Date(organization.created_at), 'PPpp')}
              </TableCell>
              <TableCell>{organization.team_members_count ?? '-'}</TableCell>
              <TableCell>{organization.owner_full_name}</TableCell>

              <TableCell>
                <span className="flex items-center space-x-2">
                  <Anchor
                    title="Send email"
                    href={`mailto:${organization.owner_email}`}
                    target="_blank"
                  >
                    <MailIcon className="w-5 h-5" />
                  </Anchor>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
    </div>
  );
}
