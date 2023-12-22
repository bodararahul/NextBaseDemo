import { Anchor } from '@/components/Anchor';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import { ProjectsListContainer } from '@/components/presentational/tailwind/ProjectsListContainer';
import { getTeamsInOrganization } from '@/data/user/teams';
import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import { CreateTeamDialog } from '@/components/presentational/tailwind/CreateTeamDialog';

export const OrganizationTeams = async ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const teams = await getTeamsInOrganization(organizationId);
  return (
    <div>
      <div className="sm:flex sm:items-center justify-between">
        <div className="sm:flex-auto max-w-[680px]">
          <div className="flex pt-8 justify-between items-baseline">
            <T.H3 className="my-0">Teams</T.H3>{' '}
            <CreateTeamDialog organizationId={organizationId} />
          </div>
          <Dialog>
            <DialogTrigger>
              <T.Subtle className="text-xs">What are teams?</T.Subtle>
            </DialogTrigger>
            <DialogContent className="min-w-[300px] w-full max-w-[900px] p-8">
              <div className="w-full">
                <T.H2>What are Teams?</T.H2>
                <div className="space-y-2">
                  <T.P>
                    Think of teams as sub-organizations or folders. You can use
                    them to divide your organizations into smaller groups. You
                    can use them as folders to group your projects together.
                  </T.P>
                  <T.P>
                    Teams can help you stay organized. They however do not have
                    their own billing or subscription. They are just a way to
                    organize your projects. Billing is at the organization
                    level.
                  </T.P>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {teams.length ? (
        <div className="overflow-auto max-h-[600px] shadow ring-1 mt-6 ring-black ring-opacity-5 border sm:rounded-lg">
          <ShadcnTable className="bg-white dark:bg-slate-900">
            <TableHeader>
              <TableRow>
                <TableHead>Row</TableHead>
                <TableHead>Team Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team, index) => (
                <TableRow key={team.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Anchor
                      className=" font-medium underline underline-offset-4"
                      href={`/organization/${organizationId}/team/${team.id}`}
                    >
                      {team.name}
                    </Anchor>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ShadcnTable>
        </div>
      ) : (
        <T.Subtle className="mt-4">
          No teams yet. Create a team to organize your projects better.
        </T.Subtle>
      )}
    </div>
  );
};
