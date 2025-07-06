var konten,
  canvas,
  gameArea,
  touchScale,
  warnaBG,
  currentElement,
  newWidth,
  newHeight,
  sizeBtn,
  dataGambar = {},
  dataSuara = {},
  smoothing = !1,
  funcDB = [],
  isMobile = !1,
  joyStick = {
    stat: !0,
    out: !1,
    px: 0,
    py: 0,
    sx: 0,
    sy: 0,
    id: 0,
    rad: 100,
    pos: "left",
    angle: 0,
    kanan: !1,
    atas: !1,
    kiri: !1,
    bawah: !1,
  },
  isTouch = !1,
  totalOffsetX = 0,
  totalOffsetY = 0,
  canvasX = 0,
  canvasY = 0,
  arena = {},
  game = {},
  gravitasi = 0.5,
  screenW = 0,
  screenH = 0;
function loading(a, e, t) {
  siapkanGambar(a, function (a) {
    (dataGambar = a),
      siapkanSuara(e, function (a) {
        (dataSuara = a), jalankan(t);
      });
  });
}
function Sound(a) {
  (this.sound = document.createElement("audio")),
    (this.sound.src = a),
    this.sound.setAttribute("preload", "auto"),
    this.sound.setAttribute("controls", "none"),
    (this.sound.style.display = "none"),
    document.body.appendChild(this.sound),
    (this.play = function () {
      this.sound.play();
    }),
    (this.stop = function () {
      this.sound.pause();
    }),
    (this.loop = function () {
      this.sound.setAttribute("loop", "loop"), this.sound.play();
    }),
    (this.volume = function (a) {
      this.sound.volume = a;
    });
}
function siapkanSuara(a, e) {
  var t = {},
    n = 0,
    m = 0;
  for (var i in a) m++;
  if (m > 0)
    for (var i in (hapusLayar(),
    kotakr(
      canvas.width / 2 - 150,
      canvas.height / 2 - 10,
      300,
      15,
      4,
      2,
      "white",
      "none"
    ),
    a)) {
      (t[i] = game.folder + "/" + a[i]),
        hapusLayar(),
        teks("loading sound", canvas.width / 2, canvas.height / 2 - 20);
      var r = (n / m) * 300;
      kotakr(
        canvas.width / 2 - 150,
        canvas.height / 2 - 10,
        r,
        15,
        4,
        2,
        "white",
        "white"
      ),
        kotakr(
          canvas.width / 2 - 150,
          canvas.height / 2 - 10,
          300,
          15,
          4,
          2,
          "white",
          "none"
        ),
        ++n >= m && e(t);
    }
  else e(t);
}
function siapkanGambar(a, e) {
  var t = {},
    n = 0,
    m = 0;
  for (var i in ((konten.webkitImageSmoothingEnabled = smoothing),
  (konten.mozImageSmoothingEnabled = smoothing),
  (konten.imageSmoothingEnabled = smoothing),
  a))
    m++;
  for (var i in (hapusLayar(),
  kotakr(
    canvas.width / 2 - 150,
    canvas.height / 2 - 10,
    300,
    15,
    4,
    2,
    "white",
    "none"
  ),
  a))
    (t[i] = new Image()),
      (t[i].onload = function () {
        hapusLayar(),
          teks("loading graphic", canvas.width / 2, canvas.height / 2 - 20);
        var a = (n / m) * 300;
        kotakr(
          canvas.width / 2 - 150,
          canvas.height / 2 - 10,
          a,
          15,
          4,
          2,
          "white",
          "white"
        ),
          kotakr(
            canvas.width / 2 - 150,
            canvas.height / 2 - 10,
            300,
            15,
            4,
            2,
            "white",
            "none"
          ),
          ++n >= m && e(t);
      }),
      (t[i].src = game.folder + "/" + a[i]);
}
function animasi(a) {
  sprite(a),
    null == a.frameRate && ((a.frameRate = 3), (a.frameTimer = 0)),
    game.pause || a.frameTimer++,
    a.frameTimer > a.frameRate &&
      ((a.frameTimer = 0), a.frame++, a.frame > a.maxFrame && (a.frame = 1));
}
function setSprite(a, e = 0, t = 0) {
  var n = {},
    m = a.width,
    i = a.height;
  (n.img = a),
    0 == e || 0 == t
      ? ((n.lebar = a.width), (n.tinggi = a.height))
      : ((n.lebar = e), (n.tinggi = t));
  var r = Math.floor(m / n.lebar) * Math.floor(i / n.tinggi);
  return (
    (n.x = 0),
    (n.y = 0),
    (n.frame = 1),
    (n.step = 1),
    (n.skalaX = 1),
    (n.skalaY = 1),
    (n.rotasi = 0),
    (n.timer = 0),
    (n.playOnce = !1),
    (n.mati = !1),
    (n.maxFrame = r),
    (n.delay = 10),
    (n.offsetX = 2),
    (n.offsetY = 2),
    (n.animJalan = 0),
    (n.animLompat = 0),
    (n.animJatuh = 0),
    (n.animMati = 0),
    (n.animKena = 0),
    (n.animTangga = 0),
    (n.animDiam = 0),
    n
  );
}
function sprite(a, e = 0) {
  var t = a.img.width,
    n = a.img.height;
  null == a.lebar && (a.lebar = t), null == a.tinggi && (a.tinggi = n);
  var m,
    i = Math.floor(t / a.lebar),
    r = i * Math.floor(n / a.tinggi);
  (a.maxFrame = r),
    0 == e ? null == a.frame && (a.frame = 1) : (a.frame = e),
    a.frame > a.maxFrame && (a.frame = a.maxFrame),
    (m = a.frame);
  var g = Math.floor((m - 1) / i),
    o = m - 1 - g * i;
  (null != a.x && null != a.y) || ((a.x = 0), (a.y = 0)),
    (null != a.skalaX && null != a.skalaX) || (a.skalaX = 1),
    (null != a.skalaY && null != a.skalaY) || (a.skalaY = 1),
    null == a.rotasi && (a.rotasi = 0),
    (null != a.mati && 0 != a.mati) ||
      (0 == a.rotasi
        ? 1 == a.skalaX && 1 == a.skalaY
          ? konten.drawImage(
              a.img,
              o * a.lebar,
              g * a.tinggi,
              a.lebar,
              a.tinggi,
              a.x - (a.lebar * game.skalaSprite) / a.offsetX,
              a.y - (a.tinggi * game.skalaSprite) / a.offsetY,
              a.lebar * game.skalaSprite,
              a.tinggi * game.skalaSprite
            )
          : (konten.save(),
            konten.translate(a.x, a.y),
            konten.scale(a.skalaX, a.skalaY),
            konten.drawImage(
              a.img,
              o * a.lebar,
              g * a.tinggi,
              a.lebar,
              a.tinggi,
              (-a.lebar * game.skalaSprite) / a.offsetX,
              (-a.tinggi * game.skalaSprite) / a.offsetY,
              a.lebar * game.skalaSprite,
              a.tinggi * game.skalaSprite
            ),
            konten.restore())
        : (konten.save(),
          konten.translate(a.x, a.y),
          konten.rotate((a.rotasi * Math.PI) / 180),
          konten.translate(-a.x, -a.y),
          konten.drawImage(
            a.img,
            o * a.lebar,
            g * a.tinggi,
            a.lebar,
            a.tinggi,
            a.x - (a.lebar * game.skalaSprite) / a.offsetX,
            a.y - (a.tinggi * game.skalaSprite) / a.offsetY,
            a.lebar * game.skalaSprite,
            a.tinggi * game.skalaSprite
          ),
          konten.restore()));
}
function tampilkanGambar(a, e = 0, t = 0, n = "") {
  if ("" == n) konten.drawImage(a, e - a.width / 2, t - a.height / 2);
  else if (n.indexOf("skala=") > -1) {
    var m = Number(n.substr(6)) / 100;
    konten.drawImage(
      a,
      0,
      0,
      a.width,
      a.height,
      e - (a.width * m) / 2,
      t - (a.height * m) / 2,
      a.width * m,
      a.height * m
    );
  } else if (n.indexOf("rotasi=") > -1) {
    var i = Number(n.substr(7));
    konten.save(),
      konten.translate(e, t),
      konten.rotate((i * Math.PI) / 180),
      konten.translate(-e, -t),
      konten.drawImage(a, e - a.width / 2, t - a.height / 2),
      konten.restore();
  } else if (n.indexOf("alpha=") > -1) {
    var r = Number(n.substr(6));
    konten.save(),
      (konten.globalAlpha = r / 100),
      konten.drawImage(a, e - a.width / 2, t - a.height / 2),
      (konten.globalAlpha = 1),
      konten.restore();
  } else konten.drawImage(a, e - a.width / 2, t - a.height / 2);
}
function gambarFull(a) {
  konten.drawImage(
    a,
    0,
    0,
    a.width,
    a.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
}
function loopSprite(a) {
  a.timer++,
    1 == a.maxFrame
      ? (a.frame = 1)
      : a.timer > 2 &&
        ((a.timer = 0),
        a.frame++,
        a.playOnce
          ? (a.frame = a.maxFrame)
          : a.frame > a.maxFrame && (a.frame = 1)),
    sprite(a);
}
function hapusLayar(a = warnaBG, e = {}) {
  (warnaBG = a),
    game.timer++,
    konten.clearRect(0, 0, canvas.width, canvas.height),
    "run" == e.stat && funcDB.push(e.func),
    "clear" == e.stat && (funcDB = []),
    funcDB.length > 0 && jalankan(funcDB[0]);
}
function kotakr(a, e, t, n, m = 5, i = 1, r = "#000", g = "#fff") {
  (m = { tl: m, tr: m, br: m, bl: m }),
    konten.beginPath(),
    konten.moveTo(a + m.tl, e),
    konten.lineTo(a + t - m.tr, e),
    konten.quadraticCurveTo(a + t, e, a + t, e + m.tr),
    konten.lineTo(a + t, e + n - m.br),
    konten.quadraticCurveTo(a + t, e + n, a + t - m.br, e + n),
    konten.lineTo(a + m.bl, e + n),
    konten.quadraticCurveTo(a, e + n, a, e + n - m.bl),
    konten.lineTo(a, e + m.tl),
    konten.quadraticCurveTo(a, e, a + m.tl, e),
    konten.closePath(),
    "none" != g && ((konten.fillStyle = g), konten.fill()),
    "none" != r &&
      ((konten.lineWidth = i), (konten.strokeStyle = r), konten.stroke());
}
function setGame(a = "") {
  if (
    ((canvas = document.getElementById("canvas")),
    (konten = canvas.getContext("2d")),
    (gameArea = document.getElementById("gameArea").getBoundingClientRect()),
    (score = 0),
    "" == a)
  )
    (konten.canvas.width = window.innerWidth),
      (konten.canvas.height = window.innerHeight),
      (screenW = window.innerWidth),
      (screenH = window.innerHeight);
  else {
    var e = a.split("x");
    (screenW = parseInt(e[0])),
      (screenH = parseInt(e[1])),
      (konten.canvas.width = screenW),
      (konten.canvas.height = screenH);
  }
  ((game = {}).aktif = !0),
    (game.lebar = screenW),
    (game.tinggi = screenH),
    (game.oriW = screenW),
    (game.oriH = screenH),
    (game.areaW = gameArea.width),
    (game.areaH = gameArea.height),
    (game.font = "Calibri-normal-20pt-left-hitam-normal-1.6"),
    (game.smoothing = !1),
    (game.pause = !1),
    (game.folder = "assets"),
    (game.orient = "landscape"),
    (game.fullscreen = !1),
    (game.isMobile = !1),
    (game.lompat = !1),
    (game.suaraAktif = !0),
    (game.musikAktif = !1),
    (game.transisi = !1),
    (game.lastAktif = game.aktif),
    (game.debug = !0),
    (game.mouse = { x: 0, y: 0 }),
    (game.score = 0),
    (game.hiScore = 0),
    (game.fps = 30),
    (game.timer = 0),
    (game.level = 1),
    (game.skalaSprite = 1),
    (game.warnaTransisi = "#000"),
    trace(
      "ukuran layar = " + konten.canvas.width + " x " + konten.canvas.height
    ),
    trace("ukuran canvas = " + canvas.width + " x " + canvas.height),
    trace("ukuran game Area = " + gameArea.width + " x " + gameArea.height),
    trace("ukuran display  = " + game.oriW + " x " + game.oriH),
    (touchScale = {
      x: gameArea.width / konten.canvas.width,
      y: gameArea.height / konten.canvas.height,
    }),
    aktifkanKeyboard(),
    trace("input keyboard & mouse aktif"),
    hapusLayar("#333"),
    (canvas.onmousedown = mouseDown),
    (canvas.onmouseup = mouseUp),
    (canvas.onmousemove = mouseMove),
    (canvas.oncontextmenu = function (a) {
      a.preventDefault(), a.stopPropagation();
    });
}
function updateOffset() {
  (currentElement = canvas), (totalOffsetX = 0), (totalOffsetY = 0);
  do {
    (totalOffsetX += currentElement.offsetLeft),
      (totalOffsetY += currentElement.offsetTop);
  } while ((currentElement = currentElement.offsetParent));
}
function mousePos(a) {
  updateOffset(),
    (canvasX = a.pageX - totalOffsetX),
    (canvasY = a.pageY - totalOffsetY),
    (canvasX = Math.round(canvasX * (canvas.width / canvas.offsetWidth))),
    (canvasY = Math.round(canvasY * (canvas.height / canvas.offsetHeight)));
}
function mouseDown(a) {
  updateOffset(),
    (game.mouseDitekan = !0),
    mousePos(a),
    (game.mouse = { x: canvasX, y: canvasY }),
    (game.dragX = game.mouse.x),
    (game.dragY = game.mouse.y),
    (game.clickX = game.mouse.x),
    (game.clickY = game.mouse.y);
}
function mouseUp(a) {
  (game.mouseDitekan = !1),
    mousePos(a),
    (game.mouse = { x: canvasX, y: canvasY }),
    (game.dragX = game.mouse.x),
    (game.dragY = game.mouse.y),
    (game.clickX = game.mouse.x),
    (game.clickY = game.mouse.y);
}
function mouseMove(a) {
  mousePos(a), (game.dragX = game.mouse.x), (game.dragY = game.mouse.y);
}
var atas = !1,
  bawah = !1,
  kiri = !1,
  kanan = !1,
  spasi = !1,
  tombolP = !1;
function tombolditekan(a) {
  (game.keyCode = a.keyCode),
    (game.kodeTombol = a.keyCode),
    !game.pause &&
      game.aktif &&
      (37 == a.keyCode && ((kiri = !0), (game.kiri = !0)),
      38 == a.keyCode && ((atas = !0), (game.atas = !0)),
      39 == a.keyCode && ((kanan = !0), (game.kanan = !0)),
      40 == a.keyCode && ((bawah = !0), (game.bawah = !0)),
      32 == a.keyCode && ((spasi = !0), (game.spasi = !0))),
    80 == a.keyCode && (tombolP = !0);
}
function tomboldilepas(a) {
  37 == a.keyCode && ((kiri = !1), (game.kiri = !1)),
    38 == a.keyCode && ((atas = !1), (game.atas = !1)),
    39 == a.keyCode && ((kanan = !1), (game.kanan = !1)),
    40 == a.keyCode && ((bawah = !1), (game.bawah = !1)),
    32 == a.keyCode && ((spasi = !1), (game.spasi = !1)),
    80 == a.keyCode && ((tombolP = !1), (game.pause = !game.pause)),
    (game.keyCode = null);
}
function aktifkanKeyboard() {
  addEventListener("keydown", tombolditekan),
    addEventListener("keyup", tomboldilepas),
    (isMobile = deteksiMobile()),
    (game.isMobile = isMobile),
    isMobile &&
      (canvas.addEventListener("touchend", touchEnd, !1),
      canvas.addEventListener("touchmove", touchMove, !1),
      canvas.addEventListener("touchstart", touchStart, !1),
      window.addEventListener("orientationchange", resizeMobile, !1),
      window.addEventListener("resize", resizeMobile, !1));
}
function tombol(a, e = 0, t = 0) {
  return (
    tampilkanGambar(a, e, t), { x: e, y: t, lebar: a.width, tinggi: a.height }
  );
}
function tekan(a) {
  var e = !1;
  return (
    game.mouseDitekan &&
      game.mouse.x > a.x - a.lebar / 2 &&
      game.mouse.x < a.x + a.lebar / 2 &&
      game.mouse.y > a.y - a.tinggi / 2 &&
      game.mouse.y < a.y + a.tinggi / 2 &&
      ((game.mouseDitekan = !1), (e = !0)),
    e
  );
}
function trace(a) {
  game.debug;
}
var fpsInterval,
  now,
  then,
  elapsed,
  startTime,
  loopFunc = null;
function jalankan(a) {
  (loopFunc = a),
    (fpsInterval = 1e3 / 60),
    (then = Date.now()),
    (startTime = then),
    rafLoops();
}
function rafLoops() {
  game.loop && cancelAnimationFrame(game.loop),
    (game.loop = requestAnimationFrame(rafLoops)),
    (now = Date.now()),
    (elapsed = now - then) > fpsInterval &&
      ((then = now - (elapsed % fpsInterval)),
      "function" == typeof loopFunc && loopFunc(elapsed));
}
function grid() {
  var a = screenW / 100,
    e = screenH / 100;
  garis(3, 3, screenW, 3, 3, "#ff6969"), garis(3, 3, 3, screenH, 3, "#4d94ff");
  for (var t = 0; t <= a; t++) {
    t > 0 &&
      (teks(100 * t, 100 * t, 20, "Calibri-bold-15pt-center-#ff6969"),
      garis(100 * t, 25, 100 * t, screenH, 0.8, "#ff6969"));
    for (var n = 0; n < 10; n++)
      garis(100 * t + 10 * n, 3, 100 * t + 10 * n, screenH, 0.3, "#ffffff");
  }
  for (t = 0; t <= e; t++)
    for (
      t > 0 &&
        (teks(100 * t, 8, 100 * t + 3, "Calibri-bold-15pt-left-#4d94ff"),
        garis(40, 100 * t, screenW, 100 * t, 0.8, "#4d94ff")),
        n = 0;
      n < 10;
      n++
    )
      garis(3, 100 * t + 10 * n, screenW, 100 * t + 10 * n, 0.3, "#ffffff");
}
function garis(a, e, t, n, m = 1, i = "#000", r = "") {
  if (r.length > 0) {
    var g = r.split("-");
    if ("dash" == g[0]) {
      (null != g[1] && null != g[1]) || (g[1] = 5),
        (null != g[2] && null != g[2]) || (g[2] = 3);
      for (var o = [], s = 1; s < g.length; s++) o.push(g[s]);
      konten.setLineDash(o);
    }
  }
  (konten.strokeStyle = i),
    (konten.lineWidth = m),
    konten.beginPath(),
    konten.moveTo(a, e),
    konten.lineTo(t, n),
    konten.stroke(),
    konten.setLineDash([]);
}
var kedip = 0;
function cekAlign(a) {
  var e = a;
  return (
    "tengah" == a && (e = "center"),
    "kiri" == a && (e = "left"),
    "kanan" == a && (e = "kanan"),
    e
  );
}
function cekWarna(a) {
  var e = a,
    t = a.split("|");
  "hitam" == t[0] && (e = "black"),
    "putih" == t[0] && (e = "white"),
    "biru" == t[0] && (e = "#0066ff"),
    "hijau" == t[0] && (e = "#39f43e"),
    "merah" == t[0] && (e = "#ed2d2d"),
    "jingga" == t[0] && (e = "#ffd146"),
    "kuning" == t[0] && (e = "#ffea00"),
    "ungu" == t[0] && (e = "#b026ff"),
    "pink" == t[0] && (e = "#ff7e7e"),
    "tosca" == t[0] && (e = "#0faf9a"),
    "abuabu" == t[0] && (e = "#7a7a7a");
  var n = "none";
  return (
    t.length > 1 &&
      ("hitam" == t[1] && (n = "black"),
      "putih" == t[1] && (n = "white"),
      "biru" == t[1] && (n = "#0066ff"),
      "hijau" == t[1] && (n = "#39f43e"),
      "merah" == t[1] && (n = "#ed2d2d"),
      "jingga" == t[1] && (n = "#ffd146"),
      "kuning" == t[1] && (n = "#ffea00"),
      "ungu" == t[1] && (n = "#b026ff"),
      "pink" == t[1] && (n = "#ff7e7e"),
      "tosca" == t[1] && (n = "#0faf9a"),
      "abuabu" == t[1] && (n = "#7a7a7a")),
    { c1: e, c2: n }
  );
}
function teks(a, e, t, n = "") {
  var m = 0,
    i = n;
  "" == n && (i = game.font);
  return (
    1 == (i = i.split("-")).length &&
      ((konten.font = "bold 14pt " + i[0]),
      (konten.fillStyle = "#000"),
      (konten.textAlign = "center")),
    2 == i.length &&
      ((konten.font = i[1] + " 14pt " + i[0]),
      (konten.fillStyle = "#000"),
      (konten.textAlign = "center")),
    3 == i.length &&
      ((konten.font = i[1] + " " + i[2] + " " + i[0]),
      (konten.fillStyle = "#000"),
      (konten.textAlign = "center")),
    4 == i.length &&
      ((konten.font = i[1] + " " + i[2] + " " + i[0]),
      (konten.fillStyle = "#000"),
      (konten.textAlign = cekAlign(i[3]))),
    5 == i.length &&
      ((konten.font = i[1] + " " + i[2] + " " + i[0]),
      (konten.fillStyle = cekWarna(i[4]).c1),
      (konten.textAlign = cekAlign(i[3])),
      "none" != cekWarna(i[4]).c2 && (konten.strokeStyle = cekWarna(i[4]).c2)),
    i.length >= 6 &&
      ((konten.font = i[1] + " " + i[2] + " " + i[0]),
      (konten.fillStyle = cekWarna(i[4]).c1),
      (konten.textAlign = cekAlign(i[3])),
      "none" != cekWarna(i[4]).c2 && (konten.strokeStyle = cekWarna(i[4]).c2),
      "kedip" == i[5] && ((m = 1), ++kedip > 30 && (kedip = 0))),
    1 == m &&
      kedip < 13 &&
      (i.length > 4 &&
        "none" != cekWarna(i[4]).c2 &&
        konten.strokeText(a, e, t),
      konten.fillText(a, e, t)),
    0 == m &&
      (i.length > 4 &&
        "none" != cekWarna(i[4]).c2 &&
        konten.strokeText(a, e, t),
      konten.fillText(a, e, t)),
    a
  );
}
function teksHTML(a, e, t, n, m = "") {
  "" == m && (m = game.font);
  var i = m.split("-"),
    r = i[0],
    g = Number(i[2].substring(0, 2)),
    o = i[3];
  konten.textAlign = "left";
  var s = cekWarna(i[4]).c1,
    l = 1.5;
  (null == i[6] && null == i[6]) || (l = Number(i[6])), (r = "px " + r);
  var c,
    k,
    h = [],
    f = [0],
    u = "",
    p = "",
    d = !1,
    v = !1,
    b = !1,
    y = !1,
    w = 0,
    S = 0,
    x = ["b", "strong", "i", "em", "sup", "sub"],
    Y = 0,
    X = "",
    W = "",
    M = "",
    T = u,
    I = "";
  function j() {
    var a = "",
      e = g;
    d && (a += "bold "),
      v && (a += "italic "),
      (b || y) && ((e = 0.8 * g), b ? (S -= 0.3 * g) : (S += 0.3 * g)),
      (konten.font = a + e + r),
      (X = u.split(" ")),
      (W = ""),
      (M = ""),
      (T = u),
      (I = ""),
      (Y = 0);
    for (var t = 0; t < X.length; t++)
      (M = W),
        (W += X[t] + " "),
        (c = w + konten.measureText(W).width),
        (Y = w + konten.measureText(M).width),
        c > n &&
          ((I += M),
          f.push([w, S, konten.font, M, Y]),
          (T = u.substring(I.length)),
          t--,
          (w = 0),
          (S = 0),
          (W = ""),
          h.push(f),
          (f = [0]));
    T.length > 0 &&
      ((c = konten.measureText(T).width),
      (Y = w + c),
      f.push([w, S, konten.font, T, Y]),
      (u = ""),
      (w += c));
  }
  function A() {
    "" !== u && j(), (f[0] = w), h.push(f), (f = [0]), (w = S = 0);
  }
  for (var D = 0; D < a.length; D++) {
    var P = a[D];
    if ("\n" == P) A();
    else if ("<" != P) u += P;
    else {
      D + 1;
      var O = !1;
      "/" == (p = a[++D]) && ((p = ""), (O = !0));
      var E = !0;
      for (D += 1; D < a.length; D++) {
        if ("<" == a[D]) {
          (D -= 1), (u += "<" + p), j(), (E = !1);
          break;
        }
        if (">" == a[D]) break;
        p += a[D];
      }
      if (!E) continue;
      if ("br" == p || "br/" == p) A();
      else
        switch ((x.indexOf(p) >= 0 && "" !== u && j(), p)) {
          case "b":
          case "strong":
            d = !O;
            break;
          case "i":
          case "em":
            v = !O;
            break;
          case "sup":
            (b = !O), O && (S = 0);
            break;
          case "sub":
            (y = !O), O && (S = 0);
            break;
          default:
            u += "<" + p + ">";
        }
    }
  }
  if (u.length > 0) {
    for (
      X = u.split(" "),
        W = "",
        M = "",
        T = u,
        I = "",
        konten.font = g + r,
        D = 0;
      D < X.length;
      D++
    )
      (M = W),
        (W += X[D] + " "),
        (c = w + konten.measureText(W).width),
        (Y = w + konten.measureText(M).width),
        c > n &&
          ((I += M),
          f.push([w, S, konten.font, M, Y]),
          (T = u.substring(I.length)),
          (w = 0),
          (S = 0),
          D--,
          (W = ""),
          h.push(f),
          (f = [0]));
    T.length > 0 &&
      ((c = konten.measureText(T).width),
      (Y = w + c),
      f.push([w, S, konten.font, T, Y]),
      h.push(f),
      (u = ""),
      (w += c));
  }
  var H = -1;
  for (k in h) h[k][0] > H && (H = h[k][0]);
  for (k in h)
    for (var F in ((t += l * g), h[k])) {
      var G = h[k][F];
      if (void 0 !== G[1]) {
        var B = h[k][h[k].length - 1];
        switch (
          (B.length > 1 && (Y = B[4]),
          (konten.font = G[2]),
          (konten.fillStyle = s),
          o)
        ) {
          case "left":
            (w = e + G[0]), (S = t + G[1]);
            break;
          case "center":
            (w = e + n / 2 + G[0] - Y / 2), (S = t + G[1]);
            break;
          case "right":
            (w = e + G[0] + n - Y), (S = t + G[1]);
            break;
          default:
            throw new Error(o + " is not a possible alignment option.");
        }
        konten.fillText(G[3], w, S);
      } else G;
    }
}
function mainkanSuara(a, e = 100) {
  if (isSoundOn && game.suaraAktif && !isPaused) {
    var t = new Sound(a);
    t.volume(e / 100), t.play();
  }
}
function musik(a, e = 50) {
  game.musikAktif ||
    ((game.musikAktif = !0),
    (game.musik = new Sound(a)),
    game.musik.loop(),
    game.musik.volume(e / 100));
}
function acak(a) {
  return Math.floor(Math.random() * a);
}
function jarak(a, e, t, n) {
  return Math.sqrt((t - a) * (t - a) + (n - e) * (n - e));
}
function sudut(a, e, t, n) {
  return (180 * -Math.atan2(t - a, n - e)) / 3.14159265359 + 90;
}
function setGameOver(a, e) {
  (game.gameOver = a), (game.func = e);
}
var bgx = 0,
  bgy = 0;
function latar(a, e = 0, t = 0) {
  game.pause || (bgx += e),
    bgx > a.width && (bgx -= a.width),
    bgx < 0 && (bgx += a.width),
    game.pause || (bgy += t),
    bgy > a.height && (bgy -= a.height),
    bgy < 0 && (bgy += a.height);
  for (
    var n = Math.ceil(screenW / a.width),
      m = Math.ceil(screenH / a.height),
      i = -1;
    i < n;
    i++
  )
    for (var r = -1; r < m; r++)
      konten.drawImage(
        a,
        0,
        0,
        a.width,
        a.height,
        i * a.width + bgx,
        r * a.height + bgy,
        a.width,
        a.height
      );
}
function tambahScore(a) {
  (game.score += a),
    game.score > game.hiScore && (game.hiScore = game.score),
    game.scoreSize && (game.scoreSize = game.baseScoreSize + 8);
}
function acakArray(a) {
  for (var e = 0; e < a.length; e++) {
    var t = a[e],
      n = acak(a.length);
    (a[e] = a[n]), (a[n] = t);
  }
  return a;
}
function cekHit(a, e) {
  var t = !1;
  return (
    a.x > e.x - e.lebar / 2 &&
      a.x < e.x + e.lebar / 2 &&
      a.y > e.y - e.tinggi / 2 &&
      a.y < e.y + e.tinggi / 2 &&
      (t = !0),
    t
  );
}
function hitPoint(a, e, t) {
  var n = !1;
  return (
    null != t &&
      a > t.x - t.lebar / 2 &&
      a < t.x + t.lebar / 2 &&
      e > t.y - t.tinggi / 2 &&
      e < t.y + t.tinggi / 2 &&
      (n = !0),
    n
  );
}
function tabrakan(a, e) {
  if (null != a && null != e) {
    if (hitPoint(a.x - a.lebar / 2, a.y - a.tinggi / 2, e)) return !0;
    if (hitPoint(a.x + a.lebar / 2, a.y - a.tinggi / 2, e)) return !0;
    if (hitPoint(a.x - a.lebar / 2, a.y + a.tinggi / 2, e)) return !0;
    if (hitPoint(a.x + a.lebar / 2, a.y + a.tinggi / 2, e)) return !0;
  }
  return !1;
}
var movingOb = {};
function efekMasuk(a, e, t, n, m) {
  null == movingOb[a]
    ? ((movingOb[a] = new Object()),
      "kiri" == m && ((movingOb[a].x = 2 * -e.width), (movingOb[a].y = n)),
      "kanan" == m &&
        ((movingOb[a].x = game.lebar + 2 * e.width), (movingOb[a].y = n)),
      "atas" == m &&
        ((movingOb[a].x = game.lebar / 2), (movingOb[a].y = 2 * -e.height)),
      "bawah" == m &&
        ((movingOb[a].x = game.lebar / 2),
        (movingOb[a].y = game.tinggi + 2 * e.height)),
      (movingOb[a].img = e))
    : jarak(movingOb[a].x, movingOb[a].y, t, n) < 2
    ? ((movingOb[a].x = t), (movingOb[a].y = n))
    : ((movingOb[a].x += (t - movingOb[a].x) / 10),
      (movingOb[a].y += (n - movingOb[a].y) / 10)),
    sprite(movingOb[a]);
}
function acakAngka(a) {
  var e = [],
    t = [],
    n = a.split("-");
  if ((1 == n.length && t.push(acak(parseInt(n[0]))), n.length > 1)) {
    for (var m = parseInt(n[0]), i = parseInt(n[1]), r = m; r <= i; r++)
      e.push(r);
    t = acakArray(e);
  }
  return t;
}
function openFullscreen() {
  var a = document.getElementById("gameArea"),
    e =
      a.requestFullScreen ||
      a.webkitRequestFullScreen ||
      a.mozRequestFullScreen ||
      a.msRequestFullScreen;
  if (e) e.call(a);
  else if (void 0 !== window.ActiveXObject) {
    var t = new ActiveXObject("WScript.Shell");
    null !== t && t.SendKeys("{F11}");
  }
  resize(!0);
}
function closeFullscreen() {
  document.exitFullscreen
    ? document.exitFullscreen()
    : document.webkitExitFullscreen
    ? document.webkitExitFullscreen()
    : document.msExitFullscreen && document.msExitFullscreen(),
    resize(!1);
}
function screenSize(a) {
  a
    ? ((newWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      )),
      (newHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      )))
    : ((newWidth = game.oriW), (newHeight = game.oriH));
}
function resize(a = !0) {
  screenSize(a);
  var e = document.getElementById("gameArea");
  a
    ? ((gameArea.width = newWidth),
      (gameArea.height = newHeight),
      setTimeout(function () {
        screenSize(!0),
          (gameArea.height = newHeight),
          getOrient(),
          trace("area full = " + gameArea.width + " x " + gameArea.height),
          (canvas.style.width = "100%"),
          (canvas.style.height = "100%"),
          (e.style.width = newWidth + "px"),
          (e.style.height = newHeight + "px");
      }, 10))
    : setTimeout(function () {
        (gameArea.width = game.areaW),
          screenSize(!1),
          (gameArea.height = game.areaH),
          getOrient(),
          trace("area = " + gameArea.width + " x " + gameArea.height),
          (canvas.style.width = "100%"),
          (canvas.style.height = "100%"),
          (e.style.width = game.areaW + "px"),
          (e.style.height = game.areaH + "px");
      }, 1e3);
}
function forceFullscreen() {
  document.getElementById("gameArea");
  isMobile &&
    game.fullscreen &&
    ((newWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    )),
    (newHeight = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    )),
    gameArea.height != newHeight && (gameArea.height = newHeight));
}
function getOrient() {
  isMobile &&
    (window.innerWidth < window.innerHeight
      ? (game.orient = "portrait")
      : (game.orient = "landscape"));
}
function resizeMobile() {
  game.fullscreen ? resize(!0) : resize(!1);
}
function deteksiMobile() {
  return [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ].some((a) => navigator.userAgent.match(a));
}
function touchMove(a) {
  a.preventDefault(), checkTouchMove(a.targetTouches);
}
function touchEnd(a) {
  (isTouch = !1),
    (game.mouseDitekan = !1),
    a.preventDefault(),
    checkTouchEnd(a.targetTouches);
}
function touchStart(a) {
  a.preventDefault(),
    (game.mouseDitekan = !0),
    (isTouch = !0),
    checkTouchStart(a.targetTouches);
}
var out = "";
function checkTouchStart(a) {
  for (updateOffset(), index1 = a.length - 1; index1 > -1; --index1) {
    touch = a[index1];
    var e = touch.pageX - totalOffsetX,
      t = touch.pageY - totalOffsetY;
    doTouchStart(
      (e = Math.round(e * (canvas.width / canvas.offsetWidth))),
      (t = Math.round(t * (canvas.height / canvas.offsetHeight))),
      index1
    ),
      (game.mouse = { x: e, y: t });
  }
}
function checkTouchMove(a) {
  for (updateOffset(), index1 = a.length - 1; index1 > -1; --index1) {
    touch = a[index1];
    var e = touch.pageX - totalOffsetX,
      t = touch.pageY - totalOffsetY;
    doTouchMove(
      (e = Math.round(e * (canvas.width / canvas.offsetWidth))),
      (t = Math.round(t * (canvas.height / canvas.offsetHeight))),
      index1
    ),
      (game.mouse = { x: e, y: t });
  }
}
function checkTouchEnd(a) {
  document.getElementById("canvas");
  doTouchEnd();
}
function doTouchStart(a, e, t) {
  if (joyStick.stat && !joyStick.out) {
    var n = !1;
    "left" == joyStick.pos && a < screenW / 2 && (n = !0),
      "right" == joyStick.pos && a > screenW / 2 && (n = !0),
      n &&
        ((joyStick.out = !0),
        (joyStick.px = a),
        (joyStick.py = e),
        (joyStick.sx = a),
        (joyStick.sy = e),
        (joyStick.id = t));
  }
}
function doTouchMove(a, e, t) {
  if (joyStick.stat && joyStick.out && joyStick.id == t) {
    var n =
        (180 * -Math.atan2(a - joyStick.px, e - joyStick.py)) / 3.14159265359 +
        90,
      m = Math.sqrt(
        (joyStick.px - a) * (joyStick.px - a) +
          (joyStick.py - e) * (joyStick.py - e)
      );
    m > joyStick.rad && (m = joyStick.rad),
      (joyStick.sx = m * Math.cos((3.14159265359 * n) / 180)),
      (joyStick.sy = m * Math.sin((3.14159265359 * n) / 180)),
      (joyStick.angle = n),
      (joyStick.atas = !1),
      (joyStick.bawah = !1),
      (joyStick.kiri = !1),
      (joyStick.kanan = !1),
      (game.atas = !1),
      (game.bawah = !1),
      (game.kiri = !1),
      (game.kanan = !1),
      n < -68 && n > -23
        ? ((joyStick.kanan = !0),
          (joyStick.atas = !0),
          (game.kanan = !0),
          (game.atas = !0))
        : n > -23 && n < 23
        ? ((joyStick.kanan = !0), (game.kanan = !0))
        : n > 23 && n < 68
        ? ((joyStick.kanan = !0),
          (joyStick.bawah = !0),
          (game.kanan = !0),
          (game.bawah = !0))
        : n > 68 && n < 113
        ? ((joyStick.bawah = !0), (game.bawah = !0))
        : n > 113 && n < 158
        ? ((joyStick.kiri = !0),
          (joyStick.bawah = !0),
          (game.kiri = !0),
          (game.bawah = !0))
        : n > 158 && n < 203
        ? ((joyStick.kiri = !0), (game.kiri = !0))
        : n > 203 && n < 248
        ? ((joyStick.kiri = !0),
          (joyStick.atas = !0),
          (game.kiri = !0),
          (game.atas = !0))
        : (n > 248 || n < -68) && ((joyStick.atas = !0), (game.atas = !0));
  }
}
function doTouchEnd() {
  joyStick.stat &&
    joyStick.out &&
    ((game.atas = !1),
    (game.bawah = !1),
    (game.kiri = !1),
    (game.kanan = !1),
    (joyStick.out = !1),
    (joyStick.atas = !1),
    (joyStick.bawah = !1),
    (joyStick.kiri = !1),
    (joyStick.kanan = !1));
}
function gambarJoyStick() {
  joyStick.stat &&
    joyStick.out &&
    ((konten.lineWidth = 5),
    (konten.strokeStyle = "#03fcf0"),
    konten.beginPath(),
    konten.arc(joyStick.px, joyStick.py, joyStick.rad, 0, 2 * Math.PI, !1),
    konten.stroke(),
    konten.beginPath(),
    (konten.lineWidth = 3),
    konten.arc(
      joyStick.px + joyStick.sx,
      joyStick.py + joyStick.sy,
      joyStick.rad / 2,
      0,
      2 * Math.PI,
      !1
    ),
    konten.stroke());
}
function resizeBtn(a, e) {
  null != dataGambar.maxBtn &&
    null != dataGambar.minBtn &&
    (game.fullscreen
      ? (tekan((sizeBtn = tombol(dataGambar.minBtn, a, e))) &&
          ((game.fullscreen = !1), (game.mouseDitekan = !1), closeFullscreen()),
        null === document.fullscreenElement &&
          ((game.fullscreen = !1), resize(!1)))
      : (tekan((sizeBtn = tombol(dataGambar.maxBtn, a, e))) &&
          ((game.fullscreen = !0), (game.mouseDitekan = !1), openFullscreen()),
        null != document.fullscreenElement &&
          ((game.fullscreen = !0), resize(!0))));
}
function tiltWarn() {
  gambarFull(dataGambar.tilt);
}
function isOK() {
  var a = !0;
  return (
    isMobile && game.fullscreen && "landscape" != game.orient && (a = !1), a
  );
}
function cloneArray(a) {
  return JSON.parse(JSON.stringify(a));
}
function setPlatform(a, e, t, n) {
  (game.map = a),
    (game.tilesetSize = e.width),
    (game.tileset = e),
    (game.tileW = t),
    (game.tile_num = Math.floor(game.tilesetSize / game.tileW)),
    (game.charY = 5),
    (game.screenW =
      Math.floor(game.lebar / (game.tileW * game.skalaSprite)) + 2),
    (game.screenH =
      Math.floor(game.tinggi / (game.tileW * game.skalaSprite)) + 2),
    trace("tile setup = " + game.screenW + " x " + game.screenH),
    (game.cameraX = 0),
    (game.cameraY = 0),
    (game.arenaX = -game.charX * game.tileW),
    (game.arenaY = -game.charY * game.tileW),
    (game.lompatY = 0),
    (game.karakter = n),
    (game.itemID = 0),
    (game.musuhID = 0),
    (game.triggerID = 0),
    (game.gravitasi = 0.5),
    (game.type = "platformer"),
    (game.deadAnim = !1),
    (game.platformItems = {}),
    (game.platformTrigger = {}),
    (game.platformEnemies = []);
}
function setPlatformItem(a, e) {
  (game.platformItems["item_" + a] = e),
    (game.platformItems["frame_" + a] = Math.floor(e.width / game.tileW));
}
function setPlatformTrigger(a, e) {
  (game.platformTrigger["item_" + a] = e),
    (game.platformTrigger["frame_" + a] = Math.floor(e.width / e.height));
}
function sisa(a, e) {
  return a - Math.floor(a / e) * e;
}
function buatLevel() {
  for (
    var a,
      e,
      t = Math.floor(game.charX - game.screenW / 2),
      n = Math.floor(game.charY - game.screenH / 2),
      m = 0;
    m < game.screenW + 2;
    m++
  )
    for (var i = 0; i < game.screenH + 2; i++) {
      var r = m + t,
        g = i + n;
      if (r >= 0 && g >= 0 && r < game.map.length && g < game.map[0].length) {
        var o = game.map[r][g][1],
          s = game.map[r][g][0],
          l =
            -game.posX * game.skalaSprite +
            game.cameraX +
            (m - 1) * game.tileW * game.skalaSprite,
          c =
            -game.posY * game.skalaSprite +
            game.cameraY +
            (i - 1) * game.tileW * game.skalaSprite;
        if (o > -1) {
          var k = Math.floor(o / game.tile_num),
            h = o - k * game.tile_num;
          konten.drawImage(
            game.tileset,
            h * game.tileW,
            k * game.tileW,
            game.tileW,
            game.tileW,
            l,
            c,
            game.tileW * game.skalaSprite,
            game.tileW * game.skalaSprite
          );
        }
        var f = game.map[r][g][2];
        if (f > 0) {
          var u = Math.floor(f / game.tile_num),
            p = f - u * game.tile_num;
          konten.drawImage(
            game.tileset,
            p * game.tileW,
            u * game.tileW,
            game.tileW,
            game.tileW,
            l,
            c,
            game.tileW * game.skalaSprite,
            game.tileW * game.skalaSprite
          );
        }
        if (
          (r != game.charX ||
            g != game.charY ||
            game.deadAnim ||
            ((game.karakter.x =
              game.cameraX + (m - 1) * game.tileW * game.skalaSprite),
            (game.karakter.y =
              game.cameraY +
              (i - 1) * game.tileW * game.skalaSprite +
              (game.karakter.tinggi * game.skalaSprite) / 2)),
          3 == s)
        ) {
          var d = game.map[r][g][3];
          if (null != d && null != game.platformItems["item_" + d]) {
            var v = game.platformItems["item_" + d],
              b = sisa(game.timer, game.platformItems["frame_" + d]);
            konten.drawImage(
              v,
              b * game.tileW,
              0,
              game.tileW,
              game.tileW,
              l,
              c,
              game.tileW * game.skalaSprite,
              game.tileW * game.skalaSprite
            ),
              jarak(
                game.karakter.x,
                game.karakter.y,
                l + (game.tileW * game.skalaSprite) / 2,
                c + (game.tileW * game.skalaSprite) / 2
              ) < game.tileW && ((game.itemID = d), (game.map[r][g][0] = 0));
          }
        }
        if (7 == s) {
          var y = game.map[r][g][3];
          if (null != y && null != game.platformTrigger["item_" + y]) {
            (v = game.platformTrigger["item_" + y]),
              (b = sisa(game.timer, game.platformTrigger["frame_" + y]));
            var w = Math.max(game.tileW, v.height),
              S = (game.tileW - w) * game.skalaSprite;
            konten.drawImage(
              v,
              b * w,
              0,
              w,
              w,
              l + S,
              c + S,
              w * game.skalaSprite,
              w * game.skalaSprite
            ),
              r == game.charX &&
                g == game.charY &&
                game.aktif &&
                (game.triggerID = y);
          }
        }
        if (5 == s) {
          var x = game.map[r][g][4];
          if (null != x) {
            var Y = game.platformEnemies[x];
            null == Y ||
              (void 0 !== Y.mati && !1 !== Y.mati) ||
              ((Y.x =
                l +
                Y.posX * game.skalaSprite +
                (game.tileW * game.skalaSprite) / 2),
              (Y.y =
                c +
                Y.posY * game.skalaSprite +
                (game.tileW * game.skalaSprite) / 2),
              loopSprite(Y));
          }
        }
      }
    }
  gerakMusuh(),
    loopSprite(game.karakter),
    game.aktif &&
      "platformer" == game.type &&
      ((game.lompatY += game.gravitasi),
      game.lompatY < 0 &&
        (0 != game.karakter.animLompat &&
          (game.karakter.img = game.karakter.animLompat),
        (a =
          game.posY +
          game.lompatY +
          (game.karakter.tinggi / 2) * game.skalaSprite),
        (e = game.charY),
        a < 0 && (e = game.charY - 1),
        e > 0 &&
          ((0 != game.map[game.charX][e][0] &&
            8 != game.map[game.charX][e][0] &&
            3 != game.map[game.charX][e][0] &&
            5 != game.map[game.charX][e][0] &&
            7 != game.map[game.charX][e][0]) ||
            ((game.posY += game.lompatY),
            game.posY < 0 && ((game.posY += game.tileW), game.charY--)),
          1 == game.map[game.charX][e][0] && (game.lompatY = 0),
          10 == game.map[game.charX][e][0] && heroDead())),
      game.lompatY > 0 &&
        (0 != game.karakter.animJatuh &&
          (game.karakter.img = game.karakter.animJatuh),
        (game.lompat = !0),
        (a =
          game.posY +
          game.lompatY +
          (game.karakter.tinggi / 2) * game.skalaSprite),
        (e = game.charY),
        a > game.tileW && (e = game.charY + 1),
        e < game.map[0].length &&
          ((0 != game.map[game.charX][e][0] &&
            3 != game.map[game.charX][e][0] &&
            5 != game.map[game.charX][e][0] &&
            7 != game.map[game.charX][e][0]) ||
            ((game.posY += game.lompatY),
            game.posY > game.tileW &&
              ((game.posY -= game.tileW), game.charY++)),
          (1 != game.map[game.charX][e][0] &&
            8 != game.map[game.charX][e][0]) ||
            ((game.lompatY = 0),
            (game.lompat = !1),
            (game.posY = 0),
            0 != game.karakter.animDiam &&
              (game.karakter.img = game.karakter.animDiam)),
          10 == game.map[game.charX][e][0] && heroDead()))),
    game.deadAnim &&
      "platformer" == game.type &&
      ((game.lompatY += game.gravitasi),
      (game.karakter.y += game.lompatY),
      (game.karakter.rotasi += 2),
      game.karakter.y > game.tinggi &&
        ((game.deadAnim = !1), ulangiPermainan()));
}
function jalankanFungsi(a) {
  null != a && a();
}
function heroDead() {
  (game.aktif = !1),
    mainkanSuara(dataSuara.paku),
    (game.karakter.playOnce = !0),
    0 != game.karakter.animMati &&
      ((game.karakter.img = game.karakter.animMati), (game.karakter.frame = 1)),
    (game.deadAnim = !0),
    (game.lompatY = -10);
}
function gerakLevel(a, e, t) {
  var n, m;
  game.aktif &&
    (e > 0 &&
      (game.lompat || (0 != a.animJalan && (a.img = a.animJalan)),
      (n = game.posX + a.lebar / 2 + e - 5),
      (a.skalaX = 1),
      (m = game.charX),
      n > game.tileW && (m = game.charX + 1),
      m < game.map.length &&
        ((0 != game.map[m][game.charY][0] &&
          3 != game.map[m][game.charY][0] &&
          5 != game.map[m][game.charY][0] &&
          8 != game.map[m][game.charY][0] &&
          7 != game.map[m][game.charY][0]) ||
          ((game.posX += e),
          game.posX > game.tileW && ((game.posX -= game.tileW), game.charX++)),
        10 == game.map[m][game.charY][0] && heroDead())),
    e < 0 &&
      (game.lompat || (0 != a.animJalan && (a.img = a.animJalan)),
      (n = game.posX + e - a.lebar / 2 + 5),
      (a.skalaX = -1),
      (m = game.charX),
      n < 0 && (m = game.charX - 1),
      m > 0 &&
        ((0 != game.map[m][game.charY][0] &&
          3 != game.map[m][game.charY][0] &&
          5 != game.map[m][game.charY][0] &&
          8 != game.map[m][game.charY][0] &&
          7 != game.map[m][game.charY][0]) ||
          ((game.posX += e),
          game.posX < 0 && ((game.posX += game.tileW), game.charX--))),
      10 == game.map[m][game.charY][0] && heroDead()),
    t < 0 && !game.lompat && ((game.lompat = !0), (game.lompatY = t)));
}
function setPlatformEnemy(a, e) {
  for (var t = 0; t < game.map.length; t++)
    for (var n = 0; n < game.map[0].length; n++) {
      var m;
      if (5 == game.map[t][n][0] && game.map[t][n][3] == a)
        ((m =
          3 === a
            ? setSprite(e.animDiam, 44, 42)
            : setSprite(e.animDiam, 32, 32)).dataGambar = e),
          (m.charX = t),
          (m.charY = n),
          (m.posX = 0),
          (m.posY = 0),
          (m.stat = 0),
          (m.sx = 0),
          (m.sy = 0),
          (m.eTipe = a),
          (m.count = 0),
          (m.id = game.platformEnemies.length),
          game.platformEnemies.push(m),
          (game.map[t][n][4] = m.id);
    }
}
function gerakMusuh() {
  for (var a, e, t = 0; t < game.platformEnemies.length; t++) {
    var n = game.platformEnemies[t];
    3 !== n.stat &&
      (1 === n.eTipe || 2 === n.eTipe
        ? (n.stat < 2 &&
            (134 == acak(300) &&
              ((n.stat = 0), (n.sx = 0), (n.img = n.dataGambar.animDiam)),
            14 == acak(100) &&
              0 == n.stat &&
              ((n.stat = 1),
              (n.img = n.dataGambar.animJalan),
              (n.sx = 1 == acak(2) ? 0.5 : -0.5))),
          1 == n.stat &&
            ((game.map[n.charX][n.charY][0] = 0),
            n.sx > 0
              ? ((a = n.posX + n.lebar / 2 + n.sx),
                (e = n.charX),
                (n.skalaX = 1),
                a > game.tileW && (e = n.charX + 1),
                e < game.map.length &&
                  (0 == game.map[e][n.charY][0] &&
                    ((n.posX += n.sx),
                    n.posX > game.tileW && ((n.posX -= game.tileW), n.charX++)),
                  (1 != game.map[e][n.charY][0] &&
                    0 != game.map[e][n.charY + 1][0]) ||
                    (n.sx *= -1)))
              : n.sx < 0 &&
                ((a = n.posX - n.lebar / 2 + n.sx),
                (e = n.charX),
                (n.skalaX = -1),
                a < 0 && (e = n.charX - 1),
                e > 0 &&
                  (0 == game.map[e][n.charY][0] &&
                    ((n.posX += n.sx),
                    n.posX < 0 && ((n.posX += game.tileW), n.charX--)),
                  (1 != game.map[e][n.charY][0] &&
                    0 != game.map[e][n.charY + 1][0]) ||
                    (n.sx *= -1))),
            (game.map[n.charX][n.charY][0] = 5),
            (game.map[n.charX][n.charY][3] = n.eTipe),
            (game.map[n.charX][n.charY][4] = n.id)))
        : 3 === n.eTipe &&
          (game.karakter.x < n.x && game.aktif
            ? ((n.skalaX = 1),
              (n.img = n.dataGambar.animSerang),
              void 0 === n.cooldown && (n.cooldown = 180),
              n.cooldown > 0 && n.cooldown--,
              n.cooldown <= 0 && (tembakPeluru(n), (n.cooldown = 180)))
            : ((n.img = n.dataGambar.animDiam),
              void 0 !== n.cooldown && (n.cooldown = 180))),
      2 !== n.stat &&
        3 !== n.stat &&
        game.aktif &&
        jarak(game.karakter.x, game.karakter.y, n.x, n.y) < game.tileW - 5 &&
        (1 === n.eTipe || 2 === n.eTipe
          ? game.lompatY > 0 && game.karakter.y < n.y
            ? ((n.stat = 2), (game.lompatY = -7), (game.musuhID = n.eTipe))
            : heroDead()
          : 3 === n.eTipe &&
            game.lompatY > 0 &&
            game.karakter.y < n.y - n.tinggi / 3 &&
            ((n.stat = 2), (game.lompatY = -7), (game.musuhID = n.eTipe))),
      2 === n.stat &&
        ((n.img = n.dataGambar.animMati),
        void 0 === n.count && (n.count = 0),
        n.count++,
        n.count > 20 && ((n.stat = 3), (game.map[n.charX][n.charY][0] = 0))));
  }
}
function kotak(a, e, t, n, m = 1, i = "#000", r = "none", g = 100) {
  konten.beginPath(),
    konten.rect(a, e, t, n),
    "none" != r &&
      ((konten.fillStyle = r),
      (konten.globalAlpha = g / 100),
      konten.fill(),
      (konten.globalAlpha = 1)),
    "none" != i &&
      ((konten.lineWidth = m), (konten.strokeStyle = i), konten.stroke());
}
function transisi(a, e = null, t = 0, n = 0) {
  (game.lastAktif = game.aktif),
    (game.aktif = !1),
    (game.transisi = !0),
    (game.transisiStat = 0),
    (game.transisiX = t),
    (game.transisiY = n),
    0 == t &&
      0 == n &&
      ((game.transisiX = game.lebar / 2), (game.transisiY = game.tinggi / 2)),
    (game.transisiTipe = a),
    (game.transisiFunc = e),
    (game.transisiTimer = 0),
    trace("transisi wipe " + a + " " + t + " " + n);
}
function efekTransisi() {
  var a;
  if (game.transisi) {
    if ("in" != game.transisiTipe && "out" != game.transisiTipe)
      return (game.transisi = !1), void (game.aktif = game.lastAktif);
    "out" == game.transisiTipe &&
      ((game.transisiTimer += 5),
      (a = game.lebar / 2 - 2 * game.transisiTimer) < 2
        ? ((game.transisi = !1),
          (game.transisiTimer = 0),
          (game.aktif = !0),
          null != game.transisiFunc && jalankanFungsi(game.transisiFunc))
        : (konten.beginPath(),
          konten.arc(
            game.transisiX,
            game.transisiY,
            2 * game.lebar,
            0,
            2 * Math.PI,
            !1
          ),
          konten.arc(game.transisiX, game.transisiY, a, 0, 2 * Math.PI, !1),
          (konten.fillStyle = game.warnaTransisi),
          konten.fill("evenodd"))),
      "in" == game.transisiTipe &&
        ((game.transisiTimer += 5),
        (a = 2 * game.transisiTimer) > game.lebar / 2
          ? ((game.transisi = !1),
            (game.transisiTimer = 0),
            (game.aktif = !0),
            null != game.transisiFunc && jalankanFungsi(game.transisiFunc))
          : (konten.beginPath(),
            konten.arc(
              game.transisiX,
              game.transisiY,
              2 * game.lebar,
              0,
              2 * Math.PI,
              !1
            ),
            konten.arc(game.transisiX, game.transisiY, a, 0, 2 * Math.PI, !1),
            (konten.fillStyle = game.warnaTransisi),
            konten.fill("evenodd")));
  }
}
function setRPGSprite(a, e = 0, t = 0) {
  var n = {},
    m = a.width,
    i = a.height;
  (n.img = a),
    0 == e || 0 == t
      ? ((n.lebar = a.width), (n.tinggi = a.height))
      : ((n.lebar = e), (n.tinggi = t));
  var r = Math.floor(m / n.lebar) * Math.floor(i / n.tinggi);
  return (
    (n.x = 0),
    (n.y = 0),
    (n.frame = 1),
    (n.skalaX = 1),
    (n.skalaY = 1),
    (n.rotasi = 0),
    (n.timer = 0),
    (n.offsetX = 2),
    (n.offsetY = 1),
    (n.playOnce = !1),
    (n.mati = !1),
    (n.maxFrame = r),
    (n.diamKanan = "1-6"),
    (n.diamAtas = "7-12"),
    (n.diamKiri = "13-18"),
    (n.diamBawah = "19-24"),
    (n.jalanKanan = "25-30"),
    (n.jalanAtas = "31-36"),
    (n.jalanKiri = "37-42"),
    (n.jalanBawah = "43-48"),
    (n.frameAktif = n.diamBawah),
    (n.langkah = 0),
    n
  );
}
function setRPG(a, e, t, n) {
  (game.map = this["map_" + a]),
    (game.tilesetSize = e.width),
    (game.tileset = e),
    (game.tileW = t),
    (game.tile_num = Math.floor(game.tilesetSize / game.tileW)),
    (game.charX = n.charX),
    (game.charY = n.charY),
    (game.screenW =
      Math.floor(game.lebar / (game.tileW * game.skalaSprite)) + 2),
    (game.screenH =
      Math.floor(game.tinggi / (game.tileW * game.skalaSprite)) + 2),
    trace("RPG tile setup = " + game.screenW + " x " + game.screenH),
    (game.cameraX = 0),
    (game.cameraY = 0),
    (game.posX = game.tileW / 2),
    (game.posY = 0),
    (game.arenaX = -game.charX * game.tileW),
    (game.arenaY = -game.charY * game.tileW),
    (game.lompatY = 0),
    (game.karakter = n),
    (game.itemID = 0),
    (game.musuhID = 0),
    (game.triggerID = 0),
    (game.arah = 1),
    (game.mapID = a),
    (game.doorX = 0),
    (game.doorY = 0),
    (game.lastMap = game.mapID),
    (game.type = "RPG"),
    (game.rpgItem = {}),
    (game.aksi = null),
    (game.renderItem = []),
    (game.itemDB = []),
    (game.itemRendered = !1),
    (game.karakter.aksi = "");
}
function setRPGItem(a, e, t = 0, n = 0) {
  game.itemDB.push([a, e, t, n]);
}
function setRenderItem() {
  if (!game.itemRendered) {
    game.itemRendered = !0;
    for (var a = 0; a < game.map.length; a++)
      for (var e = 0; e < game.map[0].length; e++)
        for (k = 0; k < game.itemDB.length; k++) {
          var t = game.itemDB[k];
          if (3 == game.map[a][e][0] && game.map[a][e][3] == t[0]) {
            var n = a * game.tileW * game.skalaSprite,
              m = e * game.tileW * game.skalaSprite,
              i = setSprite(t[1], t[2], t[3]);
            (i.px = n),
              (i.py = m),
              (i.tileX = a),
              (i.tileY = e),
              game.renderItem.push(i);
          }
        }
  }
}
function buatPetaRPG() {
  var a = Math.floor(game.charX - game.screenW / 2),
    e = Math.floor(game.charY - game.screenH / 2);
  (game.tileX =
    game.posX * game.skalaSprite + a * game.tileW * game.skalaSprite),
    (game.tileY =
      game.posY * game.skalaSprite + e * game.tileW * game.skalaSprite);
  for (var t = 0; t < game.screenW + 2; t++)
    for (var n = 0; n < game.screenH + 2; n++) {
      var m = t + a,
        i = n + e;
      if (m >= 0 && i >= 0 && m < game.map.length && i < game.map[0].length) {
        var r = game.map[m][i][1],
          g =
            (game.map[m][i][0],
            -game.posX * game.skalaSprite +
              game.cameraX +
              (t - 1) * game.tileW * game.skalaSprite),
          o =
            -game.posY * game.skalaSprite +
            game.cameraY +
            (n - 1) * game.tileW * game.skalaSprite;
        if (r > -1) {
          var s = Math.floor(r / game.tile_num),
            l = r - s * game.tile_num;
          konten.drawImage(
            game.tileset,
            l * game.tileW,
            s * game.tileW,
            game.tileW,
            game.tileW,
            g,
            o,
            game.tileW * game.skalaSprite,
            game.tileW * game.skalaSprite
          );
        }
        var c = game.map[m][i][2];
        if (c > 0) {
          var k = Math.floor(c / game.tile_num),
            h = c - k * game.tile_num;
          konten.drawImage(
            game.tileset,
            h * game.tileW,
            k * game.tileW,
            game.tileW,
            game.tileW,
            g,
            o,
            game.tileW * game.skalaSprite,
            game.tileW * game.skalaSprite
          );
        }
        m == game.charX &&
          i == game.charY &&
          ((game.karakter.x =
            game.cameraX + (t - 1) * game.tileW * game.skalaSprite),
          (game.karakter.y =
            game.cameraY +
            (n - 1) * game.tileW * game.skalaSprite +
            game.karakter.tinggi / 2));
      }
    }
  (game.karakter.bayangan.x = game.karakter.x),
    (game.karakter.bayangan.y = game.karakter.y),
    sprite(game.karakter.bayangan),
    sprite(game.karakter),
    setRenderItem(),
    renderItemRPG(),
    game.isWipe && doWipe();
}
function renderItemRPG() {
  for (var a = 0; a < game.renderItem.length; a++) {
    var e = game.renderItem[a],
      t = e.px - game.tileX - (game.tileW * game.skalaSprite) / 2,
      n = e.py - game.tileY - (game.tileW * game.skalaSprite) / 2;
    t > -e.lebar &&
      n > -e.tinggi &&
      t < game.lebar + e.lebar &&
      n < game.tinggi + e.tinggi &&
      ((e.x = t),
      (e.y = n),
      e.img == dataGambar.baling && (e.rotasi += 0.5),
      e.maxFrame > 1 &&
        (e.timer++,
        e.timer > e.delay &&
          ((e.timer = 0),
          e.frame++,
          e.frame > e.maxFrame &&
            (e.playOnce
              ? game.renderItem.pop()
              : e.img == dataGambar.air
              ? acakAir(e)
              : (e.frame = 1)))),
      sprite(e));
  }
}
function acakAir(a) {
  if (10 == acak(15)) {
    var e = acak(4) - acak(4),
      t = acak(4) - acak(4),
      n = a.tileX - e,
      m = a.tileY - t;
    291 == game.map[n][m][1] &&
      ((a.px = n * game.tileW * game.skalaSprite),
      (a.py = m * game.tileW * game.skalaSprite),
      (a.tileX = n),
      (a.tileY = m),
      (a.frame = 0));
  }
}
function RPGframe(a) {
  var e = a.split("-");
  return { fMin: Number(e[0]), fMax: Number(e[1]) };
}
function gerakPeta(a, e, t) {
  var n, m, i, r;
  a.timer++;
  var g = RPGframe(a.frameAktif);
  a.timer > 5 &&
    ((a.timer = 0),
    a.frame++,
    a.frame > g.fMax &&
      ("" == a.aksi
        ? (a.frame = g.fMin)
        : ((a.frame = g.fMax), jalankanFungsi(game.aksi)))),
    a.frame < g.fMin && (a.frame = g.fMin),
    a.frame > g.fMax && (a.frame = g.fMax),
    game.aktif &&
      (0 == e &&
        0 == t &&
        (1 == a.arah && (a.frameAktif = a.diamKanan),
        2 == a.arah && (a.frameAktif = a.diamAtas),
        3 == a.arah && (a.frameAktif = a.diamKiri),
        4 == a.arah && (a.frameAktif = a.diamBawah)),
      e > 0 &&
        ((a.arah = 1),
        (a.frameAktif = a.jalanKanan),
        (n = game.posX + a.lebar / 2 + e),
        (i = game.charX),
        n > game.tileW && (i = game.charX + 1),
        i < game.map.length &&
          0 == game.map[i][game.charY][0] &&
          ((game.posX += e),
          game.posX > game.tileW && ((game.posX -= game.tileW), game.charX++))),
      e < 0 &&
        ((a.arah = 3),
        (a.frameAktif = a.jalanKiri),
        (n = game.posX + e - a.lebar / 2),
        (i = game.charX),
        n < 0 && (i = game.charX - 1),
        i > 0 &&
          0 == game.map[i][game.charY][0] &&
          ((game.posX += e),
          game.posX < 0 && ((game.posX += game.tileW), game.charX--))),
      t > 0 &&
        ((a.arah = 4),
        (a.frameAktif = a.jalanBawah),
        (m = game.posY + t + 4),
        (r = game.charY),
        m > game.tileW && (r = game.charY + 1),
        r < game.map[0].length &&
          0 == game.map[game.charX][r][0] &&
          ((game.posY += t),
          game.posY > game.tileW && ((game.posY -= game.tileW), game.charY++))),
      t < 0 &&
        ((a.arah = 2),
        (a.frameAktif = a.jalanAtas),
        (m = game.posY + t - 4),
        (r = game.charY),
        m < 0 && (r = game.charY - 1),
        r > 0 &&
          0 == game.map[game.charX][r][0] &&
          ((game.posY += t),
          game.posY < 0 && ((game.posY += game.tileW), game.charY--))));
}
function cekPintu() {
  if (game.aktif) {
    var a = !1;
    1 == game.karakter.arah &&
      2 == game.map[game.charX + 1][game.charY][0] &&
      ((a = !0), (game.doorID = game.map[game.charX + 1][game.charY][3])),
      2 == game.karakter.arah &&
        2 == game.map[game.charX][game.charY - 1][0] &&
        ((a = !0), (game.doorID = game.map[game.charX][game.charY - 1][3])),
      3 == game.karakter.arah &&
        2 == game.map[game.charX - 1][game.charY][0] &&
        ((a = !0), (game.doorID = game.map[game.charX - 1][game.charY][3])),
      4 == game.karakter.arah &&
        2 == game.map[game.charX][game.charY + 1][0] &&
        ((a = !0), (game.doorID = game.map[game.charX][game.charY + 1][3])),
      a &&
        (0 != game.doorID &&
          ((game.lastMap = game.mapID),
          (game.mapID = game.doorID),
          findDoor(this["map_" + game.doorID])),
        addWipe("room"));
  }
}
function findDoor(a) {
  for (var e = 0; e < a.length; e++)
    for (var t = 0; t < a[0].length; t++)
      2 == a[e][t][0] &&
        a[e][t][3] == game.lastMap &&
        ((game.doorX = e), (game.doorY = t));
}
function aksiRPG(a = null, e = null) {
  cekPintu(), jalankanFungsi(a), (game.aksi = e);
}
function addWipe(a) {
  (game.aktif = !1),
    (game.isWipe = !0),
    (game.wipeTime = 0),
    (game.wipeStat = 0),
    (game.wipeAct = a);
}
function doWipe() {
  var a;
  0 == game.wipeStat
    ? ((game.wipeTime += 5),
      (a = canvas.width / 2 - 2 * game.wipeTime) < 10
        ? ((game.wipeTime = 0),
          (game.wipeStat = 1),
          kotak(0, 0, canvas.width, canvas.height, 1, "black", "black"))
        : (konten.beginPath(),
          konten.arc(
            game.karakter.x,
            game.karakter.y,
            canvas.width,
            0,
            2 * Math.PI,
            !1
          ),
          konten.arc(game.karakter.x, game.karakter.y, a, 0, 2 * Math.PI, !1),
          (konten.fillStyle = "#000"),
          konten.fill("evenodd")))
    : 1 == game.wipeStat
    ? (kotak(0, 0, canvas.width, canvas.height, 1, "black", "black"),
      "room" == game.wipeAct &&
        ((game.map = this["map_" + game.doorID]),
        (game.mapID = game.doorID),
        (game.tileset = game["tileset_" + game.doorID]),
        (game.renderItem = []),
        (game.itemRendered = !1),
        4 == game.karakter.arah &&
          ((game.charX = game.doorX),
          (game.charY = game.doorY + 1),
          (game.posY = 5)),
        3 == game.karakter.arah &&
          ((game.charX = game.doorX - 1),
          (game.charY = game.doorY),
          (game.posX = game.tileW - 5)),
        1 == game.karakter.arah &&
          ((game.charX = game.doorX + 1),
          (game.charY = game.doorY),
          (game.posX = 5)),
        2 == game.karakter.arah &&
          ((game.charX = game.doorX),
          (game.charY = game.doorY - 1),
          (game.posY = game.tileW - 5))),
      game.wipeTime++,
      game.wipeTime > 5 && ((game.wipeStat = 2), (game.wipeTime = 0)))
    : 2 == game.wipeStat &&
      ((game.wipeTime += 5),
      (a = 2 * game.wipeTime) > canvas.width / 2
        ? ((game.wipeTime = 0),
          (game.wipeStat = 0),
          (game.isWipe = !1),
          (game.aktif = !0))
        : (konten.beginPath(),
          konten.arc(
            game.karakter.x,
            game.karakter.y,
            canvas.width,
            0,
            2 * Math.PI,
            !1
          ),
          konten.arc(game.karakter.x, game.karakter.y, a, 0, 2 * Math.PI, !1),
          (konten.fillStyle = "#000"),
          konten.fill("evenodd")));
}
function cekPeta(a) {
  return 1 == game.karakter.arah
    ? game.map[game.charX + a][game.charY]
    : 2 == game.karakter.arah
    ? game.map[game.charX][game.charY - a]
    : 3 == game.karakter.arah
    ? game.map[game.charX - a][game.charY]
    : 4 == game.karakter.arah
    ? game.map[game.charX][game.charY + a]
    : void 0;
}
function tambahPartikel(a, e, t, n = 0) {
  var m = game.charX,
    i = game.charY;
  1 == game.karakter.arah && (m += n),
    2 == game.karakter.arah && (i -= n),
    3 == game.karakter.arah && (m -= n),
    4 == game.karakter.arah && (i += n);
  var r = setSprite(a, e, t);
  (r.px = m * game.tileW * game.skalaSprite),
    (r.py = i * game.tileW * game.skalaSprite),
    (r.playOnce = !0),
    (r.delay = 3),
    game.renderItem.push(r);
}
