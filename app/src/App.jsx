import { useEffect, useMemo, useRef, useState } from 'react'
import { createRecorder } from './keystroke.js'
import { evaluate, describeChange, TYPING_FEATURES, BASELINE_DAYS, Z_THRESHOLD, STATE_CHANGE } from './detector.js'
import * as S from './sisco.js'
import * as store from './store.js'
import stable from '../../model/synthetic/stable.json'
import isolated from '../../model/synthetic/isolated.json'
import sustained from '../../model/synthetic/sustained.json'

// Bienestar Estudiantil UPCH (public page). A specific counseling channel is not confirmed yet:
// the UI says so instead of pretending. Override at build time with VITE_COUNSELING_URL.
const COUNSELING_URL = import.meta.env.VITE_COUNSELING_URL ?? 'https://bienestar.cayetano.edu.pe/'
const COUNSELING_CONFIRMED = Boolean(import.meta.env.VITE_COUNSELING_URL)
const REPO = 'https://github.com/IchiSieben/pulso-upch/blob/master/app/src/keystroke.js'
const SCENARIOS = { stable: ['Estable', stable], isolated: ['Un día distinto', isolated], sustained: ['Cambio sostenido', sustained] }
const FEATURE_LABEL = { wpm: 'Velocidad (ppm)', iki_mean_ms: 'Pausa entre teclas (ms)', iki_sd_ms: 'Irregularidad del ritmo (ms)', backspace_rate: 'Proporción de borrados', session_s: 'Duración (s)' }
// Synthetic weekly load for the demo cycle (evaluations + deliveries per week).
const DEMO_LOAD = [1, 2, 3, 4, 4, 3, 4, 5, 2, 4, 5, 6, 4, 3, 5, 6]

const STEPS = ['inicio', 'consentimiento', 'inventario', 'escritura', 'autorreporte', 'panel', 'datos']

export default function App() {
  const [data, setData] = useState(store.load)
  const [step, setStep] = useState(data.consent ? 'panel' : 'inicio')
  const [notice, setNotice] = useState('')
  useEffect(() => { if (data.consent || data.sisco.length || data.sessions.length) store.save(data) }, [data])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [step])
  const go = s => { setNotice(''); setStep(s) }
  const consent = data.consent || {}
  const next = from => {
    const order = ['consentimiento', consent.sisco && 'inventario', consent.typing && 'escritura', consent.self && 'autorreporte', 'panel'].filter(Boolean)
    return order[order.indexOf(from) + 1] || 'panel'
  }

  return (
    <>
      <nav className="bar">
        <span className="brand">Pulso <b>UPCH</b></span>
        <span className="bar-note">No es un diagnóstico</span>
      </nav>
      <Progress step={step} />
      {notice && <p className="notice" role="status">{notice}</p>}
      <main>
        {step === 'inicio' && <Intro onStart={() => go('consentimiento')} />}
        {step === 'consentimiento' && <Consent initial={data.consent} onDone={c => { setData(d => ({ ...d, consent: c })); setStep(['inventario', 'escritura', 'autorreporte'][[c.sisco, c.typing, c.self].indexOf(true)] || 'panel') }} />}
        {step === 'inventario' && <Inventory onDone={entry => { setData(d => ({ ...d, sisco: [...d.sisco, entry] })); go(next('inventario')) }} onSkip={() => go(next('inventario'))} />}
        {step === 'escritura' && <Typing onDone={m => { setData(d => ({ ...d, pending: m })); go(next('escritura')) }} onSkip={() => go(next('escritura'))} />}
        {step === 'autorreporte' && <SelfReport onDone={rep => { setData(d => commitSession(d, rep)); go('panel') }} />}
        {step === 'panel' && <Panel data={data} onRedo={() => go('consentimiento')} onData={() => go('datos')} />}
        {step === 'datos' && <MyData data={data} onBack={() => go('panel')} onErased={() => { const ok = store.erase(); setData({ consent: null, sisco: [], sessions: [] }); setStep('inicio'); setNotice(ok ? 'Tus datos se borraron de este navegador. Puedes comprobarlo: no queda nada guardado.' : 'No se pudo confirmar el borrado.') }} />}
        {step !== 'panel' && step !== 'inicio' && step !== 'datos' && data.consent && step !== 'consentimiento' && (
          <p className="skip-all"><button className="link" onClick={() => { setData(d => d.pending ? commitSession(d, {}) : d); go('panel') }}>Ir a mi panel</button></p>
        )}
      </main>
      <footer>
        <p>Hackathon FACI 2026 · Universidad Peruana Cayetano Heredia · Reto 3</p>
        <p>Prototipo con historia sintética: demuestra viabilidad técnica, no validez clínica. Nada sale de este dispositivo.</p>
      </footer>
    </>
  )
}

