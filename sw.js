/* Merge Market service worker — offline app-shell cache.
   Bump CACHE whenever you change index.html so devices pull the new version. */
const CACHE = 'merge-market-v8';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached ||
      fetch(e.request)
        .then((resp) => {
          try {
            const copy = resp.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          } catch (_) {}
          return resp;
        })
        .catch(() => caches.match('./index.html'))
    )
  );
});
