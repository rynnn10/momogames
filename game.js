setGame("1200x600");
game.folder = "assets";
//file gambar yang dipakai dalam game
var gambar = {
  idle: "Idle.png",
  run: "Run.png",
  jump: "Jump.png",
  fall: "Fall.png",
  hit: "Hit.png",
  tileset: "Terrain.png",
  item1: "Strawberry.png",
  item2: "Kiwi.png",
  melon: "Melon.png",
  musuh1Idle: "enemy1Idle.png",
  musuh1Run: "enemy1Run.png",
  musuh1Hit: "enemy1Hit.png",
  musuh2Idle: "musuh2Idle.png", // Perubahan: Tambahkan ini
  musuh2Run: "musuh2Run.png", // Perubahan: Tambahkan ini
  musuh2Hit: "musuh2Hit.png", // Perubahan: Tambahkan ini
  // Perubahan: Tambahkan aset untuk karakter kedua
  idle2: "Idle2.png",
  run2: "Run2.png",
  jump2: "Jump2.png",
  fall2: "Fall2.png",
  hit2: "Hit2.png",
  // Perubahan: Tambahkan aset untuk karakter ketiga
  idle3: "Idle3.png",
  run3: "Run3.png",
  jump3: "Jump3.png",
  fall3: "Fall3.png",
  hit3: "Hit3.png",
  bendera: "Flag.png",
  checkpoint: "cpidle.png", // Perubahan: Tambahkan aset checkpoint
  checkpoint_on: "cpmove.png",
  bg_level1: "bg_level1.png", // Perubahan: Latar belakang level 1
  bg_level2: "bg_level2.png", // Perubahan: Latar belakang level 2
  bg_level3: "bg_level3.png",
  coin: "coin.png", // Perubahan: Tambahkan ikon hati
  // --- PERUBAHAN: Tambahkan aset untuk Musuh Bunga (ID 3) ---
  bungaIdle: "bungaIdle (44x42).png",
  bungaAttack: "bungaAttack (44x42).png",
  bungaHit: "bungaHit (44x42).png",
  bungaBullet: "bungaBullet.png",
  bungaBulletPieces: "bungaBullet Pieces.png",
};
// file tombol penggerak versi mobile
var movementBtns = document.getElementById("movementBtns");
// file: game.js
// file: game.js
var suara = {
  item: "item.mp3",
  poinmusuh: "poinmusuh.mp3",
  paku: "paku.mp3",
  win: "win.mp3",
  lose: "lose.mp3", // Perubahan: Tambahkan suara ini
  cekpoin: "cekpoin.mp3",
};

// Variabel baru untuk menyimpan data level agar tidak reset
let levelState = {
  map: null,
  level: -1,
};

// Perubahan: Variabel baru untuk menyimpan posisi checkpoint
let checkpointState = {
  charX: 0,
  charY: 0,
  posX: 0,
  posY: 0,
};
// Perubahan: Variabel baru untuk skor antar level
let cumulativeScore = 0;
let gameBullets = [];
let gameParticles = [];

// Hanya memuat aset, tidak menjalankan apa pun
loading(gambar, suara, () => {
  console.log("Aset game telah dimuat. Siap dimulai dari menu utama.");
});

// file: game.js

