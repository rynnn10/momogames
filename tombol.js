const mainMenu = document.getElementById("main-menu"),
  gameContainer = document.getElementById("game-container"),
  startButton = document.getElementById("btn-mulai"),
  helpButtonMenu = document.getElementById("btn-bantuan"),
  infoButtonMenu = document.getElementById("btn-info"),
  charSelectButton = document.getElementById("btn-pilih-karakter"),
  pauseIcon = document.getElementById("pause-icon"),
  musicIcon = document.getElementById("music-icon");
let selectedCharacterId = 1,
  isSoundOn = !0;
var isPaused = !1,
  audio = new Audio("sfx/backsound.mp3");
function showCharacterSelectionPopup() {
  Swal.fire({
    title: "Pilih Karakter",
    html: `\n      <style>\n        .char-option {\n          flex-direction: column; /* Stack image and name vertically */\n          font-family: 'Press Start 2P', cursive;\n          font-size: 0.7rem;\n          color: #fff;\n          height: 125px; /* Adjust height for name */\n        }\n        .char-option img {\n           width: 80px; /* Adjust image size */\n           height: 80px;\n        }\n        .char-name {\n          margin-top: 8px;\n        }\n      </style>\n     <div class="character-selector">\n        <div class="char-option ${
      1 == selectedCharacterId ? "selected" : ""
    }" data-char="1">\n          <img src="assets/Jump.png" alt="Player 1">\n          <div class="char-name">Momo</div>\n        </div>\n        <div class="char-option ${
      2 == selectedCharacterId ? "selected" : ""
    }" data-char="2">\n          <img src="assets/Jump2.png" alt="Player 2">\n           <div class="char-name">Lala</div>\n        </div>\n        <div class="char-option ${
      3 == selectedCharacterId ? "selected" : ""
    }" data-char="3">\n          <img src="assets/Jump3.png" alt="Player 3">\n           <div class="char-name">Jack</div>\n        </div>\n      </div>\n    `,
    showConfirmButton: !0,
    confirmButtonText: "Pilih",
    didOpen: () => {
      const a = Swal.getPopup(),
        n = a.querySelectorAll(".char-option");
      n.forEach((e) => {
        e.addEventListener("click", () => {
          n.forEach((a) => a.classList.remove("selected")),
            e.classList.add("selected"),
            (a.dataset.selectedChar = e.dataset.char);
        });
      });
    },
    preConfirm: () => {
      const a = Swal.getPopup();
      a.dataset.selectedChar && (selectedCharacterId = a.dataset.selectedChar);
    },
  });
}
// file: tombol.js

