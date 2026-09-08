---
name: project-badan-usaha-teaching
description: "Bahan mengajar kelompok Bryan tentang badan usaha di Indonesia untuk Pengantar Manajemen dan Bisnis — di mana filenya dan apa isinya"
metadata:
  node_type: memory
  type: project
---

Bryan dapat tugas kelompok (3 orang) untuk **mengajar** kelas Pengantar Manajemen
dan Bisnis, topik *Pengertian dan Bentuk-Bentuk Badan Usaha di Indonesia*.
Bahannya dibuat 8 September 2026 dan ada di **`kuliah/badan-usaha/` di branch
`main`** — cukup `git pull`, tidak perlu pindah branch.

Isinya lima file: `README.md` (indeks), `MATERI.md` (materi lengkap),
`PANDUAN-NGAJAR.md` (cara membawakan kelas), `SCRIPT-NGAJAR.md` (script
kata-per-kata + pembagian tugas + susunan waktu), `badan-usaha.pptx`, dan
`slide-generator.js` (script pptxgenjs yang menghasilkan deck itu).

**Formatnya diubah 8 September 2026 atas permintaan Bryan: sesi 60 menit,
interaksi lisan saja.** Semua aktivitas fisik dibuang — tidak ada kerja
kelompok, kartu sortir, kartu studi kasus, kertas plano, kuis Kahoot, atau
latihan bertiga pakai stopwatch. Kelas ikut lewat tanya pendapat, angkat tangan,
dan angkat jari 1–4. Studi kasus tetap ada tapi dibacakan lisan dan dijawab
kelas, bukan dikerjakan berkelompok. Kuis 12 soal jadi 3 pertanyaan penutup.
Tidak ada yang perlu diprint.

**Peran Bryan: host + materi Koperasi/BUMN/BUMD/Yayasan dan cara memilih bentuk**
(±15 menit materi, ±27 menit total di depan karena dia juga membuka, memandu
studi kasus, dan menutup). Porsi materi rata bertiga 15–16 menit — dia minta
porsinya dinaikkan setelah peran fasilitator hilang bersama aktivitasnya.

**Why:** Materi ini menyentuh dasar hukum, dan buku referensi kelompoknya
(Solihin & Sucipto 2014, Brantas 2009) terbit sebelum UU Cipta Kerja. Empat hal
di buku itu sudah tidak berlaku dan sudah diverifikasi ulang saat pembuatan:
modal dasar PT tidak lagi minimum Rp50 juta (PP 8/2021), ada bentuk baru
Perseroan Perorangan untuk 1 orang (PP 8/2021), koperasi primer minimal 9 orang
bukan 20, dan UU BUMN 19/2003 sudah diubah oleh UU 1/2025 yang membentuk BPI
Danantara. Daftar lengkapnya ada di bagian paling atas `MATERI.md`.

**How to apply:** Kalau Bryan menyinggung tugas ini lagi, arahkan ke folder di
atas, jangan bikin ulang materinya. Kalau dia minta perubahan slide, edit
`slide-generator.js` lalu regenerasi — jangan edit `.pptx`-nya lewat kode.

**Yang masih tertunggak:** `badan-usaha.pptx` di repo masih deck lama (33 slide,
format 95 menit). `slide-generator.js` sudah versi 60 menit (38 slide) tapi belum
dijalankan karena **Node.js belum terpasang di mesin Bryan**. Sebelum presentasi
dia harus `npm install pptxgenjs` lalu `node slide-generator.js badan-usaha.pptx`
— kalau tidak, nomor slide di script tidak cocok dengan deck-nya. File memory ini
boleh dihapus setelah presentasinya lewat.

Related: [[project-uksw-digital-business]], [[user-bryan-profile]]
