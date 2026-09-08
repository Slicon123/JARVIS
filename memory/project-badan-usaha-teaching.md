---
name: project-badan-usaha-teaching
description: "Bahan mengajar kelompok Bryan tentang badan usaha di Indonesia untuk Pengantar Manajemen dan Bisnis — di mana filenya dan apa isinya"
metadata:
  node_type: memory
  type: project
---

Bryan dapat tugas kelompok (3 orang) untuk **mengajar** kelas Pengantar Manajemen
dan Bisnis, topik *Pengertian dan Bentuk-Bentuk Badan Usaha di Indonesia*, slot
90+ menit. Bahannya dibuat 8 September 2026 dan ada di repo ini.

**Lokasi:** `kuliah/badan-usaha/` di branch
`claude/badan-usaha-indonesia-teaching-q6hilu` — **belum di-merge ke main**.
Untuk membukanya di VS Code:

```
git fetch origin claude/badan-usaha-indonesia-teaching-q6hilu
git checkout claude/badan-usaha-indonesia-teaching-q6hilu
```

Isinya lima file: `README.md` (indeks), `MATERI.md` (materi lengkap),
`PANDUAN-NGAJAR.md` (cara membawakan kelas), `SCRIPT-NGAJAR.md` (script
kata-per-kata + pembagian tugas + lampiran yang harus diprint),
`badan-usaha.pptx` (33 slide), dan `slide-generator.js` (script pptxgenjs yang
menghasilkan deck itu — jalankan `npm install pptxgenjs` lalu
`node slide-generator.js badan-usaha.pptx` kalau slide-nya mau diregenerasi).

**Peran Bryan di kelompok: Host & Fasilitator** — pembuka, semua instruksi
aktivitas, materi Koperasi/BUMN/BUMD, kuis, penutup. Dipilih begitu karena dia
bilang jarang mengajar, dan peran ini paling banyak tampil tapi paling sedikit
hafalan.

**Why:** Materi ini menyentuh dasar hukum, dan buku referensi kelompoknya
(Solihin & Sucipto 2014, Brantas 2009) terbit sebelum UU Cipta Kerja. Empat hal
di buku itu sudah tidak berlaku dan sudah diverifikasi ulang saat pembuatan:
modal dasar PT tidak lagi minimum Rp50 juta (PP 8/2021), ada bentuk baru
Perseroan Perorangan untuk 1 orang (PP 8/2021), koperasi primer minimal 9 orang
bukan 20, dan UU BUMN 19/2003 sudah diubah oleh UU 1/2025 yang membentuk BPI
Danantara. Daftar lengkapnya ada di bagian paling atas `MATERI.md`.

**How to apply:** Kalau Bryan menyinggung tugas ini lagi, arahkan ke branch di
atas, jangan bikin ulang materinya. Kalau dia minta perubahan slide, edit
`slide-generator.js` lalu regenerasi — jangan edit `.pptx`-nya lewat kode.
Sebelum hari-H dia masih harus: print Lampiran A (6 set kartu sortir) dan
Lampiran B (6 kartu studi kasus), bikin kuis Kahoot dari Lampiran C, dan latihan
bertiga pakai stopwatch. File ini boleh dihapus setelah presentasinya lewat.

Related: [[project-uksw-digital-business]], [[user-bryan-profile]]
