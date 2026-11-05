// Libre — notifications
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(_){d={title:'Libre',body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'Libre',{body:d.body||'',tag:d.tag||undefined,icon:'../libre/icon-192.png',badge:'../libre/icon-192.png',data:{url:self.registration.scope}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=(e.notification.data&&e.notification.data.url)||self.registration.scope;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l)if(c.url.startsWith(self.registration.scope)&&'focus' in c)return c.focus();return self.clients.openWindow(url)}))});
