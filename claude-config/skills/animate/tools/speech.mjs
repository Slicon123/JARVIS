// Narration pace per language, in syllables per second.
// The original rule was <= 3.5 words/s, set on English narration (about 5 syllables/s at ~1.45 syllables a word).
// Words are a bad unit across languages: an Indonesian word averages about 2.6 syllables, so 3.5 Indonesian words/s
// would be about 9 syllables/s. Syllables aren't equal either: reading the same text, languages with simple syllables
// run more of them per second (Pellegrino, Coupé & Marsico 2011: Mandarin 5.2 ... Spanish and Japanese ~7.8 syllables/s,
// English in between), because each carries less. Indonesian syllables are simple (mostly CV, like Spanish and Italian).
// No measured Indonesian rate was found, so its limit, 6.0, is an estimate between English and Spanish: about 2.3 words/s.
// Calibrate it on the first real Indonesian take — if a comfortable read measures above it, raise piece.json
// "review": { "maxSps": ... } and update the number here.
export const SPS_LIMITS = { en: 5.0, id: 6.0 }, SPS_DEFAULT = 5.0, WPS_MAX_EN = 3.5;
export const spsMax = (lang) => SPS_LIMITS[lang] ?? SPS_DEFAULT;

export const pieceLang = (piece) => String(piece?.lang || 'en').toLowerCase().slice(0, 2);

// syllables in one word: a spelling heuristic, good to about a syllable per line, which is all a pace check needs
function wordSyllables(raw, lang) {
  const w = raw.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
  if (!w) return 0;
  if (/^\d+$/.test(w)) return w.length * 2;   // digits: write numbers as they are said; this is only a fallback
  if (lang === 'id') {
    // one syllable per vowel, except the diphthongs ai, au, oi, ei at the end of a word (pantai, pulau, amboi, survei)
    const v = (w.match(/[aeiou]/g) || []).length - (/(ai|au|oi|ei)$/.test(w) ? 1 : 0);
    return Math.max(1, v);
  }
  // English (and the default): vowel groups, minus a silent final e
  if (w.length <= 3) return 1;
  const s = w.replace(/(?:[^laeiouy]es|[^laeiouy]ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  return Math.max(1, (s.match(/[aeiouy]+/g) || []).length);
}

export const syllables = (text, lang = 'en') => text.split(/\s+/).reduce((n, w) => n + wordSyllables(w, lang), 0);
export const words = (text) => text.trim().split(/\s+/).filter(Boolean).length;
