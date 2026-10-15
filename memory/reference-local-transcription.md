---
name: reference-local-transcription
description: "Bryan's laptop can transcribe audio/video locally — faster-whisper (small model cached) + ffmpeg; PyAV mismatch needs the ffmpeg-decode workaround"
metadata:
  node_type: memory
  type: reference
  originSessionId: bcf91eae-07d3-4e3b-a8b9-2b925c152c80
  modified: 2026-10-15T15:29:57.017Z
---

Checked 15 Oct 2026 on his main laptop (i5-10310U, no NVIDIA GPU):

- `faster_whisper` is installed for Python 3.14. Cached models in `~/.cache/huggingface/hub`:
  `faster-whisper-small`, `small.en`, `tiny`, `tiny.en`. Nothing larger, so "small" is the best
  offline choice for Indonesian without a download.
- ffmpeg/ffprobe 9.0.2 are on PATH (WinGet `Gyan.FFmpeg`).
- **Passing a file path to `model.transcribe()` crashes**: `av.open() got an unexpected keyword
  argument 'metadata_errors'` (installed PyAV is older than faster-whisper expects). Workaround:
  decode with `ffmpeg -i <file> -ac 1 -ar 16000 -f f32le -`, load with
  `numpy.frombuffer(..., float32)`, and pass the array instead.
- Speed: about 9.5 minutes of Indonesian audio transcribed in a few minutes on CPU with
  `compute_type="int8"`, `beam_size=1`, `vad_filter=True`. Clear speech came out well; a noisy
  phone recording of a shouting crowd came out only half usable.

Useful for lecture videos embedded in PPTs (pull `ppt/media/*.mp4` out of the zip first) and for
[[project-content-clipping-automation]].
