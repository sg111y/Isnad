var C="asn-v3",F=["data-extra.js","./","index.html","style.css","app.js","data.js","manifest.json","icons/icon.svg"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}))});
self.addEventListener("fetch",function(e){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}))});
