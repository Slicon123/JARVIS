# Tugas 1 Mat Log — teks salin HVS

Isi file ini persis yang ditulis di kertas. Tidak ada catatan pribadi di sini —
penjelasan ada di [tugas-1-jawaban.md](tugas-1-jawaban.md).

Pojok kanan atas lembar pertama:

```
DB103A – Matematika Logika
NIM   : ..........
Nama  : Bryan Putra ..........
```

---

## No. 1

Diketahui:
S = {0,1,2,3,4,5,6,7,8,9}
P = {0,2,4,6}
Q = {a,b,c}
R = {0,1,3,4,10,11}
Misal semesta U = S

Ditanya:
a) Kardinalitas tiap himpunan
b) S ∩ R
c) P ∪ R
d) P' ∩ S

Jawab:

a) Rumus: |A| = banyaknya anggota A
|S| = 10
|P| = 4
|Q| = 3
|R| = 6

b) S ∩ R = anggota yang ada di S dan di R
S ∩ R = {0, 1, 3, 4}
|S ∩ R| = 4

c) P ∪ R = semua anggota P dan R
P ∪ R = {0, 1, 2, 3, 4, 6, 10, 11}
|P ∪ R| = 8

d) Langkah 1: P' = S − P
P' = {0,1,2,3,4,5,6,7,8,9} − {0,2,4,6}
P' = {1, 3, 5, 7, 8, 9}

Langkah 2: P' ∩ S
P' ∩ S = {1,3,5,7,8,9} ∩ {0,1,2,3,4,5,6,7,8,9}
P' ∩ S = {1, 3, 5, 7, 8, 9}

---

## No. 2

Diketahui:
M = suka mouse, |M| = 32
T = suka touch screen, |T| = 20
K = suka keyboard, |K| = 45
|M ∩ K| = 15
|M ∩ T| = 7
|K ∩ T| = 10
|M ∩ K ∩ T| = 5

Ditanya:
a) Jumlah mahasiswa yang disurvey
b) Yang suka hanya satu jenis
c) Yang suka keyboard dan mouse tetapi tidak touch screen

Jawab:

[GAMBAR: diagram Venn 3 lingkaran M, K, T — isi tiap daerah dengan angka
dari tabel di bagian b]

a) Rumus:
|M ∪ K ∪ T| = |M| + |K| + |T| − |M∩K| − |M∩T| − |K∩T| + |M∩K∩T|

|M ∪ K ∪ T| = 32 + 45 + 20 − 15 − 7 − 10 + 5
            = 97 − 32 + 5
            = 70

Jadi jumlah mahasiswa yang disurvey = 70 mahasiswa.

b) Menghitung tiap daerah dari tengah ke luar:

Ketiganya          = 5
M ∩ K saja         = 15 − 5  = 10
M ∩ T saja         = 7 − 5   = 2
K ∩ T saja         = 10 − 5  = 5
M saja             = 32 − (10 + 2 + 5) = 15
K saja             = 45 − (10 + 5 + 5) = 25
T saja             = 20 − (2 + 5 + 5)  = 8

Hanya satu jenis = 15 + 25 + 8 = 48

Cek: 15 + 25 + 8 + 10 + 2 + 5 + 5 = 70 (sesuai jawaban a)

Jadi yang suka hanya satu jenis = 48 mahasiswa.

c) Keyboard dan mouse tetapi tidak touch screen
= |M ∩ K| − |M ∩ K ∩ T|
= 15 − 5
= 10

Jadi jawabannya 10 mahasiswa.

---

## No. 3

Diketahui:
Barisan aritmatika produksi kemeja
a = U₁ = 400 (Januari)
U₄ = 550 (April)
n = 12 bulan

Ditanya:
a) Beda (b)
b) Produksi bulan ke-12
c) Total produksi satu tahun

Jawab:

a) Rumus: Uₙ = a + (n − 1)b

U₄ = a + 3b
550 = 400 + 3b
3b = 150
b = 50

Jadi bedanya 50 kemeja per bulan.

b) U₁₂ = a + (12 − 1)b
U₁₂ = 400 + 11(50)
U₁₂ = 400 + 550
U₁₂ = 950

Jadi produksi bulan ke-12 = 950 kemeja.

c) Rumus: Sₙ = n/2 (a + Uₙ)

S₁₂ = 12/2 (400 + 950)
S₁₂ = 6 (1.350)
S₁₂ = 8.100

Jadi total produksi satu tahun = 8.100 kemeja.

---

## No. 4

Diketahui:
Deret aritmatika tabungan
a = U₁ = Rp 200.000
b = Rp 25.000
n = 2 tahun = 24 bulan

Ditanya:
Total seluruh tabungan setelah 24 bulan (S₂₄)

Jawab:

Rumus: Sₙ = n/2 (2a + (n − 1)b)

