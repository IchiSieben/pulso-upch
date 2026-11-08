// Display preferences. Stored apart from the data (key pulso_prefs), never analysed:
// a chosen colour is a preference, not a signal. Erased with "Borrar mis datos".
const KEY = 'pulso_prefs'
export const DEFAULT = { mode: 'auto', accent: 'granate', largeText: false, mascot: true }
export const MODES = [['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Oscuro']]
export const ACCENTS = [['granate', 'Granate Cayetano'], ['petroleo', 'Azul petróleo'], ['salvia', 'Verde salvia'], ['grafito', 'Grafito']]

function clean(p) {
  return {
    mode: MODES.some(([k]) => k === p.mode) ? p.mode : DEFAULT.mode,
    accent: ACCENTS.some(([k]) => k === p.accent) ? p.accent : DEFAULT.accent,
    largeText: p.largeText === true,
    mascot: p.mascot !== false,
  }
}
export function load() {
  try { return clean(JSON.parse(localStorage.getItem(KEY) || '{}')) } catch { return { ...DEFAULT } }
}
export function save(p) {
  try { localStorage.setItem(KEY, JSON.stringify(clean(p))) } catch { /* private mode */ }
}
export function apply(p) {
  const h = document.documentElement
  if (p.mode === 'auto') h.removeAttribute('data-theme')
  else h.setAttribute('data-theme', p.mode)
  h.setAttribute('data-accent', p.accent)
  h.setAttribute('data-text', p.largeText ? 'large' : 'normal')
}
