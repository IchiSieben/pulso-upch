// Pulsito. Its look depends ONLY on usage milestones, never on answers, scores or typing.
// stage() reads exactly three keys; tests/test_mascot.py enforces it.
export function stage(usage) {
  const days = Number(usage.daysOpened) || 0
  const inv = usage.inventoryDone === true
  const bridge = usage.bridgeTouched === true
  if (inv && (bridge || days >= 3)) return 2
  if (inv || days >= 2) return 1
  return 0
}

const LINES = {
  inicio: 'Te acompaño en el recorrido. Son unos minutos.',
  consentimiento: 'Tú eliges qué se mide. Puedes cambiarlo después.',
  tema: 'Ajusta cómo se ve. Es solo una preferencia.',
  inventario: 'Es la parte principal. Puedes pausarla cuando quieras.',
  'inventario-fin': 'Primera parte lista. Vamos por la siguiente.',
  escritura: 'Solo cuenta el ritmo. El texto se descarta.',
  checkin: 'Tres toques y terminamos.',
  'checkin-fin': 'Listo por hoy. Aquí está tu panel.',
  panel: 'Tu panel se compara solo contigo.',
  datos: 'Tus datos son tuyos. Exporta o borra cuando quieras.',
}
export function line(step) { return LINES[step] || '' }
