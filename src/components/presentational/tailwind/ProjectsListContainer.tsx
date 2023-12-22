import { T } from '@/components/ui/Typography';

type ProjectsListContainerProps = {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export function ProjectsListContainer({
  title,
  subTitle,
  children,
  actions,
}: ProjectsListContainerProps) {
  return (
    <div className="border rounded-xl bg-gray-200/10 dark:bg-slate-950/40">
      <div className="pb-8 sm:px-8 lg:px-8">
        <div className="sm:flex sm:items-center justify-between">
          <div className="sm:flex-auto max-w-[680px]">
            <T.H3>{title}</T.H3>
            <T.P className="text-muted-foreground">{subTitle}</T.P>
          </div>
          {actions}
        </div>
        {children}
      </div>
    </div>
  );
}
