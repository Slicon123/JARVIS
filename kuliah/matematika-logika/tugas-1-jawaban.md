# Tugas 1 — Matematika Logika (DB103A)

Materi: Pertemuan 2 (himpunan, fungsi, baris & deret, kardinalitas, matriks)
Dosen: Johannes R. Siahainenia, S.Si.
Disusun: 10 September 2026

## Petunjuk dari dosen

1. Kertas HVS A4/F4, pensil 2B.
2. Pojok kanan atas lembar pertama: kode + nama mata kuliah, NIM, nama lengkap.
3. Soal tidak perlu ditulis ulang.
4. Sistematis: diketahui — ditanya — rumus & langkah — jawaban akhir. Semua komponen ada nilainya, bukan cuma jawaban akhir.

> Bagian **Penjelasan** di bawah tiap nomor hanya catatan pribadi. Jangan ikut disalin ke kertas.

---

## Nomor 1

**Diketahui:**

- S = {0,1,2,3,4,5,6,7,8,9}
- P = {0,2,4,6}
- Q = {a,b,c}
- R = {0,1,3,4,10,11}

**Ditanya:** a) kardinal tiap himpunan, b) S ∩ R, c) P ∪ R, d) P' ∩ S

**Jawab:**

**a) Kardinalitas** — rumus: |A| = banyaknya elemen dalam A

- |S| = 10
- |P| = 4
- |Q| = 3
- |R| = 6

**b) S ∩ R** — irisan: elemen yang ada di S **dan** di R

S ∩ R = {0, 1, 3, 4}

(10 dan 11 ada di R tapi tidak ada di S, jadi tidak masuk)

|S ∩ R| = 4

**c) P ∪ R** — gabungan: semua elemen P dan R, yang kembar ditulis sekali

P ∪ R = {0, 1, 2, 3, 4, 6, 10, 11}

|P ∪ R| = 8

**d) P' ∩ S**

Misal: himpunan semesta U = S

Langkah 1 — cari P' (komplemen P terhadap semesta):

P' = S − P = {0,1,2,3,4,5,6,7,8,9} − {0,2,4,6} = **{1, 3, 5, 7, 8, 9}**

Langkah 2 — iriskan dengan S:

P' ∩ S = {1,3,5,7,8,9} ∩ S = **{1, 3, 5, 7, 8, 9}**

> **Penjelasan:** Karena P' diambil dari dalam S, semua anggota P' otomatis anggota S (P' ⊆ S), jadi irisannya balik ke P' sendiri. Tetap tulis dua langkah supaya proses kelihatan. Baris "Misal: U = S" itu penting — soal tidak menyebut semestanya, dan R punya elemen 10 & 11 di luar S. Kalau semesta dianggap S ∪ R pun jawaban akhirnya sama persis, karena langkah ∩ S akan membuang 10 dan 11. Q sengaja dikasih sebagai pengecoh: isinya huruf, tidak dipakai di b–d.

---

## Nomor 2

**Diketahui:**

- M = himpunan suka *mouse*, |M| = 32
- T = himpunan suka *touch screen*, |T| = 20
- K = himpunan suka *keyboard*, |K| = 45
- |M ∩ K| = 15
- |M ∩ T| = 7
- |K ∩ T| = 10
- |M ∩ K ∩ T| = 5

**Ditanya:** a) total mahasiswa disurvey, b) yang suka hanya satu jenis, c) suka keyboard & mouse tapi tidak touch screen

**Jawab:**

**a) Total mahasiswa = |M ∪ K ∪ T|**

Rumus: |M ∪ K ∪ T| = |M| + |K| + |T| − |M∩K| − |M∩T| − |K∩T| + |M∩K∩T|

```
= 32 + 45 + 20 − 15 − 7 − 10 + 5
= 97 − 32 + 5
= 70 mahasiswa
```

**b) Hanya satu jenis** — pecah tiap daerah Venn dari tengah keluar:

| Daerah | Perhitungan | Hasil |
|---|---|---|
| Ketiganya | diketahui | 5 |
| M ∩ K saja | 15 − 5 | 10 |
| M ∩ T saja | 7 − 5 | 2 |
| K ∩ T saja | 10 − 5 | 5 |
| M saja | 32 − (10+2+5) | 15 |
| K saja | 45 − (10+5+5) | 25 |
| T saja | 20 − (2+5+5) | 8 |

Hanya satu jenis = 15 + 25 + 8 = **48 mahasiswa**

*(Cek: 15+25+8+10+2+5+5 = 70 ✓ cocok dengan jawaban a)*

**c) Keyboard dan mouse tapi TIDAK touch screen**

= |M ∩ K| − |M ∩ K ∩ T| = 15 − 5 = **10 mahasiswa**

