'use client';
import { ConfirmApproveProjectDialog } from './ConfirmApproveProjectDialog';
import { ConfirmMarkProjectAsCompleteDialog } from './ConfirmMarkProjectAsCompleteDialog';
import { ConfirmRejectProjectDialog } from './ConfirmRejectProjectDialog';
import { SubmitProjectForApprovalDialog } from './SubmitProjectForApprovalDialog';
import { T } from '@/components/ui/Typography';
import {
  approveProjectAction,
  markProjectAsCompletedAction,
  rejectProjectAction,
  submitProjectForApprovalAction,
} from '@/data/user/projects';
import { useToastMutation } from '@/hooks/useToastMutation';
import { Enum } from '@/types';

export function ApprovalControlActions({
  projectId,
  canManage,
  canOnlyEdit,
  projectStatus,
}: {
  projectId: string;
  canManage: boolean;
  canOnlyEdit: boolean;
  projectStatus: Enum<'project_status'>;
}) {
  const { mutate: submitProjectForApproval } = useToastMutation(
    async () => {
      await submitProjectForApprovalAction(projectId);
    },
    {
      loadingMessage: 'Submitting project for approval...',
      errorMessage: 'Failed to submit project for approval',
      successMessage: 'Project submitted for approval!',
    },
  );
  const { mutate: markProjectAsCompleted } = useToastMutation(
    async () => {
      await markProjectAsCompletedAction(projectId);
    },
    {
      loadingMessage: 'Marking project as complete...',
      errorMessage: 'Failed to mark project as complete',
      successMessage: 'Project marked as complete!',
    },
  );
  const { mutate: approveProject } = useToastMutation(
    async () => {
      await approveProjectAction(projectId);
    },
    {
      loadingMessage: 'Approving project...',
      errorMessage: 'Failed to approve project',
      successMessage: 'Project approved!',
    },
  );
  const { mutate: rejectProject } = useToastMutation(
    async () => {
      await rejectProjectAction(projectId);
    },
    {
      loadingMessage: 'Rejecting project...',
      errorMessage: 'Failed to reject project',
      successMessage: 'Project rejected!',
    },
  );

  return (
    <>
      {projectStatus === 'draft' ? (
        canManage ? (
          <ConfirmMarkProjectAsCompleteDialog
            onConfirm={markProjectAsCompleted}
          />
        ) : canOnlyEdit ? (
          <>
            <SubmitProjectForApprovalDialog
              onSubmit={submitProjectForApproval}
            />
          </>
        ) : null
      ) : null}
      {!canManage && projectStatus === 'pending_approval' ? (
        <T.P className="text-green-600 italic text-xs">Awaiting approval</T.P>
      ) : null}
      {canManage && projectStatus === 'pending_approval' && (
        <>
          <ConfirmApproveProjectDialog onConfirm={approveProject} />
          <ConfirmRejectProjectDialog onConfirm={rejectProject} />
        </>
      )}
      {projectStatus === 'approved' && canManage ? (
        <ConfirmMarkProjectAsCompleteDialog
          onConfirm={markProjectAsCompleted}
        />
      ) : null}
    </>
  );
}
