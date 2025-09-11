// Service Worker for offline functionality
const CACHE_NAME = "disaster-relief-hub-v1"
const STATIC_CACHE = "static-v1"
const DYNAMIC_CACHE = "dynamic-v1"

// Files to cache for offline use
const STATIC_FILES = [
  "/",
  "/manifest.json",
  // Add other static assets as needed
]

// Install event - cache static files
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...")
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("Caching static files")
      return cache.addAll(STATIC_FILES)
    }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log("Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        return cachedResponse
      }

      // Otherwise, fetch from network and cache the response
      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response for caching
          const responseToCache = response.clone()

          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // Return offline page or default response when network fails
          if (event.request.destination === "document") {
            return caches.match("/")
          }
        })
    }),
  )
})

// Background sync for when connection is restored
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    console.log("Background sync triggered")
    event.waitUntil(
      // Perform any background sync operations here
      syncData(),
    )
  }
})

async function syncData() {
  try {
    // Implement data synchronization logic here
    console.log("Syncing data...")

    // Example: Send cached queries to server when online
    const cache = await caches.open(DYNAMIC_CACHE)
    const requests = await cache.keys()

    // Process any pending sync operations
    for (const request of requests) {
      if (request.url.includes("/api/sync")) {
        try {
          await fetch(request)
          await cache.delete(request)
        } catch (error) {
          console.log("Sync failed for:", request.url)
        }
      }
    }
  } catch (error) {
    console.error("Background sync failed:", error)
  }
}
