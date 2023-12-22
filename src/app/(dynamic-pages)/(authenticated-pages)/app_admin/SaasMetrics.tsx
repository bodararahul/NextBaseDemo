'use client';

import dynamic from 'next/dynamic';
const SaaSMetricsGraphs = dynamic(
  () => import('./SaaSMetricsGraphs').then((mod) => mod.SaaSMetricsGraphs),
  {
    ssr: false,
  },
);

export function SaaSMetrics(props: {
  churnRateData: Array<{
    month: string;
    churnRate: string;
  }>;
  mrrData: Array<{
    month: string;
    mrr: string;
  }>;
  organizationCountByMonth: Array<{
    month: string;
    number_of_organizations: number;
  }>;
  projectCountByMonth: Array<{
    month: string;
    number_of_projects: number;
  }>;
  userCountByMonth: Array<{
    month: string;
    number_of_users: number;
  }>;
}) {
  return <SaaSMetricsGraphs {...props} />;
}
