# Tugas 2 Mat Log — teks salin HVS

Isi file ini persis yang ditulis di kertas. Tidak ada catatan pribadi di sini —
penjelasan ada di [tugas-2-jawaban.md](tugas-2-jawaban.md).

Pojok kanan atas lembar pertama:

```
DB103A – Matematika Logika
NIM   : ..........
Nama  : Bryan Putra ..........
```

---

## No. 1

Diketahui:
p : Kiko bisa berbahasa Inggris
q : Kiko bisa berbahasa Jerman
r : Kiko bisa berbahasa Perancis

Ditanya:
Terjemahkan kalimat majemuk a–e ke dalam notasi simbolik

Jawab:

a) "tetapi" = konjungsi (∧), "tidak Perancis" = ~r

   q ∧ ~r

b) "Inggris atau Jerman"                 = p ∨ q
   "tidak bisa Perancis atau Jerman"     = ~(r ∨ q)
   kedua bagian dihubungkan "atau"       = ∨

   (p ∨ q) ∨ ~(r ∨ q)

   Bentuk setara (De Morgan): (p ∨ q) ∨ (~r ∧ ~q)

c) "Tidak benar bahwa X" = negasi seluruh X

   ~(p ∨ r)

   Bentuk setara (De Morgan): ~p ∧ ~r

d) Isi dalam kurung: (p ∨ r) ∧ ~q, lalu dinegasikan seluruhnya

   ~((p ∨ r) ∧ ~q)

   Bentuk setara: ~(p ∨ r) ∨ q

e) "tidak Inggris, Perancis, maupun Jerman" = ~p ∧ ~r ∧ ~q,
   lalu dinegasikan seluruhnya

   ~(~p ∧ ~r ∧ ~q)

   Bentuk setara (De Morgan + negasi ganda): p ∨ r ∨ q

---

## No. 2

Diketahui:
Empat implikasi dalam bentuk kalimat.

Rumus:
Bentuk implikasi   : p → q
Ingkaran           : ~(p → q) ≡ p ∧ ~q
Konvers            : q → p
Kontraposisi       : ~q → ~p
Penerjemahan       : "A bilamana B" ≡ "A jika B" ≡ B → A
                     "A hanya jika B" ≡ A → B

Ditanya:
Ingkaran, konvers, dan kontraposisi dari tiap implikasi

Jawab:

a) Misal: p = ada kuis, q = saya masuk kuliah
   Bentuk: p → q

   Ingkaran (p ∧ ~q):
   "Ada kuis tetapi saya tidak masuk kuliah."

   Konvers (q → p):
   "Jika saya masuk kuliah, maka ada kuis."

   Kontraposisi (~q → ~p):
   "Jika saya tidak masuk kuliah, maka tidak ada kuis."

b) Misal: p = bilangan positif itu prima
          q = ia tidak mempunyai pembagi selain 1 dan dirinya sendiri
   Bentuk ("hanya jika"): p → q

   Ingkaran (p ∧ ~q):
   "Sebuah bilangan positif adalah prima, tetapi ia mempunyai pembagi
   selain 1 dan dirinya sendiri."

   Konvers (q → p):
   "Jika sebuah bilangan positif tidak mempunyai pembagi selain 1 dan
   dirinya sendiri, maka ia prima."

   Kontraposisi (~q → ~p):
   "Jika sebuah bilangan positif mempunyai pembagi selain 1 dan dirinya
   sendiri, maka ia bukan bilangan prima."

c) Misal: m = hari ini mendung, h = hari ini hujan, k = dia pergi ke kampus
   Syarat "tidak mendung maupun hujan" = ~m ∧ ~h
   Bentuk ("bilamana"): (~m ∧ ~h) → k

   Ingkaran ((~m ∧ ~h) ∧ ~k):
   "Hari ini tidak mendung maupun hujan, tetapi dia tidak pergi ke kampus."

   Konvers (k → (~m ∧ ~h)):
   "Jika dia pergi ke kampus, maka hari ini tidak mendung maupun hujan."

   Kontraposisi (~k → ~(~m ∧ ~h) ≡ ~k → (m ∨ h)):
   "Jika dia tidak pergi ke kampus, maka hari ini mendung atau hujan."

