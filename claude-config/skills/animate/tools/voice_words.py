#!/usr/bin/env python3
"""Word timings for a voice-over, read from the audio itself (faster-whisper, local, no API).
   usage: python tools/voice_words.py <voice.wav> [--lang en] [--model small.en]
   prints JSON: [{"w": "word", "t0": 1.23, "t1": 1.51}, ...]
--lang is the narration's language (ISO 639-1: en, id, ...). English uses the English-only model (small.en); any
other language needs a multilingual model (small), so an '.en' model is swapped for its multilingual twin.
Called by tools/voice.mjs; it falls back to an estimate when faster-whisper isn't installed (pip install faster-whisper)."""
import json
import sys
import wave


def load(path):
    """The 16 kHz mono float32 samples Whisper wants. voice.mjs writes a 16-bit PCM WAV, read here with the standard
    library: faster-whisper's own decoder goes through PyAV, whose newer releases break its call (av 19 dropped
    the metadata_errors argument faster-whisper 1.2.1 passes). Anything else is handed to faster-whisper as a path."""
    try:
        import numpy as np
        with wave.open(path, 'rb') as w:
            if w.getsampwidth() != 2:
                return path
            sr, ch = w.getframerate(), w.getnchannels()
            x = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').astype(np.float32) / 32768.0
        if ch > 1:
            x = x.reshape(-1, ch).mean(axis=1)
        if sr != 16000:
            k = sr / 16000
            if k == int(k) and k > 1:   # 48 kHz -> 16 kHz: average each group of k samples (a crude low-pass, plenty for speech)
                n = len(x) // int(k) * int(k)
                x = x[:n].reshape(-1, int(k)).mean(axis=1)
            else:
                x = np.interp(np.arange(0, len(x), k), np.arange(len(x)), x).astype(np.float32)
        return x.astype(np.float32)
    except (wave.Error, EOFError, ImportError):
        return path


def main():
    args = sys.argv[1:]

    def take(flag, default):
        if flag in args:
            i = args.index(flag)
            value = args[i + 1]
            del args[i:i + 2]
            return value
        return default

    lang = take('--lang', 'en')
    model = take('--model', 'small.en' if lang == 'en' else 'small')
    if lang != 'en' and model.endswith('.en'):
        print(f'voice_words: {model} only knows English; using {model[:-3]} for --lang {lang}', file=sys.stderr)
        model = model[:-3]
    from faster_whisper import WhisperModel
    m = WhisperModel(model, device='cpu', compute_type='int8')
    segs, _ = m.transcribe(load(args[0]), word_timestamps=True, vad_filter=False, beam_size=5, language=lang)
    out = []
    for s in segs:
        for w in s.words or []:
            out.append({'w': w.word.strip(), 't0': round(w.start, 3), 't1': round(w.end, 3)})
    print(json.dumps(out))


if __name__ == '__main__':
    main()
