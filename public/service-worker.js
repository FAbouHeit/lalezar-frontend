// public/service-worker.js

// self.addEventListener('fetch', (event) => {
//     event.respondWith( // to provide a custom response to the browser instead of the default network response
//       caches.open('api-cache').then((cache) => { // open a specific cache name
//         return cache.match(event.request).then((cachedResponse) => { // attempts to find a matching response in the cache or maybe undefined
//           return (
//             cachedResponse ||
//             fetch(event.request).then((networkResponse) => { // in case of undefined , it fetches the resource from the network
//               cache.put(event.request, networkResponse.clone());
//               return networkResponse;
//             })
//           );
//         });
//       })
//     );
//   });
  