// Libre — notifications
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(_){d={title:'Libre',body:e.data?e.data.text():''}}
  try{if(self.navigator.setAppBadge&&!String(d.tag||'').startsWith('test'))self.navigator.setAppBadge(d.badge||1)}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title||'Libre',{body:d.body||'',tag:d.tag||undefined,icon:'../icons/icon-192.png',badge:'../icons/badge-96.png',timestamp:Date.now(),data:{url:self.registration.scope}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=(e.notification.data&&e.notification.data.url)||self.registration.scope;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l)if(c.url.startsWith(self.registration.scope)&&'focus' in c)return c.focus();return self.clients.openWindow(url)}))});
