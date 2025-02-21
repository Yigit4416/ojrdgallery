// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://390c90a5f488294b14f805d5630d2dd2@o4508852536803328.ingest.de.sentry.io/4508853445460048",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