function setAwal(resetCheckpoint = false) {
  if (!isPaused) {
    // Perubahan: Buat pemetaan aset untuk setiap karakter
    const playerAssetMap = {
      1: {
        idle: dataGambar.idle,
        run: dataGambar.run,
        jump: dataGambar.jump,
        fall: dataGambar.fall,
        hit: dataGambar.hit,
      },
      2: {
        idle: dataGambar.idle2,
        run: dataGambar.run2,
        jump: dataGambar.jump2,
        fall: dataGambar.fall2,
        hit: dataGambar.hit2,
      },
      // Perubahan: Tambahkan objek aset untuk karakter ketiga
      3: {
        idle: dataGambar.idle3,
        run: dataGambar.run3,
        jump: dataGambar.jump3,
        fall: dataGambar.fall3,
        hit: dataGambar.hit3,
      },
    };

    // Ambil set aset berdasarkan karakter yang dipilih
    const selectedPlayerAssets = playerAssetMap[selectedCharacterId];

    // Buat hero menggunakan sprite idle yang benar
    game.hero = setSprite(selectedPlayerAssets.idle, 32, 32);
    game.skalaSprite = 2;

    // Atur semua animasi hero berdasarkan aset yang dipilih
    game.hero.animDiam = selectedPlayerAssets.idle;
    game.hero.animLompat = selectedPlayerAssets.jump;
    game.hero.animJalan = selectedPlayerAssets.run;
    game.hero.animJatuh = selectedPlayerAssets.fall;
    game.hero.animMati = selectedPlayerAssets.hit;

    // ... Sisa kode di dalam setAwal() tetap sama persis seperti sebelumnya ...
    // (Logika checkpoint, memuat peta, item, musuh, dll.)

    if (levelState.level !== game.level || resetCheckpoint) {
      levelState.map = JSON.parse(JSON.stringify(this["map_" + game.level]));
      levelState.level = game.level;

      let startPos = cariPosisiAwal(levelState.map);
      checkpointState.charX = startPos.x;
      checkpointState.charY = startPos.y;
      checkpointState.posX = 0;
      checkpointState.posY = 0;
    }

    game.charX = checkpointState.charX;
    game.charY = checkpointState.charY;
    game.posX = checkpointState.posX;
    game.posY = checkpointState.posY;

    setPlatform(levelState.map, dataGambar.tileset, 32, game.hero);
    game.gameOver = ulangiPermainan;
    setPlatformItem(1, dataGambar.item1);
    setPlatformItem(2, dataGambar.item2);
    setPlatformItem(3, dataGambar.melon);

    var musuh1 = {};
    musuh1.animDiam = dataGambar.musuh1Idle;
    musuh1.animJalan = dataGambar.musuh1Run;
    musuh1.animMati = dataGambar.musuh1Hit;
    setPlatformEnemy(1, musuh1);

    var musuh2 = {};
    musuh2.animDiam = dataGambar.musuh2Idle;
    musuh2.animJalan = dataGambar.musuh2Run;
    musuh2.animMati = dataGambar.musuh2Hit;
    setPlatformEnemy(2, musuh2);

    var musuh3 = {};
    musuh3.animDiam = dataGambar.bungaIdle;
    musuh3.animJalan = dataGambar.bungaIdle; // Bunga tidak berjalan
    musuh3.animMati = dataGambar.bungaHit;
    musuh3.animSerang = dataGambar.bungaAttack; // Animasi baru untuk menyerang
    musuh3.shootCooldown = 0;
    setPlatformEnemy(3, musuh3);

    setPlatformTrigger(1, dataGambar.bendera);
    setPlatformTrigger(2, dataGambar.checkpoint);
    setPlatformTrigger(3, dataGambar.checkpoint_on);
  }
}

// Perubahan: Tambahkan fungsi baru ini di mana saja dalam game.js
function cariPosisiAwal(peta) {
  // Fungsi ini mencari tile 'start' (mode 9) di peta, sesuaikan jika berbeda
  for (let i = 0; i < peta.length; i++) {
    for (let j = 0; j < peta[i].length; j++) {
      if (peta[i][j][0] === 9) {
        // Mode 9 biasanya adalah titik start
        return { x: i, y: j };
      }
    }
  }
  return { x: 1, y: 1 }; // Posisi default jika tidak ditemukan
}

function ulangiPermainan(resetCheckpoint = false) {
  if (game.aktif === false) {
    // Ini berarti pemain baru saja mati

    // --- LOGIKA BARU YANG LEBIH SEDERHANA ---
    if (game.coinKehidupan <= 1) {
      // Jika koin 1 atau 0, pemain mati dan koin menjadi 0.
      // Tampilkan popup untuk lanjut (iklan/kuis) atau mulai ulang.
      game.coinKehidupan = 0;
      showContinueOrGameOverPopup();
      return; // Hentikan fungsi agar tidak langsung mengulang level
    } else {
      // Jika koin masih banyak, kurangi 1 dan ulangi level
      game.coinKehidupan--;
    }
    // --- AKHIR LOGIKA BARU ---
  }

  game.aktif = true;
  setAwal(resetCheckpoint);
  jalankan(gameLoop);
}

