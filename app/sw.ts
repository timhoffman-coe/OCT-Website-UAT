/// <reference lib="webworker" />
import { clientsClaim, WorkboxPlugin } from 'workbox-core';
import { cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();

// Required by InjectManifest plugin — referenced but not precached behind IAP
const _manifest = self.__WB_MANIFEST;
void _manifest;

cleanupOutdatedCaches();

// Plugin that prevents caching IAP auth redirects
const iapGuardPlugin: WorkboxPlugin = {
  cacheWillUpdate: async ({ response }) => {
    if (response.redirected && new URL(response.url).origin !== self.location.origin) {
      return null;
    }
    return response;
  },
};

// Admin routes — never cache (authenticated content behind IAP)
registerRoute(
  ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/admin'),
  new NetworkOnly()
);

// API routes — network first with fallback to cache
registerRoute(
  ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/api/'),
  new NetworkFirst({ cacheName: 'api-cache', networkTimeoutSeconds: 10, plugins: [iapGuardPlugin] })
);

// Images — cache first, 30-day expiry
registerRoute(
  ({ request, sameOrigin }) => sameOrigin && request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      iapGuardPlugin,
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 }),
    ],
  })
);

// Google Fonts stylesheets — stale while revalidate
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({ cacheName: 'google-fonts-stylesheets' })
);

// Google Fonts webfonts — cache first, 1 year
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 365 * 24 * 60 * 60 }),
    ],
  })
);

// Pages — network first
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({ cacheName: 'pages', networkTimeoutSeconds: 5, plugins: [iapGuardPlugin] })
);

// Static assets (JS, CSS) — stale while revalidate
registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({ cacheName: 'static-assets', plugins: [iapGuardPlugin] })
);

// Offline fallback for failed navigation requests
setCatchHandler(async ({ request }) => {
  if (request.destination === 'document') {
    const cache = await caches.open('pages');
    const fallback = await cache.match('/offline');
    if (fallback) return fallback;
  }
  return Response.error();
});
