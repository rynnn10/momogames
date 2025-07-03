// --- Elemen Menu Utama ---
const mainMenu = document.getElementById("main-menu");
const gameContainer = document.getElementById("game-container");
const startButton = document.getElementById("btn-mulai");
const helpButtonMenu = document.getElementById("btn-bantuan");
const infoButtonMenu = document.getElementById("btn-info");
const charSelectButton = document.getElementById("btn-pilih-karakter"); // Perubahan: Tombol baru

// --- Elemen Tombol Dalam Game ---
const pauseIcon = document.getElementById("pause-icon");
const musicIcon = document.getElementById("music-icon");

// Perubahan: Variabel untuk menyimpan pilihan karakter (1, 2, atau 3)
let selectedCharacterId = 1;
// Perubahan: Variabel global untuk status suara
let isSoundOn = true;

var isPaused = false;
var audio = new Audio("sfx/backsound.mp3");
audio.autoplay = false;
audio.loop = true;

// --- Event Listener untuk Menu Utama ---
startButton.addEventListener("click", startGame);

// Event listener untuk tombol "Pilih Karakter"
charSelectButton.addEventListener("click", showCharacterSelectionPopup);

// PERUBAHAN: Event listener untuk Bantuan dengan konten baru
helpButtonMenu.addEventListener("click", () => {
  Swal.fire({
    title: "Cara Bermain",
    html: `
      <div style="max-height: 40vh; overflow-y: auto; text-align: left; padding-right: 15px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <h4 style="color: #3498db;">Tujuan Permainan</h4>
        <p>
          Bantu karakter pilihanmu untuk melewati semua rintangan, kumpulkan buah-buahan untuk mendapatkan skor, dan capai bendera di akhir setiap level untuk menang!
        </p>
        
        <h4 style="color: #3498db;">Kontrol</h4>
        <p>
          <strong>Desktop:</strong><br>
          - <strong>Panah Kiri / Kanan:</strong> Bergerak ke kiri atau kanan.<br>
          - <strong>Panah Atas:</strong> Melompat.
        </p>
        <p>
          <strong>Mobile:</strong><br>
          Gunakan tombol yang tersedia di bagian bawah layar untuk bergerak dan melompat.
        </p>

        <h4 style="color: #3498db;">Skor & Item</h4>
        <p>
          Kumpulkan item untuk menambah skormu:
        </p>
        <ul style="list-style-position: inside; padding-left: 20;">
            <li><img src="assets/stjudul.png" style="width:20px; vertical-align: middle;"> Stroberi: <strong>+1 Skor</strong></li>
            <li><img src="assets/kwjudul.png" style="width:20px; vertical-align: middle;"> Kiwi: <strong>+2 Skor</strong></li>
            <li><img src="assets/mljudul.png" style="width:20px; vertical-align: middle;"> Melon: <strong>+3 Skor</strong></li>
            <li><img src="assets/jamurjudul.png" style="width:20px; vertical-align: middle;"> Mengalahkan musuh: <strong>+2 Skor</strong></li>
        </ul>

        <h4 style="color: #3498db;">Musuh</h4>
        <p>
          Hindari musuh atau kalahkan mereka dengan <strong>melompat tepat di atas kepala mereka</strong>. Jika kamu menyentuh musuh dari samping atau bawah, kamu akan kehilangan satu Koin Kehidupan. Waspadalah terhadap Bunga yang bisa menembak!
        </p>

        <h4 style="color: #3498db;">Koin Kehidupan</h4>
        <p>
          Kamu memulai permainan dengan 5 Koin Kehidupan. Setiap kali kamu jatuh atau terkena musuh, kamu akan kehilangan satu koin dan kembali ke titik awal atau checkpoint terakhir.
        </p>
        <p>
          Jika Koin Kehidupan habis, kamu bisa mendapatkan koin tambahan dengan menonton iklan atau menjawab kuis, atau memilih untuk memulai ulang permainan.
        </p>

        <h4 style="color: #3498db;">Checkpoint</h4>
        <p>
          Bendera kecil berwarna oranye <img src="assets/cpidle.png" style="width:20px; vertical-align: middle;"> berfungsi sebagai checkpoint. Jika kamu melewatinya, kamu akan memulai kembali dari titik tersebut jika kehilangan nyawa, bukan dari awal level.
        </p>
      </div>
    `,
    icon: "question",
    confirmButtonText: "Mengerti",
  });
});

