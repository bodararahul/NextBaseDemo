import { T } from '@/components/ui/Typography';
import { Suspense } from 'react';
import { SaaSMetrics } from '../app_admin/SaasMetrics';

async function getCurrentMRR() {
  const mrr = 48975;

  return mrr.toFixed(2);
}

async function getMRR() {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const monthlyMRR: { month: string; mrr: string }[] = [];
  let mrr = 15000;

  for (let i = 0; i <= 12; i++) {
    const startOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      1,
    );

    // increment mrr by 10% each month
    mrr = mrr * 1.1;

    // what is the mrr on the last month

    monthlyMRR.push({
      month: startOfMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      mrr: mrr.toFixed(2),
    });
  }

  return monthlyMRR;
}

async function getChurnRate() {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const monthlyChurnRates: Array<{
    month: string;
    churnRate: string;
  }> = [];

  for (let i = 0; i <= 12; i++) {
    const startOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      1,
    );

    // Generate random churn rate between 1 and 10
    const churnRate = (Math.random() * (10 - 1) + 1).toFixed(2);

    monthlyChurnRates.push({
      month: startOfMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      churnRate: churnRate,
    });
  }

  return monthlyChurnRates;
}

async function getTotalProjectsCount() {
  return 22000;
}

async function getOrganizationCountByMonth() {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const monthlyOrganizationCounts: Array<{
    month: string;
    number_of_organizations: number;
  }> = [];

  for (let i = 0; i <= 12; i++) {
    const startOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      1,
    );

    // Generate random organization count between 100 and 1000
    const organizationCount = Math.floor(Math.random() * (1000 - 100) + 100);

    monthlyOrganizationCounts.push({
      month: startOfMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      number_of_organizations: organizationCount,
    });
  }

  return monthlyOrganizationCounts;
}

async function getProjectCountByMonth() {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const monthlyProjectCounts: Array<{
    month: string;
    number_of_projects: number;
  }> = [];

  for (let i = 0; i <= 12; i++) {
    const startOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      1,
    );

    // Generate random project count between 100 and 1000
    const projectCount = Math.floor(Math.random() * (1000 - 100) + 100);

    monthlyProjectCounts.push({
      month: startOfMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      number_of_projects: projectCount,
    });
  }

  return monthlyProjectCounts;
}

async function getUserCountByMonth() {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const monthlyUserCounts: Array<{
    month: string;
    number_of_users: number;
  }> = [];

  for (let i = 0; i <= 12; i++) {
    const startOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      1,
    );

    // Generate random user count between 100 and 1000
    const userCount = Math.floor(Math.random() * (1000 - 100) + 100);

    monthlyUserCounts.push({
      month: startOfMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      number_of_users: userCount,
    });
  }

  return monthlyUserCounts;
}

async function getActiveUsers() {
  return 120000;
}

async function ActiveUsers() {
  const activeUsers = await getActiveUsers();

  return (
    <div className="bg-gray-200/30 dark:bg-gray-800/40 rounded-xl gap-2 p-16 flex items-center flex-col-reverse">
      <T.P>Active Users (30 days)</T.P>
      <T.H1>{activeUsers}</T.H1>
    </div>
  );
}

async function Metrics() {
  const [
    mrr,
    churnRate,
    organizationCountByMonth,
    projectCountByMonth,
    userCountByMonth,
  ] = await Promise.all([
    getMRR(),
    getChurnRate(),
    getOrganizationCountByMonth(),
    getProjectCountByMonth(),
    getUserCountByMonth(),
  ]);

  return (
    <SaaSMetrics
      mrrData={mrr}
      churnRateData={churnRate}
      organizationCountByMonth={organizationCountByMonth}
      projectCountByMonth={projectCountByMonth}
      userCountByMonth={userCountByMonth}
    />
  );
}

async function TotalProjectCount() {
  const totalProjectsCount = await getTotalProjectsCount();

  return (
    <div className="bg-gray-200/30 dark:bg-gray-800/40 rounded-xl gap-2 p-16 flex items-center flex-col-reverse">
      <T.P>Total Projects</T.P>
      <T.H1>{totalProjectsCount}</T.H1>
    </div>
  );
}

async function CurrentMRR() {
  const [currentMRR] = await Promise.all([getCurrentMRR()]);

  return (
    <div className="bg-gray-200/30 dark:bg-gray-800/40 rounded-xl gap-2 p-16 flex items-center flex-col-reverse">
      <T.P>Current MRR</T.P>
      <T.H1>{`$${currentMRR}`}</T.H1>
    </div>
  );
}

async function TotalUserCount() {
  const totalUserCount = String(593045);

  return (
    <div className="bg-gray-200/30 dark:bg-gray-800/40 rounded-xl gap-2 p-16 flex items-center flex-col-reverse">
      <T.P>Total Users</T.P>
      <T.H1>{totalUserCount}</T.H1>
    </div>
  );
}

async function TotalOrganizationCount() {
  const totalOrganizationCount = String(890091);
  return (
    <div className="bg-gray-200/30 dark:bg-gray-800/40 rounded-xl gap-2 p-16 flex items-center flex-col-reverse">
      <T.P>Total Organizations</T.P>
      <T.H1>{totalOrganizationCount}</T.H1>
    </div>
  );
}

export default async function AppAdminPanel() {
  return (
    <div className="space-y-4">
      <Suspense>
        <Metrics />
      </Suspense>
      <div>
        <T.P className="text-2xl mt-10 mb-2 font-bold">Quick Stats</T.P>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <Suspense>
          <CurrentMRR />
        </Suspense>
        <Suspense>
          <TotalUserCount />
        </Suspense>
        <Suspense>
          <TotalOrganizationCount />
        </Suspense>
        <Suspense>
          <TotalProjectCount />
        </Suspense>

        <Suspense>
          <ActiveUsers />
        </Suspense>
      </div>
    </div>
  );
}