S₂₄ = 24/2 (2 × 200.000 + (24 − 1) × 25.000)
S₂₄ = 12 (400.000 + 23 × 25.000)
S₂₄ = 12 (400.000 + 575.000)
S₂₄ = 12 × 975.000
S₂₄ = 11.700.000

Jadi total tabungan setelah 2 tahun = Rp 11.700.000.

---

## No. 5

Diketahui:
A = himpunan mahasiswa di FTI

Syarat suatu relasi disebut fungsi:
1. Setiap anggota himpunan asal (A) harus punya pasangan
2. Pasangannya tepat satu (tunggal)

Ditanya:
Pemetaan mana yang merupakan fungsi pada A, beserta alasannya

Jawab:

a) Mahasiswa → NIM : FUNGSI
Setiap mahasiswa FTI pasti memiliki NIM (syarat 1 terpenuhi) dan hanya
memiliki satu NIM (syarat 2 terpenuhi). Fungsi ini bersifat injektif
karena tidak ada dua mahasiswa dengan NIM yang sama.

b) Mahasiswa → nomor HP : BUKAN FUNGSI
Ada mahasiswa yang tidak memiliki nomor HP, sehingga syarat 1 tidak
terpenuhi. Selain itu ada mahasiswa yang memiliki lebih dari satu nomor,
sehingga pasangannya tidak tunggal dan syarat 2 juga tidak terpenuhi.

c) Mahasiswa → dosen wali : FUNGSI
Setiap mahasiswa pasti memiliki dosen wali (syarat 1 terpenuhi) dan hanya
satu dosen wali (syarat 2 terpenuhi). Pemetaan ini bersifat many-to-one
karena satu dosen wali membimbing banyak mahasiswa, dan hal tersebut tetap
memenuhi definisi fungsi.

d) Mahasiswa → anaknya : BUKAN FUNGSI
Sebagian besar mahasiswa tidak memiliki anak, sehingga banyak anggota A
yang tidak punya pasangan (syarat 1 tidak terpenuhi). Mahasiswa yang
memiliki anak pun bisa lebih dari satu, sehingga syarat 2 juga tidak
terpenuhi.

Kesimpulan: yang merupakan fungsi adalah (a) dan (c).

---

## No. 6

Diketahui:
      ( 4  7 )
A  =  ( 2  6 )

Ditanya:
Invers A, lalu buktikan A × A⁻¹ = I

Jawab:

Langkah 1 — determinan
Rumus: det A = ad − bc
det A = (4)(6) − (7)(2)
det A = 24 − 14
det A = 10

Karena det A = 10 ≠ 0, maka A nonsingular dan memiliki invers.

Langkah 2 — invers
Rumus:
             1    (  d  −b )
A⁻¹  =  --------- ( −c   a )
          det A

              1  (  6  −7 )      (  3/5   −7/10 )
A⁻¹  =  ------- ( −2   4 )  =   ( −1/5    2/5  )
             10

Langkah 3 — pembuktian

              ( 4  7 )    1  (  6  −7 )
A × A⁻¹  =    ( 2  6 ) × --- ( −2   4 )
                          10

           1  ( (4)(6) + (7)(−2)    (4)(−7) + (7)(4) )
        = --- ( (2)(6) + (6)(−2)    (2)(−7) + (6)(4) )
          10

           1  ( 24 − 14    −28 + 28 )
        = --- ( 12 − 12    −14 + 24 )
          10

           1  ( 10   0 )     ( 1  0 )
        = --- (  0  10 )  =  ( 0  1 )  =  I
          10

Terbukti A × A⁻¹ = I.

---

## No. 7

Diketahui:
      ( 2  1  4 )          ( 3  7 )
P  =  ( 0  5  1 )    Q  =  ( 1  0 )
      ( 3  2  6 )          ( 5  2 )

Ordo P = 3 × 3
Ordo Q = 3 × 2

Ditanya:
Hasil P × Q

Jawab:

Langkah 1 — cek syarat perkalian
Banyak kolom P = 3, banyak baris Q = 3, keduanya sama sehingga perkalian
terdefinisi. Ordo hasil = 3 × 2.

Langkah 2 — kalikan baris P dengan kolom Q
Rumus: cᵢⱼ = baris ke-i dari P dikali kolom ke-j dari Q

c₁₁ = (2)(3) + (1)(1) + (4)(5) = 6 + 1 + 20 = 27
c₁₂ = (2)(7) + (1)(0) + (4)(2) = 14 + 0 + 8 = 22
c₂₁ = (0)(3) + (5)(1) + (1)(5) = 0 + 5 + 5 = 10
c₂₂ = (0)(7) + (5)(0) + (1)(2) = 0 + 0 + 2 = 2
c₃₁ = (3)(3) + (2)(1) + (6)(5) = 9 + 2 + 30 = 41
c₃₂ = (3)(7) + (2)(0) + (6)(2) = 21 + 0 + 12 = 33

Jawaban akhir:

          ( 27  22 )
P × Q  =  ( 10   2 )
          ( 41  33 )
