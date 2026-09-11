
// module.exports = MANUAL_COMMIT_DATA;
// tambahkan itu di akhir file pada data hasil generate tanggal

/**
 * =========================================
 * 🚀 GITHUB COMMIT MANUAL FULL CONTROL
 * =========================================
 * ✔ Tanggal manual
 * ✔ Jam manual
 * ✔ Jumlah commit manual
 * ✔ Bebas hari (Minggu / weekday)
 * ✔ Tidak ada random sama sekali
 *
 * Jalankan:
 *   npm install
 *   node index.js
 * =========================================
 */

const jsonfile = require("jsonfile");
const simpleGit = require("simple-git");
const moment = require("moment");

const path = "./data.json";

/**
 * =========================================
 * 📝 DATA DARI FILE EKSTERNAL
 * =========================================
 * Edit data di: ./data/2021.js
 * Format:
 * "YYYY-MM-DD": ["HH:mm", "HH:mm", ...]
 */
const MANUAL_COMMIT_DATA = require("./data/2026.js");
/**git pu
 * =========================================
 * 🔧 JANGAN UBAH BAGIAN BAWAH
 * =========================================
 */

const commits = [];

// Convert data manual → list commit
Object.entries(MANUAL_COMMIT_DATA).forEach(([date, times]) => {
  times.forEach((time, index) => {
    const commitDate = moment(
      `${date} ${time}`,
      "YYYY-MM-DD HH:mm"
    ).format();

    commits.push({
      date: commitDate,
      message: `Manual commit ${index + 1}/${times.length} - ${date}`,
    });
  });
});

console.log("=========================================");
console.log("🚀 MANUAL GITHUB COMMIT GENERATOR");
console.log("=========================================");
console.log(`📊 Total commit : ${commits.length}`);
console.log("⏳ Memulai proses commit...\n");

const processCommits = (commits) => {
  let index = 0;
  let success = 0;
  let failed = 0;

  const next = () => {
    if (index >= commits.length) {
      console.log("\n=========================================");
      console.log("✅ SELESAI");
      console.log("=========================================");
      console.log(`Berhasil : ${success}`);
      console.log(`Gagal    : ${failed}`);
      console.log(`Total    : ${commits.length}`);

      console.log("\n🚀 Push ke GitHub...");
      simpleGit()
        .push()
        .then(() => console.log("🎉 Push berhasil!"))
        .catch((err) => console.error("❌ Push gagal:", err.message));

      return;
    }

    const commit = commits[index];
    const data = {
      date: commit.date,
      message: commit.message,
    };

    jsonfile.writeFile(path, data, (err) => {
      if (err) {
        console.error("❌ Gagal menulis file:", err.message);
        failed++;
        index++;
        return next();
      }

      simpleGit()
        .add([path])
        .commit(commit.message, { "--date": commit.date }, (err) => {
          if (err) {
            console.error("❌ Commit gagal:", err.message);
            failed++;
          } else {
            console.log(
              `✅ ${index + 1}/${commits.length} → ${commit.date}`
            );
            success++;
          }

          index++;
          setTimeout(next, 100);
        });
    });
  };

  next();
};

// MULAI
processCommits(commits);
