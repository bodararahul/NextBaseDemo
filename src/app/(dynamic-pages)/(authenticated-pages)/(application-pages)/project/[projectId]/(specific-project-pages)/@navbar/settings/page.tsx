import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { z } from 'zod';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';

const paramsSchema = z.object({
  projectId: z.string(),
});

export default function ProjectSettingsNavbar({ params }: { params: unknown }) {
  const { projectId } = paramsSchema.parse(params);
  return (
    <div className={cn('hidden lg:block', 'relative ')}>
      <Anchor
        className="flex gap-1.5 py-1.5 px-3 cursor-pointer items-center group rounded-md transition hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
        href={`/project/${projectId}`}
      >
        <ArrowLeftIcon className="w-4 h-4 text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300" />
        <p className="text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300 text-sm font-normal">
          Back to Project
        </p>
      </Anchor>
    </div>
  );
}
