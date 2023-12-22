import { z } from 'zod';
import { Suspense } from 'react';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { OrganizationPageHeading } from './OrganizationPageHeading';
import { OrganizationGraphs } from './OrganizationGraphs';
import { CreateProjectDialog } from '@/components/presentational/tailwind/CreateProjectDialog';
import { T } from '@/components/ui/Typography';
import InfoIcon from 'lucide-react/dist/esm/icons/info';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import { getProjects } from '@/data/user/projects';
import { ProjectsTable } from '@/components/presentational/tailwind/Projects/ProjectsTable';

const paramsSchema = z.object({
  organizationId: z.coerce.string(),
});

async function Projects({ organizationId }: { organizationId: string }) {
  const projects = await getProjects({ organizationId, teamId: null });
  return <ProjectsTable projects={projects} />;
}

export default async function OrganizationPage({
  params,
}: {
  params: unknown;
}) {
  const parsedParams = paramsSchema.parse(params);
  const { organizationId } = parsedParams;

  return (
    <div className="">
      <div className="space-y-0 block lg:hidden">
        <Suspense
          fallback={
            <PageHeading
              title={'Loading...'}
              isLoading
              titleHref={`/organization/${organizationId}`}
            />
          }
        >
          <OrganizationPageHeading organizationId={organizationId} />
        </Suspense>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2 justify-start items-center">
            <div>
              <div className="flex gap-3 items-center">
                <T.H3 className="mt-0">Projects</T.H3>{' '}
                <Dialog>
                  <DialogTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200" />
                  </DialogTrigger>
                  <DialogContent className="w-128 dark:bg-slate-900 bg-white border border-gray-300 dark:border-gray-700">
                    <T.H2>Projects</T.H2>
                    <T.P className="text-muted-foreground">
                      Projects are adaptable to diverse business usecases. For
                      example, they could be tasks in a project management app,
                      customer profiles in a CRM system, or appointments in a
                      scheduling app.
                    </T.P>
                  </DialogContent>
                </Dialog>
              </div>
              <T.P className="text-muted-foreground leading-6">
                You can create projects within teams, or within your
                organization.
              </T.P>
            </div>
          </div>
          <CreateProjectDialog organizationId={organizationId} teamId={null} />
        </div>
        <Suspense
          fallback={
            <div className="flex justify-center items-center">
              <T.Subtle>Loading Projects...</T.Subtle>
            </div>
          }
        >
          <Projects organizationId={organizationId} />
        </Suspense>
      </div>
      <div>
        <Suspense>
          <OrganizationGraphs />
        </Suspense>
      </div>
    </div>
  );
}
