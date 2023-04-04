// Define the cache name
const CACHE_NAME = "my-ecommerce-pwa-cache-v1";

// Define the files to cache
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/style.css",
  "/js/main.js",
  "/images/logo.png",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
];

// Install the service worker
self.addEventListener("install", (event) => {
  console.log("Service worker installed");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache opened");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate the service worker
self.addEventListener("activate", (event) => {
  console.log("Service worker activated");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch the cached files
self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Cache hit:", event.request.url);
        return response;
      }

      console.log("Cache miss:", event.request.url);
      return fetch(event.request);
    })
  );
});