// PERUBAHAN: Event listener untuk Info dengan konten baru
infoButtonMenu.addEventListener("click", () => {
  Swal.fire({
    title: "Informasi Permainan",
    html: `
      <style>
        .info-container {
            max-height: 50vh; 
            overflow-y: auto; 
            text-align: left; 
            padding-right: 15px; 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .info-section {
            margin-bottom: 20px;
        }
        .info-section h4 {
            color: #3498db;
            display: flex;
            align-items: center;
            gap: 8px;
            border-bottom: 1px solid #3498db;
            padding-bottom: 5px;
        }
        .info-item {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 10px;
        }
        .info-item img {
            width: 50px;
            height: 50px;
            object-fit: contain;
            background: rgba(255,255,255,0.1);
            border-radius: 5px;
            padding: 5px;
        }
        .info-item p {
            margin: 0;
            flex-grow: 1;
        }
      </style>
      <div class="info-container">
        <div class="info-section">
          <h4><span class="material-symbols-outlined">badge</span>Developer</h4>
          <p>Game ini dibuat dan dikembangkan oleh <strong>Riyan</strong> sebagai proyek untuk menunjukkan kemampuan dalam pengembangan game web menggunakan HTML5, CSS, dan JavaScript. Copyright &copy; 2025.</p>
        </div>

        <div class="info-section">
          <h4><span class="material-symbols-outlined">group</span>Karakter Pemain</h4>
          <div class="info-item">
            <img src="assets/Jump.png" alt="Momo">
            <p><strong>Momo:</strong> Astronot pemberani yang siap menjelajahi dunia buah-buahan.</p>
          </div>
          <div class="info-item">
            <img src="assets/Jump2.png" alt="Lala">
            <p><strong>Lala:</strong> Petualang ceria dengan kostum unik, tidak kalah gesit dari Momo.</p>
          </div>
          <div class="info-item">
            <img src="assets/Jump3.png" alt="Jack">
            <p><strong>Jack:</strong> Pekerja kantoran yang bosan dan memutuskan untuk mencari petualangan!</p>
          </div>
        </div>

        <div class="info-section">
          <h4><span class="material-symbols-outlined">bug_report</span>Musuh</h4>
           <div class="info-item">
            <img src="assets/jamurjudul.png" alt="Musuh 1">
            <p>Jamur yang berjalan santai, jangan terkecoh dengan penampilannya yang lugu.</p>
          </div>
          <div class="info-item">
            <img src="assets/babijudul.png" alt="Musuh 2">
            <p>Babi hutan pemarah yang akan mengejar siapa saja yang mengganggu wilayahnya.</p>
          </div>
          <div class="info-item">
            <img src="assets/bungajudul.png" alt="Musuh 3">
            <p>Tanaman karnivora yang akan menembakkan peluru jika kamu berada di sebelah kirinya.</p>
          </div>
        </div>

        <div class="info-section">
          <h4><span class="material-symbols-outlined">paid</span>Koin Kehidupan</h4>
          <div class="info-item">
            <img src="assets/koinjudul.png" alt="Koin">
            <p>Berfungsi sebagai nyawa. Jika habis, petualanganmu akan terhenti sejenak. Gunakan dengan bijak!</p>
          </div>
        </div>

      </div>
    `,
    icon: "info",
    confirmButtonText: "Mengerti",
  });
});

// PERUBAHAN: Fungsi popup pilihan karakter dengan nama
function showCharacterSelectionPopup() {
  Swal.fire({
    title: "Pilih Karakter",
    html: `
      <style>
        .char-option {
          flex-direction: column; /* Stack image and name vertically */
          font-family: 'Press Start 2P', cursive;
          font-size: 0.7rem;
          color: #fff;
          height: 125px; /* Adjust height for name */
        }
        .char-option img {
           width: 80px; /* Adjust image size */
           height: 80px;
        }
        .char-name {
          margin-top: 8px;
        }
      </style>
     <div class="character-selector">
        <div class="char-option ${
          selectedCharacterId == 1 ? "selected" : ""
        }" data-char="1">
          <img src="assets/Jump.png" alt="Player 1">
          <div class="char-name">Momo</div>
        </div>
        <div class="char-option ${
          selectedCharacterId == 2 ? "selected" : ""
        }" data-char="2">
          <img src="assets/Jump2.png" alt="Player 2">
           <div class="char-name">Lala</div>
        </div>
        <div class="char-option ${
          selectedCharacterId == 3 ? "selected" : ""
        }" data-char="3">
          <img src="assets/Jump3.png" alt="Player 3">
           <div class="char-name">Jack</div>
        </div>
      </div>
    `,
    showConfirmButton: true,
    confirmButtonText: "Pilih",
    didOpen: () => {
      const popup = Swal.getPopup();
      const charOptions = popup.querySelectorAll(".char-option");

      charOptions.forEach((option) => {
        option.addEventListener("click", () => {
          charOptions.forEach((opt) => opt.classList.remove("selected"));
          option.classList.add("selected");
          // Simpan pilihan sementara di dalam popup
          popup.dataset.selectedChar = option.dataset.char;
        });
      });
    },
    preConfirm: () => {
      const popup = Swal.getPopup();
      // Update variabel global saat tombol "Pilih" diklik
      if (popup.dataset.selectedChar) {
        selectedCharacterId = popup.dataset.selectedChar;
      }
      console.log("Karakter dipilih:", selectedCharacterId);
    },
  });
}

