setGame("1200x600"), (game.folder = "assets");
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
    musuh2Idle: "musuh2Idle.png",
    musuh2Run: "musuh2Run.png",
    musuh2Hit: "musuh2Hit.png",
    idle2: "Idle2.png",
    run2: "Run2.png",
    jump2: "Jump2.png",
    fall2: "Fall2.png",
    hit2: "Hit2.png",
    idle3: "Idle3.png",
    run3: "Run3.png",
    jump3: "Jump3.png",
    fall3: "Fall3.png",
    hit3: "Hit3.png",
    bendera: "Flag.png",
    checkpoint: "cpidle.png",
    checkpoint_on: "cpmove.png",
    bg_level1: "bg_level1.png",
    bg_level2: "bg_level2.png",
    bg_level3: "bg_level3.png",
    coin: "coin.png",
    bungaIdle: "bungaIdle (44x42).png",
    bungaAttack: "bungaAttack (44x42).png",
    bungaHit: "bungaHit (44x42).png",
    bungaBullet: "bungaBullet.png",
    bungaBulletPieces: "bungaBullet Pieces.png",
    bgscore: "bgscore.png",
  },
  movementBtns = document.getElementById("movementBtns"),
  suara = {
    item: "item.mp3",
    poinmusuh: "poinmusuh.mp3",
    paku: "paku.mp3",
    win: "win.mp3",
    lose: "lose.mp3",
    cekpoin: "cekpoin.mp3",
  };
let levelState = { map: null, level: -1 },
  checkpointState = { charX: 0, charY: 0, posX: 0, posY: 0 },
  cumulativeScore = 0,
  gameBullets = [],
  gameParticles = [];
