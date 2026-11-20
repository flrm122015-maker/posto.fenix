const CACHE='posto-fenix-v9';
const PREFIX='posto-fenix-';

const ASSETS=[
    './',
    './index.html',
    './manifest.webmanifest',
    './icons/icon-192-v9.png',
    './icons/icon-512-v9.png'
];

self.addEventListener('install',event=>{
    event.waitUntil(
        caches.open(CACHE)
            .then(cache=>cache.addAll(ASSETS))
            .then(()=>self.skipWaiting())
    );
});

self.addEventListener('activate',event=>{
    event.waitUntil(
        caches.keys()
            .then(keys=>Promise.all(
                keys
                    .filter(key=>key.startsWith(PREFIX) && key!==CACHE)
                    .map(key=>caches.delete(key))
            ))
            .then(()=>self.clients.claim())
    );
});

self.addEventListener('fetch',event=>{
    if(event.request.method!=='GET')return;

    const url=new URL(event.request.url);

    if(url.origin!==self.location.origin)return;

    const isPage=
        event.request.mode==='navigate' ||
        url.pathname.endsWith('/index.html');

    if(isPage){
        event.respondWith(
            fetch(new Request(event.request,{cache:'no-store'}))
                .then(response=>{
                    if(response.ok){
                        const copy=response.clone();
                        caches.open(CACHE).then(cache=>cache.put('./index.html',copy));
                    }
                    return response;
                })
                .catch(()=>caches.open(CACHE).then(cache=>cache.match('./index.html')))
        );
        return;
    }

    event.respondWith(
        caches.open(CACHE).then(cache=>cache.match(event.request)).then(cached=>{
            if(cached)return cached;

            return fetch(event.request).then(response=>{
                if(response.ok){
                    const copy=response.clone();
                    caches.open(CACHE).then(cache=>cache.put(event.request,copy));
                }
                return response;
            });
        })
    );
});
