// Define the cache name and URLs to cache
const CACHE_NAME = "ecommerce-pwa-cache-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/main.js",
  "/images/logo.png",
  "/images/products/product1.jpg",
  "/images/products/product2.jpg",
  "/images/products/product3.jpg",
];

// Install the service worker and cache the app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Serve the app shell from the cache if available
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Found in cache", event.request.url);
        return response;
      }
      console.log("Not found in cache", event.request.url);
      return fetch(event.request);
    })
  );
});

// Update the service worker and delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
