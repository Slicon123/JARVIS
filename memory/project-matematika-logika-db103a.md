---
name: project-matematika-logika-db103a
description: "Syllabus essentials for Bryan's Matematika Logika (DB103A) class — topic order, grading weights, attendance rules, textbooks"
metadata: 
  node_type: memory
  type: project
  originSessionId: 80e54fc2-baae-473a-bee2-f5051b8966bf
  modified: 2026-09-16T00:00:00.000Z
---

Matematika Logika (DB103A), 3 SKS, dosen Johannes Ronaldo Siahinenia — Rabu 09–12 at FTI424. Effectively a discrete-math course. Syllabus captured 2 September 2026 from lecture slides.

**Topic order (RPS):** 1 himpunan/fungsi/barisan-deret/kardinalitas/matriks · 2 pernyataan, penghubung, tautologi & kontradiksi · 3 ekuivalensi · 4 kuantor (universal, eksistensial, negasi) · 5 penarikan kesimpulan (modus ponens, modus tollens, silogisme disjungtif) · 6 fungsi Boole & gerbang logika · 7 bentuk normal DNF/CNF, penyederhanaan fungsi Boole · **TTS = materi 1–7** · 9 induksi matematika & fungsi rekursi · 10 permutasi & kombinasi · 11 teori graf · 12 program sebagai logika instruksi · 13 pengulangan instruksi · 14–15 algoritma pencarian & pengurutan · **TAS = materi 9–15**.

**Grading:** Tugas individu/kuis 20%, tugas kelompok 20%, TTS 25%, TAS 25%, presensi 10%. Scale: A ≥80, AB 75–79, B 70–74, BC 65–69, C 55–64, D 45–54, E <45.

**Rules that bite:** attendance min 80% (max 3 absences); 10-minute late tolerance; late assignments capped at 70%; plagiarism/uncited quoting = 0.

**Textbooks:** Munir *Matematika Diskrit* ed. 7 (2020) — primary Indonesian text; Siang (2009); Schaum's *Discrete Mathematics*; Rosen *Discrete Mathematics and Its Applications* 8th ed.

DB103 is a conceptual prerequisite for DB204 (Data Processing for Business) and DB402 (Metodologi Penelitian Kuantitatif).

**Why:** So questions like "what's next week's topic" or "what's on the TTS" can be answered without re-uploading slides.

**How to apply:** Match the week to the pertemuan number to know the current topic. Default to Bahasa Indonesia and Munir's terminology when explaining. Class time is in [[project-uksw-digital-business]].

**Materials received (as of 2026-09-10):** Full slide decks for Pertemuan 1 (course intro/RPS/grading/rules — same content as syllabus above) and Pertemuan 2 (himpunan, fungsi, baris & deret, kardinalitas, matriks) uploaded by Bryan. Pertemuan 2 detail: himpunan notation/operations (union, irisan, selisih, komplemen, kartesian, hukum de Morgan); fungsi injektif/surjektif/bijektif with e-commerce-style examples; barisan & deret aritmatika (Un = a+(n-1)b, Sn = n/2(2a+(n-1)b)) with word problems; kardinalitas (|A|, himpunan hingga/tak hingga, relasi 1:1/1:N/N:N); matriks (ordo, jenis, transpose, determinan via Sarrus/minor-kofaktor, invers, penjumlahan/pengurangan/perkalian skalar/perkalian antar matriks).

**Pertemuan 3 & 4 (received 2026-09-16):** Pernyataan/proposisi, penghubung, tautologi/kontradiksi/kontingensi, ekivalen — covers RPS topics 2–3.
- **Pernyataan vs proposisi:** pernyataan = kalimat benar/salah, penggunaan lebih universal; proposisi = kalimat deklaratif benar-atau-salah (tidak dua-duanya), nilai kebenarannya disebut nilai kebenaran.
- **Penghubung dasar:** konjungsi p∧q (dan), disjungsi p∨q (atau), ingkaran/negasi ~p (tidak). Biner vs uner. Proposisi atomic vs majemuk.
- **Disjungsi eksklusif (XOR):** p⊕q — benar hanya jika salah satu benar, bukan keduanya.
- **Implikasi p→q:** p = anteseden, q = konsekuen. p→q salah hanya ketika p=T, q=F.
- **Variasi bersyarat:** konvers q→p, invers ~p→~q, kontraposisi ~q→~p. Implikasi ≡ kontraposisi; konvers ≡ invers (bukan implikasi asli).
- **Bikondisional p↔q:** benar ketika p,q sama-sama T atau sama-sama F.
- **Tautologi** = proposisi majemuk selalu benar (mis. p∨~p); **kontradiksi** = selalu salah (p∧~p); **kontingensi** = bukan keduanya.
- **Prioritas operator** (tinggi→rendah): ~ , ∧ , ∨ , → , ↔. Jadi p→q∨r berarti p→(q∨r).
- **Ekivalensi logis (P⇔Q / P≡Q):** tabel kebenaran identik. Hukum De Morgan: ~(p∧q) ⇔ ~p∨~q, dan ~(p∨q) ⇔ ~p∧~q. Slide juga berisi tabel hukum lengkap (identity, domination, idempotent, double negation, commutative, associative, distributive, absorption, negation) plus hukum ekivalensi khusus implikasi (p→q ≡ ~p∨q, dst.) dan bikondisional.
- **Contoh pembuktian ekivalen langkah-demi-langkah** ada di slide: p→q ≡ ~p∨q (setara kondisional-disjungsi); dan ~(p→q) ≡ p∧~q (via ubah ke ~p∨q → De Morgan → negasi ganda).
- **Aplikasi:** pencarian Boolean (Google search operators AND/OR/NOT/tanda kutip) dicontohkan lewat kasus UMKM/studi kasus/media sosial — memetakan kebutuhan pencarian jadi proposisi p,q,r,s lalu ekspresi (p∧q∧r)∧~s.
- Dosen: Johannes R. Siahainenia, johannes.siahainenia@uksw.edu.
- Ada tugas terkait materi ini — belum jelas bentuk/deadline-nya, tanyakan Bryan kalau relevan.
