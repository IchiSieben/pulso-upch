// Everything lives in this browser's localStorage. There is no server in the demo.
const KEY = 'pulso_v2'
const EMPTY = { consent: null, sisco: [], sessions: [] }

export function load() {
  try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(KEY) || '{}') } } catch { return { ...EMPTY } }
}
export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* private mode: works in memory only */ }
}
export function erase() {
  try { localStorage.removeItem(KEY); localStorage.removeItem('pulso_uid') } catch { /* nothing stored */ }
  try { return localStorage.getItem(KEY) === null } catch { return true }
}
export function exportJson(state) {
  const blob = new Blob([JSON.stringify({ exported_at: new Date().toISOString(), note: 'Datos de Pulso UPCH guardados en este navegador. No contienen texto escrito.', ...state }, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'pulso-upch-mis-datos.json'
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}
