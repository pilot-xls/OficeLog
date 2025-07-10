const CACHE_NAME = 'meu-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/lib/utils.js',
  '/src/components/Dashboard.jsx',
  '/src/components/TimeHistory.jsx',
  '/src/components/TimeEntry.jsx',
  '/src/components/ui/toast.jsx',
  '/src/components/ui/label.jsx',
  '/src/components/ui/use-toast.js',
  '/src/components/ui/button.jsx',
  '/src/components/ui/toaster.jsx',
  '/src/components/ui/card.jsx',
  '/src/components/ui/input.jsx',
  '/src/components/ui/textarea.jsx',
  '/public/llms.txt'
];

// Instalação do service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Ativação do service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => 
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Interceção de pedidos de rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
