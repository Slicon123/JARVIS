# Tugas 2 — Matematika Logika (DB103A)

Materi: Pertemuan 3 & 4 (pernyataan/proposisi, penghubung, tautologi–kontradiksi–kontingensi, ekivalen)
Dosen: Johannes R. Siahainenia, S.Si.
Disusun: 16 September 2026

## Petunjuk dari dosen

1. Kertas HVS A4/F4, pensil 2B.
2. Pojok kanan atas lembar pertama: kode + nama mata kuliah, NIM, nama lengkap.
3. Soal tidak perlu ditulis ulang.
4. Sistematis: diketahui — ditanya — rumus & langkah — jawaban akhir. Semua komponen ada nilainya, bukan cuma jawaban akhir.

> Bagian **Penjelasan** di bawah tiap nomor hanya catatan pribadi. Jangan ikut disalin ke kertas.

---

## Nomor 1

**Diketahui:**

- p : Kiko bisa berbahasa Inggris
- q : Kiko bisa berbahasa Jerman
- r : Kiko bisa berbahasa Perancis

**Ditanya:** terjemahkan kalimat a–e ke notasi simbolik.

**Jawab:**

**a) "Kiko bisa berbahasa Jerman tetapi tidak Bahasa Perancis."**

"tetapi" = konjungsi (∧); "tidak Perancis" = ~r

**q ∧ ~r**

**b) "Kiko bisa berbahasa Inggris atau Bahasa Jerman, atau tidak bisa berbahasa Perancis atau bahasa Jerman."**

Bagian 1: "bisa berbahasa Inggris atau Jerman" = p ∨ q
Bagian 2: "tidak bisa berbahasa Perancis atau bahasa Jerman" = ~(r ∨ q)
Kedua bagian dihubungkan "atau" = ∨

**(p ∨ q) ∨ ~(r ∨ q)**

Bentuk setara (De Morgan): (p ∨ q) ∨ (~r ∧ ~q)

**c) "Tidak benar bahwa Kiko bisa berbahasa Inggris atau bahasa Perancis."**

"Tidak benar bahwa X" = negasi seluruh X, jadi kurungnya wajib.

**~(p ∨ r)**

Bentuk setara (De Morgan): ~p ∧ ~r

**d) "Tidak benar bahwa Kiko bisa berbahasa Inggris atau bahasa Perancis tetapi tidak bahasa Jerman."**

Isi dalam kurung: "(Inggris atau Perancis) tetapi tidak Jerman" = (p ∨ r) ∧ ~q
Lalu dinegasikan seluruhnya.

**~((p ∨ r) ∧ ~q)**

Bentuk setara: ~(p ∨ r) ∨ q

**e) "Tidak benar bahwa Kiko tidak bisa berbahasa Inggris, Perancis, maupun Jerman."**

"tidak … maupun …" = ketiganya tidak bisa = ~p ∧ ~r ∧ ~q
Lalu dinegasikan seluruhnya.

**~(~p ∧ ~r ∧ ~q)**

Bentuk setara (De Morgan + negasi ganda): p ∨ r ∨ q

> **Penjelasan.** Kunci nomor ini ada di **letak tanda kurung**, bukan di operatornya.
> "Tidak benar bahwa X" selalu menegasikan **seluruh** X → tulis ~( … ).
> "tidak X maupun Y" artinya dua-duanya tidak → ~X ∧ ~Y.
> Untuk (b), frasa "tidak bisa berbahasa Perancis atau bahasa Jerman" aku baca
> sebagai negasi atas keduanya → ~(r ∨ q). Kalau dosen membacanya sebagai negasi
> masing-masing, jawabannya jadi (p ∨ q) ∨ (~r ∨ ~q). Bentuk yang aku tulis lebih
> aman karena kurungnya eksplisit.

---

## Nomor 2

**Diketahui:** empat implikasi dalam bentuk kalimat.

**Ditanya:** ingkaran, konvers, dan kontraposisi dari tiap implikasi.

**Rumus yang dipakai:**

