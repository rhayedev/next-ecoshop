const VERSION = 'v1';
const APP_SHELL = [
  '/', '/offline', '/favicon.ico',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
    )
  );
  clients.claim();
});

// Helpers de stratégies
async function networkFirst(req) {
  try {
    const fresh = await fetch(req);
    const cache = await caches.open(VERSION);
    cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req);
    return cached || (req.mode === 'navigate' ? caches.match('/offline') : Response.error());
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(VERSION);
  const cached = await cache.match(req);
  const networkPromise = fetch(req).then(res => {
    cache.put(req, res.clone());
    return res;
  }).catch(() => cached);
  return cached || networkPromise;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // HTML navigation → stratégie Network First + fallback offline
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // API JSON → Stale-While-Revalidate
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Images → Stale-While-Revalidate
  if (request.destination === 'image') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // CSS/JS → Cache d’abord puis MAJ silencieuse (SWR)
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
});