d) Misal: b = program itu bagus, s = waktu eksekusinya singkat,
          e = kebutuhan memorinya sedikit
   Bentuk ("hanya jika"): b → (s ∨ e)

   Ingkaran (b ∧ ~(s ∨ e) ≡ b ∧ ~s ∧ ~e):
   "Sebuah program bagus, tetapi waktu eksekusinya tidak singkat dan
   kebutuhan memorinya tidak sedikit."

   Konvers ((s ∨ e) → b):
   "Jika waktu eksekusi sebuah program singkat atau kebutuhan memorinya
   sedikit, maka program itu bagus."

   Kontraposisi (~(s ∨ e) → ~b ≡ (~s ∧ ~e) → ~b):
   "Jika waktu eksekusi sebuah program tidak singkat dan kebutuhan
   memorinya juga tidak sedikit, maka program itu tidak bagus."

---

## No. 3

Diketahui:
Empat proposisi majemuk (a–d)

Rumus:
Tabel kebenaran dasar ~, ∧, ∨, →
Prioritas operator: ~ , ∧ , ∨ , → , ↔
Banyak baris = 2ⁿ, n = jumlah variabel proposisional

Ditanya:
Tabel kebenaran untuk setiap proposisi

Jawab:

a) (~p ∨ ~q) ∨ p          n = 2, jadi 4 baris

   +---+---+----+----+---------+---------------+
   | p | q | ~p | ~q | ~p ∨ ~q | (~p ∨ ~q) ∨ p |
   +---+---+----+----+---------+---------------+
   | T | T | F  | F  |    F    |       T       |
   | T | F | F  | T  |    T    |       T       |
   | F | T | T  | F  |    T    |       T       |
   | F | F | T  | T  |    T    |       T       |
   +---+---+----+----+---------+---------------+

   Kolom terakhir semuanya T → TAUTOLOGI

b) ~(p ∧ q) ∧ (r ∧ ~p)    n = 3, jadi 8 baris

   +---+---+---+-------+----------+----+--------+---------------------+
   | p | q | r | p ∧ q | ~(p ∧ q) | ~p | r ∧ ~p | ~(p∧q) ∧ (r ∧ ~p)   |
   +---+---+---+-------+----------+----+--------+---------------------+
   | T | T | T |   T   |    F     | F  |   F    |          F          |
   | T | T | F |   T   |    F     | F  |   F    |          F          |
   | T | F | T |   F   |    T     | F  |   F    |          F          |
   | T | F | F |   F   |    T     | F  |   F    |          F          |
   | F | T | T |   F   |    T     | T  |   T    |          T          |
   | F | T | F |   F   |    T     | T  |   F    |          F          |
   | F | F | T |   F   |    T     | T  |   T    |          T          |
   | F | F | F |   F   |    T     | T  |   F    |          F          |
   +---+---+---+-------+----------+----+--------+---------------------+

   Ada T ada F → KONTINGENSI

c) (p ∨ q) → ~q           n = 2, jadi 4 baris

   +---+---+-------+----+--------------+
   | p | q | p ∨ q | ~q | (p ∨ q) → ~q |
   +---+---+-------+----+--------------+
   | T | T |   T   | F  |      F       |
   | T | F |   T   | T  |      T       |
   | F | T |   T   | F  |      F       |
   | F | F |   F   | T  |      T       |
   +---+---+-------+----+--------------+

   Ada T ada F → KONTINGENSI

d) (~q → p) → (p → q)     n = 2, jadi 4 baris

   +---+---+----+--------+-------+--------------------+
   | p | q | ~q | ~q → p | p → q | (~q → p) → (p → q) |
   +---+---+----+--------+-------+--------------------+
   | T | T | F  |   T    |   T   |         T          |
   | T | F | T  |   T    |   F   |         F          |
   | F | T | F  |   T    |   T   |         T          |
   | F | F | T  |   F    |   T   |         T          |
   +---+---+----+--------+-------+--------------------+

   Ada T ada F → KONTINGENSI

---

## No. 4

Diketahui:
Empat implikasi (a–d)

Rumus:
Sebuah proposisi majemuk disebut TAUTOLOGI bila kolom terakhir tabel
kebenarannya bernilai T untuk semua kombinasi nilai kebenaran.

Ditanya:
Tunjukkan dengan tabel kebenaran bahwa tiap implikasi adalah tautologi

Jawab:

