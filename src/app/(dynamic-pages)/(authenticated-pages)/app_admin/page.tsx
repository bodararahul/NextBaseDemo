import { T } from '@/components/ui/Typography';
import { stripe } from '@/utils/stripe';
import { SaaSMetrics } from './SaasMetrics';
import { Suspense } from 'react';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';

async function getCurrentMRR() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(
    startOfMonth.getFullYear(),
    startOfMonth.getMonth() + 1,
    1,
  );

  const subscriptions = await stripe.subscriptions.list({
    created: {
      gte: Math.floor(startOfMonth.getTime() / 1000),
      lt: Math.floor(endOfMonth.getTime() / 1000),
    },
    status: 'all',
  });

  let mrr = 0;
  subscriptions.data.forEach((sub) => {
    if (sub.status === 'active' || sub.status === 'trialing') {
      mrr +=
        ((sub.items.data[0].price.unit_amount ?? 0) *
          (sub.items.data[0].quantity ?? 0)) /
        100;
    }
  });

  return mrr.toFixed(2);
}

async function getMRR() {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const monthlyMRR: { month: string; mrr: string }[] = [];

  for (let i = 0; i <= 12; i++) {
    const startOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      1,
    );
    const endOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i + 1,
      1,
    );

    const subscriptions = await stripe.subscriptions.list({
      created: {
        gte: Math.floor(startOfMonth.getTime() / 1000),
        lt: Math.floor(endOfMonth.getTime() / 1000),
      },
      status: 'all',
    });

    let mrr = 0;
    subscriptions.data.forEach((sub) => {
      if (sub.status === 'active' || sub.status === 'trialing') {
        mrr +=
          ((sub.items.data[0].price.unit_amount ?? 0) *
            (sub.items.data[0].quantity ?? 0)) /
          100;
      }
    });

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
    const endOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i + 1,
      1,
    );

    const subscriptionsCreated = await stripe.subscriptions.list({
      created: {
        gte: Math.floor(startOfMonth.getTime() / 1000),
        lt: Math.floor(endOfMonth.getTime() / 1000),
      },
      status: 'all',
    });

    const canceledSubscriptions = subscriptionsCreated.data.filter(
      (sub) => sub.status === 'canceled',
    );

    const churnRate =
      (canceledSubscriptions.length / (subscriptionsCreated.data.length || 1)) *
      100;

    monthlyChurnRates.push({
      month: startOfMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      churnRate: churnRate.toFixed(2),
    });
  }

  return monthlyChurnRates;
}

async function getTotalUserCount() {
  const { data } = await supabaseAdminClient.rpc(
    'app_admin_get_total_user_count',
  );
  return data ?? 0;
}

async function getTotalOrganizationsCount() {
  const { data } = await supabaseAdminClient.rpc(
    'app_admin_get_total_organization_count',
  );
  return data ?? 0;
}

async function getTotalProjectsCount() {
  const { data } = await supabaseAdminClient.rpc(
    'app_admin_get_total_project_count',
  );
  return data ?? 0;
}

async function getOrganizationCountByMonth() {
  const { data } = await supabaseAdminClient.rpc(
    'app_admin_get_organizations_created_per_month',
  );
  if (!data) {
    return [];
  }
  const formattedData = data.map((d) => ({
    ...d,
    month: new Date(d.month).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  }));
  return formattedData;
}

async function getProjectCountByMonth() {
  const { data, error } = await supabaseAdminClient.rpc(
    'app_admin_get_projects_created_per_month',
  );

  if (!data) {
    return [];
  }
  const formattedData = data.map((d) => ({
    ...d,
    month: new Date(d.month).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  }));
  return formattedData;
}

async function getUserCountByMonth() {
  const { data } = await supabaseAdminClient.rpc(
    'app_admin_get_users_created_per_month',
  );
  if (!data) {
    return [];
  }
  const formattedData = data.map((d) => ({
    ...d,
    month: new Date(d.month).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  }));
  return formattedData;
}

async function getActiveUsers() {
  const { data } = await supabaseAdminClient.rpc(
    'app_admin_get_recent_30_day_signin_count',
  );
  return data ?? 0;
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
  const { data, error } = await supabaseAdminClient
    .from('user_profiles')
    .select('id');

  if (error) {
    throw error;
  }

  const totalUserCount = String(data.length);

  return (
    <div className="bg-gray-200/30 dark:bg-gray-800/40 rounded-xl gap-2 p-16 flex items-center flex-col-reverse">
      <T.P>Total Users</T.P>
      <T.H1>{totalUserCount}</T.H1>
    </div>
  );
}

async function TotalOrganizationCount() {
  const { data, error } = await supabaseAdminClient
    .from('organizations')
    .select('id');

  if (error) {
    throw error;
  }

  const totalOrganizationCount = String(data.length);
  return (
    <div className="bg-gray-200/30 dark:bg-gray-800/40 rounded-xl gap-2 p-16 flex items-center flex-col-reverse">
      <T.P>Total Organizations</T.P>
      <T.H1>{totalOrganizationCount}</T.H1>
    </div>
  );
}

export default async function AdminPanel() {
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
