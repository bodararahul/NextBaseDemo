import { Anchor } from '@/components/Anchor';

type SidebarLinkProps = {
  label: string;
  href: string;
  icon: JSX.Element;
};

export function SidebarLink({ label, href, icon }: SidebarLinkProps) {
  return (
    <div
      key={href}
      className="text-gray-500 hover:cursor-pointer dark:text-slate-400 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 group w-full flex items-center"
    >
      <div className="p-2 group-hover:text-gray-800 dark:group-hover:text-slate-300">
        {icon}
      </div>
      <Anchor
        className="p-2 w-full text-sm group-hover:text-gray-800 dark:group-hover:text-slate-300"
        href={href}
      >
        {label}
      </Anchor>
    </div>
  );
}
