// import { withSentryConfig } from '@sentry/nextjs';
// /** @type {import('next').NextConfig} */
// import createWithBundleAnalyzer from '@next/bundle-analyzer';

// const withBundleAnalyzer = createWithBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
//   openAnalyzer: process.env.ANALYZE === 'true',
// });

// export default withBundleAnalyzer(
//   withSentryConfig({
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: '*.supabase.co',
//           port: '',
//           pathname: '/**',
//         },
//         {
//           protocol: 'https',
//           hostname: '*.supabase.com',
//           port: '',
//           pathname: '/**',
//         },
//         {
//           protocol: 'https',
//           hostname: '*.gravatar.com',
//           port: '',
//           pathname: '/**',
//         },
//       ],
//     },

//     webpack: (config) => {
//       if (typeof nextRuntime === 'undefined') {
//         config.resolve.fallback = {
//           ...config.resolve.fallback,
//           fs: false,
//         };
//       }

//       return config;
//     },
//     sentry: {
//       // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
//       // for client-side builds. (This will be the default starting in
//       // `@sentry/nextjs` version 8.0.0.) See
//       // https://webpack.js.org/configuration/devtool/ and
//       // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
//       // for more information.
//       hideSourceMaps: true,
//     },
//   }),
// );
