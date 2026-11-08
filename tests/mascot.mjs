// Prints JSON checks on app/src/mascot.js stage(): purity, monotonicity, keys read.
import { pathToFileURL } from 'node:url'
const { stage, line } = await import(pathToFileURL(process.argv[2]).href)
const KEYS = ['daysOpened', 'inventoryDone', 'bridgeTouched']
const grid = []
for (let d = 0; d <= 6; d++) for (const i of [false, true]) for (const b of [false, true]) grid.push({ daysOpened: d, inventoryDone: i, bridgeTouched: b })
const noise = k => ({ sisco: { estresores: { mean: k } }, wpm: 10 * k, iki_mean_ms: 100 + k, energy_1_5: k % 5 + 1, rest_hours: k, sisco_item: { value: k % 5 + 1 }, selfReport: 'x'.repeat(k) })
const pure = grid.every(u => [1, 3, 5].every(k => stage({ ...u, ...noise(k) }) === stage(u)))
const le = (a, b) => a.daysOpened <= b.daysOpened && (!a.inventoryDone || b.inventoryDone) && (!a.bridgeTouched || b.bridgeTouched)
const monotonic = grid.every(a => grid.every(b => !le(a, b) || stage(a) <= stage(b)))
const read = new Set()
let onlyKeys = true
for (const u of grid) {
  const p = new Proxy(u, { get(t, k) { if (typeof k === 'symbol') return t[k]; if (!KEYS.includes(k)) throw new Error('read ' + String(k)); read.add(k); return t[k] } })
  try { stage(p) } catch { onlyKeys = false }
}
const stages = [...new Set(grid.map(stage))].sort()
const steps = ['inicio', 'consentimiento', 'tema', 'inventario', 'inventario-fin', 'escritura', 'checkin', 'checkin-fin', 'panel', 'datos']
const lines = steps.map(line)
console.log(JSON.stringify({ pure, monotonic, onlyKeys, read: [...read].sort(), stages, lines }))
