import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center px-2 text-xs font-medium transition-colors ring-1 ring-inset focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-gray-50 dark:bg-gray-400/10 text-gray-600 dark:text-gray-400  ring-gray-500/10 dark:ring-gray-400/20',
        success:
          'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400  ring-green-600/20 dark:ring-green-500/20',
        information:
          'bg-blue-50 dark:bg-blue-400/10 text-blue-700 dark:text-blue-400  ring-blue-700/10 dark:ring-blue-400/20',
        danger:
          'bg-red-50 dark:bg-red-400/10 text-red-700 dark:text-red-400  ring-red-600/10 dark:ring-red-400/20',
        warning:
          'bg-yellow-50 dark:bg-yellow-400/10 text-yellow-800 dark:text-yellow-500  ring-yellow-600/20 dark:ring-yellow-400/20',
        discussion:
          'bg-purple-50 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400 ring-purple-500/10 dark:ring-purple-400/20',
        sky: 'bg-sky-100 dark:bg-sky-500/10 hover:dark:bg-sky-500/20 hover:bg-sky-100 text-sky-900 dark:text-sky-500',
        indigo:
          'bg-indigo-50 dark:bg-indigo-600/10 hover:dark:bg-indigo-500/20 hover:bg-indigo-200/20 text-indigo-900 dark:text-indigo-500',
        outline: 'text-foreground',
        soliddefault:
          'bg-gray-100 dark:bg-gray-400/10 text-gray-600 dark:text-gray-400 ring-0 dark:ring-0',
        solidSuccess:
          'bg-green-700 text-white group-hover:bg-green-500 dark:bg-green-600 ring-0 dark:ring-0',
        solidInformation:
          'bg-blue-700 text-white group-hover:bg-blue-500 ring-0 dark:ring-0',
        solidDanger:
          'bg-red-100 dark:bg-red-400/10 text-red-700 dark:text-red-400 ring-0 dark:ring-0',
        solidWarning:
          'bg-yellow-100 dark:bg-yellow-400/10 text-yellow-800 dark:text-yellow-400 ring-0 dark:ring-0',
        solidDiscussion:
          'bg-purple-100 dark:bg-purple-400/10 text-purple-700 dark:text-purple-400 ring-0 dark:ring-0',
        solidSky:
          'bg-sky-700 text-white group-hover:bg-sky-500 dark:bg-sky-800 ring-0 dark:ring-0',
        solidIndigo:
          'bg-indigo-700 text-white group-hover:bg-indigo-500 dark:bg-indigo-800 ring-0 dark:ring-0',
      },
      size: {
        default: 'h-10 py-3 px-4 rounded-md',
        sm: 'h-8 rounded-lg',
        lg: 'h-11 rounded-md',
        link: 'p-0 rounded-full',
        xs: 'h-7 px-3 py-0 rounded-full text-xs',
        xxs: 'h-6 px-2 py-0 rounded-md text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
