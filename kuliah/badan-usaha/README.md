# Badan Usaha di Indonesia — bahan ngajar kelompok

Materi presentasi kelompok untuk **Pengantar Manajemen dan Bisnis**, topik
*Pengertian dan Bentuk-Bentuk Badan Usaha di Indonesia*. Dirancang untuk sesi
**60 menit**, kelompok 3 orang.

**Interaksinya lisan semua.** Nggak ada kerja kelompok, kartu, kertas plano,
atau Kahoot. Kelas ikut lewat tanya pendapat, angkat tangan, dan angkat jari —
jadi nggak ada yang perlu diprint atau disiapkan di luar slide.

## Baca dengan urutan ini

| # | File | Untuk siapa | Kapan dibaca |
| --- | --- | --- | --- |
| 1 | [MATERI.md](MATERI.md) | Bertiga | Paling awal. Ini isinya — kuasai dulu sebelum lihat script. |
| 2 | [PANDUAN-NGAJAR.md](PANDUAN-NGAJAR.md) | Bryan terutama | Cara membawakan kelas, bukan isi materi. Bab 11 wajib dibaca — tanpa aktivitas, tanya-jawabnya yang jadi tulang punggung sesi. |
| 3 | [SCRIPT-NGAJAR.md](SCRIPT-NGAJAR.md) | Bertiga | Script kata-per-kata + pembagian tugas + susunan waktu. |
| 4 | `badan-usaha.pptx` | Yang pegang laptop | 38 slide, nomornya sama persis dengan yang disebut di script. |

## Pembagian materi

Rata bertiga, 15–16 menit materi masing-masing:

- **Anggota 2** — pengertian, badan usaha vs perusahaan, klasifikasi
- **Anggota 3** — perseorangan, firma, CV, PT, PT perorangan
- **Bryan** — koperasi, BUMN, BUMD, yayasan, cara memilih; plus membuka,
  memandu studi kasus, dan menutup

## Yang perlu disiapkan

Cuma laptop dan slide. Checklist lengkapnya di bagian bawah
[PANDUAN-NGAJAR.md](PANDUAN-NGAJAR.md).

## Catatan penting soal isi

Buku Solihin & Sucipto (2014) dan Brantas (2009) terbit sebelum UU Cipta Kerja.
Empat hal di buku itu sudah tidak berlaku — daftarnya ada di bagian paling atas
[MATERI.md](MATERI.md), lengkap dengan aturan penggantinya. Slide 20 dan 24
sengaja dibuat untuk meluruskan dua yang paling sering ditanya.

## Kalau slide-nya mau diubah

`slide-generator.js` adalah script pptxgenjs yang menghasilkan `badan-usaha.pptx`.
Ubah lewat script itu, jangan edit `.pptx`-nya langsung — kalau `.pptx` diedit
manual, perubahannya bakal ketiban waktu deck-nya diregenerasi.

```bash
npm install pptxgenjs
node slide-generator.js badan-usaha.pptx
```

> **`badan-usaha.pptx` di repo ini masih versi lama (33 slide, format 95 menit).**
> `slide-generator.js` sudah versi 60 menit (38 slide), tapi belum dijalankan
> karena Node.js belum terpasang di mesin tempat perubahan ini dibuat.
> **Jalankan dua perintah di atas dulu sebelum presentasi** — kalau tidak,
> nomor slide di script nggak akan cocok sama deck-nya.