function commitSession(d, rep) {
  const session = { date: new Date().toISOString(), ...(d.pending || {}), ...rep }
  const { pending, ...rest } = d
  return { ...rest, sessions: [...d.sessions, session] }
}

function Progress({ step }) {
  const i = STEPS.indexOf(step)
  return <div className="progress" aria-hidden="true"><span style={{ width: `${(Math.max(0, i) / (STEPS.length - 2)) * 100}%` }} /></div>
}

/* ---------- 0 · Intro ---------- */
function Intro({ onStart }) {
  return (
    <section className="hero">
      <p className="eyebrow">Para estudiantes de la UPCH</p>
      <h1>Una lectura honesta<br />de tu semana.</h1>
      <p className="lead">Un inventario validado en universitarios peruanos, tu carga académica y, si quieres, un experimento con tu ritmo de escritura. Todo comparado solo contigo. Y, si lo necesitas, un camino corto hasta una persona real.</p>
      <button className="primary" onClick={onStart}>Empezar</button>
      <ul className="facts">
        <li><b>3 minutos.</b> 29 preguntas breves y una prueba de escritura opcional.</li>
        <li><b>Nada sale de tu dispositivo.</b> No hay servidor. Puedes exportar o borrar todo.</li>
        <li><b>No es un diagnóstico.</b> Describe hábitos; no evalúa tu salud.</li>
      </ul>
    </section>
  )
}

/* ---------- 1 · Consent ---------- */
function Consent({ initial, onDone }) {
  const [c, setC] = useState(initial || { sisco: true, typing: true, self: true })
  const Row = ({ k, title, children }) => (
    <label className="toggle">
      <span><b>{title}</b><small>{children}</small></span>
      <input type="checkbox" checked={c[k]} onChange={e => setC({ ...c, [k]: e.target.checked })} />
      <i aria-hidden="true" />
    </label>
  )
  return (
    <section>
      <p className="eyebrow">Paso 1 · Consentimiento</p>
      <h2>Tú decides qué se mide.</h2>
      <p className="lead">Cada parte se activa por separado. Puedes desactivarla ahora o más tarde.</p>
      <div className="list">
        <Row k="sisco" title="Inventario SISCO de estrés académico">La medida principal. 29 preguntas sobre situaciones, reacciones y estrategias. Validado en 628 universitarios de Lima.</Row>
        <Row k="typing" title="Experimento con tu ritmo de escritura">Medimos <em>cómo</em> escribes (velocidad, pausas, borrados), nunca <em>qué</em> escribes. Es exploratorio: la evidencia dice que no mide estrés.</Row>
        <Row k="self" title="Descanso, energía y carga de la semana">Tres preguntas voluntarias. Puedes dejar cualquiera en blanco.</Row>
      </div>
      <ul className="fine">
        <li>Todo se guarda solo en este navegador. No se envía a la universidad ni a nadie.</li>
        <li>Nada de esto es un diagnóstico ni una evaluación de tu salud mental.</li>
        <li>Puedes exportar o borrar tus datos en cualquier momento.</li>
        <li>En un piloto real aplicarían la Ley N.° 29733 y su Reglamento (D.S. N.° 016-2024-JUS).</li>
      </ul>
      <button className="primary" onClick={() => onDone({ ...c, at: new Date().toISOString() })}>Continuar</button>
    </section>
  )
}

