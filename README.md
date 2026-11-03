# Pulso UPCH

> ## ⚠️ Límite ético — léelo antes que nada
>
> **Pulso UPCH NO diagnostica depresión ni ninguna condición de salud mental. No etiqueta a
> nadie.** Solo describe si tu forma de escribir *dentro de esta app* cambió respecto a **tu
> propio patrón**.
>
> Un cambio en la escritura puede deberse a **cansancio, exámenes, distracción, una lesión en
> la mano o simplemente a usar otro teclado**. Por eso el resultado nunca es una alerta clínica.
>
> El botón de orientación abre el canal de consejería psicológica de la UPCH **de forma
> voluntaria** y **no le transmite ningún resultado del modelo**.
>
> Las pruebas se hicieron con **datos sintéticos**: demuestran **viabilidad técnica**, no
> validez clínica ni precisión para detectar nada.

Proyecto del equipo para el **Reto 3 — Hackathon FACI 2026, Universidad Peruana Cayetano
Heredia**.

## Qué hace

Pulso UPCH mide la **dinámica** de escritura del estudiante, nunca el **contenido**:

| Métrica (por sesión) | Qué es |
|---|---|
| `wpm` | Velocidad de tecleo estimada (pulsaciones / 5 / minuto) |
| `iki_mean_ms`, `iki_sd_ms` | Media y desviación del intervalo entre pulsaciones |
| `backspace_rate` | Proporción de borrados sobre el total de pulsaciones |
| `session_s` | Duración de la sesión de escritura |
| `rest_hours` *(voluntario)* | Horas de descanso autorreportadas |
| `energy_1_5` *(voluntario)* | Energía percibida, escala 1–5 |

Un modelo de detección de anomalías (**Isolation Forest**, scikit-learn) se entrena sobre la
**línea base del propio estudiante** y marca los días atípicos. Solo si hay **tres días
consecutivos** atípicos (criterio demostrativo) la app muestra *"cambio sostenido observado"*;
si no, *"sin cambios relevantes"*.

## Flujo de la demo

consentimiento → prueba de escritura → autorreporte → gráfica de tendencia → resultado (dos
estados) → botón de orientación voluntario → **borrar mis datos**

Los 21 días de historial que ve la demo son **sintéticos** y la pantalla lo dice.

## Privacidad por diseño

- **Jamás se guarda texto, palabras ni contraseñas.** El capturador de teclado solo lee el
  *tipo* de tecla (carácter / borrado) y su marca de tiempo; nunca `event.key` como contenido.
  El campo de escritura no se envía ni se persiste: al cerrar la prueba se reduce a seis números.
  Ver `app/src/keystroke.js` (función `summarize`) y la validación del backend
  (`backend/main.py`, modelo `SessionMetrics` con `extra="forbid"`: un campo de texto se rechaza
  con 422).
- **Consentimiento informado** antes de cualquier captura.
- **Borrado funcional**: `DELETE /data/{user_id}` elimina el archivo JSON del usuario y la app
  limpia su almacenamiento local. Probado en `backend/test_api.py`.
- Sin monitoreo en segundo plano, sin teclado del sistema, sin WhatsApp ni redes: **solo mide
  dentro de la propia app**.
- Para un piloto real: cumplimiento de la **Ley N.° 29733, Ley de Protección de Datos
  Personales**, y su **Reglamento (D.S. N.° 016-2024-JUS)** — datos sensibles, consentimiento
  expreso, inscripción del banco de datos y derechos ARCO.

## Estructura

```
pulso-upch/
├── README.md
├── docs/ficha-tecnica.md        Ficha técnica (plantilla FACI, apartados 1–10)
├── model/
│   ├── synth.py                 Generador sintético: estable / aislado / sostenido (21 días)
│   ├── detector.py              IsolationForest por estudiante + regla de 3 días
│   └── train_eval.py            Entrena y reporta sobre los 3 escenarios
├── backend/main.py              FastAPI: /sessions, /trend, /data (DELETE)
└── app/                         Web app React/Vite (demo viva)
```

## Cómo correrlo

```bash
# modelo
pip install -r requirements.txt
python model/train_eval.py

# backend
uvicorn backend.main:app --reload

# app
cd app && npm install && npm run dev
```

## Stack

![Python](https://img.shields.io/badge/Python-3.12-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-backend-009688)
![scikit--learn](https://img.shields.io/badge/scikit--learn-IsolationForest-F7931E)
![React](https://img.shields.io/badge/React-Vite-61DAFB)

La propuesta original contempla React Native + Expo; para asegurar una demo viva en el plazo
del hackathon se entrega una web app React/Vite que captura los mismos eventos de teclado.
Almacenamiento local en JSON. Costo variable: cero.

## Declaración de uso de IA

Este repositorio se construyó con asistencia de **Claude (Anthropic) mediante Claude Code**
para redactar documentación y generar código. La propuesta, el criterio ético y las decisiones
son del equipo; todo el contenido fue revisado por sus integrantes.

## Licencia

MIT.