function gameLoop() {
  if (!isPaused) {
    hapusLayar();

    // Perubahan: Menggambar latar belakang dinamis sesuai level
    if (game.level === 1) {
      latar(dataGambar.bg_level1, 0, 0);
    } else if (game.level === 2) {
      latar(dataGambar.bg_level2, 0, 0);
    } else if (game.level === 3) {
      latar(dataGambar.bg_level3, 0, 0);
    }

    if (game.kanan || game.rightBtnPressed) {
      gerakLevel(game.hero, 3, 0);
    } else if (game.kiri || game.leftBtnPressed) {
      gerakLevel(game.hero, -3, 0);
    }
    if (game.atas || game.upBtnPressed) {
      gerakLevel(game.hero, 0, -10);
    }

    // Menangani aksi ketika tombol-tombol ditekan dan dilepas
    var leftBtn = document.getElementById("leftBtn");
    var rightBtn = document.getElementById("rightBtn");
    var upBtn = document.getElementById("upBtn");

    leftBtn.addEventListener("touchstart", function (event) {
      event.preventDefault();
      game.leftBtnPressed = true;
    });

    leftBtn.addEventListener("touchend", function (event) {
      event.preventDefault();
      game.leftBtnPressed = false;
    });

    rightBtn.addEventListener("touchstart", function (event) {
      event.preventDefault();
      game.rightBtnPressed = true;
    });

    rightBtn.addEventListener("touchend", function (event) {
      event.preventDefault();
      game.rightBtnPressed = false;
    });

    upBtn.addEventListener("touchstart", function (event) {
      event.preventDefault();
      game.upBtnPressed = true;
    });

    upBtn.addEventListener("touchend", function (event) {
      event.preventDefault();
      game.upBtnPressed = false;
    });
    buatLevel();
    updateDanGambarPeluru();
    updatePartikel();
    // --- PERUBAHAN: Menampilkan dan menganimasikan koin kehidupan ---
    if (game.coinAnim) {
      // 1. Gambar semua koin yang tersisa
      for (let i = 0; i < game.coinKehidupan; i++) {
        game.coinAnim.x = 40 + i * 40; // Atur posisi x untuk setiap koin
        game.coinAnim.y = 50; // Atur posisi y
        sprite(game.coinAnim); // Gunakan fungsi sprite() dari gameLib untuk menggambar
      }

      // 2. Update frame animasi untuk loop berikutnya (logika dari fungsi animasi() di gameLib.js)
      if (!game.pause) {
        if (game.coinAnim.frameTimer === undefined)
          game.coinAnim.frameTimer = 0;
        if (game.coinAnim.frameRate === undefined) game.coinAnim.frameRate = 3;

        game.coinAnim.frameTimer++;
        if (game.coinAnim.frameTimer > game.coinAnim.frameRate) {
          game.coinAnim.frameTimer = 0;
          game.coinAnim.frame++;
          if (game.coinAnim.frame > game.coinAnim.maxFrame) {
            game.coinAnim.frame = 1;
          }
        }
      }
    }

    // Perubahan: Logika animasi skor
    if (game.scoreSize > game.baseScoreSize) {
      game.scoreSize -= 0.5; // Perlahan kecilkan kembali ke ukuran normal
    }

    // Perubahan: Gunakan ukuran font dinamis dari game.scoreSize
    teks(
      "SKOR: " + game.score,
      game.lebar / 2,
      60,
      "'Press Start 2P'-normal-" + game.scoreSize + "pt-center-putih|hitam"
    );
    cekItem();
  }
  //   resizeBtn(1150, 50);
}

// file: game.js
function cekItem() {
  // Perubahan Logika Skor
  if (game.itemID > 0) {
    // Cek jika ada item yang diambil
    if (game.itemID === 1) {
      // Stroberi
      tambahScore(1);
    } else if (game.itemID === 2) {
      // Kiwi
      tambahScore(2);
    } else if (game.itemID === 3) {
      // Melon
      tambahScore(3);
    }
    mainkanSuara(dataSuara.item);
    game.itemID = 0; // Reset itemID setelah diproses
  }

  if (game.musuhID != 0) {
    // Musuh
    tambahScore(2);
    mainkanSuara(dataSuara.poinmusuh); // Mainkan suara bunuh musuh
    game.musuhID = 0;
  }

  // file: game.js -> di dalam cekItem()
  if (game.triggerID == 1) {
    game.triggerID = 0;
    game.aktif = false;
    mainkanSuara(dataSuara.win);

    // --- PERUBAHAN LOGIKA ---
    // Cek apakah ada peta untuk level selanjutnya
    var nextLevelMap = "map_" + (game.level + 1);
    if (window[nextLevelMap] !== undefined) {
      // Jika ADA level selanjutnya, tampilkan popup "Level Selesai"
      showLevelCompletePopup(game.score);
    } else {
      // Jika TIDAK ADA level selanjutnya, tampilkan popup "Permainan Selesai"
      showGameCompletePopup(game.score);
    }
    // --- AKHIR PERUBAHAN ---
  }

  // Perubahan: Tambahkan logika untuk checkpoint
  if (game.triggerID == 2) {
    // Update posisi respawn
    checkpointState.charX = game.charX;
    checkpointState.charY = game.charY;
    checkpointState.posX = game.posX;
    checkpointState.posY = game.posY;

    // Mainkan suara checkpoint
    mainkanSuara(dataSuara.cekpoin);

    // Hapus checkpoint dari peta agar tidak bisa diambil lagi
    // Cari posisi tile checkpoint yang tepat di sekitar pemain
    let tileX = game.charX;
    let tileY = game.charY;
    // Hapus trigger dari peta
    levelState.map[tileX][tileY][3] = 3; // Hapus ID trigger

    game.triggerID = 0; // Reset trigger ID
  }
}

