'use client';
import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import Check from 'lucide-react/dist/esm/icons/check';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import Pen from 'lucide-react/dist/esm/icons/pen-tool';
import ThumbsUp from 'lucide-react/dist/esm/icons/thumbs-up';
import Timer from 'lucide-react/dist/esm/icons/timer';
import moment from 'moment';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import { Badge } from '@/components/ui/Badge';

export const ProjectsTable = ({
  projects,
}: {
  projects: Table<'projects'>[];
}) => {
  if (projects.length === 0) {
    return (
      <T.P className="text-muted-foreground my-6">
        🔍 No matching projects found.
      </T.P>
    );
  }
  return (
    <div className="mt-6 flow-root">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
          {/* <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"></div> */}
          {/* <div className="flex rounded-lg bg-clip-border border border-gray-200  max-w-[1296px] overflow-hidden"> */}
          <div className="border rounded-lg shadow-sm overflow-hidden dark:bg-slate-900 bg-white">
            <ShadcnTable>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Project Status</TableHead>
                  <TableHead>Created on</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <Anchor
                        href={`/project/${project.id}`}
                        className=" font-medium underline underline-offset-4 "
                      >
                        {project.name}
                      </Anchor>
                    </TableCell>

                    <TableCell>
                      {/* Add your project status rendering logic here */}
                      {project.project_status === 'completed' ? (
                        <Badge size="sm" variant="success">
                          <Check size={16} className="mr-2" />
                          <T.P>Completed</T.P>
                        </Badge>
                      ) : project.project_status === 'pending_approval' ? (
                        <Badge size="sm" variant="warning">
                          <Pen size={16} className="mr-2" />
                          <T.P>Pending Approval</T.P>
                        </Badge>
                      ) : project.project_status === 'approved' ? (
                        <Badge size="sm" variant="success">
                          <ThumbsUp size={16} className="mr-2" />
                          <T.P>Approved</T.P>
                        </Badge>
                      ) : project.project_status === 'draft' ? (
                        <Badge size="sm" variant="default">
                          <Timer size={16} className="mr-2" />
                          <T.P>Draft</T.P>
                        </Badge>
                      ) : (
                        <Badge size="sm" variant="information">
                          <Timer size={16} />
                          <T.P>
                            {String(project.project_status).replace('_', ' ')}
                          </T.P>
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(project.created_at).format('LLL')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ShadcnTable>
          </div>
        </div>
      </div>
    </div>
  );
};