- Bentuk implikasi: p → q
- Ingkaran: ~(p → q) ≡ **p ∧ ~q**
- Konvers: **q → p**
- Kontraposisi: **~q → ~p**
- Penerjemahan: "A **bilamana** B" ≡ "A **jika** B" ≡ **B → A** · "A **hanya jika** B" ≡ **A → B**

**Jawab:**

**a) "Saya masuk kuliah bilamana ada kuis."**

Misal: p = ada kuis · q = saya masuk kuliah
Bentuk: **p → q**

- Ingkaran (p ∧ ~q): "Ada kuis tetapi saya tidak masuk kuliah."
- Konvers (q → p): "Jika saya masuk kuliah, maka ada kuis."
- Kontraposisi (~q → ~p): "Jika saya tidak masuk kuliah, maka tidak ada kuis."

**b) "Sebuah bilangan positif hanya prima jika ia tidak mempunyai pembagi selain 1 dan dirinya sendiri."**

Misal: p = bilangan positif itu prima · q = ia tidak mempunyai pembagi selain 1 dan dirinya sendiri
Bentuk ("hanya jika"): **p → q**

- Ingkaran (p ∧ ~q): "Sebuah bilangan positif adalah prima, tetapi ia mempunyai pembagi selain 1 dan dirinya sendiri."
- Konvers (q → p): "Jika sebuah bilangan positif tidak mempunyai pembagi selain 1 dan dirinya sendiri, maka ia prima."
- Kontraposisi (~q → ~p): "Jika sebuah bilangan positif mempunyai pembagi selain 1 dan dirinya sendiri, maka ia bukan bilangan prima."

**c) "Dia pergi ke kampus bilamana hari ini tidak mendung maupun hujan."**

Misal: m = hari ini mendung · h = hari ini hujan · k = dia pergi ke kampus
Syaratnya "tidak mendung maupun hujan" = ~m ∧ ~h
Bentuk ("bilamana" → syarat jadi anteseden): **(~m ∧ ~h) → k**

- Ingkaran ((~m ∧ ~h) ∧ ~k): "Hari ini tidak mendung maupun hujan, tetapi dia tidak pergi ke kampus."
- Konvers (k → (~m ∧ ~h)): "Jika dia pergi ke kampus, maka hari ini tidak mendung maupun hujan."
- Kontraposisi (~k → ~(~m ∧ ~h) ≡ ~k → (m ∨ h)): "Jika dia tidak pergi ke kampus, maka hari ini mendung atau hujan."

**d) "Sebuah program dikatakan bagus hanya jika waktu eksekusinya singkat atau kebutuhan memorinya sedikit."**

Misal: b = program itu bagus · s = waktu eksekusinya singkat · e = kebutuhan memorinya sedikit
Bentuk ("hanya jika"): **b → (s ∨ e)**

- Ingkaran (b ∧ ~(s ∨ e) ≡ b ∧ ~s ∧ ~e): "Sebuah program bagus, tetapi waktu eksekusinya tidak singkat dan kebutuhan memorinya tidak sedikit."
- Konvers ((s ∨ e) → b): "Jika waktu eksekusi sebuah program singkat atau kebutuhan memorinya sedikit, maka program itu bagus."
- Kontraposisi (~(s ∨ e) → ~b ≡ (~s ∧ ~e) → ~b): "Jika waktu eksekusi sebuah program tidak singkat dan kebutuhan memorinya juga tidak sedikit, maka program itu tidak bagus."

> **Penjelasan.** Jebakan nomor ini ada di kata hubungnya, bukan di logikanya.
> **"bilamana"** = *whenever* = *jika* → yang di belakangnya jadi **anteseden**.
> **"hanya jika"** = *only if* → yang di depannya yang jadi **anteseden**. Persis kebalikannya.
> Kalau kebalik, konvers dan kontraposisi ikut salah semua, jadi tentukan p dan q dulu sebelum apa-apa.
> Untuk ingkaran, jangan tulis "Jika … maka …" — ingkaran implikasi **bukan** implikasi,
> tapi konjungsi: p ∧ ~q (slide Pertemuan 3 & 4, contoh ekivalen ~(p → q) ≡ p ∧ ~q).

---

## Nomor 3

**Diketahui:** empat proposisi majemuk.

**Ditanya:** tabel kebenaran masing-masing.

