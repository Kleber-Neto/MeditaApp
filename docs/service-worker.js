const CACHE_NAME = 'anotacoes-cache-v2'; // aumente este número sempre que fizer alterações
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Instala e armazena no cache os arquivos essenciais
self.addEventListener('install', event => {
  console.log('[SW] Instalando novo service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Armazenando arquivos no cache');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Força ativação imediata
});

// Ativa e limpa caches antigos
self.addEventListener('activate', event => {
  console.log('[SW] Ativando novo service worker...');
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Removendo cache antigo:', name);
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim(); // Assume o controle imediatamente
});

// Intercepta requisições e serve do cache se possível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(fetchResponse => {
          // Cacheia novos arquivos dinamicamente (opcional)
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    }).catch(() => {
      return new Response('Você está offline e este recurso não foi armazenado em cache.');
    })
  );
});
