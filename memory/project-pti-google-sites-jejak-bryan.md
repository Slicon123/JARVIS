---
name: project-pti-google-sites-jejak-bryan
description: "PTI tugas: Google Sites website about Bryan's life (\"Jejak Bryan\"), due 29 Oct 2026 via Google Form link; guide artifact, embeds and images built 22 Oct 2026"
metadata:
  type: project
---

PTI tugas given in class on 22 October 2026: build a Google Sites website about his own life. Deadline
**29 October 2026**; submit the published link through the class Google Form. The dosen's in-class example
(header background, title, site name, content blocks with an image and its description in each, image
carousel, map) scores 60; extra features score above standard. Bryan says there are no other rules.

Google Sites has no API for current Sites (the old Sites API only covers classic Sites), so Claude can't
build it; Bryan builds it by hand from a guide. Built 22 Oct 2026:
- Guide artifact: https://claude.ai/artifact/8asHM31JttpixfpcRHC4mF (local copy `Panduan Jejak Bryan.html`).
- Folder `Kuliah\Semester 1\Pengantar Teknologi Informasi\Tugas\Google Sites - Jejak Bryan\`:
  `Gambar\` (header-beranda, header-halaman, logo, favicon), `Kode Embed\` 1–4 (salam with typing effect,
  kuis, rak musik linking to Spotify search, Ungaran climb animation), `_sumber\` (gen-gambar.html,
  render.py, harness.html = exact-size iframe like Google Sites, build-panduan.py rebuilds the guide).
- Site plan: "Jejak Bryan", 4 pages (Beranda, Study & Work, Hobbies, Adventure); he dropped the planned
  Guestbook page (Google Form) on 22 Oct, so the Instagram link moved to Beranda. Forest
  #24493F + gold. He asked for "elegan dan adventures", Indonesian, map = UKSW only.
- Page titles and section headings are English, his choice on 22 Oct: About Me, College, First-Semester
  Courses, My Campus in Salatiga, Work, Guitar, Swimming, Music, Climbing Mount Ungaran; embed headings too
  (How Well Do You Know Bryan?, Bryan's Record Shelf, Mount Ungaran). Body text, the header tagline and the
  Beranda menu name stay Indonesian.
- The section texts are his own (pasted 22 Oct). Claude's drafts (captions, banner, footer, guestbook
  intro) are marked in the guide for him to rewrite, since the PTI dosen bans AI ([[project-pengantar-teknologi-informasi]]).

Open as of 22 Oct: "The Bakuucakar" (a favourite artist) wasn't found online, so the spelling needs
confirming (it appears in his Musik text, Kode 2 soal 5, Kode 3). His Kuliah text lists 4 courses while the
collapsible lists 5. Only the guitar photo has been supplied so far.

**How to apply:** if he wants an embed changed, edit `Kode Embed\*.html`, re-check it with render.py through
harness.html at laptop and phone widths (prefix `RM=1` to capture the Ungaran embed in its finished state;
headless Chrome freezes the animation at the start), rerun build-panduan.py, and republish the artifact (by URL from a
new session). Render through harness.html, not the page directly: render.py widens the window, so a
direct render shows the wrong layout.

Related: [[project-uksw-digital-business]]
