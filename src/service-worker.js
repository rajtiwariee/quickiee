import { precacheAndRoute } from "workbox-precaching/precacheAndRoute";

precacheAndRoute(self.__WB_MANIFEST);

if (workbox) {
  console.log(`Workbox is loaded`);

  // Precache all assets
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  // Serve the precached assets first
  workbox.routing.setDefaultHandler(
    new workbox.strategies.CacheFirst({
      cacheName: "assets-cache",
    })
  );

  // Serve the API requests with a network-first strategy
  workbox.routing.registerRoute(
    new RegExp("https://example.com/api/.*"),
    new workbox.strategies.NetworkFirst({
      cacheName: "api-cache",
    })
  );

  // Serve the pages with a network-first strategy
  workbox.routing.registerRoute(
    new RegExp("https://example.com/.*"),
    new workbox.strategies.NetworkFirst({
      cacheName: "pages-cache",
    })
  );

  // Listen for updates to the service worker
  self.addEventListener("install", (event) => {
    event.waitUntil(self.skipWaiting());
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
  });
}