/* ---------- 2 · SISCO (primary measure) ---------- */
function Scale({ value, onChange, name }) {
  return (
    <div className="scale" role="radiogroup" aria-label={name}>
      {S.SCALE.map(o => (
        <button key={o.v} role="radio" aria-checked={value === o.v} className={value === o.v ? 'on' : ''} onClick={() => onChange(o.v)}>
          <span className="n">{o.v}</span><span className="l">{o.label}</span>
        </button>
      ))}
    </div>
  )
}

function Inventory({ onDone, onSkip }) {
  const [page, setPage] = useState(-1) // -1 = filter + intensity
  const [filter, setFilter] = useState(null)
  const [intensity, setIntensity] = useState(null)
  const [ans, setAns] = useState(() => Object.fromEntries(S.SUBSCALES.map(s => [s.id, s.items.map(() => null)])))
  const sub = S.SUBSCALES[page]
  const finish = (skipped = false) => {
    const answers = skipped ? {} : ans
    onDone({ date: new Date().toISOString(), filter, intensity, answers, scores: S.score(answers) })
  }
  if (page === -1) return (
    <section>
      <p className="eyebrow">Paso 2 · Medida principal</p>
      <h2>Inventario SISCO</h2>
      <p className="lead">{S.CITATION.short}. Responde pensando en este semestre. No hay respuestas buenas ni malas.</p>
      <div className="q">
        <p>{S.FILTER}</p>
        <div className="seg">
          {[['Sí', true], ['No', false]].map(([l, v]) => <button key={l} className={filter === v ? 'on' : ''} onClick={() => setFilter(v)}>{l}</button>)}
        </div>
      </div>
      {filter === true && (
        <div className="q">
          <p>{S.INTENSITY}</p>
          <div className="seg five">{[1, 2, 3, 4, 5].map(v => <button key={v} className={intensity === v ? 'on' : ''} onClick={() => setIntensity(v)}>{v}</button>)}</div>
        </div>
      )}
      {filter === false && <p className="soft">Según el instrumento, si no tuviste momentos de preocupación o nerviosismo el inventario termina aquí. Puedes seguir con el resto de la app.</p>}
      <div className="actions">
        {filter === true && <button className="primary" disabled={intensity == null} onClick={() => setPage(0)}>Siguiente</button>}
        {filter === false && <button className="primary" onClick={() => finish(true)}>Continuar</button>}
        <button className="link" onClick={onSkip}>Omitir el inventario</button>
      </div>
    </section>
  )
  const vals = ans[sub.id]
  let lastGroup = -1
  return (
    <section>
      <p className="eyebrow">Inventario SISCO · {page + 1} de {S.SUBSCALES.length}</p>
      <h2>{sub.title}</h2>
      <p className="lead">{sub.stem}</p>
      <ol className="items">
        {sub.items.map((it, i) => {
          const g = typeof it === 'string' ? -1 : it.g
          const head = g !== lastGroup && g >= 0 ? <li className="group" key={'g' + g}>{sub.groups[g]}</li> : null
          lastGroup = g
          return [head, (
            <li key={i}>
              <p>{S.itemText(it)}</p>
              <Scale name={S.itemText(it)} value={vals[i]} onChange={v => setAns({ ...ans, [sub.id]: vals.map((x, j) => (j === i ? v : x)) })} />
            </li>
          )]
        })}
      </ol>
      <p className="fine">{vals.filter(v => v != null).length} de {vals.length} respondidas. Puedes dejar preguntas en blanco.</p>
      <div className="actions">
        {page < S.SUBSCALES.length - 1
          ? <button className="primary" onClick={() => setPage(page + 1)}>Siguiente</button>
          : <button className="primary" onClick={() => finish()}>Terminar inventario</button>}
        <button className="link" onClick={() => setPage(page - 1)}>Atrás</button>
      </div>
      {!S.SOURCE_VERIFIED && <p className="fine pending">[por verificar] {S.SOURCE_NOTE}</p>}
    </section>
  )
}

/* ---------- 3 · Typing (exploratory signal) ---------- */
function Exploratory() {
  return <p className="tag-exp"><b>Señal exploratoria.</b> No mide estrés: entre personas, el ritmo de escritura predice estrés con ρ = 0,078 (Naegelin et al., 2025). Aquí solo se compara contigo.</p>
}