function setAwal(a = !1) {
  if (!isPaused) {
    const n = {
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
      3: {
        idle: dataGambar.idle3,
        run: dataGambar.run3,
        jump: dataGambar.jump3,
        fall: dataGambar.fall3,
        hit: dataGambar.hit3,
      },
    }[selectedCharacterId];
    if (
      ((game.hero = setSprite(n.idle, 32, 32)),
      (game.skalaSprite = 2),
      (game.hero.animDiam = n.idle),
      (game.hero.animLompat = n.jump),
      (game.hero.animJalan = n.run),
      (game.hero.animJatuh = n.fall),
      (game.hero.animMati = n.hit),
      levelState.level !== game.level || a)
    ) {
      (levelState.map = JSON.parse(JSON.stringify(this["map_" + game.level]))),
        (levelState.level = game.level);
      let a = cariPosisiAwal(levelState.map);
      (checkpointState.charX = a.x),
        (checkpointState.charY = a.y),
        (checkpointState.posX = 0),
        (checkpointState.posY = 0);
    }
    (game.charX = checkpointState.charX),
      (game.charY = checkpointState.charY),
      (game.posX = checkpointState.posX),
      (game.posY = checkpointState.posY),
      setPlatform(levelState.map, dataGambar.tileset, 32, game.hero),
      (game.gameOver = ulangiPermainan),
      setPlatformItem(1, dataGambar.item1),
      setPlatformItem(2, dataGambar.item2),
      setPlatformItem(3, dataGambar.melon);
    var e = {};
    (e.animDiam = dataGambar.musuh1Idle),
      (e.animJalan = dataGambar.musuh1Run),
      (e.animMati = dataGambar.musuh1Hit),
      setPlatformEnemy(1, e);
    var t = {};
    (t.animDiam = dataGambar.musuh2Idle),
      (t.animJalan = dataGambar.musuh2Run),
      (t.animMati = dataGambar.musuh2Hit),
      setPlatformEnemy(2, t);
    var m = {};
    (m.animDiam = dataGambar.bungaIdle),
      (m.animJalan = dataGambar.bungaIdle),
      (m.animMati = dataGambar.bungaHit),
      (m.animSerang = dataGambar.bungaAttack),
      (m.shootCooldown = 0),
      setPlatformEnemy(3, m),
      setPlatformTrigger(1, dataGambar.bendera),
      setPlatformTrigger(2, dataGambar.checkpoint),
      setPlatformTrigger(3, dataGambar.checkpoint_on);
  }
}
function cariPosisiAwal(a) {
  for (let e = 0; e < a.length; e++)
    for (let t = 0; t < a[e].length; t++)
      if (9 === a[e][t][0]) return { x: e, y: t };
  return { x: 1, y: 1 };
}
function ulangiPermainan(a = !1) {
  if (!1 === game.aktif) {
    if (game.coinKehidupan <= 1)
      return (game.coinKehidupan = 0), void showContinueOrGameOverPopup();
    game.coinKehidupan--;
  }
  (game.aktif = !0), setAwal(a), jalankan(gameLoop);
}
function gameLoop() {
  if (!isPaused) {
    hapusLayar(),
      1 === game.level
        ? latar(dataGambar.bg_level1, 0, 0)
        : 2 === game.level
        ? latar(dataGambar.bg_level2, 0, 0)
        : 3 === game.level && latar(dataGambar.bg_level3, 0, 0),
      game.kanan || game.rightBtnPressed
        ? gerakLevel(game.hero, 3, 0)
        : (game.kiri || game.leftBtnPressed) && gerakLevel(game.hero, -3, 0),
      (game.atas || game.upBtnPressed) && gerakLevel(game.hero, 0, -10);
    var a = document.getElementById("leftBtn"),
      e = document.getElementById("rightBtn"),
      t = document.getElementById("upBtn");
    if (
      (a.addEventListener("touchstart", function (a) {
        a.preventDefault(), (game.leftBtnPressed = !0);
      }),
      a.addEventListener("touchend", function (a) {
        a.preventDefault(), (game.leftBtnPressed = !1);
      }),
      e.addEventListener("touchstart", function (a) {
        a.preventDefault(), (game.rightBtnPressed = !0);
      }),
      e.addEventListener("touchend", function (a) {
        a.preventDefault(), (game.rightBtnPressed = !1);
      }),
      t.addEventListener("touchstart", function (a) {
        a.preventDefault(), (game.upBtnPressed = !0);
      }),
      t.addEventListener("touchend", function (a) {
        a.preventDefault(), (game.upBtnPressed = !1);
      }),
      buatLevel(),
      updateDanGambarPeluru(),
      updatePartikel(),
      game.coinAnim)
    ) {
      for (let a = 0; a < game.coinKehidupan; a++)
        (game.coinAnim.x = 40 + 40 * a),
          (game.coinAnim.y = 50),
          sprite(game.coinAnim);
      game.pause ||
        (void 0 === game.coinAnim.frameTimer && (game.coinAnim.frameTimer = 0),
        void 0 === game.coinAnim.frameRate && (game.coinAnim.frameRate = 3),
        game.coinAnim.frameTimer++,
        game.coinAnim.frameTimer > game.coinAnim.frameRate &&
          ((game.coinAnim.frameTimer = 0),
          game.coinAnim.frame++,
          game.coinAnim.frame > game.coinAnim.maxFrame &&
            (game.coinAnim.frame = 1)));
    }
    game.scoreSize > game.baseScoreSize && (game.scoreSize -= 0.5),
      teks(
        "SKOR: " + game.score,
        game.lebar / 2,
        60,
        "'Press Start 2P'-normal-" + game.scoreSize + "pt-center-putih|hitam"
      ),
      cekItem();
  }
}
function cekItem() {
  if (
    (game.itemID > 0 &&
      (1 === game.itemID
        ? tambahScore(1)
        : 2 === game.itemID
        ? tambahScore(2)
        : 3 === game.itemID && tambahScore(3),
      mainkanSuara(dataSuara.item),
      (game.itemID = 0)),
    0 != game.musuhID &&
      (tambahScore(2), mainkanSuara(dataSuara.poinmusuh), (game.musuhID = 0)),
    1 == game.triggerID &&
      ((game.triggerID = 0),
      (game.aktif = !1),
      mainkanSuara(dataSuara.win),
      1 === game.level
        ? showLevelCompletePopup(game.score)
        : 2 === game.level
        ? showNextLevelPopup(game.score)
        : showGameCompletePopup(game.score)),
    2 == game.triggerID)
  ) {
    (checkpointState.charX = game.charX),
      (checkpointState.charY = game.charY),
      (checkpointState.posX = game.posX),
      (checkpointState.posY = game.posY),
      mainkanSuara(dataSuara.cekpoin);
    let a = game.charX,
      e = game.charY;
    (levelState.map[a][e][3] = 3), (game.triggerID = 0);
  }
}
function tembakPeluru(a) {
  let e = setSprite(dataGambar.bungaBullet),
    t = a.charX * game.tileW + a.posX,
    m = a.charY * game.tileW + a.posY;
  (e.worldX = t - 20), (e.worldY = m + 25);
  (e.vx = -3), (e.vy = 0), (e.x = 0), (e.y = 0), gameBullets.push(e);
}
function buatPartikel(a, e) {
  for (let t = 0; t < 5; t++) {
    let t = setSprite(dataGambar.bungaBulletPieces);
    (t.x = a),
      (t.y = e),
      (t.vx = 4 * (Math.random() - 0.5)),
      (t.vy = 4 * (Math.random() - 0.5)),
      (t.lifespan = 30),
      (t.rotasi = acak(360)),
      gameParticles.push(t);
  }
}
function updateDanGambarPeluru() {
  let a = game.charX * game.tileW + game.posX,
    e = game.charY * game.tileW + game.posY;
  for (let t = gameBullets.length - 1; t >= 0; t--) {
    let m = gameBullets[t];
    (m.worldX += m.vx),
      (m.worldY += m.vy),
      (m.x = (m.worldX - a) * game.skalaSprite + game.lebar / 2),
      (m.y = (m.worldY - e) * game.skalaSprite + game.tinggi / 2),
      sprite(m);
    let n = Math.floor(m.worldX / game.tileW),
      r = Math.floor(m.worldY / game.tileW);
    n >= 0 &&
    n < game.map.length &&
    r >= 0 &&
    r < game.map[0].length &&
    1 === game.map[n][r][0]
      ? (buatPartikel(m.x, m.y), gameBullets.splice(t, 1))
      : jarak(m.x, m.y, game.karakter.x, game.karakter.y) < 20
      ? (heroDead(), buatPartikel(m.x, m.y), gameBullets.splice(t, 1))
      : (m.x < 0 || m.x > game.lebar || m.y < 0 || m.y > game.tinggi) &&
        gameBullets.splice(t, 1);
  }
}
function updatePartikel() {
  for (let a = gameParticles.length - 1; a >= 0; a--) {
    let e = gameParticles[a];
    (e.x += e.vx),
      (e.y += e.vy),
      e.lifespan--,
      sprite(e),
      e.lifespan <= 0 && gameParticles.splice(a, 1);
  }
}
loading(gambar, suara, () => {});
