import { T } from '@/components/ui/Typography';
import { z } from 'zod';

const paramsSchema = z.object({
  projectId: z.string(),
});

export default function ProjectSettings({ params }: { params: unknown }) {
  const parsedParams = paramsSchema.parse(params);
  const { projectId } = parsedParams;
  return (
    <div className="space-y-2">
      <T.H3>Project Settings</T.H3>
      <T.Subtle>
        Add settings for your projects depending on your usecase
      </T.Subtle>
    </div>
  );
}