function Typing({ onDone, onSkip }) {
  const rec = useRef(createRecorder())
  const area = useRef(null)
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState('')
  const finish = () => {
    const m = rec.current.summarize()
    if (area.current) area.current.value = '' // the text is discarded from the screen too
    if (!m || count < 30) { setMsg('Escribe un poco más: hacen falta al menos 30 pulsaciones.'); rec.current = createRecorder(); setCount(0); return }
    onDone(m)
  }
  return (
    <section>
      <p className="eyebrow">Paso 3 · Experimento</p>
      <h2>Escribe lo que quieras durante un minuto.</h2>
      <Exploratory />
      <p className="lead">Por ejemplo, cómo fue tu día. <b>Lo que escribas no se guarda ni se envía</b>: solo contamos el tiempo entre teclas y los borrados.</p>
      <textarea ref={area} rows={6} autoComplete="off" autoCorrect="off" spellCheck={false}
        onKeyDown={e => { rec.current.onKeyDown(e); setCount(rec.current.count()) }}
        placeholder="Escribe aquí. Se borra al terminar." />
      <p className="fine">Pulsaciones contadas: {count} · <a href={REPO} target="_blank" rel="noopener noreferrer">Ver el código que descarta el texto</a></p>
      {msg && <p className="soft">{msg}</p>}
      <div className="actions">
        <button className="primary" onClick={finish}>Terminar</button>
        <button className="link" onClick={onSkip}>Omitir el experimento</button>
      </div>
    </section>
  )
}

/* ---------- 4 · Self-report ---------- */
function SelfReport({ onDone }) {
  const [rest, setRest] = useState('')
  const [energy, setEnergy] = useState(null)
  const [evals, setEvals] = useState('')
  return (
    <section>
      <p className="eyebrow">Paso 4 · Voluntario</p>
      <h2>Tres preguntas rápidas.</h2>
      <div className="q"><p>¿Cuántas horas descansaste anoche?</p>
        <input inputMode="decimal" type="number" min="0" max="24" step="0.5" value={rest} onChange={e => setRest(e.target.value)} placeholder="Ej. 7" /></div>
      <div className="q"><p>¿Cuánta energía sientes hoy?</p>
        <div className="seg five">{[1, 2, 3, 4, 5].map(v => <button key={v} className={energy === v ? 'on' : ''} onClick={() => setEnergy(energy === v ? null : v)}>{v}</button>)}</div>
        <p className="fine">1 = muy poca · 5 = mucha</p></div>
      <div className="q"><p>¿Cuántas evaluaciones o entregas tienes esta semana?</p>
        <input inputMode="numeric" type="number" min="0" max="30" value={evals} onChange={e => setEvals(e.target.value)} placeholder="Ej. 3" /></div>
      <div className="actions">
        <button className="primary" onClick={() => onDone({
          rest_hours: rest === '' ? null : Number(rest), energy_1_5: energy, evaluations_week: evals === '' ? null : Number(evals),
        })}>Ver mi panel</button>
        <button className="link" onClick={() => onDone({})}>Prefiero no responder</button>
      </div>
    </section>
  )
}

/* ---------- 5 · Panel ---------- */
function buildHistory(scenario, today) {
  // 20 synthetic days rescaled to YOUR measured rhythm, so the baseline is "you"; day 21 is real.
  const synth = SCENARIOS[scenario][1].slice(0, 20).map(d => ({ ...d }))
  if (!today) return SCENARIOS[scenario][1]
  const base = synth.slice(0, BASELINE_DAYS)
  for (const f of TYPING_FEATURES) {
    const med = [...base.map(d => d[f])].sort((a, b) => a - b)[BASELINE_DAYS / 2]
    const k = today[f] > 0 && med > 0 ? today[f] / med : 1
    synth.forEach(d => { d[f] = Math.round(d[f] * k * 1000) / 1000 })
  }
  return [...synth, { day: 21, synthetic: false, ...Object.fromEntries(TYPING_FEATURES.map(f => [f, today[f]])) }]
}