// Di dalam file game.js
function tembakPeluru(penembak) {
  // mainkanSuara(dataSuara.paku);
  let peluru = setSprite(dataGambar.bungaBullet);

  // --- PERBAIKAN: SIMPAN POSISI DUNIA (BUKAN LAYAR) ---
  // Hitung posisi dunia bunga (penembak)
  let penembakWorldX = penembak.charX * game.tileW + penembak.posX;
  let penembakWorldY = penembak.charY * game.tileW + penembak.posY;

  // Offset posisi peluru dari pusat bunga
  let offsetX = 20;
  let offsetY = 25; // Offset vertikal agar pas dengan mulut

  // Simpan posisi awal peluru di dunia game
  peluru.worldX = penembakWorldX - offsetX;
  peluru.worldY = penembakWorldY + offsetY;

  // Kecepatan tetap ke kiri
  let speed = 3;
  peluru.vx = -speed;
  peluru.vy = 0;

  // Hapus posisi x dan y lama untuk menghindari kebingungan
  peluru.x = 0;
  peluru.y = 0;
  // --- AKHIR PERBAIKAN ---

  gameBullets.push(peluru);
}

// Fungsi untuk membuat partikel ledakan
function buatPartikel(x, y) {
  for (let i = 0; i < 5; i++) {
    let partikel = setSprite(dataGambar.bungaBulletPieces);
    partikel.x = x;
    partikel.y = y;
    partikel.vx = (Math.random() - 0.5) * 4;
    partikel.vy = (Math.random() - 0.5) * 4;
    partikel.lifespan = 30; // Hilang setelah 0.5 detik
    partikel.rotasi = acak(360);
    gameParticles.push(partikel);
  }
}

// Di dalam file game.js
function updateDanGambarPeluru() {
  // Hitung posisi kamera di dunia game (referensi)
  let cameraWorldX = game.charX * game.tileW + game.posX;
  let cameraWorldY = game.charY * game.tileW + game.posY;

  for (let i = gameBullets.length - 1; i >= 0; i--) {
    let p = gameBullets[i];

    // --- PERBAIKAN: UPDATE & GAMBAR BERDASARKAN POSISI DUNIA ---
    // 1. Update posisi dunia peluru
    p.worldX += p.vx;
    p.worldY += p.vy;

    // 2. Hitung posisi layar peluru berdasarkan posisi dunia & kamera
    p.x = (p.worldX - cameraWorldX) * game.skalaSprite + game.lebar / 2;
    p.y = (p.worldY - cameraWorldY) * game.skalaSprite + game.tinggi / 2;

    // 3. Gambar sprite di posisi layar yang sudah benar
    sprite(p);
    // --- AKHIR PERBAIKAN ---

    // Logika deteksi tabrakan dengan tembok (menggunakan posisi dunia)
    let tileX = Math.floor(p.worldX / game.tileW);
    let tileY = Math.floor(p.worldY / game.tileW);

    if (
      tileX >= 0 &&
      tileX < game.map.length &&
      tileY >= 0 &&
      tileY < game.map[0].length
    ) {
      if (game.map[tileX][tileY][0] === 1) {
        buatPartikel(p.x, p.y);
        gameBullets.splice(i, 1);
        continue;
      }
    }

    // Jika peluru kena pemain (menggunakan posisi layar)
    if (jarak(p.x, p.y, game.karakter.x, game.karakter.y) < 20) {
      heroDead();
      buatPartikel(p.x, p.y);
      gameBullets.splice(i, 1);
      continue;
    }

    // Hapus peluru jika keluar dari layar
    if (p.x < 0 || p.x > game.lebar || p.y < 0 || p.y > game.tinggi) {
      gameBullets.splice(i, 1);
    }
  }
}

// Fungsi untuk mengupdate partikel
function updatePartikel() {
  for (let i = gameParticles.length - 1; i >= 0; i--) {
    let p = gameParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.lifespan--;
    sprite(p);
    if (p.lifespan <= 0) {
      gameParticles.splice(i, 1);
    }
  }
}
