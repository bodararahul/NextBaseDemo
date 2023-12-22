import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const outlineColorClasses = (color: string) => `
  border-2 border-${color}-400 text-sm bg-${color}-100 hover:bg-${color}-200 text-${color}-700 rounded-full hover:text-${color}-900
`;

const buttonVariants = cva(
  'inline-flex items-center justify-center font-[600] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'bg-gray-900 text-sm  text-white rounded-lg hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300',
        destructive:
          'bg-destructive dark:bg-red-800 dark:hover:bg-red-700  text-base  text-destructive-foreground rounded-lg hover:bg-destructive/90',
        outline:
          'border border-gray-300  dark:border-slate-700  dark:bg-gray-800/60 text-sm text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-gray-100',
        outlineColor: outlineColorClasses('{color}'),
        secondary:
          'bg-secondary text-secondary-foreground  text-base rounded-lg hover:bg-secondary/80',
        ghost:
          'hover:bg-accent  text-base rounded-lg hover:text-accent-foreground',
        success:
          'bg-green-600   text-base  text-white rounded-lg hover:bg-green-500',
        warning:
          'bg-yellow-500 text-base text-white rounded-lg hover:bg-yellow-400',
        info: 'bg-blue-500 text-base text-white rounded-lg hover:bg-blue-400',
        primaryLink:
          'underline-offset-4 text-base rounded-lg shadow-none group-hover:underline text-primary dark:text-slate-500',
        secondaryLink:
          'underline-offset-4 text-base rounded-lg shadow-none group-hover:underline text-secondary',
        infoLink:
          'underline-offset-4 text-base rounded-lg shadow-none group-hover:underline text-blue-500',
        destructiveLink:
          'underline-offset-4 text-base rounded-lg shadow-none group-hover:underline text-destructive',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-full',
        lg: 'h-11 px-8 rounded-md',
        link: 'p-0',
        xs: 'h-7 px-2 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, ...props }, ref) => {
    const baseClass = buttonVariants({ variant, size });
    const appliedColor = color && variant === 'outlineColor' ? color : 'gray';
    const replacedColorClass = baseClass.replace(/{color}/g, appliedColor);
    return (
      <button
        className={cn(replacedColorClass, className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
