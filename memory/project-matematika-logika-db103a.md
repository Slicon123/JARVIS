---
name: project-matematika-logika-db103a
description: "Bryan's Matematika Logika (DB103A) class — syllabus, grading, rules, slide contents through pertemuan 7, tugas status, upcoming tes"
metadata: 
  node_type: memory
  type: project
  originSessionId: 80e54fc2-baae-473a-bee2-f5051b8966bf
  modified: 2026-10-10T05:23:18.718Z
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
- Tugas 2 (materi pertemuan 3–4) dikerjakan di `tugas-2-*.md`. Since 6 Oct 2026 the tugas files (soal PDFs + jawaban/salin-hvs .md) are in `C:\Bryan De Great\Kuliah\Semester 1\Matematika Logika\Tugas\`, and the Pertemuan_*.pdf slides are in `...\Materi\`.

**Status tugas (dikonfirmasi Bryan 29 September 2026):** Tugas 1 (pertemuan 2) dan Tugas 2 (pertemuan 3–4) sudah dikumpulkan, disalin tangan di HVS. Tanya kalau ada tugas baru.

**Pertemuan 3 & 4 slide error:** slide 16 mistranslates Rosen's airline example: "maskapai menaikkan kelas Anda" should be the airline *bumping* you (kicked off an overbooked flight) — an upgrade still lets you board, so it doesn't illustrate p=F, q=T.

**Pertemuan 5 (received 2026-10-06) — kuantor, RPS topic 4:** predikat p(x); ∀ (semua/setiap) benar iff p(x) benar untuk semua x, satu contoh penyangkal bikin salah; ∃ (ada/beberapa/terdapat) benar iff minimal satu x. Kuantor bersarang: sejenis boleh ditukar, beda jenis tidak (p(x,y): x+y=0 → ∀x∃y benar, ∃y∀x salah; contoh mahasiswa–dosen pembimbing). Ingkaran: ~∀x p(x) ≡ ∃x ~p(x), ~∃x q(x) ≡ ∀x ~q(x) (contoh bus, dinosaurus, "tidak ada ahli matematika yang malas"). Slide 8 is an unanswered exercise over bilangan bulat: a ∀x x²−2≥0 salah (x=0) · b ∃x x²−10x+21=0 benar (x=3,7) · c ∀x same equation salah · d ∃x x²−3=0 salah (√3 bukan bulat). **Slide errors:** slide 5 says ∃ means "paling sedikit satu (atau lebih, asal tidak semua)" — "asal tidak semua" is wrong, ∃ stays true when every x satisfies it; slide 4 writes "x ∈ p(x)" where it means p(x).

**Pertemuan 6 (received 2026-10-06) — inferensi, RPS topic 5:** argumen = premis + konklusi; kebenaran (isi) vs validitas (struktur) — "planet dari keju" valid tapi tidak sehat, Salatiga/Jawa Tengah = affirming the consequent (tidak valid). Six rules, each with its "(premis ∧ …) → konklusi adalah tautologi" form: modus ponens, modus tollens, silogisme hipotesis, silogisme disjungtif, penambahan disjungsi, penyederhanaan konjungsi. Slide 6 uses a fire-alarm example (his field — false alarms make premise 1 untrue in practice). Bryan said he didn't follow this class; re-explained 6 Oct with the truth-table validity check and denying the antecedent (not in the slides).

**Pertemuan 7 (7 Okt 2026, received 2026-10-10) — RPS topics 6 AND 7 in one meeting:** aljabar Boolean dua-nilai <B,+,·,',0,1>, prioritas ' → · → +; hukum (identitas, idempoten, komplemen, dominasi, penyerapan, komutatif, asosiatif, distributif, De Morgan, involusi) + prinsip dualitas; fungsi Boolean f: Bⁿ→B, literal, tabel kebenaran, f+g dan f·g; komplemen fungsi via De Morgan atau dualitas (dual lalu komplemenkan tiap literal); 7 gerbang (NOT, AND, OR, NAND, NOR, XOR, XNOR) with symbols; merancang rangkaian: kebutuhan → tabel → SOP → gerbang (promo-toko example D = xy + z); DNF/SOP vs CNF/POS, minterm mᵢ / maxterm Mᵢ = (mᵢ)', kanonik via melengkapi literal or aturan praktis (SOP = minterm baris f=1, POS = maxterm baris f=0); penyederhanaan secara aljabar; K-map only intro + 2/3-variable layout, no grouping rules yet (likely continues). Slide 26 circuit exercise unanswered (answer 0). Slide 12 writes (f+g)(x1+x2+...+xn) where it means (x1, x2, ..., xn).

**Tugas 3 (received 2026-10-10, `Tugas\Tugas 3 - Soal.pdf`, deadline unknown):** 1 kuantor ke bahasa sehari-hari (4 bagian) · 2 validitas 5 argumen flash sale (MP, MT, and fallacies) · 3 komplemen paling sederhana g=(x+y')z+x'y · 4 kanonik POS f=xy+x'z · 5 gambar sirkuit Y=ABC+A'C'+B'C. Jawaban + salin-hvs written 10 Oct (`Tugas\tugas-3-{jawaban,salin-hvs}.md`, all truth-table verified): 2a MP, b MT, c MT (q→p), d–e tidak valid; 3 g'=xz'+y'z'; 4 ΠM(0,2,4,5). Not yet submitted.

**Timeline (revised 2026-10-10):** P5 ≈ 23 Sep, P6 ≈ 30 Sep, P7 = 7 Okt covered both remaining pre-TTS topics, so the "pertemuan N ≈ RPS N−1" rule no longer holds. Next: tes 14 Okt, K-map probably finished, then TTS. Estimate, not an official schedule.

**Tes kelas (Bryan bilang 7 Okt 2026; kemungkinan Rabu 14 Okt):** 8 nomor, tiap nomor maksimal bagian a–b: 1 himpunan · 2 matriks · 3 gerbang logika · 4 kuantor · 5 modus ponens/tollens · 6–8 aljabar Boolean. Latihan + kunci di `Kuliah\Semester 1\Matematika Logika\Latihan\latihan-tes-{soal,jawaban}.md` — complete since 10 Oct (3 = draw circuit + output, 6 = komplemen, 7 = kanonik SOP/POS, 8 = penyederhanaan aljabar, modelled on Tugas 3 and P7 slides; all answers truth-table verified).
