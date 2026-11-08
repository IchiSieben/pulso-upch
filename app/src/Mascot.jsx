import { line } from './mascot.js'

const LEAVES = [
  [], // stage 0: two small leaves drawn below
  [[-1, 46, 13], [1, 40, 11]],
  [[-1, 46, 13], [1, 40, 11]],
]

export default function Mascot({ stage, step }) {
  const top = stage === 0 ? 52 : stage === 1 ? 36 : 30
  return (
    <figure className="mascot" data-stage={stage}>
      <svg viewBox="0 0 120 120" width="88" height="88" aria-hidden="true">
        <g className="m-body">
          <line x1="60" y1="70" x2="60" y2={top} className="m-stem" />
          <ellipse cx="51" cy="58" rx="9" ry="4.5" transform="rotate(-25 51 58)" className="m-leaf" />
          <ellipse cx="69" cy="56" rx="9" ry="4.5" transform="rotate(25 69 56)" className="m-leaf" />
          {LEAVES[stage].map(([s, y, r]) => (
            <ellipse key={y} cx={60 + s * r * 0.8} cy={y} rx={r} ry={r / 2.2} transform={`rotate(${s * 25} ${60 + s * r * 0.8} ${y})`} className="m-leaf" />
          ))}
          {stage === 2 && (
            <g>
              {[0, 72, 144, 216, 288].map(a => (
                <circle key={a} cx={60 + 7 * Math.sin(a * Math.PI / 180)} cy={top - 7 * Math.cos(a * Math.PI / 180)} r="5.5" className="m-petal" />
              ))}
              <circle cx="60" cy={top} r="4" className="m-pot" />
            </g>
          )}
          <path d="M26 70 h68 a34 30 0 0 1 -68 0z" className="m-pot" />
          <circle cx="50" cy="82" r="3" className="m-eye" />
          <circle cx="70" cy="82" r="3" className="m-eye" />
        </g>
      </svg>
      {step && <figcaption>{line(step)}</figcaption>}
    </figure>
  )
}