// --- Fungsi untuk Memulai Game ---
function startGame() {
  mainMenu.classList.add("hidden");
  gameContainer.classList.remove("hidden");

  if (audio.paused) {
    isSoundOn = true;
    audio.play();
    musicIcon.innerText = "volume_up";
  }
  // game.level = 2;
  game.coinKehidupan = 5; // Perubahan: Atur jumlah koin kehidupan awal
  game.coinAnim = setSprite(dataGambar.coin, 32, 32); // Contoh ukuran frame 32x32, sesuaikan
  game.coinAnim.frameRate = 5; // Atur kecepatan animasi (frame per detik)

  setAwal();
  jalankan(gameLoop);
}

function showPausePopup() {
  Swal.fire({
    title: "Game Dijeda",
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    html:
      '<div style="display: flex; flex-direction: column; gap: 10px;">' +
      '<button id="swal-resume" class="swal-btn swal-btn-resume">Lanjutkan</button>' +
      '<button id="swal-refresh" class="swal-btn swal-btn-refresh">Ulangi Level</button>' +
      '<button id="swal-info" class="swal-btn swal-btn-info">Info</button>' +
      '<button id="swal-kembali" class="swal-btn swal-btn-kembali">Kembali ke Menu</button>' +
      "</div>",
    didOpen: () => {
      const resumeButton = Swal.getPopup().querySelector("#swal-resume");
      const refreshButton = Swal.getPopup().querySelector("#swal-refresh");
      const infoButton = Swal.getPopup().querySelector("#swal-info");
      const kembaliButton = Swal.getPopup().querySelector("#swal-kembali");

      resumeButton.onclick = () => {
        togglePause();
      };

      refreshButton.onclick = () => {
        Swal.fire({
          title: "Konfirmasi",
          text: "Anda yakin ingin mengulangi level ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#e74c3c",
          cancelButtonColor: "#3498db",
          confirmButtonText: "Ya, Ulangi!",
          cancelButtonText: "Tidak",
        }).then((result) => {
          if (result.isConfirmed) {
            isPaused = false;
            pauseIcon.innerText = "play_arrow";
            if (game.level > 1) {
              game.score = cumulativeScore;
            } else {
              game.score = 0;
            }
            game.coinKehidupan = 5;
            ulangiPermainan(true);
            if (isSoundOn) {
              audio.play();
              musicIcon.innerText = "volume_up";
            }
          } else {
            showPausePopup();
          }
        });
      };

      infoButton.onclick = () => {
        let infoContent = "";
        let popupTitle = "Informasi Permainan";

        // --- KONDISI UNTUK SETIAP LEVEL ---

        if (game.level === 1) {
          popupTitle = "Info Level 1";
          infoContent = `
            <style>.info-container{text-align:left;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif}.info-section{margin-bottom:15px}.info-section h4{color:#3498db;margin-bottom:5px;display:flex;align-items:center;gap:8px}.info-item{display:flex;align-items:center;gap:10px}.info-item img{width:30px;height:30px;object-fit:contain;vertical-align:middle}</style>
            <div class="info-container">
              <div class="info-section"><h4><span class="material-symbols-outlined">bug_report</span>Musuh</h4><div class="info-item"><img src="assets/jamurjudul.png" alt="Jamur"><span>Hanya terdapat <strong>Jamur</strong> di level ini.</span></div></div>
              <div class="info-section"><h4><span class="material-symbols-outlined">restaurant</span>Buah</h4><div class="info-item"><img src="assets/stjudul.png" alt="Stroberi"><span>Kumpulkan <strong>Stroberi</strong> untuk mendapatkan skor.</span></div></div>
              <p style="font-size:0.9em;color:#777">Level selanjutnya akan lebih menantang!</p>
            </div>`;
        } else if (game.level === 2) {
          popupTitle = "Info Level 2";
          infoContent = `
            <style>.info-container{text-align:left;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif}.info-section{margin-bottom:15px}.info-section h4{color:#3498db;margin-bottom:5px;display:flex;align-items:center;gap:8px}.info-item{display:flex;align-items:center;gap:10px;margin-bottom:8px}.info-item img{width:30px;height:30px;object-fit:contain;vertical-align:middle}</style>
            <div class="info-container">
              <p>Hati-hati, tantangan di level ini meningkat!</p>
              <div class="info-section"><h4><span class="material-symbols-outlined">bug_report</span>Musuh Baru</h4><div class="info-item"><img src="assets/jamurjudul.png" alt="Jamur"><span><strong>Jamur</strong> masih berkeliaran.</span></div><div class="info-item"><img src="assets/babijudul.png" alt="Babi Hutan"><span>Waspadai <strong>Babi Hutan</strong> yang lebih cepat!</span></div></div>
              <div class="info-section"><h4><span class="material-symbols-outlined">restaurant</span>Buah Baru</h4><div class="info-item"><img src="assets/stjudul.png" alt="Stroberi"><span>Kumpulkan <strong>Stroberi</strong> (+1 Skor).</span></div><div class="info-item"><img src="assets/kwjudul.png" alt="Kiwi"><span>Temukan <strong>Kiwi</strong> untuk skor lebih besar (+2 Skor)!</span></div></div>
              <p style="font-size:0.9em;color:#777">Tantangan sesungguhnya menanti di level terakhir.</p>
            </div>`;
        } else if (game.level === 3) {
          popupTitle = "Info Level 3";
          infoContent = `
            <style>.info-container{text-align:left;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif}.info-section{margin-bottom:15px}.info-section h4{color:#3498db;margin-bottom:5px;display:flex;align-items:center;gap:8px}.info-item{display:flex;align-items:center;gap:10px;margin-bottom:8px}.info-item img{width:30px;height:30px;object-fit:contain;vertical-align:middle}</style>
            <div class="info-container">
              <p>Selamat datang di level terakhir! Semua rintangan ada di sini.</p>
              <div class="info-section"><h4><span class="material-symbols-outlined">bug_report</span>Semua Musuh</h4>
                  <div class="info-item"><img src="assets/jamurjudul.png" alt="Jamur"><span><strong>Jamur</strong></span></div>
                  <div class="info-item"><img src="assets/babijudul.png" alt="Babi Hutan"><span><strong>Babi Hutan</strong></span></div>
                  <div class="info-item"><img src="assets/bungajudul.png" alt="Bunga"><span><strong>Tanaman Karnivora</strong> yang bisa menembak!</span></div>
              </div>
              <div class="info-section"><h4><span class="material-symbols-outlined">restaurant</span>Semua Buah</h4>
                  <div class="info-item"><img src="assets/stjudul.png" alt="Stroberi"><span><strong>Stroberi</strong> (+1 Skor)</span></div>
                  <div class="info-item"><img src="assets/kwjudul.png" alt="Kiwi"><span><strong>Kiwi</strong> (+2 Skor)</span></div>
                  <div class="info-item"><img src="assets/mljudul.png" alt="Melon"><span><strong>Melon</strong> (+3 Skor)</span></div>
              </div>
              <p style="font-size:0.9em;color:#777;">Selesaikan level ini untuk memenangkan permainan!</p>
            </div>`;
        } else {
          // Konten default jika ada level lain (misal: level 4, 5, dst.)
          infoContent = `<p>Informasi umum mengenai permainan.</p>`;
        }

        Swal.fire({
          title: popupTitle,
          html: infoContent,
          icon: "info",
          confirmButtonText: "Mengerti",
        }).then(() => {
          showPausePopup();
        });
      };

      kembaliButton.onclick = () => {
        window.location.reload();
      };
    },
  });
}

