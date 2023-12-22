'use client';
import { OnboardingModal } from './OnboardingModal';

const onboardingFeatures = [
  {
    title: 'Organisations, Teams and Invitations',
    description: (
      <p>
        Organisations, team members and team invitations is built-in. This means
        that your next SAAS project will allow your customers to manage
        organisations right off the bat. NextBase comes with Supabase configured
        with all the necessary tables to manage members of an organization.
        Every organization also has it's own Stripe plan.
      </p>
    ),
    image: '/assets/login-asset-dashboard.png',
  },
  {
    title: 'User Authentication built in',
    description: (
      <p>
        Start building your app with NextBase and you'll get a full-featured
        authentication system, out of the box. More than 15 authentication
        providers such as Google, GitHub, Twitter, Facebook, Apple, Discord etc
        are supported.
      </p>
    ),
    image: '/assets/onboardingFeatures/authentication.png',
  },
  {
    title: 'Admin Panel',
    description: (
      <p>
        Admin Panel is built in. This means that you can manage a secret area
        within your app where you can manage users and organizations, etc.
        Nextbase also comes with a maintenance mode in the admin panel.You can
        use this mode when you are doing maintenance on your app.
      </p>
    ),
    image: '/assets/onboardingFeatures/adminPanel.png',
  },
  {
    title: 'Next.js 13, Supabase and Typescript',
    description: (
      <p>
        You get all of the latest features and performance improvements that
        come with Next.js 13. These include the new Image component, built-in
        TypeScript support, the new app folder, layouts, server components and
        more! Your frontend will automatically update types and keep the project
        in sync when you update Supabase tables.
      </p>
    ),
    image: '/assets/onboardingFeatures/nextjs-type-supa.png',
  },
  {
    title: 'Incredible performance with layouts, server components',
    description: (
      <p>
        Nextbase offers world-class features such as app folder, layouts, server
        components, and server-side rendering to optimize data fetching and
        provide the best user experience. Layouts such as authenticated layout,
        external page layout, login layout, application admin layout
        authenticated, external, login, and admin are pre-configured.
      </p>
    ),
    image: '/assets/onboardingFeatures/layout.png',
  },
];

export function FeatureViewModal(): JSX.Element {
  return <OnboardingModal featureList={onboardingFeatures} />;
}
