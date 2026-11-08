# Arquitectura de Pulso UPCH, en una página

Para quien no construyó el sistema y tiene que explicarlo.

## Qué es, en una frase

Una app web que corre entera en el navegador del estudiante: le pide un inventario validado
(SISCO), le pregunta su carga académica, opcionalmente mide su ritmo de escritura contra su
propio patrón, le muestra todo en un panel honesto y le ofrece, en un clic, hablar con una
persona del servicio de bienestar.

## Las tres capas de medida, en orden de confianza

| Capa | Qué mide | Por qué confiar (o no) | Archivo |
|---|---|---|---|
| **SISCO** (principal) | Con qué frecuencia el estudiante vive estresores, reacciones y estrategias de afrontamiento, escala 1–5 | Validado en 628 universitarios de Lima (Manrique-Millones et al. 2019) | `app/src/sisco.js` |
| **Calendario** (observable) | Evaluaciones y entregas de la semana | Se observa, no se infiere. Carga ↔ estrés r = 0,62 (Lahme et al. 2024) | `app/src/App.jsx` (autorreporte) |
| **Tecleo** (exploratoria) | Velocidad, pausas, irregularidad, borrados, duración | **No mide estrés** (ρ = 0,078). Solo describe desviación respecto al propio patrón | `app/src/keystroke.js`, `app/src/detector.js` |

## Cómo fluye un dato

```
teclado ──► keystroke.js ──► 5 números ──┐
                (descarta la tecla)      │
SISCO ──► sisco.js ──► media por subescala ├──► store.js (localStorage) ──► Panel
autorreporte (descanso, energía, carga) ──┘                                  │
                                                                             ▼
                                       detector.js: ¿3 días seguidos distintos a tu patrón?
                                                │                        │
                                          no: "sin cambios"     sí: mensaje + educación nocebo
                                                └───────────┬────────────┘
                                                            ▼
                                     "Hablar con una persona" (Bienestar UPCH, un clic)
```

Nada de esto pasa por un servidor. La página es un conjunto de archivos estáticos en GitHub
Pages (`demo/`).

## El detector, sin matemáticas

1. Toma los primeros 14 días **de la misma persona** como su "normal".
2. Para cada métrica calcula el valor típico (mediana) y cuánto suele variar (MAD).
3. Cada día nuevo recibe un puntaje: cuántas "variaciones típicas" se alejó.
4. Un día es "distinto" si al menos 2 métricas se alejaron más de 3 variaciones típicas.
5. Solo si hay **3 días distintos seguidos** se habla de "cambio sostenido".

Nunca compara a una persona con otra. El mismo algoritmo existe en Python
(`model/detector.py`) y en JavaScript (`app/src/detector.js`); la prueba
`tests/test_parity.py` verifica que marcan exactamente los mismos días en 180 corridas.

## La demo y los datos sintéticos

Una persona nueva no tiene 14 días de historia. Para mostrar el panel, la demo usa 20 días
**sintéticos** (rotulados en pantalla) ajustados al ritmo que el estudiante acaba de medir, y
su prueba real es el día 21. Los botones "Estable", "Un día distinto" y "Cambio sostenido"
cambian la historia sintética para ver cómo responde la regla.

Resultado sobre datos sintéticos: 90/90 escenarios correctos, pero al reducir el tamaño del
cambio a un tercio solo detecta 3/30. Viabilidad técnica, no validez clínica
(`python model/train_eval.py`).

## Privacidad: dónde se ve en el código

- `app/src/keystroke.js` líneas 6–18: cada pulsación se guarda como `{t, kind}`; la tecla
  se descarta.
- Líneas 33–40: al terminar se devuelven 5 números y se borran hasta los tiempos crudos.
- `app/src/store.js`: todo en `localStorage`; exportar descarga JSON; borrar elimina la
  clave.
- `backend/main.py` (opcional, no usado por la demo): esquema con `extra="forbid"`, rechaza
  texto con HTTP 422; probado en `backend/test_api.py`.

## Mapa del repositorio

| Carpeta | Qué hay |
|---|---|
| `index.html` | Página de presentación |
| `demo/` | La app compilada que se publica (no editar a mano: `cd app && npm run build`) |
| `app/src/` | Código de la app (React) |
| `model/` | Generador sintético, detector de referencia en Python, evaluación |
| `tests/` | Paridad Python/JS y dirección de los mensajes |
| `backend/` | API opcional para un piloto |
| `docs/` | Ficha, evidencia, decisiones y este kit |

## Lo que el sistema NO hace

- No diagnostica ni clasifica en niveles.
- No guarda ni envía texto.
- No notifica a nadie.
- No funciona en segundo plano ni fuera de la app.
- No tiene, hoy, convenio con Bienestar ni aprobación de ética: ambos son propuestos.