function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    pauseIcon.innerText = "pause";
    showPausePopup();
    audio.pause(); // Jeda musik latar
    musicIcon.innerText = "volume_off"; // Ubah ikon menjadi 'off'
  } else {
    Swal.close();
    pauseIcon.innerText = "play_arrow";
    // Cek apakah suara memang harusnya menyala sebelum memutarnya kembali
    if (isSoundOn) {
      audio.play();
      musicIcon.innerText = "volume_up"; // Kembalikan ikon menjadi 'on'
    } else {
      musicIcon.innerText = "volume_off"; // Jaga agar ikon tetap 'off' jika settingnya 'off'
    }
  }
}

// Event Listener untuk tombol-tombol yang relevan
document.getElementById("pause").addEventListener("click", togglePause);

document.getElementById("musicBg").addEventListener("click", function () {
  isSoundOn = !isSoundOn;
  if (isSoundOn) {
    musicIcon.innerText = "volume_up";
    // Hanya putar audio jika game TIDAK sedang di-pause
    if (!isPaused) {
      audio.play();
    }
  } else {
    musicIcon.innerText = "volume_off";
    audio.pause();
  }
});

// PERUBAHAN: Logika popup untuk Level 1 Selesai dengan konfirmasi
function showLevelCompletePopup(score) {
  Swal.fire({
    title: "Level 1 Selesai!",
    icon: "success",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    html: `
        <p>Skor Anda: <strong>${score}</strong></p>
        <div style="text-align: left; margin-top: 20px; border-top: 1px solid #555; padding-top: 15px;">
            <h4 style="color: #3498db;">Selanjutnya: Level 2</h4>
            <p style="font-size: 0.9em;">Waspada! Musuh baru <strong>Babi Hutan</strong> yang lebih cepat akan muncul. Kamu juga akan menemukan buah <strong>Kiwi</strong> yang memberikan skor lebih tinggi!</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
            <button id="swal-continue" class="swal-btn swal-btn-resume">Lanjutkan</button>
            <button id="swal-replay" class="swal-btn swal-btn-refresh">Ulangi Level</button>
            <button id="swal-share" class="swal-btn" style="background-color:#9b59b6;">Bagikan Skor</button>
            <button id="swal-menu" class="swal-btn swal-btn-kembali">Kembali ke Menu</button>
        </div>
    `,
    didOpen: () => {
      document.getElementById("swal-continue").onclick = () => {
        Swal.close();
        cumulativeScore = game.score;
        game.level++;
        game.coinKehidupan = 5;
        game.aktif = true;
        ulangiPermainan(true);
      };

      // Tombol Ulangi dengan Konfirmasi
      document.getElementById("swal-replay").onclick = () => {
        Swal.fire({
          title: "Ulangi Level?",
          text: "Anda yakin ingin mengulangi level ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, Ulangi!",
          cancelButtonText: "Batal",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.close();
            game.score = game.level > 1 ? cumulativeScore : 0;
            game.coinKehidupan = 5;
            game.aktif = true;
            ulangiPermainan(true);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // PERUBAHAN: Jika dibatalkan, kembali ke popup sebelumnya
            showLevelCompletePopup(score);
          }
        });
      };

      // Tombol Bagikan dengan Callback
      document.getElementById("swal-share").onclick = () => {
        Swal.close();
        generateScoreImageAndShare(score, game.level, () =>
          showLevelCompletePopup(score)
        );
      };

      document.getElementById("swal-menu").onclick = () =>
        window.location.reload();
    },
  });
}