> **Penjelasan:** Kuncinya: angka "15 orang suka mouse dan keyboard" sudah **termasuk** 5 orang yang suka ketiganya. Kalau mau yang murni dua-duanya saja, kurangi bagian tengah. Prinsip sama dipakai di rumus a — irisan dikurangi (kehitung dobel), lalu bagian tengah ditambah balik (kehitung 3x, dikurangi 3x, jadi hilang). Gambar diagram Venn tiga lingkaran di kertas dan isi angka tiap daerah: itu nilai langkah pengerjaan, sekaligus bikin b dan c ketahuan langsung. Asumsi standar: semua yang disurvey suka minimal satu alat (tanpa ini soal a tidak bisa dijawab). Tidak perlu ditulis.

---

## Nomor 3

**Diketahui:** Barisan aritmatika produksi kemeja

- U₁ = a = 400 (Januari)
- U₄ = 550 (April)
- n = 12 (satu tahun)

**Ditanya:** a) beda (b), b) U₁₂, c) S₁₂

**Jawab:**

**a) Mencari beda**

Rumus: Uₙ = a + (n−1)b

```
U₄  = a + 3b
550 = 400 + 3b
3b  = 150
b   = 50 kemeja/bulan
```

**b) Produksi bulan ke-12 (Desember)**

```
U₁₂ = a + (12−1)b
U₁₂ = 400 + 11(50)
U₁₂ = 400 + 550
U₁₂ = 950 kemeja
```

**c) Total produksi satu tahun**

Rumus: Sₙ = n/2 (a + Uₙ)

```
S₁₂ = 12/2 (400 + 950)
S₁₂ = 6 (1.350)
S₁₂ = 8.100 kemeja
```

> **Penjelasan:** Januari = suku ke-1, April = suku ke-4, jadi jaraknya **3** langkah beda, bukan 4. Ini kesalahan paling sering. Di c aku pakai Sₙ = n/2(a + Uₙ) karena U₁₂ sudah ketemu di b. Boleh juga Sₙ = n/2(2a + (n−1)b) = 6(800 + 550) = 8.100 — hasilnya sama.

---

## Nomor 4

**Diketahui:** Deret aritmatika tabungan

- a = U₁ = Rp 200.000
- b = Rp 25.000
- n = 2 tahun = 24 bulan

**Ditanya:** Total tabungan setelah 24 bulan (S₂₄)

**Jawab:**

Rumus: Sₙ = n/2 (2a + (n−1)b)

```
S₂₄ = 24/2 (2 × 200.000 + (24−1) × 25.000)
S₂₄ = 12 (400.000 + 23 × 25.000)
S₂₄ = 12 (400.000 + 575.000)
S₂₄ = 12 × 975.000
S₂₄ = Rp 11.700.000
```

> **Penjelasan:** Yang ditanya "total seluruh tabungan" — artinya **deret** (dijumlah), bukan barisan (tabungan bulan ke-24 saja, yang cuma Rp 775.000). Konversi 2 tahun → 24 bulan wajib ditulis di bagian diketahui, karena b-nya per bulan.

---

## Nomor 5

**Diketahui:** A = himpunan mahasiswa di FTI

Syarat sebuah relasi disebut fungsi:

1. Semua anggota himpunan asal (A) **harus punya** pasangan
2. Pasangannya **tunggal** (tepat satu)

**Ditanya:** Pemetaan mana yang merupakan fungsi pada A + alasannya

**Jawab:**

**a) Mahasiswa → NIM: FUNGSI ✓**
Setiap mahasiswa FTI pasti punya NIM (syarat 1 ✓) dan hanya punya satu NIM (syarat 2 ✓). Bahkan bersifat **injektif**, karena tidak ada dua mahasiswa dengan NIM sama.

**b) Mahasiswa → nomor HP: BUKAN FUNGSI ✗**
Melanggar dua syarat sekaligus: ada mahasiswa yang tidak punya HP (syarat 1 gagal), dan ada yang punya lebih dari satu nomor sehingga pasangannya tidak tunggal (syarat 2 gagal).

**c) Mahasiswa → dosen wali: FUNGSI ✓**
Setiap mahasiswa pasti dapat dosen wali (syarat 1 ✓) dan hanya satu dosen wali (syarat 2 ✓). Sifatnya **many-to-one**, karena satu dosen wali membimbing banyak mahasiswa — dan itu tetap sah sebagai fungsi.

**d) Mahasiswa → anaknya: BUKAN FUNGSI ✗**
Sebagian besar mahasiswa tidak punya anak, jadi banyak anggota A tidak punya pasangan (syarat 1 gagal). Yang punya anak pun bisa lebih dari satu (syarat 2 gagal).

**Kesimpulan: yang merupakan fungsi adalah (a) dan (c).**

