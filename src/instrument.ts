// IMPORTANT: instrument.ts harus di-import PERTAMA sebelum semua module lain
// di main.ts agar Sentry bisa menginstrumentasi semua dependency dengan benar.
import * as Sentry from '@sentry/nestjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? 'https://1e75ba45324a0f7b3ab90c74fcf3ad85@o4511637640052736.ingest.de.sentry.io/4511637679833168',
  environment: process.env.NODE_ENV ?? 'development',
  // Sampling: 100% di dev, 20% di production agar tidak boros quota
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
});