// Inventario SISCO del Estrés Académico (Barraza, 2007), 31-item version validated in
// Peruvian undergraduates by Manrique-Millones, Millones-Rivalles & Manrique-Pino (2019),
// Ansiedad y Estrés 25(1):28-34, doi:10.1016/j.anyes.2019.03.001.
// Reproduced for non-commercial academic use, with citation. Swapping the instrument is a
// data change: replace this module (same shape) and the UI follows.
//
// Scoring: mean per subscale on the 1-5 scale. No clinical cut-offs: none are validated in
// Peru, and SISCO is not a diagnostic test. Coping is reported apart, never added to stress.

export const SOURCE_VERIFIED = true // wording matched word for word in two independent Peruvian theses (below)
export const SOURCE_NOTE =
  'Redacción literal según Barraza (2007), cotejada en dos anexos independientes: Flores Beltrán (UCSM, 2019) y Cayo Callata (U. Autónoma de Ica, 2023).'

export const CITATION = {
  short: 'SISCO · Barraza (2007), validado en 628 universitarios de Lima (Manrique-Millones et al., 2019)',
  doi: 'https://doi.org/10.1016/j.anyes.2019.03.001',
}

export const SCALE = [
  { v: 1, label: 'Nunca' },
  { v: 2, label: 'Rara vez' },
  { v: 3, label: 'Algunas veces' },
  { v: 4, label: 'Casi siempre' },
  { v: 5, label: 'Siempre' },
]

export const FILTER = 'Durante el transcurso de este semestre, ¿has tenido momentos de preocupación o nerviosismo?'
export const INTENSITY = 'Con la idea de obtener mayor precisión y utilizando una escala del 1 al 5 señala tu nivel de preocupación o nerviosismo, donde (1) es poco y (5) mucho.'

export const SUBSCALES = [
  {
    id: 'estresores',
    title: 'Situaciones que te inquietan',
    stem: 'Señala con qué frecuencia te inquietaron las siguientes situaciones:',
    items: [
      'La competencia con los compañeros del grupo',
      'Sobrecarga de tareas y trabajos escolares',
      'La personalidad y el carácter del profesor',
      'Las evaluaciones de los profesores (exámenes, ensayos, trabajos de investigación, etc.)',
      'El tipo de trabajo que te piden los profesores (consulta de temas, fichas de trabajo, ensayos, mapas conceptuales, etc.)',
      'No entender los temas que se abordan en la clase',
      'Participación en clase (responder a preguntas, exposiciones, etc.)',
      'Tiempo limitado para hacer el trabajo',
    ],
  },
  {
    id: 'sintomas',
    title: 'Reacciones',
    stem: 'Señala con qué frecuencia tuviste las siguientes reacciones físicas, psicológicas y comportamentales cuando estabas preocupado o nervioso.',
    groups: ['Reacciones físicas', 'Reacciones psicológicas', 'Reacciones comportamentales'],
    items: [
      { g: 0, t: 'Trastornos en el sueño (insomnio o pesadillas)' },
      { g: 0, t: 'Fatiga crónica (cansancio permanente)' },
      { g: 0, t: 'Dolores de cabeza o migrañas' },
      { g: 0, t: 'Problemas de digestión, dolor abdominal o diarrea' },
      { g: 0, t: 'Rascarse, morderse las uñas, frotarse, etc.' },
      { g: 0, t: 'Somnolencia o mayor necesidad de dormir' },
      { g: 1, t: 'Inquietud (incapacidad de relajarse y estar tranquilo)' },
      { g: 1, t: 'Sentimientos de depresión y tristeza (decaído)' },
      { g: 1, t: 'Ansiedad, angustia o desesperación.' },
      { g: 1, t: 'Problemas de concentración' },
      { g: 1, t: 'Sentimiento de agresividad o aumento de irritabilidad' },
      { g: 2, t: 'Conflictos o tendencia a polemizar o discutir' },
      { g: 2, t: 'Aislamiento de los demás' },
      { g: 2, t: 'Desgano para realizar las labores escolares' },
      { g: 2, t: 'Aumento o reducción del consumo de alimentos' },
    ],
  },
  {
    id: 'afrontamiento',
    title: 'Lo que haces para enfrentarlo',
    stem: 'Señala con qué frecuencia utilizaste las siguientes estrategias para enfrentar la situación que te causaba la preocupación o el nerviosismo.',
    items: [
      'Habilidad asertiva (defender nuestras preferencias ideas o sentimientos sin dañar a otros)',
      'Elaboración de un plan y ejecución de sus tareas',
      'Elogios a sí mismo',
      'La religiosidad (oraciones o asistencia a misa)',
      'Búsqueda de información sobre la situación',
      'Ventilación y confidencias (verbalización de la situación que preocupa)',
    ],
  },
]

export const itemText = it => (typeof it === 'string' ? it : it.t)
export const totalItems = SUBSCALES.reduce((n, s) => n + s.items.length, 0) // 29

// answers: { [subscaleId]: number[] } (1-5, or null if skipped)
export function score(answers) {
  const out = {}
  for (const s of SUBSCALES) {
    const vals = (answers[s.id] || []).filter(v => v != null)
    out[s.id] = {
      mean: vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100 : null,
      answered: vals.length,
      of: s.items.length,
    }
  }
  return out
}

// Reads a 1-5 mean back onto the scale's own anchors. Not a level, not a cut-off.
export function anchorFor(mean) {
  if (mean == null) return '—'
  return SCALE[Math.min(4, Math.max(0, Math.round(mean) - 1))].label.toLowerCase()
}
