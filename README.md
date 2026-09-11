# pixel-commits — Manual GitHub Contribution Generator

Bikin commit backdate manual / acak biar contribution graph hijau, pakai data tanggal + jam yang kamu atur sendiri.

## Cara pakai

### 1. Hubungkan ke repo baru di GitHub

Kode ini harus sudah terhubung ke remote sebelum dijalankan. Cek dulu:

```bash
git remote -v
```

Kalau belum ada / mau ganti ke repo baru:

```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/REPO-BARU.git
git remote -v
```

### 2. Install dependency

```bash
npm install
```

### 3. Buka `index.html` di browser

Buka file `index.html` langsung di browser (double-click / drag ke browser).

### 4. Masukkan tanggal yang valid

Isi **start date** dan **end date** (contoh: `2022-01-01` s/d `2022-12-31`), lalu:

- Klik **Generate** untuk tampilkan grid.
- Klik **Reset** untuk hapus semua data.

### 5. Isi data

- **Manual:** klik kiri kotak = tambah 1 jam (`HH:MM`), klik kanan kotak = hapus tanggal itu.
- **Acak:** klik tombol **🎲 Random** untuk generate random otomatis (maksimal 4 commit/hari, ada bolong-bolongnya).

### 6. Download hasil

Klik tombol **Download .js**, kamu dapat file berisi:

```js
const MANUAL_COMMIT_DATA = {
    "2022-01-01": [
        "14:59"
    ],
    ...
};
```

### 7. Tambahkan export di file hasil download

Buka file hasil download, tambahkan **1 baris ini paling bawah**:

```js
module.exports = MANUAL_COMMIT_DATA;
```

Lalu simpan ke folder `data/`, contoh: `data/2022.js`.

> Tanpa baris ini `require()` di Node mengembalikan object kosong dan total commit jadi 0.

### 8. Sambungkan ke `index.js` (baris 35)

Ubah baris 35 di `index.js` agar menunjuk ke file datamu:

```js
const MANUAL_COMMIT_DATA = require("./data/2022.js");
```

### 9. Jalankan

```bash
node .
```

Script akan menulis `data.json` berulang, `git add` + `git commit --date=...` satu per satu sesuai data, lalu otomatis `push` di akhir. Tunggu sampai muncul `✅ SELESAI`.