// PERUBAHAN DIMULAI: Fungsi ini telah diubah total untuk memenuhi semua permintaan Anda.
function showNextLevelPopup(score) {
  Swal.fire({
    title: "Level 2 Selesai!",
    icon: "success",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    html: `
        <p>Skor Anda: <strong>${score}</strong></p>
        
        <div style="text-align: left; margin-top: 20px; border-top: 1px solid #555; padding-top: 15px;">
            <h4 style="color: #3498db;">Selanjutnya: Level Terakhir!</h4>
            <p style="font-size: 0.9em;">Tantangan sesungguhnya menanti! Hadapi musuh baru <strong>Tanaman Karnivora</strong> yang bisa menembak dan temukan buah <strong>Melon</strong> untuk skor tertinggi.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
            <button id="swal-continue-l3" class="swal-btn swal-btn-resume">Lanjut ke Level 3</button>
            <button id="swal-replay-l2" class="swal-btn swal-btn-refresh">Ulangi Level 2</button>
            
            <button id="swal-replay-l1" class="swal-btn swal-btn-info">Main di Level 1</button> 
            
            <button id="swal-share" class="swal-btn" style="background-color:#9b59b6;">Bagikan Skor</button>
            <button id="swal-menu" class="swal-btn swal-btn-kembali">Kembali ke Menu</button>
        </div>
    `,
    didOpen: () => {
      // Event listener untuk tombol "Lanjut ke Level 3"
      document.getElementById("swal-continue-l3").onclick = () => {
        Swal.close();
        cumulativeScore = game.score;
        game.level = 3;
        game.coinKehidupan = 5;
        game.aktif = true;
        ulangiPermainan(true);
      };

      // Event listener untuk tombol "Ulangi Level 2" dengan konfirmasi
      document.getElementById("swal-replay-l2").onclick = () => {
        Swal.fire({
          title: "Ulangi Level 2?",
          text: "Anda yakin ingin mengulangi level ini?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, Ulangi!",
          cancelButtonText: "Batal",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.close();
            game.score = cumulativeScore;
            game.coinKehidupan = 5;
            game.aktif = true;
            ulangiPermainan(true);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            showNextLevelPopup(score);
          }
        });
      };

      // PERUBAHAN: Event listener untuk tombol baru "Main di Level 1" dengan konfirmasi
      document.getElementById("swal-replay-l1").onclick = () => {
        Swal.fire({
          title: "Kembali ke Level 1?",
          text: "Skor Anda saat ini akan direset. Anda yakin?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, Kembali!",
          cancelButtonText: "Batal",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.close();
            cumulativeScore = 0;
            game.score = 0;
            game.level = 1;
            game.coinKehidupan = 5;
            game.aktif = true;
            ulangiPermainan(true);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            showNextLevelPopup(score);
          }
        });
      };

      // Event listener untuk "Bagikan Skor"
      document.getElementById("swal-share").onclick = () => {
        Swal.close();
        generateScoreImageAndShare(score, game.level, () =>
          showNextLevelPopup(score)
        );
      };

      // Event listener untuk "Kembali ke Menu"
      document.getElementById("swal-menu").onclick = () =>
        window.location.reload();
    },
  });
}
// PERUBAHAN SELESAI

