const CACHE_NAME = "momo-games-v1";
// Daftar semua file yang dibutuhkan game Anda untuk berjalan
const assetsToCache = [
  "/",
  "index.html",
  "style.css",
  "gameLib.js",
  "tombol.js",
  "game.js",
  "map_1.js",
  "map_2.js",
  "map_3.js",
  "https://cdn.jsdelivr.net/npm/sweetalert2@11",
  // Tambahkan semua aset Anda dari folder 'assets'
  "assets/Idle.png",
  "assets/Run.png",
  "assets/Jump.png",
  "assets/Fall.png",
  "assets/Hit.png",
  "assets/Terrain.png",
  "assets/Strawberry.png",
  "assets/Kiwi.png",
  "assets/Melon.png",
  "assets/enemy1Idle.png",
  "assets/enemy1Run.png",
  "assets/enemy1Hit.png",
  "assets/musuh2Idle.png",
  "assets/musuh2Run.png",
  "assets/musuh2Hit.png",
  "assets/Idle2.png",
  "assets/Run2.png",
  "assets/Jump2.png",
  "assets/Fall2.png",
  "assets/Hit2.png",
  "assets/Idle3.png",
  "assets/Run3.png",
  "assets/Jump3.png",
  "assets/Fall3.png",
  "assets/Hit3.png",
  "assets/Flag.png",
  "assets/cpidle.png",
  "assets/cpmove.png",
  "assets/bg_level1.png",
  "assets/bg_level2.png",
  "assets/bg_level3.png",
  "assets/coin.png",
  "assets/bungaIdle (44x42).png",
  "assets/bungaAttack (44x42).png",
  "assets/bungaHit (44x42).png",
  "assets/bungaBullet.png",
  "assets/bungaBullet Pieces.png",
  "assets/bgscore.png",
  "assets/bglarge.png",
  // Suara
  "sfx/backsound.mp3",
  "sfx/item.mp3",
  "sfx/poinmusuh.mp3",
  "sfx/paku.mp3",
  "sfx/win.mp3",
  "sfx/lose.mp3",
  "sfx/cekpoin.mp3",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Membuka cache dan menyimpan aset");
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache ditemukan - kembalikan respons
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