function Panel({ data, onRedo, onData }) {
  const lastSisco = data.sisco[data.sisco.length - 1]
  const lastSession = [...data.sessions].reverse().find(s => s.wpm != null)
  const lastAny = data.sessions[data.sessions.length - 1]
  const [scenario, setScenario] = useState('sustained')
  const [feature, setFeature] = useState('wpm')
  const days = useMemo(() => buildHistory(scenario, lastSession), [scenario, lastSession])
  const result = useMemo(() => evaluate(days), [days])
  const change = result.state === STATE_CHANGE
  const typingOn = data.consent?.typing !== false
  const thisWeek = lastAny?.evaluations_week

  return (
    <>
      <section className="hero small">
        <p className="eyebrow">Tu panel</p>
        <h1>Tu semana,<br />comparada contigo.</h1>
        <p className="lead">Tres lecturas, en orden de confianza. La primera es la que cuenta.</p>
      </section>

      <section className="card primary-measure">
        <p className="eyebrow">1 · Medida principal · validada</p>
        <h2>Inventario SISCO</h2>
        {!lastSisco && <p className="soft">No respondiste el inventario. <button className="link" onClick={onRedo}>Responderlo ahora</button></p>}
        {lastSisco && lastSisco.filter === false && <p className="lead">Indicaste que este semestre no tuviste momentos de preocupación o nerviosismo. Según el instrumento, el inventario termina ahí.</p>}
        {lastSisco && lastSisco.filter !== false && (
          <>
            <p className="lead">Con qué frecuencia te pasa cada cosa, en la escala del propio inventario (1 = nunca, 5 = siempre).</p>
            {S.SUBSCALES.map(s => {
              const sc = lastSisco.scores[s.id]
              return (
                <div className="meter" key={s.id}>
                  <div className="meter-head"><span>{s.title}</span><b>{sc.mean == null ? '—' : sc.mean.toFixed(1).replace('.', ',')}</b></div>
                  <div className="track"><span style={{ width: sc.mean ? `${((sc.mean - 1) / 4) * 100}%` : 0 }} className={s.id === 'afrontamiento' ? 'cope' : ''} /></div>
                  <p className="fine">En promedio, «{S.anchorFor(sc.mean)}» · {sc.answered} de {sc.of} respondidas</p>
                </div>
              )
            })}
            <p className="fine">Nivel de preocupación declarado: {lastSisco.intensity ?? '—'} de 5. Este puntaje <b>no tiene un valor "normal" ni "anormal"</b>: el SISCO no tiene puntos de corte clínicos validados en Perú y no diagnostica. Sirve para que tú lo compares contigo en unas semanas. <a href={S.CITATION.doi} target="_blank" rel="noopener noreferrer">Ver la validación</a></p>
          </>
        )}
      </section>

      <section className="card">
        <p className="eyebrow">2 · Carga académica · observable</p>
        <h2>{thisWeek != null ? `${thisWeek} evaluaciones o entregas esta semana` : 'Tu carga de la semana'}</h2>
        <LoadBars thisWeek={thisWeek} />
        <p className="fine">Barras grises: ciclo de ejemplo (sintético). En estudiantes universitarios, la carga percibida y el estrés van juntos (r = 0,62) y el estrés suele subir en las primeras semanas y quedarse en una meseta (Lahme et al., 2024). No prometemos detectar picos en exámenes.</p>
      </section>

      {typingOn && (
        <section className="card">
          <p className="eyebrow">3 · Experimento · exploratorio</p>
          <h2>Tu ritmo de escritura frente a tu propio patrón</h2>
          <Exploratory />
          <div className="seg wrap" role="group" aria-label="Escenario sintético">
            {Object.entries(SCENARIOS).map(([k, [l]]) => <button key={k} className={scenario === k ? 'on' : ''} onClick={() => setScenario(k)}>{l}</button>)}
          </div>
          <p className="fine synth">Historia sintética de demostración: los días 1–20 son simulados {lastSession ? 'y ajustados a tu ritmo de hoy; el día 21 es tu prueba real.' : '(no hiciste la prueba de escritura).'} Elige un escenario para ver cómo responde la regla.</p>
          <Chart days={days} result={result} feature={feature} />
          <div className="seg wrap small" role="group" aria-label="Métrica">
            {TYPING_FEATURES.map(f => <button key={f} className={feature === f ? 'on' : ''} onClick={() => setFeature(f)}>{FEATURE_LABEL[f]}</button>)}
          </div>
          {change ? <ChangeMessage result={result} /> : (
            <div className="calm">
              <h3>Sin cambios relevantes</h3>
              <p>Tu ritmo de escritura se mantiene dentro de tu propio patrón{result.longest_run ? ` (hubo ${result.longest_run === 1 ? 'un día distinto' : `${result.longest_run} días distintos`}, y eso es normal)` : ''}. Esto tampoco dice nada sobre tu salud: solo que escribes como sueles escribir.</p>
            </div>
          )}
        </section>
      )}

      <Bridge />

      <section className="card quiet">
        <h2>Tus datos</h2>
        <p className="lead">Están solo en este navegador.</p>
        <div className="actions">
          <button className="secondary" onClick={onData}>Exportar o borrar mis datos</button>
          <button className="link" onClick={onRedo}>Repetir el recorrido</button>
        </div>
      </section>
    </>
  )
}

