importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

const staticAssets = [
    './',
    './styles.css',
    './app.js',
    './fallback.json',
    './images/rolling-eyes.jpg'
];

const wb = new WorkboxSW();
wb.precache(staticAssets);

wb.router.registerRoute('https://newsapi.org/(.*), wb.strategies.networkFirst()');
wb.router.registerRoute(/.*\.(png|jpg|jpeg|gif)/, wb.strategies.cacheFirst({
    cacheName: 'news-images',
    cacheExpiration: { maxEntries: 20, maxAgeSeconds: 12 * 60 * 60},
    cacheableResponse: { statuses [0, 200] }
}));

//this is the code without using workbox
// self.addEventListener('install', async event => {
//     const cache = await caches.open('news-static');
//     cache.addAll(staticAssets)
// });

// self.addEventListener('fetch', event => {
//     const req = event.request;
//     const url = new URL(req.url)

//     if(url.origin == location.origin){
//         event.respondWith(cacheFirst(req))
//     } else {
//         event.respondWith(networkFirst(req))
//     }
// });

// async function cacheFirst(req){
//     const cachedReponse = await caches.match(req);
//     return cachedReponse || fetch(req);
// }

// async function networkFirst(req){
//     const cache = await caches.open('news-dynamic');

//     try {
//         const res = await fetch(req);
//         cache.put(req, res.clone());
//         return res;
//     } catch (error) {
//         const cachedReponse = await cache.match(req)
//         return cachedReponse || await caches.match('./fallback.json');
//     }
// }