a) ~p → (p → q)

   +---+---+----+-------+---------------+
   | p | q | ~p | p → q | ~p → (p → q)  |
   +---+---+----+-------+---------------+
   | T | T | F  |   T   |       T       |
   | T | F | F  |   F   |       T       |
   | F | T | T  |   T   |       T       |
   | F | F | T  |   T   |       T       |
   +---+---+----+-------+---------------+

   Semua baris bernilai T → TERBUKTI TAUTOLOGI

b) ~(p → q) → ~q

   +---+---+-------+----------+----+----------------+
   | p | q | p → q | ~(p → q) | ~q | ~(p → q) → ~q  |
   +---+---+-------+----------+----+----------------+
   | T | T |   T   |    F     | F  |       T        |
   | T | F |   F   |    T     | T  |       T        |
   | F | T |   T   |    F     | F  |       T        |
   | F | F |   T   |    F     | T  |       T        |
   +---+---+-------+----------+----+----------------+

   Semua baris bernilai T → TERBUKTI TAUTOLOGI

c) (p ∧ q) → (p → q)

   +---+---+-------+-------+--------------------+
   | p | q | p ∧ q | p → q | (p ∧ q) → (p → q)  |
   +---+---+-------+-------+--------------------+
   | T | T |   T   |   T   |         T          |
   | T | F |   F   |   F   |         T          |
   | F | T |   F   |   T   |         T          |
   | F | F |   F   |   T   |         T          |
   +---+---+-------+-------+--------------------+

   Semua baris bernilai T → TERBUKTI TAUTOLOGI

d) ((p → q) ∧ q) → q

   +---+---+-------+--------------+--------------------+
   | p | q | p → q | (p → q) ∧ q  | ((p → q) ∧ q) → q  |
   +---+---+-------+--------------+--------------------+
   | T | T |   T   |      T       |         T          |
   | T | F |   F   |      F       |         T          |
   | F | T |   T   |      T       |         T          |
   | F | F |   T   |      F       |         T          |
   +---+---+-------+--------------+--------------------+

   Semua baris bernilai T → TERBUKTI TAUTOLOGI

---

## No. 5

Diketahui:
(i)  (p ∧ q) → (p ∨ q)
(ii) (p ∧ (p → q)) → q

Rumus (hukum ekivalen logis yang dipakai):
Ekivalensi implikasi : a → b ≡ ~a ∨ b
Hukum De Morgan      : ~(a ∧ b) ≡ ~a ∨ ~b
Hukum negasi         : a ∨ ~a ≡ T ,  a ∧ ~a ≡ F
Hukum distributif    : a ∧ (b ∨ c) ≡ (a ∧ b) ∨ (a ∧ c)
Hukum identitas      : F ∨ a ≡ a
Hukum dominasi       : a ∨ T ≡ T
Hukum komutatif & asosiatif untuk ∨

Ditanya:
Tunjukkan (i) dan (ii) keduanya tautologi menggunakan hukum-hukum ekivalen logis

Jawab:

(i)  (p ∧ q) → (p ∨ q)
   ≡ ~(p ∧ q) ∨ (p ∨ q)          (ekivalensi implikasi)
   ≡ (~p ∨ ~q) ∨ (p ∨ q)         (hukum De Morgan)
   ≡ (~p ∨ p) ∨ (~q ∨ q)         (hukum komutatif & asosiatif)
   ≡ T ∨ T                       (hukum negasi: a ∨ ~a ≡ T)
   ≡ T                           (hukum dominasi)

   Hasil akhirnya T → (i) adalah TAUTOLOGI

(ii) (p ∧ (p → q)) → q
   ≡ (p ∧ (~p ∨ q)) → q          (ekivalensi implikasi pada p → q)
   ≡ ((p ∧ ~p) ∨ (p ∧ q)) → q    (hukum distributif)
   ≡ (F ∨ (p ∧ q)) → q           (hukum negasi: a ∧ ~a ≡ F)
   ≡ (p ∧ q) → q                 (hukum identitas)
   ≡ ~(p ∧ q) ∨ q                (ekivalensi implikasi)
   ≡ (~p ∨ ~q) ∨ q               (hukum De Morgan)
   ≡ ~p ∨ (~q ∨ q)               (hukum asosiatif)
   ≡ ~p ∨ T                      (hukum negasi: a ∨ ~a ≡ T)
   ≡ T                           (hukum dominasi)

   Hasil akhirnya T → (ii) adalah TAUTOLOGI
