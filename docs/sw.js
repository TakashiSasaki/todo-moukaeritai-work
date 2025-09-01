const CACHE_NAME = 'todo-moukaeritai-cache-v3';
const OFFLINE_URL = '/offline.html';
const PRECACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/styles.css',
  '/app.js',
  '/manifest.webmanifest',
  OFFLINE_URL,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // App shell style: network-first for navigations, cache-first for assets
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        return await fetch(req);
      } catch (err) {
        // When offline, serve the cached top page; fallback to offline page.
        return (await caches.match('/index.html'))
            || (await caches.match('/'))
            || (await caches.match(OFFLINE_URL));
      }
    })());
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return resp;
      }).catch(async () => {
        // As a last resort offline, provide offline page for HTML requests
        if (req.destination === 'document') {
          return (await caches.match('/index.html')) || (await caches.match(OFFLINE_URL));
        }
        throw new Error('Network error and no cache');
      });
    })
  );
});
