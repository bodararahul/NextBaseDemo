'use client';
import { GraphContainer } from '@/components/presentational/tailwind/GraphContainer';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { T } from '@/components/ui/Typography';
import {
  Card,
  Title,
  AreaChart,
  BarChart,
  BarList,
  LineChart,
  DonutChart,
  Bold,
  Flex,
  Text,
} from '@tremor/react';

const chartdata = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
  },
  {
    date: 'July 22',
    SemiAnalysis: 3482,
    'The Pragmatic Engineer': 2444,
  },
  {
    date: 'Aug 22',
    SemiAnalysis: 2412,
    'The Pragmatic Engineer': 2122,
  },
  {
    date: 'Sep 22',
    SemiAnalysis: 2678,
    'The Pragmatic Engineer': 1896,
  },
];

const barListData = [
  {
    name: 'Jan 22',
    value: 2890,
  },
  {
    name: 'Feb 22',
    value: 2756,
  },
  {
    name: 'Mar 22',
    value: 3322,
  },
  {
    name: 'Apr 22',
    value: 3470,
  },
  {
    name: 'May 22',
    value: 3475,
  },
  {
    name: 'Jun 22',
    value: 3129,
  },
  {
    name: 'July 22',
    value: 3482,
  },
  {
    name: 'Aug 22',
    value: 2412,
  },
  {
    name: 'Sep 22',
    value: 2678,
  },
];

const dataFormatter = (number: number) => {
  return '$ ' + Intl.NumberFormat('us').format(number).toString();
};

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export function OrganizationGraphs() {
  return (
    <>
      <div className="mt-16 flex flex-col gap-6">
        <PageHeading
          title="Overview"
          titleClassName="text-2xl leading-none"
          subTitle="Nextbase uses Tremor charts for graphs, to visualize and interpret performance data."
          subTitleClassName="leading-6 mb-0"
        />

        <div className="w-full grid grid-cols-3 grid-flow-row auto-rows-max gap-10">
          <GraphContainer
            title="Monthly Churn Rate"
            subTitle="Monthly churn rate vs Organization Count"
          >
            <AreaChart
              className="h-72 mt-8"
              data={chartdata}
              index="date"
              categories={['SemiAnalysis', 'The Pragmatic Engineer']}
              colors={['cyan', 'orange']}
            />
          </GraphContainer>

          <GraphContainer
            title="Organizations by Month"
            subTitle="Number of organizations"
          >
            <BarChart
              className="mt-6"
              data={chartdata}
              index="date"
              categories={['SemiAnalysis', 'The Pragmatic Engineer']}
              colors={['teal', 'blue']}
              yAxisWidth={48}
            />
          </GraphContainer>
          <GraphContainer
            title="MRR Analytics"
            subTitle="Monthly recurring revenue"
          >
            <DonutChart
              className="mt-12"
              data={chartdata}
              index="date"
              category="SemiAnalysis"
              colors={[
                'blue',
                'violet',
                'indigo',
                'rose',
                'cyan',
                'amber',
                'green',
                'orange',
                'pink',
              ]}
              valueFormatter={valueFormatter}
            />
          </GraphContainer>
          <GraphContainer
            title="Projects by Month"
            subTitle="Number of projects"
          >
            <LineChart
              className="h-72 mt-4"
              data={chartdata}
              index="date"
              categories={['SemiAnalysis', 'The Pragmatic Engineer']}
              colors={['cyan', 'orange']}
            />
          </GraphContainer>
          <GraphContainer title="Users by Month" subTitle="Number of user">
            <BarList data={barListData} className="mt-2" />
          </GraphContainer>
          <GraphContainer
            title="Visitor Rate"
            subTitle="Number of visitors vs Organization Count"
          >
            <AreaChart
              className="h-72 mt-12"
              data={chartdata}
              index="date"
              categories={['SemiAnalysis', 'The Pragmatic Engineer']}
              colors={['cyan', 'orange']}
            />
          </GraphContainer>
        </div>
      </div>
    </>
  );
}