// Fungsi untuk menampilkan popup pilihan saat koin habis
function showContinueOrGameOverPopup() {
  mainkanSuara(dataSuara.lose);
  Swal.fire({
    title: "Koin Habis!",
    text: "Apa yang ingin kamu lakukan selanjutnya?",
    icon: "warning",
    html: `
      <div class="game-over-options">
        <button id="btn-watch-ad" class="swal-btn swal-btn-watch-ad">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px;">smart_display</span>
          Tonton Iklan (+1 Koin)
        </button>
        <button id="btn-quiz" class="swal-btn swal-btn-quiz">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px;">quiz</span>
          Jawab Kuis (+1 Koin)
        </button>
        <button id="btn-restart-game" class="swal-btn swal-btn-restart-game">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px;">refresh</span>
          Mulai Ulang Game
        </button>
        <button id="btn-main-menu" class="swal-btn swal-btn-main-menu">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px;">home</span>
          Kembali ke Menu Utama
        </button>
      </div>
    `,
    showConfirmButton: false, // Kita tidak butuh tombol konfirmasi default
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      // Tambahkan event listener untuk setiap tombol
      document.getElementById("btn-watch-ad").onclick = () => {
        showSimulatedVideoAd();
      };
      document.getElementById("btn-quiz").onclick = () => {
        tampilkanKuis();
      };
      document.getElementById("btn-restart-game").onclick = () => {
        Swal.close();
        triggerFullReset(); // Panggil fungsi reset total
      };
      document.getElementById("btn-main-menu").onclick = () => {
        window.location.reload(); // Cara termudah untuk kembali ke menu utama
      };
    },
  });
}

