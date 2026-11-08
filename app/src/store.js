// Everything lives in this browser's localStorage. There is no server in the demo.
const KEY = 'pulso_v2'
const EMPTY_USAGE = { days: [], inventoryDone: false, bridgeTouched: false }
export const EMPTY = { consent: null, sisco: [], sessions: [], usage: EMPTY_USAGE, inventoryProgress: null }

export function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY) || '{}')
    return { ...EMPTY, ...d, usage: { ...EMPTY_USAGE, ...(d.usage || {}) } }
  } catch { return { ...EMPTY } }
}
export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* private mode: works in memory only */ }
}
const ours = () => Object.keys(localStorage).filter(k => k.startsWith('pulso'))
// Removes every pulso* key: data, usage, inventory progress and display preferences.
export function erase() {
  try { ours().forEach(k => localStorage.removeItem(k)) } catch { /* nothing stored */ }
  try { return ours().length === 0 } catch { return true }
}

export function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
export function withDay(usage) {
  const t = today()
  return usage.days.includes(t) ? usage : { ...usage, days: [...usage.days, t] }
}
export function mascotUsage(usage) {
  return { daysOpened: usage.days.length, inventoryDone: usage.inventoryDone, bridgeTouched: usage.bridgeTouched }
}

export function exportJson(state) {
  const blob = new Blob([JSON.stringify({ exported_at: new Date().toISOString(), note: 'Datos de Pulso UPCH guardados en este navegador. No contienen texto escrito.', ...state }, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'pulso-upch-mis-datos.json'
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}