function startGame() {
  mainMenu.classList.add("hidden");
  gameContainer.classList.remove("hidden");

  // Jeda 150 milidetik untuk memberi waktu browser mengatur layout
  setTimeout(() => {
    audio.paused &&
      ((isSoundOn = !0), audio.play(), (musicIcon.innerText = "volume_up"));

    game.coinKehidupan = 5;
    game.coinAnim = setSprite(dataGambar.coin, 32, 32);
    game.coinAnim.frameRate = 5;

    // Panggil setAwal dan jalankan game loop SETELAH jeda
    setAwal();
    jalankan(gameLoop);

    // Logging untuk memastikan ukuran benar
    console.log(
      "Game started with canvas size:",
      canvas.width,
      "x",
      canvas.height
    );
  }, 150); // Jeda aman untuk sebagian besar perangkat mobile
}
function showPausePopup() {
  Swal.fire({
    title: "Game Dijeda",
    showConfirmButton: !1,
    allowOutsideClick: !1,
    allowEscapeKey: !1,
    html: '<div style="display: flex; flex-direction: column; gap: 10px;"><button id="swal-resume" class="swal-btn swal-btn-resume">Lanjutkan</button><button id="swal-refresh" class="swal-btn swal-btn-refresh">Ulangi Level</button><button id="swal-info" class="swal-btn swal-btn-info">Info</button><button id="swal-kembali" class="swal-btn swal-btn-kembali">Kembali ke Menu</button></div>',
    didOpen: () => {
      const a = Swal.getPopup().querySelector("#swal-resume"),
        n = Swal.getPopup().querySelector("#swal-refresh"),
        e = Swal.getPopup().querySelector("#swal-info"),
        t = Swal.getPopup().querySelector("#swal-kembali");
      (a.onclick = () => {
        togglePause();
      }),
        (n.onclick = () => {
          Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin mengulangi level ini?",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#e74c3c",
            cancelButtonColor: "#3498db",
            confirmButtonText: "Ya, Ulangi!",
            cancelButtonText: "Tidak",
          }).then((a) => {
            a.isConfirmed
              ? ((isPaused = !1),
                (pauseIcon.innerText = "play_arrow"),
                game.level > 1
                  ? (game.score = cumulativeScore)
                  : (game.score = 0),
                (game.coinKehidupan = 5),
                ulangiPermainan(!0),
                isSoundOn &&
                  (audio.play(), (musicIcon.innerText = "volume_up")))
              : showPausePopup();
          });
        }),
        (e.onclick = () => {
          let a = "",
            n = "Informasi Permainan";
          1 === game.level
            ? ((n = "Info Level 1"),
              (a =
                '\n            <style>.info-container{text-align:left;font-family:\'Segoe UI\',Tahoma,Geneva,Verdana,sans-serif}.info-section{margin-bottom:15px}.info-section h4{color:#3498db;margin-bottom:5px;display:flex;align-items:center;gap:8px}.info-item{display:flex;align-items:center;gap:10px}.info-item img{width:30px;height:30px;object-fit:contain;vertical-align:middle}</style>\n            <div class="info-container">\n              <div class="info-section"><h4><span class="material-symbols-outlined">bug_report</span>Musuh</h4><div class="info-item"><img src="assets/jamurjudul.png" alt="Jamur"><span>Hanya terdapat <strong>Jamur</strong> di level ini.</span></div></div>\n              <div class="info-section"><h4><span class="material-symbols-outlined">restaurant</span>Buah</h4><div class="info-item"><img src="assets/stjudul.png" alt="Stroberi"><span>Kumpulkan <strong>Stroberi</strong> untuk mendapatkan skor.</span></div></div>\n              <p style="font-size:0.9em;color:#777">Level selanjutnya akan lebih menantang!</p>\n            </div>'))
            : 2 === game.level
            ? ((n = "Info Level 2"),
              (a =
                '\n            <style>.info-container{text-align:left;font-family:\'Segoe UI\',Tahoma,Geneva,Verdana,sans-serif}.info-section{margin-bottom:15px}.info-section h4{color:#3498db;margin-bottom:5px;display:flex;align-items:center;gap:8px}.info-item{display:flex;align-items:center;gap:10px;margin-bottom:8px}.info-item img{width:30px;height:30px;object-fit:contain;vertical-align:middle}</style>\n            <div class="info-container">\n              <p>Hati-hati, tantangan di level ini meningkat!</p>\n              <div class="info-section"><h4><span class="material-symbols-outlined">bug_report</span>Musuh Baru</h4><div class="info-item"><img src="assets/jamurjudul.png" alt="Jamur"><span><strong>Jamur</strong> masih berkeliaran.</span></div><div class="info-item"><img src="assets/babijudul.png" alt="Babi Hutan"><span>Waspadai <strong>Babi Hutan</strong> yang lebih cepat!</span></div></div>\n              <div class="info-section"><h4><span class="material-symbols-outlined">restaurant</span>Buah Baru</h4><div class="info-item"><img src="assets/stjudul.png" alt="Stroberi"><span>Kumpulkan <strong>Stroberi</strong> (+1 Skor).</span></div><div class="info-item"><img src="assets/kwjudul.png" alt="Kiwi"><span>Temukan <strong>Kiwi</strong> untuk skor lebih besar (+2 Skor)!</span></div></div>\n              <p style="font-size:0.9em;color:#777">Tantangan sesungguhnya menanti di level terakhir.</p>\n            </div>'))
            : 3 === game.level
            ? ((n = "Info Level 3"),
              (a =
                '\n            <style>.info-container{text-align:left;font-family:\'Segoe UI\',Tahoma,Geneva,Verdana,sans-serif}.info-section{margin-bottom:15px}.info-section h4{color:#3498db;margin-bottom:5px;display:flex;align-items:center;gap:8px}.info-item{display:flex;align-items:center;gap:10px;margin-bottom:8px}.info-item img{width:30px;height:30px;object-fit:contain;vertical-align:middle}</style>\n            <div class="info-container">\n              <p>Selamat datang di level terakhir! Semua rintangan ada di sini.</p>\n              <div class="info-section"><h4><span class="material-symbols-outlined">bug_report</span>Semua Musuh</h4>\n                  <div class="info-item"><img src="assets/jamurjudul.png" alt="Jamur"><span><strong>Jamur</strong></span></div>\n                  <div class="info-item"><img src="assets/babijudul.png" alt="Babi Hutan"><span><strong>Babi Hutan</strong></span></div>\n                  <div class="info-item"><img src="assets/bungajudul.png" alt="Bunga"><span><strong>Tanaman Karnivora</strong> yang bisa menembak!</span></div>\n              </div>\n              <div class="info-section"><h4><span class="material-symbols-outlined">restaurant</span>Semua Buah</h4>\n                  <div class="info-item"><img src="assets/stjudul.png" alt="Stroberi"><span><strong>Stroberi</strong> (+1 Skor)</span></div>\n                  <div class="info-item"><img src="assets/kwjudul.png" alt="Kiwi"><span><strong>Kiwi</strong> (+2 Skor)</span></div>\n                  <div class="info-item"><img src="assets/mljudul.png" alt="Melon"><span><strong>Melon</strong> (+3 Skor)</span></div>\n              </div>\n              <p style="font-size:0.9em;color:#777;">Selesaikan level ini untuk memenangkan permainan!</p>\n            </div>'))
            : (a = "<p>Informasi umum mengenai permainan.</p>"),
            Swal.fire({
              title: n,
              html: a,
              icon: "info",
              confirmButtonText: "Mengerti",
            }).then(() => {
              showPausePopup();
            });
        }),
        (t.onclick = () => {
          window.location.reload();
        });
    },
  });
}
function togglePause() {
  (isPaused = !isPaused)
    ? ((pauseIcon.innerText = "pause"),
      showPausePopup(),
      audio.pause(),
      (musicIcon.innerText = "volume_off"))
    : (Swal.close(),
      (pauseIcon.innerText = "play_arrow"),
      isSoundOn
        ? (audio.play(), (musicIcon.innerText = "volume_up"))
        : (musicIcon.innerText = "volume_off"));
}
function showLevelCompletePopup(a) {
  Swal.fire({
    title: "Level 1 Selesai!",
    icon: "success",
    allowOutsideClick: !1,
    allowEscapeKey: !1,
    showConfirmButton: !1,
    html: `\n        <p>Skor Anda: <strong>${a}</strong></p>\n        <div style="text-align: left; margin-top: 20px; border-top: 1px solid #555; padding-top: 15px;">\n            <h4 style="color: #3498db;">Selanjutnya: Level 2</h4>\n            <p style="font-size: 0.9em;">Waspada! Musuh baru <strong>Babi Hutan</strong> yang lebih cepat akan muncul. Kamu juga akan menemukan buah <strong>Kiwi</strong> yang memberikan skor lebih tinggi!</p>\n        </div>\n        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">\n            <button id="swal-continue" class="swal-btn swal-btn-resume">Lanjutkan</button>\n            <button id="swal-replay" class="swal-btn swal-btn-refresh">Ulangi Level</button>\n            <button id="swal-share" class="swal-btn" style="background-color:#9b59b6;">Bagikan Skor</button>\n            <button id="swal-menu" class="swal-btn swal-btn-kembali">Kembali ke Menu</button>\n        </div>\n    `,
    didOpen: () => {
      (document.getElementById("swal-continue").onclick = () => {
        Swal.close(),
          (cumulativeScore = game.score),
          game.level++,
          (game.coinKehidupan = 5),
          (game.aktif = !0),
          ulangiPermainan(!0, !0);
      }),
        (document.getElementById("swal-replay").onclick = () => {
          Swal.fire({
            title: "Ulangi Level?",
            text: "Anda yakin ingin mengulangi level ini?",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Ya, Ulangi!",
            cancelButtonText: "Batal",
          }).then((n) => {
            n.isConfirmed
              ? (Swal.close(),
                (game.score = game.level > 1 ? cumulativeScore : 0),
                (game.coinKehidupan = 5),
                (game.aktif = !0),
                ulangiPermainan(!0))
              : n.dismiss === Swal.DismissReason.cancel &&
                showLevelCompletePopup(a);
          });
        }),
        (document.getElementById("swal-share").onclick = () => {
          Swal.close(),
            generateScoreImageAndShare(a, game.level, () =>
              showLevelCompletePopup(a)
            );
        }),
        (document.getElementById("swal-menu").onclick = () =>
          window.location.reload());
    },
  });
}
function showNextLevelPopup(a) {
  Swal.fire({
    title: "Level 2 Selesai!",
    icon: "success",
    allowOutsideClick: !1,
    allowEscapeKey: !1,
    showConfirmButton: !1,
    html: `\n        <p>Skor Anda: <strong>${a}</strong></p>\n        \n        <div style="text-align: left; margin-top: 20px; border-top: 1px solid #555; padding-top: 15px;">\n            <h4 style="color: #3498db;">Selanjutnya: Level Terakhir!</h4>\n            <p style="font-size: 0.9em;">Tantangan sesungguhnya menanti! Hadapi musuh baru <strong>Tanaman Karnivora</strong> yang bisa menembak dan temukan buah <strong>Melon</strong> untuk skor tertinggi.</p>\n        </div>\n\n        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">\n            <button id="swal-continue-l3" class="swal-btn swal-btn-resume">Lanjut ke Level 3</button>\n            <button id="swal-replay-l2" class="swal-btn swal-btn-refresh">Ulangi Level 2</button>\n            \n            <button id="swal-replay-l1" class="swal-btn swal-btn-info">Main di Level 1</button> \n            \n            <button id="swal-share" class="swal-btn" style="background-color:#9b59b6;">Bagikan Skor</button>\n            <button id="swal-menu" class="swal-btn swal-btn-kembali">Kembali ke Menu</button>\n        </div>\n    `,
    didOpen: () => {
      (document.getElementById("swal-continue-l3").onclick = () => {
        Swal.close(),
          (cumulativeScore = game.score),
          (game.level = 3),
          (game.coinKehidupan = 5),
          (game.aktif = !0),
          ulangiPermainan(!0, !0);
      }),
        (document.getElementById("swal-replay-l2").onclick = () => {
          Swal.fire({
            title: "Ulangi Level 2?",
            text: "Anda yakin ingin mengulangi level ini?",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Ya, Ulangi!",
            cancelButtonText: "Batal",
          }).then((n) => {
            n.isConfirmed
              ? (Swal.close(),
                (game.score = cumulativeScore),
                (game.coinKehidupan = 5),
                (game.aktif = !0),
                ulangiPermainan(!0))
              : n.dismiss === Swal.DismissReason.cancel &&
                showNextLevelPopup(a);
          });
        }),
        (document.getElementById("swal-replay-l1").onclick = () => {
          Swal.fire({
            title: "Kembali ke Level 1?",
            text: "Skor Anda saat ini akan direset. Anda yakin?",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Ya, Kembali!",
            cancelButtonText: "Batal",
          }).then((n) => {
            n.isConfirmed
              ? (Swal.close(),
                (cumulativeScore = 0),
                (game.score = 0),
                (game.level = 1),
                (game.coinKehidupan = 5),
                (game.aktif = !0),
                ulangiPermainan(!0))
              : n.dismiss === Swal.DismissReason.cancel &&
                showNextLevelPopup(a);
          });
        }),
        (document.getElementById("swal-share").onclick = () => {
          Swal.close(),
            generateScoreImageAndShare(a, game.level, () =>
              showNextLevelPopup(a)
            );
        }),
        (document.getElementById("swal-menu").onclick = () =>
          window.location.reload());
    },
  });
}
function showContinueOrGameOverPopup() {
  mainkanSuara(dataSuara.lose),
    Swal.fire({
      title: "Koin Habis!",
      text: "Apa yang ingin kamu lakukan selanjutnya?",
      icon: "warning",
      html: '\n      <div class="game-over-options">\n        <button id="btn-watch-ad" class="swal-btn swal-btn-watch-ad">\n          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px;">smart_display</span>\n          Tonton Iklan (+1 Koin)\n        </button>\n        <button id="btn-quiz" class="swal-btn swal-btn-quiz">\n          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px;">quiz</span>\n          Jawab Kuis (+1 Koin)\n        </button>\n        <button id="btn-restart-game" class="swal-btn swal-btn-restart-game">\n          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px;">refresh</span>\n          Mulai Ulang Game\n        </button>\n        <button id="btn-main-menu" class="swal-btn swal-btn-main-menu">\n          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px;">home</span>\n          Kembali ke Menu Utama\n        </button>\n      </div>\n    ',
      showConfirmButton: !1,
      allowOutsideClick: !1,
      allowEscapeKey: !1,
      didOpen: () => {
        (document.getElementById("btn-watch-ad").onclick = () => {
          showSimulatedVideoAd();
        }),
          (document.getElementById("btn-quiz").onclick = () => {
            tampilkanKuis();
          }),
          (document.getElementById("btn-restart-game").onclick = () => {
            Swal.close(), triggerFullReset();
          }),
          (document.getElementById("btn-main-menu").onclick = () => {
            window.location.reload();
          });
      },
    });
}
function getGameQuiz() {
  const a = [
    {
      question: "Siapa nama karakter utama yang dapat dimainkan di game ini?",
      options: ["Momo", "Lala", "Dodo", "Roro"],
      correctAnswer: "Momo",
    },
    {
      question: "Buah apa yang memberikan skor paling tinggi saat diambil?",
      options: ["Stroberi", "Kiwi", "Apel", "Melon"],
      correctAnswer: "Melon",
    },
    {
      question: "Apa fungsi dari bendera di akhir setiap level?",
      options: [
        "Menambah nyawa",
        "Menambah skor",
        "Menyelesaikan level",
        "Memulai ulang",
      ],
      correctAnswer: "Menyelesaikan level",
    },
    {
      question: "Berapa skor yang didapat jika mengalahkan satu musuh?",
      options: ["1", "2", "3", "5"],
      correctAnswer: "2",
    },
    {
      question:
        "Musuh berbentuk tanaman (Bunga) akan menyerang jika pemain berada di sebelah...",
      options: ["Kanan", "Atas", "Bawah", "Kiri"],
      correctAnswer: "Kiri",
    },
    {
      question: "Berapa jumlah koin kehidupan awal yang didapat pemain?",
      options: ["3", "5", "7", "10"],
      correctAnswer: "5",
    },
    {
      question:
        "Apa yang terjadi jika pemain menyentuh musuh dari samping atau bawah?",
      options: [
        "Pemain memantul",
        "Musuh yang mati",
        "Pemain kehilangan nyawa",
        "Tidak terjadi apa-apa",
      ],
      correctAnswer: "Pemain kehilangan nyawa",
    },
    {
      question: "Menurut footer di halaman utama, siapa pengembang game ini?",
      options: ["Wandah", "Riyan", "Momo", "Google"],
      correctAnswer: "Riyan",
    },
    {
      question: "Tombol keyboard apa yang digunakan untuk melompat?",
      options: ["Spasi", "Panah Kanan", "Panah Atas", "Enter"],
      correctAnswer: "Panah Atas",
    },
    {
      question: "Berapa banyak pilihan karakter yang tersedia di menu utama?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "3",
    },
    {
      question: "Apa fungsi dari checkpoint (bendera kecil) di tengah level?",
      options: [
        "Menambah skor 10",
        "Mengakhiri permainan",
        "Menyimpan posisi terakhir",
        "Membuat kebal",
      ],
      correctAnswer: "Menyimpan posisi terakhir",
    },
    {
      question: "Bagaimana cara mengalahkan musuh dalam game ini?",
      options: [
        "Menembaknya",
        "Menginjaknya dari atas",
        "Menghindarinya",
        "Memukulnya",
      ],
      correctAnswer: "Menginjaknya dari atas",
    },
    {
      question: "Jika koin kehidupan habis, opsi apa yang TIDAK muncul?",
      options: [
        "Tonton Iklan",
        "Jawab Kuis",
        "Lanjut Level",
        "Mulai Ulang Game",
      ],
      correctAnswer: "Lanjut Level",
    },
    {
      question:
        "Pada level berapa pertama kali musuh Bunga yang menembak muncul?",
      options: ["Level 1", "Level 2", "Level 3", "Tidak ada"],
      correctAnswer: "Level 3",
    },
    {
      question: "Berapa skor yang didapat jika mengambil buah Kiwi?",
      options: ["1", "2", "3", "5"],
      correctAnswer: "2",
    },
    {
      question:
        "Peluru yang ditembakkan oleh musuh Bunga akan hancur jika mengenai...",
      options: ["Pemain", "Tembok/Tile", "Musuh lain", "Semua benar"],
      correctAnswer: "Semua benar",
    },
    {
      question: "Di menu jeda (pause), tombol apa yang TIDAK tersedia?",
      options: ["Lanjutkan", "Ulangi Level", "Simpan Game", "Kembali ke Menu"],
      correctAnswer: "Simpan Game",
    },
  ];
  return a[Math.floor(Math.random() * a.length)];
}
function tampilkanKuis() {
  const a = getGameQuiz();
  if (!a)
    return (
      Swal.fire("Gagal memuat kuis", "Terjadi kesalahan.", "error"),
      void showContinueOrGameOverPopup()
    );
  let n = '<div class="quiz-options-container">';
  [...a.options]
    .sort(() => Math.random() - 0.5)
    .forEach((a) => {
      n += `<button class="quiz-btn" data-answer="${a}">${a}</button>`;
    }),
    (n += "</div>"),
    Swal.fire({
      title: a.question,
      html: n,
      showConfirmButton: !1,
      showCancelButton: !0,
      cancelButtonText: "Menyerah",
      allowOutsideClick: !1,
      didOpen: () => {
        Swal.getPopup()
          .querySelectorAll(".quiz-btn")
          .forEach((n) => {
            n.addEventListener("click", () => {
              const e = n.dataset.answer,
                t = a.correctAnswer;
              Swal.close(),
                setTimeout(() => {
                  e === t
                    ? (Swal.fire({
                        title: "Benar!",
                        text: "Anda mendapatkan 1 koin!",
                        icon: "success",
                        timer: 2e3,
                        showConfirmButton: !1,
                      }),
                      (game.coinKehidupan = 1),
                      (game.aktif = !0),
                      setAwal(!1),
                      jalankan(gameLoop))
                    : Swal.fire({
                        title: "Salah!",
                        text: `Jawaban yang benar adalah: ${t}`,
                        icon: "error",
                        confirmButtonText: "Coba Opsi Lain",
                        allowOutsideClick: !1,
                      }).then(() => {
                        showContinueOrGameOverPopup();
                      });
                }, 300);
            });
          });
      },
    }).then((a) => {
      a.dismiss === Swal.DismissReason.cancel && showContinueOrGameOverPopup();
    });
}
function triggerFullReset() {
  (game.level = 1),
    (cumulativeScore = 0),
    (game.score = 0),
    (game.coinKehidupan = 5),
    (game.aktif = !0),
    (isPaused = !1),
    (pauseIcon.innerText = "play_arrow"),
    isSoundOn && audio.play(),
    setAwal(!0),
    jalankan(gameLoop);
}
function showGameCompletePopup(a) {
  Swal.fire({
    title: "Permainan Selesai!",
    icon: "success",
    allowOutsideClick: !1,
    allowEscapeKey: !1,
    showConfirmButton: !1,
    html: `\n        <p>Selamat, Anda telah menyelesaikan semua level!</p>\n        <p>Total Skor Anda: <strong>${a}</strong></p>\n        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">\n            <button id="swal-play-again" class="swal-btn swal-btn-resume">Main Lagi</button>\n            <button id="swal-share" class="swal-btn" style="background-color:#9b59b6;">Bagikan Skor</button>\n            <button id="swal-menu" class="swal-btn swal-btn-kembali">Kembali ke Menu</button>\n        </div>\n    `,
    didOpen: () => {
      (document.getElementById("swal-play-again").onclick = () => {
        Swal.close(), showLevelSelectionAfterGameComplete(a);
      }),
        (document.getElementById("swal-share").onclick = () => {
          Swal.close(),
            generateScoreImageAndShare(a, "Final", () =>
              showGameCompletePopup(a)
            );
        }),
        (document.getElementById("swal-menu").onclick = () =>
          window.location.reload());
    },
  });
}
function showLevelSelectionAfterGameComplete(a) {
  const n = {};
  for (let a = 1; a <= game.level; a++) n[a] = `Level ${a}`;
  Swal.fire({
    title: "Pilih Level",
    input: "select",
    inputOptions: n,
    inputPlaceholder: "Pilih level",
    showCancelButton: !0,
    confirmButtonText: "Mulai",
    cancelButtonText: "Batal",
  }).then((n) => {
    if (n.isConfirmed && n.value) {
      const a = parseInt(n.value);
      (cumulativeScore = 0),
        (game.score = 0),
        (game.level = a),
        (game.coinKehidupan = 5),
        (game.aktif = !0),
        ulangiPermainan(!0);
    } else n.dismiss === Swal.DismissReason.cancel && showGameCompletePopup(a);
  });
}
function showSimulatedVideoAd() {
  Swal.fire({
    title: "Iklan sedang diputar...",
    html: '\n      <div class="simulated-ad-container">\n        <iframe \n            class="simulated-video-placeholder" \n            src="https://www.youtube.com/embed/AL2LWAygVEw?autoplay=1&mute=1&controls=0&loop=1&playlist=AL2LWAygVEw" \n            frameborder="0" \n            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" \n            allowfullscreen>\n        </iframe>\n        \n        <div class="simulated-progress-bar">\n          <div id="ad-progress" class="progress"></div>\n        </div>\n        <a href="https://rynnn10.github.io/gamesawit/" target="_blank" class="simulated-cta-btn">\n          Mainkan Game!\n        </a>\n        <button id="close-ad-btn" class="simulated-close-btn" disabled>Tunggu 30 detik...</button>\n      </div>\n    ',
    showConfirmButton: !1,
    allowOutsideClick: !1,
    allowEscapeKey: !1,
    didOpen: () => {
      const a = document.getElementById("close-ad-btn"),
        n = document.getElementById("ad-progress");
      let e = 30,
        t = 0;
      audio.pause();
      const i = setInterval(() => {
        e > 0
          ? (e--,
            (t = ((30 - e) / 30) * 100),
            (n.style.width = t + "%"),
            (a.innerText = `Tunggu ${e} detik...`))
          : (clearInterval(i),
            (a.innerText = "Tutup & Ambil Koin"),
            (a.disabled = !1));
      }, 1e3);
      a.addEventListener("click", () => {
        Swal.close(),
          Swal.fire({
            title: "Reward Diterima!",
            text: "Anda mendapatkan 1 koin kehidupan!",
            icon: "success",
            timer: 2e3,
            showConfirmButton: !1,
          }),
          (game.coinKehidupan = 1),
          (game.aktif = !0),
          setAwal(!1),
          jalankan(gameLoop),
          isSoundOn && !isPaused && audio.play();
      });
    },
  });
}
async function generateScoreImageAndShare(a, n, e) {
  Swal.fire({
    title: "Membuat gambar skor...",
    text: "Mohon tunggu sebentar.",
    allowOutsideClick: !1,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  const t = document.createElement("canvas"),
    i = t.getContext("2d");
  (t.width = 800), (t.height = 600);
  const s = dataGambar.bgscore;
  try {
    const l = {
        1: "assets/Idle.png",
        2: "assets/Idle2.png",
        3: "assets/Idle3.png",
      },
      r = await ((o = l[selectedCharacterId]),
      new Promise((a, n) => {
        const e = new Image();
        (e.onload = () => a(e)), (e.onerror = n), (e.src = o);
      }));
    i.drawImage(s, 0, 0, t.width, t.height);
    const u = 32,
      m = 32,
      c = 6;
    i.drawImage(r, 0, 0, u, m, 100, 220, u * c, m * c),
      (i.font = "bold 50px 'Press Start 2P'"),
      (i.fillStyle = "#FFFFFF"),
      (i.textAlign = "center"),
      (i.strokeStyle = "black"),
      (i.lineWidth = 10);
    const d = "Final" === n ? "Game Selesai!" : `Level ${n} Selesai!`,
      p = `Skor Akhir: ${a}`;
    i.strokeText(d, t.width / 2, 180),
      i.fillText(d, t.width / 2, 180),
      (i.font = "40px 'Press Start 2P'"),
      i.strokeText(p, t.width / 2, 450),
      i.fillText(p, t.width / 2, 450);
    const g = await new Promise((a) => t.toBlob(a, "image/png")),
      h = {
        title: "Skor Game Momo!",
        text: `Aku mendapatkan skor ${a} di Momo Games!`,
        files: [new File([g], "momo-games-skor.png", { type: "image/png" })],
      };
    if ((Swal.close(), navigator.canShare && navigator.canShare(h)))
      try {
        await navigator.share(h);
      } catch (a) {}
    else {
      const a = t.toDataURL("image/png"),
        n = document.createElement("a");
      (n.href = a),
        (n.download = "momo-games-skor.png"),
        n.click(),
        Swal.fire(
          "Gambar Diunduh",
          "Anda sekarang dapat membagikannya secara manual.",
          "success"
        );
    }
  } catch (a) {
    Swal.fire("Error", "Gagal membuat gambar: " + a, "error");
  } finally {
    "function" == typeof e && e();
  }
  var o;
}
(audio.autoplay = !1),
  (audio.loop = !0),
  startButton.addEventListener("click", startGame),
  charSelectButton.addEventListener("click", showCharacterSelectionPopup),
  helpButtonMenu.addEventListener("click", () => {
    Swal.fire({
      title: "Cara Bermain",
      html: '\n      <div style="max-height: 40vh; overflow-y: auto; text-align: left; padding-right: 15px; font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;">\n        <h4 style="color: #3498db;">Tujuan Permainan</h4>\n        <p>\n          Bantu karakter pilihanmu untuk melewati semua rintangan, kumpulkan buah-buahan untuk mendapatkan skor, dan capai bendera di akhir setiap level untuk menang!\n        </p>\n        \n        <h4 style="color: #3498db;">Kontrol</h4>\n        <p>\n          <strong>Desktop:</strong><br>\n          - <strong>Panah Kiri / Kanan:</strong> Bergerak ke kiri atau kanan.<br>\n          - <strong>Panah Atas:</strong> Melompat.\n        </p>\n        <p>\n          <strong>Mobile:</strong><br>\n          Gunakan tombol yang tersedia di bagian bawah layar untuk bergerak dan melompat.\n        </p>\n\n        <h4 style="color: #3498db;">Skor & Item</h4>\n        <p>\n          Kumpulkan item untuk menambah skormu:\n        </p>\n        <ul style="list-style-position: inside; padding-left: 20;">\n            <li><img src="assets/stjudul.png" style="width:20px; vertical-align: middle;"> Stroberi: <strong>+1 Skor</strong></li>\n            <li><img src="assets/kwjudul.png" style="width:20px; vertical-align: middle;"> Kiwi: <strong>+2 Skor</strong></li>\n            <li><img src="assets/mljudul.png" style="width:20px; vertical-align: middle;"> Melon: <strong>+3 Skor</strong></li>\n            <li><img src="assets/jamurjudul.png" style="width:20px; vertical-align: middle;"> Mengalahkan musuh: <strong>+2 Skor</strong></li>\n        </ul>\n\n        <h4 style="color: #3498db;">Musuh</h4>\n        <p>\n          Hindari musuh atau kalahkan mereka dengan <strong>melompat tepat di atas kepala mereka</strong>. Jika kamu menyentuh musuh dari samping atau bawah, kamu akan kehilangan satu Koin Kehidupan. Waspadalah terhadap Bunga yang bisa menembak!\n        </p>\n\n        <h4 style="color: #3498db;">Koin Kehidupan</h4>\n        <p>\n          Kamu memulai permainan dengan 5 Koin Kehidupan. Setiap kali kamu jatuh atau terkena musuh, kamu akan kehilangan satu koin dan kembali ke titik awal atau checkpoint terakhir.\n        </p>\n        <p>\n          Jika Koin Kehidupan habis, kamu bisa mendapatkan koin tambahan dengan menonton iklan atau menjawab kuis, atau memilih untuk memulai ulang permainan.\n        </p>\n\n        <h4 style="color: #3498db;">Checkpoint</h4>\n        <p>\n          Bendera kecil berwarna oranye <img src="assets/cpidle.png" style="width:20px; vertical-align: middle;"> berfungsi sebagai checkpoint. Jika kamu melewatinya, kamu akan memulai kembali dari titik tersebut jika kehilangan nyawa, bukan dari awal level.\n        </p>\n      </div>\n    ',
      icon: "question",
      confirmButtonText: "Mengerti",
    });
  }),
  infoButtonMenu.addEventListener("click", () => {
    Swal.fire({
      title: "Informasi Permainan",
      html: '\n      <style>\n        .info-container {\n            max-height: 50vh; \n            overflow-y: auto; \n            text-align: left; \n            padding-right: 15px; \n            font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;\n        }\n        .info-section {\n            margin-bottom: 20px;\n        }\n        .info-section h4 {\n            color: #3498db;\n            display: flex;\n            align-items: center;\n            gap: 8px;\n            border-bottom: 1px solid #3498db;\n            padding-bottom: 5px;\n        }\n        .info-item {\n            display: flex;\n            align-items: center;\n            gap: 15px;\n            margin-bottom: 10px;\n        }\n        .info-item img {\n            width: 50px;\n            height: 50px;\n            object-fit: contain;\n            background: rgba(255,255,255,0.1);\n            border-radius: 5px;\n            padding: 5px;\n        }\n        .info-item p {\n            margin: 0;\n            flex-grow: 1;\n        }\n      </style>\n      <div class="info-container">\n        <div class="info-section">\n          <h4><span class="material-symbols-outlined">badge</span>Developer</h4>\n          <p>Game ini dibuat dan dikembangkan oleh <strong>Riyan</strong> sebagai proyek untuk menunjukkan kemampuan dalam pengembangan game web menggunakan HTML5, CSS, dan JavaScript. Copyright &copy; 2025.</p>\n        </div>\n\n        <div class="info-section">\n          <h4><span class="material-symbols-outlined">group</span>Karakter Pemain</h4>\n          <div class="info-item">\n            <img src="assets/Jump.png" alt="Momo">\n            <p><strong>Momo:</strong> Astronot pemberani yang siap menjelajahi dunia buah-buahan.</p>\n          </div>\n          <div class="info-item">\n            <img src="assets/Jump2.png" alt="Lala">\n            <p><strong>Lala:</strong> Petualang ceria dengan kostum unik, tidak kalah gesit dari Momo.</p>\n          </div>\n          <div class="info-item">\n            <img src="assets/Jump3.png" alt="Jack">\n            <p><strong>Jack:</strong> Pekerja kantoran yang bosan dan memutuskan untuk mencari petualangan!</p>\n          </div>\n        </div>\n\n        <div class="info-section">\n          <h4><span class="material-symbols-outlined">bug_report</span>Musuh</h4>\n           <div class="info-item">\n            <img src="assets/jamurjudul.png" alt="Musuh 1">\n            <p>Jamur yang berjalan santai, jangan terkecoh dengan penampilannya yang lugu.</p>\n          </div>\n          <div class="info-item">\n            <img src="assets/babijudul.png" alt="Musuh 2">\n            <p>Babi hutan pemarah yang akan mengejar siapa saja yang mengganggu wilayahnya.</p>\n          </div>\n          <div class="info-item">\n            <img src="assets/bungajudul.png" alt="Musuh 3">\n            <p>Tanaman karnivora yang akan menembakkan peluru jika kamu berada di sebelah kirinya.</p>\n          </div>\n        </div>\n\n        <div class="info-section">\n          <h4><span class="material-symbols-outlined">paid</span>Koin Kehidupan</h4>\n          <div class="info-item">\n            <img src="assets/koinjudul.png" alt="Koin">\n            <p>Berfungsi sebagai nyawa. Jika habis, petualanganmu akan terhenti sejenak. Gunakan dengan bijak!</p>\n          </div>\n        </div>\n\n      </div>\n    ',
      icon: "info",
      confirmButtonText: "Mengerti",
    });
  }),
  document.getElementById("pause").addEventListener("click", togglePause),
  document.getElementById("musicBg").addEventListener("click", function () {
    (isSoundOn = !isSoundOn),
      isSoundOn
        ? ((musicIcon.innerText = "volume_up"), isPaused || audio.play())
        : ((musicIcon.innerText = "volume_off"), audio.pause());
  });