**Rumus:** tabel kebenaran dasar (∧, ∨, ~, →) dan prioritas operator ~ → ∧ → ∨ → → → ↔. Banyak baris = 2ⁿ, n = jumlah variabel.

**Jawab:**

**a) (~p ∨ ~q) ∨ p** — 2 variabel → 4 baris

| p | q | ~p | ~q | ~p ∨ ~q | (~p ∨ ~q) ∨ p |
|---|---|----|----|---------|----------------|
| T | T | F  | F  | F       | **T** |
| T | F | F  | T  | T       | **T** |
| F | T | T  | F  | T       | **T** |
| F | F | T  | T  | T       | **T** |

Kolom terakhir semuanya T → **tautologi**.

**b) ~(p ∧ q) ∧ (r ∧ ~p)** — 3 variabel → 8 baris

| p | q | r | p ∧ q | ~(p ∧ q) | ~p | r ∧ ~p | ~(p ∧ q) ∧ (r ∧ ~p) |
|---|---|---|-------|----------|----|--------|----------------------|
| T | T | T | T | F | F | F | **F** |
| T | T | F | T | F | F | F | **F** |
| T | F | T | F | T | F | F | **F** |
| T | F | F | F | T | F | F | **F** |
| F | T | T | F | T | T | T | **T** |
| F | T | F | F | T | T | F | **F** |
| F | F | T | F | T | T | T | **T** |
| F | F | F | F | T | T | F | **F** |

Ada T ada F → **kontingensi**.

**c) (p ∨ q) → ~q** — 4 baris

| p | q | p ∨ q | ~q | (p ∨ q) → ~q |
|---|---|-------|----|---------------|
| T | T | T | F | **F** |
| T | F | T | T | **T** |
| F | T | T | F | **F** |
| F | F | F | T | **T** |

Ada T ada F → **kontingensi**.

**d) (~q → p) → (p → q)** — 4 baris

| p | q | ~q | ~q → p | p → q | (~q → p) → (p → q) |
|---|---|----|--------|-------|---------------------|
| T | T | F | T | T | **T** |
| T | F | T | T | F | **F** |
| F | T | F | T | T | **T** |
| F | F | T | F | T | **T** |

Ada T ada F → **kontingensi**.

> **Penjelasan.** Baris 4 soal (d) yang paling sering salah: ~q = T dan p = F,
> jadi ~q → p = T → F = **F**. Anteseden yang salah bikin implikasi utama otomatis **T**,
> berapa pun nilai konsekuennya. Itu sebabnya barisnya T, bukan F.
> Untuk (b), perhatikan r ∧ ~p: hasilnya cuma T kalau p = F **dan** r = T — itu memangkas
> 8 baris jadi tinggal 2 kandidat, sisanya pasti F.

---

## Nomor 4

**Diketahui:** empat implikasi.

**Ditanya:** tunjukkan tiap implikasi adalah tautologi, menggunakan tabel kebenaran.

**Rumus:** proposisi majemuk disebut **tautologi** bila kolom terakhir tabel kebenarannya bernilai T untuk semua kombinasi.

**Jawab:**

**a) ~p → (p → q)**

| p | q | ~p | p → q | ~p → (p → q) |
|---|---|----|-------|---------------|
| T | T | F | T | **T** |
| T | F | F | F | **T** |
| F | T | T | T | **T** |
| F | F | T | T | **T** |

Semua baris T → **terbukti tautologi**.

**b) ~(p → q) → ~q**

| p | q | p → q | ~(p → q) | ~q | ~(p → q) → ~q |
|---|---|-------|----------|----|----------------|
| T | T | T | F | F | **T** |
| T | F | F | T | T | **T** |
| F | T | T | F | F | **T** |
| F | F | T | F | T | **T** |

Semua baris T → **terbukti tautologi**.

**c) (p ∧ q) → (p → q)**

| p | q | p ∧ q | p → q | (p ∧ q) → (p → q) |
|---|---|-------|-------|--------------------|
| T | T | T | T | **T** |
| T | F | F | F | **T** |
| F | T | F | T | **T** |
| F | F | F | T | **T** |

Semua baris T → **terbukti tautologi**.

