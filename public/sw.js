const VERSION = 'v1';
const APP_SHELL = [
  '/',
  '/offline',
  '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    )
  );
  clients.claim();
});

async function networkFirst(req) {
  try {
    const fresh = await fetch(req);
    const cache = await caches.open(VERSION);
    cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req);
    return (
      cached ||
      (req.mode === 'navigate' ? await caches.match('/offline') : Response.error())
    );
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(VERSION);
  const cached = await cache.match(req);
  const networkPromise = fetch(req)
    .then((res) => {
      cache.put(req, res.clone());
      return res;
    })
    .catch(() => cached);
  return cached || networkPromise;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (['style', 'script'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
});
