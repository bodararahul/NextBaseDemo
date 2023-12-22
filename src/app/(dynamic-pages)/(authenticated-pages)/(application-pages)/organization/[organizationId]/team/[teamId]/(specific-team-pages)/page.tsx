import { z } from 'zod';
import { getProjects } from '@/data/user/projects';
import { ProjectsTable } from '@/components/presentational/tailwind/Projects/ProjectsTable';
import { Suspense } from 'react';
import { CreateProjectDialog } from '@/components/presentational/tailwind/CreateProjectDialog';
import { T } from '@/components/ui/Typography';

const paramsSchema = z.object({
  teamId: z.coerce.number(),
  organizationId: z.string(),
});

async function Projects({
  teamId,
  organizationId,
}: {
  organizationId: string;
  teamId: number;
}) {
  const projects = await getProjects({ organizationId, teamId });

  return <ProjectsTable projects={projects} />;
}

export default async function TeamPage({
  params,
}: {
  params: {
    teamId: string;
  };
}) {
  const parsedParams = paramsSchema.parse(params);
  const { teamId, organizationId } = parsedParams;
  return (
    <div className="">
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <T.H3 className="mt-0 leading-none">Projects</T.H3>
          <CreateProjectDialog organizationId={organizationId} teamId={null} />
        </div>
        <Suspense fallback={<T.Subtle>Loading projects...</T.Subtle>}>
          <Projects teamId={teamId} organizationId={organizationId} />
        </Suspense>
      </div>
    </div>
  );
}
