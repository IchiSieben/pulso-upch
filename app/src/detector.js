// Within-person deviation detector. 1:1 mirror of model/detector.py (tests/test_parity.py).
// Measures distance from the person's OWN first 14 days. It does not measure stress.

export const TYPING_FEATURES = ['wpm', 'iki_mean_ms', 'iki_sd_ms', 'backspace_rate', 'session_s']
export const BASELINE_DAYS = 14
export const Z_THRESHOLD = 3.0
export const MIN_FEATURES = 2
export const RUN_LENGTH = 3
const MAD_SCALE = 1.4826
const REL_FLOOR = 0.02

export const STATE_OK = 'sin cambios relevantes'
export const STATE_CHANGE = 'cambio sostenido observado'
export const STATE_BASELINE = 'construyendo tu línea base'

const r3 = x => Math.round(x * 1000) / 1000

function median(xs) {
  const s = [...xs].sort((a, b) => a - b)
  const n = s.length
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2
}

export function baselineStats(base) {
  const stats = {}
  for (const f of TYPING_FEATURES) {
    const xs = base.map(d => d[f]).filter(v => v != null).map(Number)
    const med = median(xs)
    const mad = median(xs.map(x => Math.abs(x - med))) * MAD_SCALE
    stats[f] = { median: med, spread: Math.max(mad, REL_FLOOR * Math.abs(med), 1e-6) }
  }
  return stats
}

export function evaluate(daysIn, baselineDays = BASELINE_DAYS, runLength = RUN_LENGTH) {
  const days = [...daysIn].sort((a, b) => a.day - b.day)
  if (days.length < baselineDays + 1) return { state: STATE_BASELINE, longest_run: 0, flags: [], z: [] }
  const stats = baselineStats(days.slice(0, baselineDays))
  const z = [], flags = []
  days.forEach((d, i) => {
    const zi = {}
    for (const f of TYPING_FEATURES) zi[f] = r3((Number(d[f]) - stats[f].median) / stats[f].spread)
    z.push(zi)
    const nOut = TYPING_FEATURES.filter(f => Math.abs(zi[f]) > Z_THRESHOLD).length
    flags.push(i >= baselineDays && nOut >= MIN_FEATURES)
  })
  let run = 0, best = 0
  for (const f of flags) { run = f ? run + 1 : 0; best = Math.max(best, run) }
  return { state: best >= runLength ? STATE_CHANGE : STATE_OK, longest_run: best, flags, z, stats }
}

// PHRASES[f] = [text when z < 0, text when z > 0].
// Descriptive summary of what moved during the latest atypical run (never a clinical claim).
const PHRASES = {
  wpm: ['escribiste más lento', 'escribiste más rápido'],
  iki_mean_ms: ['hiciste pausas más cortas entre teclas', 'hiciste pausas más largas entre teclas'],
  iki_sd_ms: ['tu ritmo fue más parejo', 'tu ritmo fue más irregular'],
  backspace_rate: ['borraste menos', 'borraste más'],
  session_s: ['escribiste durante menos tiempo', 'escribiste durante más tiempo'],
}
export function describeChange(result) {
  const { flags, z } = result
  let end = flags.lastIndexOf(true)
  if (end < 0) return []
  let start = end
  while (start > 0 && flags[start - 1]) start--
  const out = []
  for (const f of TYPING_FEATURES) {
    const vals = z.slice(start, end + 1).map(zi => zi[f])
    const m = vals.reduce((a, b) => a + b, 0) / vals.length
    if (Math.abs(m) > Z_THRESHOLD) out.push({ feature: f, z: m, text: PHRASES[f][m > 0 ? 1 : 0] })
  }
  return out.sort((a, b) => Math.abs(b.z) - Math.abs(a.z))
}
