// Reste — toujours la dernière version, et hors ligne
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.mode!=='navigate')return;
  e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{if(res&&res.ok){const c=res.clone();caches.open('reste-v1').then(x=>x.put(self.registration.scope,c)).catch(()=>{})}return res}).catch(()=>caches.match(self.registration.scope)))});
