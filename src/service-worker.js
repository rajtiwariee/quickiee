// Check if the browser supports service workers
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Register the service worker
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service worker registered:", registration);

        // Check if there is an existing service worker
        if (registration.active) {
          console.log("Existing service worker detected");

          // Refresh the page to activate the new service worker
          window.location.reload();
        }

        // Listen for updates to the service worker
        registration.addEventListener("updatefound", () => {
          console.log("New service worker found");

          // Wait for the new service worker to be installed
          const installingWorker = registration.installing;
          installingWorker.addEventListener("statechange", () => {
            // If the new service worker is activated, refresh the page
            if (installingWorker.state === "activated") {
              console.log("New service worker activated");
              window.location.reload();
            }
          });
        });
      })
      .catch((error) => {
        console.error("Service worker registration failed:", error);
      });
  });
}
