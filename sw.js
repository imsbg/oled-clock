const CACHE_NAME = 'oled-clock-cache-v1';
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'icon-192x192.png',
  'icon-512x512.png'
];

// Install event: caches the core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

// Fetch event: serves assets from cache first
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      })
  );
});