function LoadBars({ thisWeek }) {
  const weeks = thisWeek != null ? [...DEMO_LOAD.slice(0, 7), thisWeek] : DEMO_LOAD.slice(0, 8)
  const max = Math.max(6, ...weeks)
  return (
    <div className="bars" role="img" aria-label="Evaluaciones por semana del ciclo">
      {weeks.map((v, i) => (
        <div key={i} className={i === weeks.length - 1 && thisWeek != null ? 'b you' : 'b'}>
          <span style={{ height: `${(v / max) * 100}%` }} />
          <small>{i === weeks.length - 1 && thisWeek != null ? 'hoy' : `S${i + 1}`}</small>
        </div>
      ))}
    </div>
  )
}

function Chart({ days, result, feature }) {
  const W = 460, H = 250, L = 46, R = 8, T = 18, B = 30
  const vals = days.map(d => Number(d[feature]))
  const st = result.stats?.[feature]
  const lo = st ? st.median - Z_THRESHOLD * st.spread : Math.min(...vals)
  const hi = st ? st.median + Z_THRESHOLD * st.spread : Math.max(...vals)
  const min = Math.min(lo, ...vals), max = Math.max(hi, ...vals)
  const pad = (max - min) * 0.08 || 1
  const x = i => L + (i * (W - L - R)) / (days.length - 1)
  const y = v => T + (H - T - B) * (1 - (v - (min - pad)) / (max - min + 2 * pad))
  const path = vals.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const fmt = v => (feature === 'backspace_rate' ? v.toFixed(2) : Math.round(v)).toString().replace('.', ',')
  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${FEATURE_LABEL[feature]} por día`}>
        {st && <rect x={L} y={y(hi)} width={W - L - R} height={y(lo) - y(hi)} className="band" />}
        <line x1={x(BASELINE_DAYS - 0.5)} x2={x(BASELINE_DAYS - 0.5)} y1={T} y2={H - B} className="split" />
        <text x={L + 6} y={T + 12} className="lbl">tu línea base</text>
        <text x={x(BASELINE_DAYS - 0.5) + 6} y={T + 12} className="lbl">evaluación</text>
        {st && <><text x={L - 6} y={y(hi) + 4} className="lbl" textAnchor="end">{fmt(hi)}</text><text x={L - 6} y={y(lo) + 4} className="lbl" textAnchor="end">{fmt(lo)}</text></>}
        <path d={path} className="line" />
        {days.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(vals[i])} r={d.synthetic === false ? 6 : 3.5}
            className={result.flags[i] ? 'dot flag' : d.synthetic === false ? 'dot you' : 'dot'}>
            <title>{`Día ${d.day}${d.synthetic === false ? ' (tu prueba)' : ' (sintético)'}: ${fmt(vals[i])}${result.flags[i] ? ' · distinto a tu patrón' : ''}`}</title>
          </circle>
        ))}
        {days.map((d, i) => (i % 5 === 0 || i === days.length - 1) && <text key={'t' + i} x={x(i)} y={H - 10} className="lbl" textAnchor="middle">{d.day}</text>)}
      </svg>
      <figcaption>Franja: tu rango habitual (mediana ± 3 desviaciones robustas de tus días 1–14). <span className="k flag" /> día distinto a tu patrón en al menos 2 métricas · <span className="k you" /> tu prueba de hoy. Se necesitan 3 días distintos seguidos para hablar de un cambio sostenido.</figcaption>
    </figure>
  )
}

/* ---------- Result message with nocebo education (Sandra et al., 2025) ---------- */
function joinEs(xs) { return xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} y ${xs[xs.length - 1]}` }

