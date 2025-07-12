// Service Worker for Loqui Events
const CACHE_NAME = 'loqui-events-v1';
const STATIC_CACHE = 'loqui-static-v1';
const DYNAMIC_CACHE = 'loqui-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/optimized/Loqui events logo.webp',
  '/optimized/20241114_180846.webp',
  '/optimized/image2.webp',
  '/optimized/20240816_190922.webp',
  '/optimized/Portrett bilde, Sandra.webp',
  '/optimized/Apple_Pay-Logo.wine.webp',
  '/vipps icon.webp',
  '/visa.svg',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch(() => {
        // Failed to cache static assets
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'image') {
    // Image requests - cache first strategy
    event.respondWith(handleImageRequest(request));
  } else if (url.origin === location.origin) {
    // Same-origin requests - stale while revalidate
    event.respondWith(handleSameOriginRequest(request));
  } else {
    // External requests - network first
    event.respondWith(handleExternalRequest(request));
  }
});

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return a fallback image or empty response
    return new Response('', { status: 404 });
  }
}

// Handle same-origin requests with stale-while-revalidate
async function handleSameOriginRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    
    // Always try to fetch from network for fresh content
    const networkPromise = fetch(request)
      .then(async (networkResponse) => {
        if (networkResponse.ok) {
          const cache = await caches.open(DYNAMIC_CACHE);
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      })
      .catch(() => null);

    // Return cached version immediately if available
    if (cachedResponse) {
      // Update cache in background
      networkPromise;
      return cachedResponse;
    }

    // If no cache, wait for network
    const networkResponse = await networkPromise;
    return networkResponse || new Response('Offline', { status: 503 });
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}

// Handle external requests with network-first strategy
async function handleExternalRequest(request) {
  try {
    // Skip caching for unsupported schemes (chrome-extension, etc.)
    const url = new URL(request.url);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return fetch(request);
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Background sync for form submissions (if needed)
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  // Handle offline form submissions when back online
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/optimized/Loqui events logo.webp',
      badge: '/optimized/Loqui events logo.webp',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || '/'
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const url = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.openWindow(url)
  );
});