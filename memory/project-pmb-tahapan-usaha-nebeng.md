---
name: project-pmb-tahapan-usaha-nebeng
description: "Tugas PMB \"tahapan mengembangkan usaha\" (slide 6 materi Kewirausahaan) — ide aplikasi nebeng SeJalur untuk mahasiswa UKSW; Word 3 hlm + pustaka dibuat 20 Okt 2026, belum dikumpulkan"
metadata:
  node_type: memory
  type: project
  originSessionId: a0b38bf5-90f2-49d4-9c12-63648eddd551
  modified: 2026-10-20T07:44:48.170Z
---

Tugas dari materi presentasi kelompok lain, *Kewirausahaan dan Perannya bagi Pengembangan Usaha*
(file ada di Downloads). Slide 6 berisi 6 tahap: ide, analisis peluang, rencana bisnis, modal dan
sumber daya, operasional, evaluasi dan ekspansi. Tugasnya menerapkan **tahap 1–5** pada ide sendiri,
hanya di atas kertas, ditambah kelemahan idenya.

**Ide Bryan:** aplikasi nebeng ala Gojek tapi murah, karena pengemudinya mahasiswa yang memang
searah (rute dan jam kelas). Pemicunya bis kampus UKSW yang sedang **maintenance** (bukan mogok;
dia mengoreksi ini).

**Pilihan Bryan (20 Okt 2026):** format Word; khusus UKSW, motor + mobil; ringkas 2–3 halaman.
Tarif: ≤ 1 km Rp2.000, di atasnya lebih dari Rp2.000, batas atas Rp10–12 ribu per perjalanan.

**Isian yang aku tentukan sendiri (sebutkan kalau dia bertanya):** +Rp1.000/km motor dan +Rp1.500/km
per orang mobil; batas Rp10.000 untuk motor dan Rp12.000 untuk mobil; potongan aplikasi 8% (mengikuti
batas ojol sejak 1 Juli 2026); nama sementara "SeJalur"; modal awal ± Rp2,15 juta. Dokumen ditulis
atas nama Bryan saja, karena tidak jelas tugas ini individu atau kelompok.

**File:** `Kuliah\Semester 1\Pengantar Manajemen dan Bisnis\Tugas\Tahapan Usaha Nebeng\`. Di
`_Sumber\` ada `content.js` dan helper hasil salinan dari tugas Mitra Ojol. Spasinya 1,15 dengan
margin 3 cm, beda dari tugas sebelumnya, supaya muat. Rakit dengan `python tools.py assemble content.js build.js`.
Paket `docx` tidak terpasang global: jalankan `npm install docx@9.11.0` di scratchpad, lalu
`NODE_PATH=<scratch>/node_modules node build.js out.docx`, lalu `word_export.ps1`.

**Fakta yang sudah dicek:** ojol Zona I Rp2.000–2.500/km, minimum Rp8.000–10.000 untuk 4 km pertama
(KP 667/2022). Batas 8% tidak mengubah tarif zona (Bisnis.com, 13 Juli 2026). Pertalite Rp10.000/l
(16 Okt 2026). P2MW 2026 hingga Rp20 juta per kelompok, tapi sumbernya portal berita, bukan panduan
resmi. Lalu Pasal 138(3) UU 22/2009 dan UU 27/2022 PDP. Tidak ada berita online soal bis UKSW;
yang dipakai info dari Bryan sendiri.

Related: [[project-uksw-digital-business]], [[project-pmb-problem-solving-mitra-ojol]], [[feedback-ask-before-better-idea]]