function getGameQuiz() {
  const quizBank = [
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
    // {
    //   question: "Apa nama file gambar untuk latar belakang Level 2?",
    //   options: [
    //     "bg_level1.png",
    //     "bg_level2.png",
    //     "background2.png",
    //     "level2.png",
    //   ],
    //   correctAnswer: "bg_level2.png",
    // },
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
    // {
    //   question:
    //     "Manakah dari berikut ini yang BUKAN merupakan aset suara dalam game?",
    //   options: ["item.mp3", "paku.mp3", "win.mp3", "jump.mp3"],
    //   correctAnswer: "jump.mp3",
    // },
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
    // {
    //   question: "Apa nama file untuk sprite 'idle' karakter ketiga?",
    //   options: ["Idle.png", "Idle2.png", "Idle3.png", "Player3.png"],
    //   correctAnswer: "Idle3.png",
    // },
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

  // Ambil satu pertanyaan acak dari bank soal
  const randomIndex = Math.floor(Math.random() * quizBank.length);
  return quizBank[randomIndex];
}

function tampilkanKuis() {
  const kuis = getGameQuiz(); // Memanggil bank soal lokal, bukan API

  // Jika karena suatu alasan kuis tidak ada, kembali ke menu utama.
  if (!kuis) {
    Swal.fire("Gagal memuat kuis", "Terjadi kesalahan.", "error");
    showContinueOrGameOverPopup();
    return;
  }

  // Buat tombol-tombol jawaban secara dinamis
  let optionsHtml = '<div class="quiz-options-container">';
  // Acak urutan pilihan jawaban agar tidak monoton
  const shuffledOptions = [...kuis.options].sort(() => Math.random() - 0.5);

  shuffledOptions.forEach((option) => {
    optionsHtml += `<button class="quiz-btn" data-answer="${option}">${option}</button>`;
  });
  optionsHtml += "</div>";

  Swal.fire({
    title: kuis.question,
    html: optionsHtml,
    showConfirmButton: false, // Sembunyikan tombol OK bawaan
    showCancelButton: true,
    cancelButtonText: "Menyerah",
    allowOutsideClick: false,
    didOpen: () => {
      // Tambahkan event listener untuk setiap tombol jawaban
      const optionButtons = Swal.getPopup().querySelectorAll(".quiz-btn");
      optionButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const selectedAnswerText = button.dataset.answer;
          const originalCorrectAnswerText = kuis.correctAnswer;

          // Tutup popup kuis
          Swal.close();

          // Cek jawaban setelah popup ditutup
          setTimeout(() => {
            if (selectedAnswerText === originalCorrectAnswerText) {
              // Jawaban BENAR
              Swal.fire({
                title: "Benar!",
                text: "Anda mendapatkan 1 koin!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });
              game.coinKehidupan = 1;
              game.aktif = true;
              setAwal(false); // Lanjutkan dari checkpoint
              jalankan(gameLoop);
            } else {
              // ================== LOGIKA BARU UNTUK JAWABAN SALAH ==================
              Swal.fire({
                title: "Salah!",
                text: `Jawaban yang benar adalah: ${originalCorrectAnswerText}`,
                icon: "error",
                confirmButtonText: "Coba Opsi Lain",
                allowOutsideClick: false,
              }).then(() => {
                // Kembali ke popup pilihan "Koin Habis"
                showContinueOrGameOverPopup();
              });
              // =====================================================================
            }
          }, 300); // Jeda singkat agar transisi mulus
        });
      });
    },
  }).then((result) => {
    // Jika pemain klik "Menyerah", kembali ke popup "Koin Habis"
    if (result.dismiss === Swal.DismissReason.cancel) {
      showContinueOrGameOverPopup();
    }
  });
}
// Logika untuk reset total game (dipisahkan dari popup)
function triggerFullReset() {
  game.level = 1;
  cumulativeScore = 0;
  game.score = 0;
  game.coinKehidupan = 5;
  game.aktif = true;
  isPaused = false;
  pauseIcon.innerText = "play_arrow";
  if (isSoundOn) {
    audio.play();
  }
  setAwal(true);
  jalankan(gameLoop);
}

// PERUBAHAN: Popup game selesai dengan callback untuk bagikan
function showGameCompletePopup(score) {
  Swal.fire({
    title: "Permainan Selesai!",
    icon: "success",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    html: `
        <p>Selamat, Anda telah menyelesaikan semua level!</p>
        <p>Total Skor Anda: <strong>${score}</strong></p>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
            <button id="swal-play-again" class="swal-btn swal-btn-resume">Main Lagi</button>
            <button id="swal-share" class="swal-btn" style="background-color:#9b59b6;">Bagikan Skor</button>
            <button id="swal-menu" class="swal-btn swal-btn-kembali">Kembali ke Menu</button>
        </div>
    `,
    didOpen: () => {
      document.getElementById("swal-play-again").onclick = () => {
        Swal.close();
        showLevelSelectionAfterGameComplete(score);
      };

      // Tombol Bagikan dengan Callback
      document.getElementById("swal-share").onclick = () => {
        Swal.close();
        generateScoreImageAndShare(score, "Final", () =>
          showGameCompletePopup(score)
        );
      };

      document.getElementById("swal-menu").onclick = () =>
        window.location.reload();
    },
  });
}

// Perubahan: Memperbaiki bug skor saat membatalkan pilihan level
function showLevelSelectionAfterGameComplete(finalScore) {
  const levelOptions = {};
  for (let i = 1; i <= game.level; i++) {
    levelOptions[i] = `Level ${i}`;
  }

  Swal.fire({
    title: "Pilih Level",
    input: "select",
    inputOptions: levelOptions,
    inputPlaceholder: "Pilih level",
    showCancelButton: true,
    confirmButtonText: "Mulai",
    cancelButtonText: "Batal",
  }).then((levelResult) => {
    if (levelResult.isConfirmed && levelResult.value) {
      const selectedLevel = parseInt(levelResult.value);
      cumulativeScore = 0;
      game.score = 0;
      game.level = selectedLevel;
      game.coinKehidupan = 5;
      game.aktif = true;
      ulangiPermainan(true);
    } else if (levelResult.dismiss === Swal.DismissReason.cancel) {
      // Perbaikan: Kembali ke popup selesai dengan skor yang benar
      showGameCompletePopup(finalScore);
    }
  });
}

