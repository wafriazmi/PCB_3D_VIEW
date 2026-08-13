const cacheName = "DefaultCompany-WebGL3D-0.1.0";
const contentToCache = [
    "Build/543a08541e68856d01563d56a3453def.loader.js",
    "Build/765aa62834b7a9aeb40f8668b41c6181.framework.js.unityweb",
    "Build/f8ebc2ea471c501bf07c522a6070a964.data.unityweb",
    "Build/146a2929a720c49a353a41739de64e57.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
