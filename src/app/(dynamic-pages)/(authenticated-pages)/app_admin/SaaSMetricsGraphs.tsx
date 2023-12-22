'use client';
import React from 'react';
import {
  Card,
  Title,
  AreaChart,
  BarChart,
  BarList,
  LineChart,
  DonutChart,
} from '@tremor/react';
import { GraphContainer } from '@/components/presentational/tailwind/GraphContainer';
const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;
const mrrBarListData = [
  {
    name: 'MRR',
    value: 120,
  },
  {
    name: 'ARR',
    value: 157,
  },
  {
    name: 'ARPU',
    value: 109,
  },
  {
    name: 'LTV',
    value: 99,
  },
  {
    name: 'CAC',
    value: 132,
  },
];

export function SaaSMetricsGraphs({
  churnRateData,
  mrrData,
  organizationCountByMonth,
  projectCountByMonth,
  userCountByMonth,
}: {
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
  return (
    <div className="flex flex-col space-y-2 mt-12 ">
      <p className="text-2xl font-bold mb-2">Admin Analytics</p>
      <div className="grid grid-cols-2 grid-flow-row auto-rows-max w-full gap-10 ">
        <GraphContainer
          title="Monthly Churn Rate"
          subTitle="Monthly recurring revenue"
        >
          <AreaChart
            className="h-72 mt-4"
            data={mrrData}
            index="month"
            categories={['mrr']}
            colors={['blue']}
          />
        </GraphContainer>
        <GraphContainer
          title="MRR Analytics"
          subTitle="Monthly churn rate vs Organization Count"
        >
          <DonutChart
            className="mt-6"
            data={mrrData.map((item) => {
              return {
                ...item,
                mrr: Number.parseInt(item.mrr),
              };
            })}
            index="month"
            category="mrr"
            colors={[
              'slate',
              'violet',
              'indigo',
              'rose',
              'cyan',
              'amber',
              'green',
              'orange',
              'pink',
              'pink',
              'pink',
              'green',
              'orange',
              'pink',
            ]}
          />
        </GraphContainer>
      </div>

      <div>
        <p className="text-2xl mt-10 mb-2 font-bold">All Stats</p>
      </div>

      <div className="grid grid-cols-3 grid-flow-row auto-rows-max gap-10">
        <GraphContainer
          title="Organizations by month"
          subTitle="Number of organizations"
        >
          <BarChart
            className="h-72 mt-4"
            data={mrrData}
            index="month"
            categories={['mrr']}
            colors={['blue']}
          />
        </GraphContainer>
        <GraphContainer title="Projects by Month" subTitle="Number of projects">
          <LineChart
            className="h-72 mt-4"
            data={mrrData}
            index="month"
            categories={['mrr']}
            colors={['blue']}
          />
        </GraphContainer>
        <GraphContainer title="User by month" subTitle="Number of users">
          <BarList data={mrrBarListData} className="mt-4" />
        </GraphContainer>
      </div>
    </div>
  );
}
