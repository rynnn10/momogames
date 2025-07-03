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

// Perubahan: Variabel untuk menyimpan pilihan karakter (1 atau 2)
let selectedCharacterId = 1;
// Perubahan: Variabel global untuk status suara
let isSoundOn = true;

var isPaused = false;
var audio = new Audio("sfx/backsound.mp3");
audio.autoplay = false;
audio.loop = true;

// --- Event Listener untuk Menu Utama ---
startButton.addEventListener("click", startGame);

// Perubahan: Event listener untuk tombol "Pilih Karakter"
charSelectButton.addEventListener("click", showCharacterSelectionPopup);

helpButtonMenu.addEventListener("click", () => {
  Swal.fire(
    "Bantuan",
    "Gunakan tombol panah di keyboard atau tombol di layar untuk bergerak. Tekan panah atas untuk melompat.",
    "question"
  );
});

infoButtonMenu.addEventListener("click", () => {
  Swal.fire({
    title: "Informasi Permainan",
    html: "<p>Ini adalah game platformer yang dibuat dengan HTML5 Canvas. Kumpulkan semua item dan capai bendera untuk menang!</p>",
    icon: "info",
    confirmButtonText: "Mengerti",
  });
});

// Perubahan: Fungsi baru untuk menampilkan popup pilihan karakter
function showCharacterSelectionPopup() {
  Swal.fire({
    title: "Pilih Karakter",
    html: `
     <div class="character-selector">
    <div class="char-option ${
      selectedCharacterId == 1 ? "selected" : ""
    }" data-char="1">
      <img src="assets/Jump.png" alt="Player 1">
    </div>
    <div class="char-option ${
      selectedCharacterId == 2 ? "selected" : ""
    }" data-char="2">
      <img src="assets/Jump2.png" alt="Player 2">
    </div>
    <div class="char-option ${
      selectedCharacterId == 3 ? "selected" : ""
    }" data-char="3">
      <img src="assets/Jump3.png" alt="Player 3">
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
  // game.level = 3;
  game.coinKehidupan = 5; // Perubahan: Atur jumlah koin kehidupan awal
  game.coinAnim = setSprite(dataGambar.coin, 32, 32); // Contoh ukuran frame 32x32, sesuaikan
  game.coinAnim.frameRate = 5; // Atur kecepatan animasi (frame per detik)

  setAwal();
  jalankan(gameLoop);
}

// --- Logika Tombol di Dalam Game ---
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
    willOpen: () => {
      const resumeButton = Swal.getPopup().querySelector("#swal-resume");
      const refreshButton = Swal.getPopup().querySelector("#swal-refresh");
      const infoButton = Swal.getPopup().querySelector("#swal-info");
      const kembaliButton = Swal.getPopup().querySelector("#swal-kembali");

      resumeButton.onclick = () => {
        togglePause();
      };

      refreshButton.onclick = () => {
        isPaused = false;
        pauseIcon.innerText = "play_arrow";
        Swal.close();

        if (game.level > 1) {
          game.score = cumulativeScore;
        } else {
          game.score = 0;
        }

        // Reset koin
        game.coinKehidupan = 5;

        ulangiPermainan(true);

        if (isSoundOn) {
          audio.play();
          musicIcon.innerText = "volume_up";
        }
      };

      infoButton.onclick = () => {
        Swal.fire({
          title: "Informasi Permainan",
          html: "<p>Selamat datang di Momo Games! Bantu Momo mengumpulkan semua buah dan mencapai bendera di setiap level. Hindari musuh dan rintangan di sepanjang jalan.</p>",
          icon: "info",
          confirmButtonText: "Mengerti",
        }).then(() => {
          togglePause();
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

// --- Fungsi Popup Lainnya ---

function showLevelCompletePopup(score) {
  // Cek jika pemain baru saja menyelesaikan Level 2
  if (game.level === 2) {
    showNextLevelPopup(score); // Panggil popup khusus untuk lanjut ke Level 3
    return; // Hentikan eksekusi di sini agar popup standar tidak muncul
  }

  // Untuk level lain (misal: Level 1), tampilkan popup standar
  Swal.fire({
    title: "Level Selesai!",
    html: `Skor Anda: <strong>${score}</strong>`,
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#4CAF50",
    confirmButtonText: "Lanjutkan",
    cancelButtonText: "Main Lagi",
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    if (result.isConfirmed) {
      // Aksi untuk tombol 'Lanjutkan'
      cumulativeScore = game.score;
      game.level++;
      game.coinKehidupan = 5;
      game.aktif = true;
      ulangiPermainan(true);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Aksi untuk tombol 'Main Lagi'
      if (game.level > 1) {
        game.score = cumulativeScore;
      } else {
        game.score = 0;
      }
      game.coinKehidupan = 5;
      game.aktif = true;
      ulangiPermainan(true);
    }
  });
}

function showNextLevelPopup(score) {
  Swal.fire({
    title: "Level 2 Selesai!",
    html: `Skor Anda: <strong>${score}</strong>. Siap untuk level terakhir?`,
    icon: "success",
    showCancelButton: false, // Tombol "Main Lagi" tidak relevan di sini
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Lanjut ke Level 3",
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    if (result.isConfirmed) {
      cumulativeScore = game.score;
      game.level = 3; // Langsung set ke level 3
      game.coinKehidupan = 5;
      game.aktif = true;
      ulangiPermainan(true);
    }
  });
}

// Fungsi untuk menampilkan popup pilihan saat koin habis
function showContinueOrGameOverPopup() {
  Swal.fire({
    title: "Koin Habis!",
    text: "Tonton iklan untuk mendapatkan 1 koin kehidupan?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Tonton Iklan",
    cancelButtonText: "Game Over",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("Memulai proses iklan...");

      // Cek apakah fungsi adBreak (dari AdSense) tersedia.
      if (typeof adBreak === "function") {
        console.log("adBreak terdeteksi, mencoba tampilkan iklan reward...");

        // INI ADALAH CARA YANG BENAR UNTUK GAME WEB
        adBreak({
          type: "reward", // Jenis iklan: rewarded
          name: "lanjutkan_permainan", // Nama penempatan (bisa apa saja)
          beforeAd: () => {
            // Game dijeda sebelum iklan muncul
            console.log("Iklan akan dimulai, game dijeda...");
            isPaused = true;
            audio.pause();
          },
          afterAd: () => {
            // Iklan selesai (berhasil atau tidak), game dilanjutkan
            console.log("Iklan selesai, game dilanjutkan...");
            isPaused = false;
            if (isSoundOn) {
              audio.play();
            }
          },
          adBreakDone: (placementInfo) => {
            // Fungsi ini dipanggil setelah iklan selesai
            console.log("Info status iklan:", placementInfo);

            // Cek apakah iklan berhasil ditonton (status 'rewarded')
            if (placementInfo.breakStatus === "rewarded") {
              console.log("Pemain mendapatkan reward!");
              game.coinKehidupan = 1; // Beri 1 koin
              ulangiPermainan(false); // Ulangi dari checkpoint terakhir
            } else {
              console.log("Iklan tidak selesai, tidak ada reward.");
              // Jika iklan tidak selesai, kembali ke popup pilihan
              showContinueOrGameOverPopup();
            }
          },
        });
      } else {
        // Ini adalah fallback jika script iklan diblokir oleh AdBlocker
        console.warn(
          "adBreak tidak terdeteksi! Cek apakah script iklan aktif atau terblokir."
        );
        // Untuk pengembangan, kita bisa anggap berhasil
        Swal.fire(
          "Simulasi Berhasil",
          "Anda mendapat 1 koin (mode dev).",
          "success"
        );
        game.coinKehidupan = 1;
        ulangiPermainan(false);
      }
    } else {
      // Pemain menekan "Game Over"
      console.log("Pemain memilih Game Over.");
      triggerFullReset(); // Memulai ulang seluruh permainan
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

function showGameCompletePopup(score) {
  Swal.fire({
    title: "Permainan Selesai!",
    html: `Selamat, Anda telah menyelesaikan semua level!<br><br>Total Skor Anda: <strong>${score}</strong>`,
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "#e74c3c",
    confirmButtonText: "Main Lagi",
    cancelButtonText: "Kembali ke Menu",
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    if (result.isConfirmed) {
      // Jika "Main Lagi" diklik, panggil fungsi pemilihan level
      game.score = 0;
      showLevelSelectionAfterGameComplete();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Jika "Kembali ke Menu" diklik, muat ulang halaman
      window.location.reload();
    }
  });
}

function showLevelSelectionAfterGameComplete() {
  const levelOptions = {};
  // Asumsikan game.level adalah level tertinggi yang telah diselesaikan
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
    cancelButtonText: "Batal", // Teks tombol batal
  }).then((levelResult) => {
    if (levelResult.isConfirmed && levelResult.value) {
      // Jika pemain memilih level dan menekan "Mulai"
      const selectedLevel = parseInt(levelResult.value);
      cumulativeScore = 0;
      game.score = 0;
      game.level = selectedLevel;

      // Reset koin & aktifkan game
      game.coinKehidupan = 5;
      game.aktif = true;

      ulangiPermainan(true);
    } else if (levelResult.dismiss === Swal.DismissReason.cancel) {
      // Kembali ke popup "Permainan Selesai"
      showGameCompletePopup(game.score);
    }
  });
}

/**
 * Fungsi ini adalah SIMULASI untuk menampilkan iklan.
 * Di Langkah 4, Anda akan mengganti isi fungsi ini dengan kode dari AdMob atau penyedia lain.
 * @param {object} callbacks - Berisi fungsi onSuccess dan onFailure.
 */
function tampilkanIklan(callbacks) {
  if (!window.admob) {
    console.error("AdMob SDK not loaded");
    if (callbacks.onFailure) callbacks.onFailure();
    return;
  }

  const rewardedAd = new admob.RewardedAd({
    adUnitId: "ca-app-pub-4141017093486303/7743385302",
  });

  rewardedAd.on("load", () => {
    rewardedAd.show();
  });

  rewardedAd.on("reward", (reward) => {
    if (callbacks.onSuccess) callbacks.onSuccess();
  });

  rewardedAd.on("error", (error) => {
    console.error("Ad error:", error);
    if (callbacks.onFailure) callbacks.onFailure();
  });

  rewardedAd.load();
}

// Fungsi untuk meminta data kuis dari API Gemini
async function getQuizFromGeminiAPI() {
  console.log("Meminta kuis dari API Gemini...");
  // Gunakan API key kosong karena Canvas akan secara otomatis menyediakan kunci API pada saat runtime.
  const apiKey = "AIzaSyDrVTUfdsdlQ5YnVcAzRYhQa-yj2WyBEp4";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  // Prompt untuk mendapatkan kuis dalam format JSON
  const prompt =
    'Berikan saya satu pertanyaan kuis pilihan ganda tentang pengetahuan alam. Formatnya harus JSON seperti ini: { "question": "pertanyaan", "options": ["a", "b", "c", "d"], "correctAnswer": index_jawaban_benar (0-3) }. Pastikan jawabannya selalu dalam bahasa Indonesia.';

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          question: { type: "STRING" },
          options: {
            type: "ARRAY",
            items: { type: "STRING" },
          },
          correctAnswer: { type: "NUMBER" },
        },
        required: ["question", "options", "correctAnswer"],
      },
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      const jsonString = result.candidates[0].content.parts[0].text;
      const quizData = JSON.parse(jsonString);

      // Validasi format kuis
      if (
        quizData &&
        quizData.question &&
        Array.isArray(quizData.options) &&
        typeof quizData.correctAnswer === "number"
      ) {
        return quizData;
      } else {
        console.error("Format kuis dari API tidak sesuai:", quizData);
        return null;
      }
    } else {
      console.error(
        "Respon API tidak memiliki kandidat atau konten yang diharapkan:",
        result
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching quiz from Gemini API:", error);
    return null;
  }
}

async function tampilkanKuis() {
  Swal.fire({
    title: "Jawab Kuis!",
    text: "Jawab pertanyaan ini dengan benar untuk mendapatkan 1 koin!",
    icon: "info",
    showConfirmButton: false, // Sembunyikan tombol OK bawaan
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(), // Tampilkan loading saat mengambil kuis
  });

  const kuis = await getQuizFromGeminiAPI();

  // Jika gagal mengambil kuis, beri tahu pemain dan reset game
  if (!kuis) {
    Swal.fire(
      "Gagal mendapatkan kuis",
      "Silakan mulai ulang permainan.",
      "error"
    );
    triggerFullReset();
    return;
  }

  // Buat tombol-tombol jawaban secara dinamis
  let optionsHtml = '<div class="quiz-options-container">';
  kuis.options.forEach((option, index) => {
    optionsHtml += `<button class="quiz-btn" data-index="${index}">${option}</button>`;
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
          const selectedIndex = parseInt(button.dataset.index);

          // Tutup popup kuis
          Swal.close();

          // Cek jawaban setelah popup ditutup
          setTimeout(() => {
            if (selectedIndex === kuis.correctAnswer) {
              // Jawaban BENAR
              Swal.fire("Benar!", "Anda mendapatkan 1 koin!", "success");
              game.coinKehidupan = 1;
              game.aktif = true;
              setAwal();
              jalankan(gameLoop);
            } else {
              // Jawaban SALAH
              Swal.fire(
                "Salah!",
                `Jawaban yang benar adalah: ${
                  kuis.options[kuis.correctAnswer]
                }`,
                "error"
              );
              triggerFullReset();
            }
          }, 300); // Jeda singkat agar transisi mulus
        });
      });
    },
  }).then((result) => {
    // Jika pemain klik "Menyerah"
    if (result.dismiss === Swal.DismissReason.cancel) {
      triggerFullReset();
    }
  });
}