function ChangeMessage({ result }) {
  const what = describeChange(result).slice(0, 3).map(c => c.text)
  const n = result.longest_run
  return (
    <div className="change" role="region" aria-label="Cambio sostenido observado">
      <h3>Observamos un cambio sostenido en tu forma de escribir</h3>
      <div className="four">
        <div><h4>Qué cambió</h4><p>Durante {n} días seguidos {what.length ? joinEs(what) : 'tu ritmo se alejó'} respecto a tus primeras dos semanas.</p></div>
        <div><h4>Es normal que cambie</h4><p>El ritmo de escritura fluctúa por muchas razones que no tienen nada que ver con la salud: cansancio, una semana con más entregas, dormir mal, otro teclado, escribir en el celular o con prisa.</p></div>
        <div><h4>No es un diagnóstico</h4><p>Esto no evalúa tu salud. La mejor evidencia disponible muestra que el ritmo de escritura casi no se relaciona con el estrés (ρ = 0,078). Solo describe que escribiste distinto.</p></div>
        <div><h4>Un dato útil</h4><p>Leer sobre un problema de salud puede hacer que lo sintamos como propio aunque nada haya cambiado. Se llama <b>efecto nocebo</b>, y saberlo reduce ese efecto (Sandra et al., 2025).</p></div>
      </div>
      <p className="choice">Si te apetece conversar con alguien, el enlace está abajo. Si no, no pasa nada: esto queda solo en tu dispositivo y nadie más lo ve.</p>
    </div>
  )
}

/* ---------- 6 · Bridge ---------- */
function Bridge() {
  return (
    <section className="bridge">
      <p className="eyebrow">Cuando quieras</p>
      <h2>Hablar con una persona.</h2>
      <p className="lead">La UPCH tiene un servicio de bienestar para sus estudiantes. Un clic y estás ahí. No se le envía ningún resultado de esta app.</p>
      <a className="primary" href={COUNSELING_URL} target="_blank" rel="noopener noreferrer">Quiero orientación</a>
      {!COUNSELING_CONFIRMED && <p className="fine pending">Enlace a Bienestar Estudiantil UPCH. El canal directo de consejería psicológica está <b>pendiente de confirmar</b> con la universidad.</p>}
      <p className="fine">Si estás en peligro o piensas en hacerte daño, llama a la Línea 113, opción 5 (salud mental, MINSA), o acude a emergencias.</p>
    </section>
  )
}

/* ---------- 7 · My data ---------- */
function MyData({ data, onBack, onErased }) {
  const [confirm, setConfirm] = useState(false)
  const nSessions = data.sessions.length, nSisco = data.sisco.length
  return (
    <section>
      <p className="eyebrow">Tus datos</p>
      <h2>Son tuyos.</h2>
      <p className="lead">En este navegador hay {nSisco} inventario{nSisco === 1 ? '' : 's'} y {nSessions} sesión{nSessions === 1 ? '' : 'es'}. Ningún texto escrito: solo números.</p>
      <pre className="peek">{JSON.stringify(data.sessions[nSessions - 1] || {}, null, 1)}</pre>
      <div className="actions">
        <button className="secondary" onClick={() => store.exportJson(data)}>Exportar mis datos (JSON)</button>
        {!confirm
          ? <button className="secondary" onClick={() => setConfirm(true)}>Borrar mis datos</button>
          : <button className="primary" onClick={onErased}>Sí, borrar todo</button>}
        <button className="link" onClick={onBack}>Volver al panel</button>
      </div>
    </section>
  )
}