> **Penjelasan:** Ini soal "gambar mana yang fungsi" dari slide Pertemuan 2, dibungkus cerita. Yang bikin gagal cuma dua: **ada yang tidak punya panah** (syarat 1) atau **ada yang punya lebih dari satu panah** (syarat 2). Banyak orang salah di (c) — dikira bukan fungsi karena satu dosen dipakai banyak mahasiswa. Padahal yang dilarang itu satu *mahasiswa* punya banyak dosen wali, bukan sebaliknya; kodomain boleh dipakai berulang. Nomor (b) memang paling debatable, tapi "bukan fungsi" yang dimaksud dosen — kalau HP dianggap fungsi, opsi (b) jadi kembar dengan (a) dan tidak ada gunanya dipisah.

---

## Nomor 6

**Diketahui:**

```
A = ( 4  7 )
    ( 2  6 )
```

**Ditanya:** A⁻¹, lalu buktikan A × A⁻¹ = I

**Jawab:**

**Langkah 1 — cari determinan**

Rumus: det A = ad − bc

```
det A = (4)(6) − (7)(2) = 24 − 14 = 10
```

Karena det A = 10 ≠ 0, matriks A **nonsingular** (punya invers).

**Langkah 2 — cari invers**

Rumus:

```
A⁻¹ = 1/det A ( d  −b )
              ( −c   a )
```

```
A⁻¹ = 1/10 ( 6  −7 )  =  ( 3/5   −7/10 )
           ( −2   4 )     ( −1/5   2/5  )
```

**Langkah 3 — pembuktian A × A⁻¹ = I**

```
A × A⁻¹ = ( 4  7 ) × 1/10 ( 6  −7 )
          ( 2  6 )        ( −2   4 )

        = 1/10 ( (4)(6)+(7)(−2)   (4)(−7)+(7)(4) )
               ( (2)(6)+(6)(−2)   (2)(−7)+(6)(4) )

        = 1/10 ( 24−14   −28+28 )
               ( 12−12   −14+24 )

        = 1/10 ( 10   0 )
               (  0  10 )

        = ( 1  0 )  = I   (terbukti)
          ( 0  1 )
```

> **Penjelasan:** Pola inversnya: **diagonal utama ditukar** (4 dan 6 tukar tempat), **diagonal sekunder dikasih tanda minus** (7 → −7, 2 → −2, tetap di posisinya), lalu semua dibagi determinan. Saran: biarkan 1/10 sebagai faktor di depan waktu pembuktian — jauh lebih rapi daripada menghitung pakai 0,6 dan −0,7.

---

## Nomor 7

**Diketahui:**

```
P = ( 2  1  4 )        Q = ( 3  7 )
    ( 0  5  1 )            ( 1  0 )
    ( 3  2  6 )            ( 5  2 )
```

Ordo P = 3×3, ordo Q = 3×2

**Ditanya:** Hasil P × Q

**Jawab:**

**Langkah 1 — cek syarat perkalian**

Kolom P (3) = baris Q (3) ✓ → perkalian terdefinisi

Ordo hasil: 3×3 dikali 3×2 = **3×2**

**Langkah 2 — kalikan baris P dengan kolom Q**

```
c₁₁ = (2)(3) + (1)(1) + (4)(5) = 6 + 1 + 20 = 27
c₁₂ = (2)(7) + (1)(0) + (4)(2) = 14 + 0 + 8 = 22

c₂₁ = (0)(3) + (5)(1) + (1)(5) = 0 + 5 + 5 = 10
c₂₂ = (0)(7) + (5)(0) + (1)(2) = 0 + 0 + 2 = 2

c₃₁ = (3)(3) + (2)(1) + (6)(5) = 9 + 2 + 30 = 41
c₃₂ = (3)(7) + (2)(0) + (6)(2) = 21 + 0 + 12 = 33
```

**Jawaban akhir:**

```
P × Q = ( 27  22 )
        ( 10   2 )
        ( 41  33 )
```

> **Penjelasan:** Ordo hasil selalu diambil dari **angka luar**: (3×**3**) × (**3**×2) → dua angka tengah harus sama (itu syaratnya), dua angka luar jadi ordo hasil → 3×2. Cara ingat indeksnya: cᵢⱼ = baris ke-**i** dari P dikali kolom ke-**j** dari Q. Jadi c₃₂ artinya baris 3 dari P (3, 2, 6) ketemu kolom 2 dari Q (7, 0, 2).

---

## Checklist sebelum dikumpulkan

- [ ] Header pojok kanan atas: DB103A – Matematika Logika, NIM, nama lengkap
- [ ] Pensil 2B, kertas HVS A4/F4
- [ ] Tiap nomor ada diketahui – ditanya – rumus/langkah – jawaban akhir
- [ ] No. 2 disertai gambar diagram Venn tiga lingkaran
- [ ] No. 1d ada baris "Misal: U = S"
- [ ] Soal tidak ditulis ulang
