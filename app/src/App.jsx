import { useRef, useState } from 'react'
import { createRecorder } from './keystroke.js'

const API = import.meta.env.VITE_API ?? '/api'
// Counseling channel: set to the official UPCH counseling URL for a real pilot.
const COUNSELING_URL = import.meta.env.VITE_COUNSELING_URL ?? 'https://www.cayetano.edu.pe'
const PROMPT_TEXT = 'Escribe libremente durante un minuto sobre cómo fue tu día. Nada de lo que escribas se guarda ni se envía.'

const CAUSES = 'Un cambio en tu escritura puede deberse a cansancio, exámenes, distracción, una lesión o a usar otro teclado. Esto no es un diagnóstico ni una evaluación de tu salud mental.'

function userId() {
  try {
    let id = localStorage.getItem('pulso_uid')
    if (!id) { id = crypto.randomUUID(); localStorage.setItem('pulso_uid', id) }
    return id
  } catch { return 'demo-' + Math.random().toString(36).slice(2, 10) }
}

export default function App() {
  const [step, setStep] = useState('consent')
  const [uid, setUid] = useState(userId)
  const [metrics, setMetrics] = useState(null)
  const [rest, setRest] = useState('')
  const [energy, setEnergy] = useState('')
  const [scenario, setScenario] = useState('sustained')
  const [trend, setTrend] = useState(null)
  const [msg, setMsg] = useState('')
  const rec = useRef(createRecorder())
  const [typed, setTyped] = useState(0)
  const area = useRef(null)

  const finishTyping = () => {
    const m = rec.current.summarize()
    if (area.current) area.current.value = '' // discard the text from the screen too
    if (!m) { setMsg('Escribe un poco más para medir el ritmo.'); return }
    setMsg(''); setMetrics(m); setStep('report')
  }

  const submit = async (skip) => {
    const body = { ...metrics }
    if (!skip && rest !== '') body.rest_hours = Number(rest)
    if (!skip && energy !== '') body.energy_1_5 = Number(energy)
    try {
      const r = await fetch(`${API}/sessions/${uid}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      if (!r.ok) throw new Error(await r.text())
      await loadTrend(scenario)
      setStep('trend')
    } catch (e) { setMsg('No se pudo conectar con el backend: ' + e.message) }
  }

  const loadTrend = async (s) => {
    setScenario(s)
    const r = await fetch(`${API}/trend/${uid}?scenario=${s}`)
    setTrend(await r.json())
  }

  const erase = async () => {
    try {
      const r = await fetch(`${API}/data/${uid}`, { method: 'DELETE' })
      const d = await r.json()
      try { localStorage.removeItem('pulso_uid') } catch {}
      setMetrics(null); setTrend(null); setRest(''); setEnergy('')
      setUid(userId())
      setMsg(d.exists_now === false ? 'Tus datos fueron eliminados del servidor y de este navegador.' : 'Error al borrar.')
      setStep('consent')
    } catch (e) { setMsg('No se pudo borrar: ' + e.message) }
  }

  return (
    <main>
      <header>
        <h1>Pulso UPCH</h1>
        <p className="tag">Tu ritmo de escritura comparado solo contigo mismo. <b>No es un diagnóstico.</b></p>
      </header>
      {msg && <p className="msg">{msg}</p>}

      {step === 'consent' && (
        <section>
          <h2>1 · Consentimiento informado</h2>
          <ul>
            <li>Mediremos <b>cómo</b> escribes (velocidad, pausas, borrados, duración), <b>nunca qué</b> escribes. No se guarda texto, palabras ni contraseñas.</li>
            <li>Solo medimos dentro de esta app. Nada en segundo plano, ni WhatsApp, ni redes.</li>
            <li>Las horas de descanso y la energía son <b>voluntarias</b>.</li>
            <li>El resultado solo describe un cambio respecto a tu propio patrón. {CAUSES}</li>
            <li>Puedes borrar tus datos cuando quieras.</li>
            <li>En un piloto real, el tratamiento se rige por la Ley N.° 29733 y su Reglamento (D.S. N.° 016-2024-JUS).</li>
          </ul>
          <button onClick={() => { setMsg(''); setStep('typing') }}>Acepto y quiero continuar</button>
        </section>
      )}

      {step === 'typing' && (
        <section>
          <h2>2 · Prueba de escritura</h2>
          <p>{PROMPT_TEXT}</p>
          <textarea ref={area} rows={6} autoComplete="off" spellCheck={false}
            onKeyDown={(e) => { rec.current.onKeyDown(e); setTyped(rec.current.count()) }}
            placeholder="Escribe aquí… (no se guarda)" />
          <p className="small">Pulsaciones medidas: {typed} · El contenido se descarta al terminar.</p>
          <button onClick={finishTyping}>Terminar prueba</button>
        </section>
      )}

      {step === 'report' && metrics && (
        <section>
          <h2>3 · Autorreporte (voluntario)</h2>
          <p className="small">Esto es todo lo que se enviará de tu prueba:</p>
          <pre>{JSON.stringify(metrics, null, 1)}</pre>
          <label>Horas de descanso anoche
            <input type="number" min="0" max="24" step="0.5" value={rest} onChange={e => setRest(e.target.value)} />
          </label>
          <label>Energía percibida (1–5)
            <select value={energy} onChange={e => setEnergy(e.target.value)}>
              <option value="">Prefiero no responder</option>
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <div className="row">
            <button onClick={() => submit(false)}>Enviar</button>
            <button className="ghost" onClick={() => submit(true)}>Omitir autorreporte</button>
          </div>
        </section>
      )}

      {step === 'trend' && trend && (
        <section>
          <h2>4 · Tendencia de 21 días</h2>
          <p className="synthetic">DATOS SINTÉTICOS · Días 1–20 son simulados para la demo; el día 21 es tu prueba de hoy.</p>
          <div className="row">
            <span className="small">Escenario sintético:</span>
            {[['stable', 'Estable'], ['isolated', 'Cambio aislado'], ['sustained', 'Cambio sostenido']].map(([k, l]) =>
              <button key={k} className={scenario === k ? '' : 'ghost'} onClick={() => loadTrend(k)}>{l}</button>)}
          </div>
          <Chart trend={trend} />
          <button onClick={() => setStep('result')}>Ver resultado</button>
        </section>
      )}

      {step === 'result' && trend && (
        <section>
          <h2>5 · Resultado</h2>
          <div className={trend.state === 'cambio sostenido observado' ? 'result change' : 'result ok'}>
            {trend.state === 'cambio sostenido observado' ? 'Cambio sostenido observado' : 'Sin cambios relevantes'}
          </div>
          <p>{trend.state === 'cambio sostenido observado'
            ? 'Durante al menos 3 días seguidos tu ritmo de escritura se alejó de tu propio patrón habitual.'
            : 'Tu ritmo de escritura se mantiene dentro de tu propio patrón habitual.'}</p>
          <p className="causes">{CAUSES}</p>
          <p className="synthetic">Resultado calculado sobre datos sintéticos de demostración.</p>
          <h3>6 · Orientación (voluntaria)</h3>
          <p className="small">Si quieres conversar con alguien, puedes acceder al canal de consejería psicológica de la UPCH. <b>No se le envía ningún resultado de esta app.</b></p>
          <a className="button" href={COUNSELING_URL} target="_blank" rel="noopener noreferrer">Quiero orientación</a>
          <h3>7 · Tus datos</h3>
          <button className="danger" onClick={erase}>Borrar mis datos</button>
          <button className="ghost" onClick={() => setStep('trend')}>Volver a la tendencia</button>
        </section>
      )}
      <footer>Hackathon FACI 2026 · UPCH · Prototipo con datos sintéticos: viabilidad técnica, no validez clínica.</footer>
    </main>
  )
}

function Chart({ trend }) {
  const W = 640, H = 220, P = 32
  const days = trend.days
  const vals = days.map(d => d.wpm)
  const min = Math.min(...vals) - 3, max = Math.max(...vals) + 3
  const x = i => P + (i * (W - 2 * P)) / (days.length - 1)
  const y = v => H - P - ((v - min) * (H - 2 * P)) / (max - min)
  const path = vals.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Velocidad de escritura por día">
        <rect x={P} y={P / 2} width={x(13) - P} height={H - 1.5 * P} className="base" />
        <text x={P + 4} y={P / 2 + 14} className="lbl">línea base (días 1–14)</text>
        <path d={path} className="line" />
        {days.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d.wpm)} r={d.synthetic === false ? 6 : 4}
            className={trend.flags[i] ? 'dot flag' : d.synthetic === false ? 'dot you' : 'dot'}>
            <title>{`Día ${d.day}${d.synthetic === false ? ' (tú, hoy)' : ' (sintético)'}: ${d.wpm} ppm${trend.flags[i] ? ' · atípico' : ''}`}</title>
          </circle>
        ))}
        {days.map((d, i) => i % 5 === 0 || i === days.length - 1
          ? <text key={'t' + i} x={x(i)} y={H - 8} className="lbl" textAnchor="middle">{d.day}</text> : null)}
      </svg>
      <figcaption>Velocidad (palabras/min) por día. <span className="k flag" /> día atípico según el modelo · <span className="k you" /> tu prueba de hoy. Racha máxima de días atípicos: {trend.longest_run ?? 0} (se requieren 3).</figcaption>
    </figure>
  )
}
