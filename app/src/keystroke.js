// Keystroke DYNAMICS capture. PRIVACY CONTRACT:
// - We never store which key was pressed, nor the text. Each event is reduced on the spot
//   to {t: timestamp, kind: 'char' | 'del'}; the key value is discarded immediately.
// - summarize() turns the events into 5 numbers. Only those numbers leave this module.

export function classify(e) {
  if (e.key === 'Backspace' || e.key === 'Delete') return 'del'
  if (e.key.length === 1) return 'char' // printable; WHICH char is never kept
  return null // arrows, shift, etc. ignored
}

export function createRecorder() {
  const events = [] // [{t, kind}] — no key, no text
  return {
    onKeyDown(e) {
      const kind = classify(e)
      if (kind) events.push({ t: performance.now(), kind })
    },
    count: () => events.length,
    summarize() {
      if (events.length < 2) return null
      const iki = []
      for (let i = 1; i < events.length; i++) {
        const d = events[i].t - events[i - 1].t
        if (d < 3000) iki.push(d) // pauses > 3 s are not typing rhythm
      }
      const mean = iki.reduce((a, b) => a + b, 0) / (iki.length || 1)
      const sd = Math.sqrt(iki.reduce((a, b) => a + (b - mean) ** 2, 0) / (iki.length || 1))
      const dels = events.filter(e => e.kind === 'del').length
      const chars = events.length - dels
      const session_s = (events[events.length - 1].t - events[0].t) / 1000
      const r = (x, n = 3) => Math.round(x * 10 ** n) / 10 ** n
      events.length = 0 // drop raw timings too
      return {
        wpm: r(session_s > 0 ? (chars / 5) / (session_s / 60) : 0, 1),
        iki_mean_ms: r(mean, 1),
        iki_sd_ms: r(sd, 1),
        backspace_rate: r(dels / (chars + dels)),
        session_s: r(session_s, 1),
      }
    },
  }
}