**d) ((p → q) ∧ q) → q**

| p | q | p → q | (p → q) ∧ q | ((p → q) ∧ q) → q |
|---|---|-------|--------------|--------------------|
| T | T | T | T | **T** |
| T | F | F | F | **T** |
| F | T | T | T | **T** |
| F | F | T | F | **T** |

Semua baris T → **terbukti tautologi**.

> **Penjelasan.** Pola yang sama muncul di keempatnya: satu-satunya cara implikasi bernilai **F**
> adalah anteseden T sambil konsekuen F, dan di soal-soal ini kondisi itu mustahil terjadi.
> Contoh (a): kalau ~p = T berarti p = F, dan p = F otomatis bikin p → q bernilai T.
> Contoh (d): antesedennya sudah memuat q, jadi kalau anteseden T pasti q = T juga.
> Tetap tulis tabelnya penuh — soalnya minta tabel kebenaran, bukan penalaran singkat.

---

## Nomor 5

**Diketahui:** dua proposisi majemuk —
(i) (p ∧ q) → (p ∨ q)
(ii) (p ∧ (p → q)) → q

**Ditanya:** tunjukkan keduanya tautologi **menggunakan hukum-hukum ekivalen logis** (bukan tabel kebenaran).

**Rumus (hukum ekivalen yang dipakai):**

| Hukum | Bentuk |
|-------|--------|
| Ekivalensi implikasi | a → b ≡ ~a ∨ b |
| De Morgan | ~(a ∧ b) ≡ ~a ∨ ~b |
| Negasi | a ∨ ~a ≡ T · a ∧ ~a ≡ F |
| Distributif | a ∧ (b ∨ c) ≡ (a ∧ b) ∨ (a ∧ c) |
| Identitas | F ∨ a ≡ a |
| Dominasi | a ∨ T ≡ T |
| Komutatif / Asosiatif | urutan dan pengelompokan ∨ bebas |

**Jawab:**

**(i) (p ∧ q) → (p ∨ q)**

| Langkah | Hukum |
|---------|-------|
| (p ∧ q) → (p ∨ q) | ekspresi awal |
| ≡ ~(p ∧ q) ∨ (p ∨ q) | ekivalensi implikasi |
| ≡ (~p ∨ ~q) ∨ (p ∨ q) | De Morgan |
| ≡ (~p ∨ p) ∨ (~q ∨ q) | komutatif & asosiatif |
| ≡ T ∨ T | hukum negasi (a ∨ ~a ≡ T) |
| ≡ **T** | hukum dominasi |

Hasil akhirnya T → **(i) tautologi**.

**(ii) (p ∧ (p → q)) → q**

| Langkah | Hukum |
|---------|-------|
| (p ∧ (p → q)) → q | ekspresi awal |
| ≡ (p ∧ (~p ∨ q)) → q | ekivalensi implikasi pada p → q |
| ≡ ((p ∧ ~p) ∨ (p ∧ q)) → q | distributif |
| ≡ (F ∨ (p ∧ q)) → q | hukum negasi (a ∧ ~a ≡ F) |
| ≡ (p ∧ q) → q | hukum identitas |
| ≡ ~(p ∧ q) ∨ q | ekivalensi implikasi |
| ≡ (~p ∨ ~q) ∨ q | De Morgan |
| ≡ ~p ∨ (~q ∨ q) | asosiatif |
| ≡ ~p ∨ T | hukum negasi |
| ≡ **T** | hukum dominasi |

Hasil akhirnya T → **(ii) tautologi**.

> **Penjelasan.** Strateginya selalu sama: **buang dulu semua tanda →** pakai a → b ≡ ~a ∨ b,
> karena hukum-hukum di TABLE 6 slide cuma bekerja pada ∧, ∨, dan ~. Setelah jadi bentuk
> ∨/∧ murni, cari pasangan a dan ~a di dalam satu disjungsi — begitu ketemu, seluruh
> ekspresi runtuh jadi T.
> (ii) itu **modus ponens** dalam bentuk proposisi; kalau ekspresinya tautologi, artinya
> penarikan kesimpulan modus ponens memang selalu sah. Itu materi Pertemuan 5 nanti.