function showSimulatedVideoAd() {
  // Ganti VIDEO_ID dengan ID video YouTube Anda
  const youtubeVideoId = "AL2LWAygVEw"; // Contoh: Rick Astley

  Swal.fire({
    title: "Iklan sedang diputar...",
    html: `
      <div class="simulated-ad-container">
        <iframe 
            class="simulated-video-placeholder" 
            src="https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeVideoId}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
        
        <div class="simulated-progress-bar">
          <div id="ad-progress" class="progress"></div>
        </div>
        <a href="https://rynnn10.github.io/gamesawit/" target="_blank" class="simulated-cta-btn">
          Mainkan Game!
        </a>
        <button id="close-ad-btn" class="simulated-close-btn" disabled>Tunggu 30 detik...</button>
      </div>
    `,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      // Logika timer dan tombol tetap sama, karena kita tidak benar-benar
      // memantau status video, hanya menunggu 5 detik.
      const closeBtn = document.getElementById("close-ad-btn");
      const progressBar = document.getElementById("ad-progress");
      let seconds = 30;
      let progress = 0;

      audio.pause();

      const adTimer = setInterval(() => {
        if (seconds > 0) {
          seconds--;
          progress = ((30 - seconds) / 30) * 100;
          progressBar.style.width = progress + "%";
          closeBtn.innerText = `Tunggu ${seconds} detik...`;
        } else {
          clearInterval(adTimer);
          closeBtn.innerText = "Tutup & Ambil Koin";
          closeBtn.disabled = false;
        }
      }, 1000);

      closeBtn.addEventListener("click", () => {
        Swal.close();
        Swal.fire({
          title: "Reward Diterima!",
          text: "Anda mendapatkan 1 koin kehidupan!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        game.coinKehidupan = 1;
        game.aktif = true;
        setAwal(false);
        jalankan(gameLoop);

        if (isSoundOn && !isPaused) {
          audio.play();
        }
      });
    },
  });
}

// PERUBAHAN: Fungsi "Bagikan Skor" di-upgrade untuk Web Share API & kembali ke popup sebelumnya
async function generateScoreImageAndShare(score, level, reopenPopupCallback) {
  Swal.fire({
    title: "Membuat gambar skor...",
    text: "Mohon tunggu sebentar.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;

  const bgImage = dataGambar.bgscore;

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  try {
    const charImagePath = {
      1: "assets/Idle.png",
      2: "assets/Idle2.png",
      3: "assets/Idle3.png",
    };
    const loadedCharImage = await loadImage(charImagePath[selectedCharacterId]);

    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    const charSpriteWidth = 32;
    const charSpriteHeight = 32;
    const scale = 6;
    ctx.drawImage(
      loadedCharImage,
      0,
      0,
      charSpriteWidth,
      charSpriteHeight,
      100,
      220,
      charSpriteWidth * scale,
      charSpriteHeight * scale
    );

    ctx.font = "bold 50px 'Press Start 2P'";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    const levelText =
      level === "Final" ? "Game Selesai!" : `Level ${level} Selesai!`;
    const scoreText = `Skor Akhir: ${score}`;
    ctx.strokeText(levelText, canvas.width / 2, 180);
    ctx.fillText(levelText, canvas.width / 2, 180);
    ctx.font = "40px 'Press Start 2P'";
    ctx.strokeText(scoreText, canvas.width / 2, 450);
    ctx.fillText(scoreText, canvas.width / 2, 450);

    // Konversi canvas ke file untuk Web Share API
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    const file = new File([blob], "momo-games-skor.png", { type: "image/png" });
    const shareData = {
      title: "Skor Game Momo!",
      text: `Aku mendapatkan skor ${score} di Momo Games!`,
      files: [file],
    };

    Swal.close();

    // Cek apakah Web Share API didukung
    if (navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Jika pengguna membatalkan dialog share, tidak terjadi apa-apa
        console.log("Share dibatalkan oleh pengguna.", err);
      }
    } else {
      // Fallback: unduh gambar jika tidak bisa share
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `momo-games-skor.png`;
      link.click();
      Swal.fire(
        "Gambar Diunduh",
        "Anda sekarang dapat membagikannya secara manual.",
        "success"
      );
    }
  } catch (error) {
    Swal.fire("Error", "Gagal membuat gambar: " + error, "error");
  } finally {
    // Selalu panggil callback untuk membuka kembali popup sebelumnya
    if (typeof reopenPopupCallback === "function") {
      reopenPopupCallback();
    }
  }
}
