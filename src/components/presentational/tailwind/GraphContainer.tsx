import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';

type GraphContainerProps = {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  classname?: string;
};

export function GraphContainer({
  title,
  subTitle,
  children,
  classname,
}: GraphContainerProps) {
  return (
    <div className={cn('border rounded-xl overflow-hidden', classname)}>
      <div className="px-[18px] bg-gray-200/30 dark:bg-slate-800/50 border-b py-4 w-full ">
        <T.H4 className="mt-0 text-base">{title}</T.H4>
        <T.P className="text-gray-600 dark:text-slate-400 text-base">
          {subTitle}
        </T.P>
      </div>
      <div className="px-5 py-3 h-full ">
        <div className=" bg-white dark:bg-slate-900 h-full ">{children}</div>
      </div>
    </div>
  );
}
