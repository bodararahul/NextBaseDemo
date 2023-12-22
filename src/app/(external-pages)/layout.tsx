import OneTap from '@/components/OneTap';
import { ExternalNavigation } from './ExternalNavigation';

export const dynamic = 'force-static';
export const revalidate = 60;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ExternalNavigation />
      <OneTap />
      {children}
    </div>
  );
}
