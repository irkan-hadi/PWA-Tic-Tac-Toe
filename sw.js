

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('PWATicTacToe').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/all.min.css',
        '/css/master.css',
        '/js/Game.js',
        '/js/Square.js',
        '/js/vue.min.js',
        '/webfonts/fa-brands-400.eot',
        '/webfonts/fa-brands-400.svg',
        '/webfonts/fa-brands-400.ttf',
        '/webfonts/fa-brands-400.woff',
        '/webfonts/fa-brands-400.woff2'
      ]);
    })
  );
});


self.addEventListener('fetch', function (event) {

  console.log(event.request.url);

  event.respondWith(

    caches.match(event.request).then(function (response) {

      return response || fetch(event.request);

    })

  );

});