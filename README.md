# Pulso UPCH

**Un puente honesto entre el estudiante y el servicio de consejería que su universidad ya
tiene.** Reto 3 — Hackathon FACI 2026, Universidad Peruana Cayetano Heredia.

- Página del proyecto: https://ichisieben.github.io/pulso-upch/
- Demo (corre entera en el navegador, sin servidor): https://ichisieben.github.io/pulso-upch/demo/
- Ficha técnica: [`docs/ficha-tecnica.md`](docs/ficha-tecnica.md) · PDF:
  [`docs/Reto3_PulsoUPCH.pdf`](docs/Reto3_PulsoUPCH.pdf)
- Evidencia citada, con lo que dice y lo que no: [`docs/evidencia.md`](docs/evidencia.md)
- Slides de exposición (8:00 con video de la demo): https://ichisieben.github.io/pulso-upch/expo/ ·
  respaldo [`expo/pulso-upch-expo.pdf`](expo/pulso-upch-expo.pdf)
- Video de la demo (4:29, sin audio): [`demo/pulso-demo.mp4`](demo/pulso-demo.mp4) ·
  tiempos por escena en [`docs/video-timestamps.md`](docs/video-timestamps.md)
- Kit de exposición: [`docs/guion-exposicion.md`](docs/guion-exposicion.md) ·
  [`docs/preguntas-dificiles.md`](docs/preguntas-dificiles.md) ·
  one-pager [`docs/one-pager.pdf`](docs/one-pager.pdf)
- Producto y arquitectura V3: [`docs/PRODUCTO_V3.md`](docs/PRODUCTO_V3.md) (qué entra y qué
  no, con su fuente) · [`docs/ARQUITECTURA_V3.md`](docs/ARQUITECTURA_V3.md) (piloto
  propuesto, modelo de datos, tamaño muestral, hoja de ruta) ·
  [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)
- Investigación verificada: [`docs/investigacion/`](docs/investigacion/), 5 informes más
  una verificación independiente de cada cifra contra su fuente

## Novedades V3 (2026-11-08)

- **Hablar con alguien** en todas las pantallas, con la Línea 113, opción 5 (MINSA) para una
  crisis. La app no interviene: deriva.
- **Check-in de 3 toques** (descanso, energía y una pregunta del SISCO tal cual). El
  inventario completo se responde una vez y se puede pausar.
- **Pulsito**, una guía del recorrido. Crece con el uso, nunca con las respuestas; no tiene
  estados de ánimo ni rachas, y se puede apagar. **No se presenta como mecanismo de
  retención**: la gamificación no mostró efecto sobre la adherencia (E32), así que es una
  hipótesis que el piloto mide.
- **Tema y accesibilidad:** modo claro u oscuro, 4 acentos con contraste AA y texto grande.
  Todo se borra con "Borrar mis datos".
- Landing con **"El problema en cifras"** (solo cifras verificadas, con su fuente al tocar),
  **"De la demo al piloto"**, **"Un proyecto para toda Cayetano"** y **"Hacia dónde va"**.

> **Pulso UPCH no diagnostica nada.** No detecta estrés, depresión ni ninguna condición de
> salud. La medida primaria es un inventario validado en universitarios peruanos que el
> estudiante responde por sí mismo. El tecleo es una **señal exploratoria** y la app lo dice
> en pantalla. Los resultados sobre datos sintéticos demuestran **viabilidad técnica**, no
> validez clínica.

## La tesis, en una frase

Cerca de 4 de cada 10 estudiantes con síntomas no recibe tratamiento (dato de EE. UU.,
Healthy Minds 2024-25). Pulso UPCH no intenta diagnosticarlos: les da una lectura honesta de
sus propios hábitos, con una medida validada en Perú como referencia, y acorta el camino hasta
una persona real. **Y mide si su propia señal sirve, publicando la respuesta aunque sea que no.**

## Por qué cambiamos el enfoque

La primera versión prometía "detectar cambios conductuales" con la dinámica de tecleo. Al
revisar la evidencia, esa premisa no se sostiene:

| Hallazgo | Fuente |
|---|---|
| El tecleo predice estrés entre personas con **ρ = 0,078**; el error no mejora al de predecir la media. | Naegelin et al. 2025, *medRxiv* |
| El tecleo cambia con la dificultad de la tarea, pero predice la valoración subjetiva con **R² = 0,005**. Detecta carga impuesta, no estado interno. | Schütz et al. 2026, *PACM-HCI* |
| 24 estudios de *digital phenotyping* en depresión: falta de validación externa. | Leaning et al. 2024 |
| Retención mediana de apps de salud mental: **3,3 % a 30 días**. | Baumel et al. 2019 |
| Un sistema de alerta temprana predijo bien y la consejería que disparó **no redujo el abandono**. Predecir ≠ ayudar. | Plak et al. 2022 |
| Informar sobre un trastorno (TDAH) subió la creencia de tenerlo del **28 % al 58 %**; la educación nocebo redujo ese aumento a la mitad. | Sandra et al. 2025, RCT n = 215 |
| Universitarios de Piura: **24 % nivel alto y 50 % moderado** de síntomas de ansiedad y depresión (niveles de escala, no diagnósticos). | Valle-Palomino et al. 2024, n = 1 243 |

Cifras exactas, DOI y matices: [`docs/evidencia.md`](docs/evidencia.md).

**Decisión:** el proyecto deja de afirmar que detecta estrés. Pasa a ser un instrumento que
mide si la señal sirve, apoyado en una medida validada, cuyo producto real es el puente a la
consejería.

## Tres capas de medida, con jerarquía explícita

| Capa | Qué es | Estatus |
|---|---|---|
| **1. Medida primaria** | Inventario SISCO de estrés académico (Barraza, 2007), validado en 628 universitarios de Lima con invarianza por sexo (Manrique-Millones et al., 2019). Puntaje por subescala: estresores, síntomas, afrontamiento. | Validada |
| **2. Carga del calendario** | Cuántas evaluaciones y entregas caen en la semana. Observable: no infiere estados internos. Carga ↔ estrés r = 0,62 (Lahme et al., 2024). | Observable |
| **3. Señal exploratoria** | Dinámica de tecleo comparada **solo con tu propia línea base**. Mide *desviación respecto a tu propio patrón*, no estrés. | Exploratoria, rotulada en pantalla |

## Flujo de la app

```
bienvenida (con Pulsito, opcional)
  → consentimiento granular (cada capa se activa por separado)
  → tema y accesibilidad (modo, acento, texto grande, mascota sí/no)
  → inventario SISCO (medida primaria; se puede pausar y retomar)
  → prueba de escritura (señal exploratoria, rotulada)
  → check-in de 3 toques: descanso, energía, una pregunta del SISCO tal cual
  → panel personal: SISCO por subescala + carga + tu tecleo vs. tu línea base
  → si hay cambio sostenido: mensaje descriptivo CON educación nocebo integrada
  → exportar mis datos · borrar mis datos
"Hablar con alguien" + Línea 113 (opción 5): visibles en todas las pantallas
```

El mensaje de cambio sostenido dice qué cambió en términos descriptivos, que las
fluctuaciones son normales y tienen muchas causas no clínicas, que no es un diagnóstico, y
ofrece la acción sin presión. No es un aviso legal al pie: es una intervención con evidencia
(Sandra et al., 2025).

## Detector (señal exploratoria)

`model/detector.py` y su gemelo `app/src/detector.js` (misma regla, verificada por
`tests/test_parity.py`):

1. Línea base = los primeros 14 días **de la misma persona**. Por métrica: mediana y MAD.
2. z robusto de cada día contra esa línea base.
3. Día atípico si al menos 2 métricas de tecleo tienen |z| > 3.
4. "Cambio sostenido observado" solo tras **3 días atípicos seguidos** (criterio
   demostrativo, no derivado clínicamente).

Siempre intra-sujeto, partición temporal (línea base antes, evaluación después), nunca
aleatoria y nunca entre personas. El autorreporte no marca días.

**Resultados sobre datos sintéticos** (`python model/train_eval.py`, 30 semillas):
estable 30/30, cambio aislado 30/30, cambio sostenido 30/30. Ese 90/90 es fácil porque el
cambio lo construimos nosotros y es grande; con un cambio de la mitad de tamaño baja a 27/30 y
con un 30 % a 3/30, sin falsos positivos en ningún caso. **Viabilidad técnica, no validez
clínica.** La versión anterior con Isolation Forest sigue en `model/detector_iforest.py`.

## Privacidad por diseño

- **El texto nunca se guarda.** `app/src/keystroke.js`: el capturador reduce cada pulsación a
  `{t, kind}` (carácter o borrado) y descarta la tecla en el acto; `summarize()` devuelve
  cinco números y vacía incluso los tiempos crudos. El cuadro de texto se borra al terminar.
- **Todo vive en tu navegador.** La demo no tiene servidor: nada sale del dispositivo.
  Exportar descarga tus datos en JSON; borrar los elimina y lo puedes comprobar.
- **Consentimiento granular**: cada capa (inventario, tecleo, autorreporte) se acepta por
  separado y se puede omitir.
- **No se notifica a nadie.** El botón de orientación lleva a la página pública de Bienestar
  Estudiantil de la UPCH (el canal directo de consejería está pendiente de confirmar) y no le
  transmite ningún resultado.
- El backend opcional (`backend/main.py`) rechaza cualquier campo no numérico (`extra="forbid"`,
  HTTP 422): no puede recibir texto aunque se intente. Probado en `backend/test_api.py`.
- Piloto real: Ley N.° 29733 y su Reglamento (D.S. N.° 016-2024-JUS): datos sensibles,
  consentimiento expreso, banco de datos inscrito, derechos ARCO.

## Indicadores del piloto propuesto

| Indicador | Cómo se mide |
|---|---|
| **Tiempo hasta la primera consulta atendida** *(primario)* | Días entre la derivación en la app y la cita efectivamente asistida, contra la línea base histórica del servicio |
| Conversión derivación → cita **asistida** | Citas asistidas / derivaciones, seguimiento a 14 días, denominador explícito |
| Retención real a 30 días | Usuarios con ≥ 1 sesión entre los días 23–30 / cohorte inicial. Se declara aunque sea mala; el referente es 3,3 % |
| Estrés pre/post a 8 semanas | SISCO al inicio y a las 8 semanas, por intención de tratar, imputando a quienes abandonan |
| **Autoetiquetado y daño iatrogénico** | Ítem "creo que tengo un problema de salud mental" (1–5) pre/post, replicando el diseño de Sandra et al., + tasa de falsos positivos |
| Confianza y percepción de vigilancia | % que opta por compartir con Bienestar vs. mantener privado; tasa de *opt-out* |

Ningún convenio con Bienestar Universitario existe hoy: la colaboración es **propuesta**.

## Estructura

```
pulso-upch/
├── index.html                  Página de presentación (GitHub Pages)
├── demo/                       Build estático de la app (lo que se publica)
├── app/                        App React/Vite: src/App.jsx, sisco.js, detector.js, keystroke.js
├── model/                      synth.py · detector.py (z robusto) · detector_iforest.py · train_eval.py
├── backend/                    FastAPI opcional; la demo NO lo necesita
├── tests/test_parity.py        Python y JS marcan los mismos días
└── docs/                       ficha, evidencia, decisiones, kit de exposición
```

## Cómo correrlo

```bash
pip install -r requirements.txt
python model/train_eval.py                 # resultados sintéticos + barrido
python -m pytest tests backend -q          # paridad Python/JS + backend
cd app && npm install && npm run build     # escribe ../demo/
npm run dev                                # desarrollo local
```

## Stack

![React](https://img.shields.io/badge/React-18-61DAFB) ![Vite](https://img.shields.io/badge/Vite-5-646CFF)
![Python](https://img.shields.io/badge/Python-3.12-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-opcional-009688)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-est%C3%A1tico-222)

Costo variable: cero. Sin servidor en la demo.

## Declaración de uso de IA

Este repositorio se construyó con asistencia de **Claude (Anthropic) mediante Claude Code**,
que redactó documentación, generó código y verificó citas contra sus fuentes primarias. Las
correcciones que esa verificación produjo están en `docs/evidencia.md`. La propuesta, el
criterio ético y las decisiones son del equipo, que revisó el contenido.

## Licencia

Código: MIT. El Inventario SISCO es obra de Arturo Barraza Macías; se reproduce con fines
académicos no comerciales y con cita.

## Respaldo

Snapshot por publicación en `Gdrive:01-Trabajo/Portfolio/pulso-upch/<fecha>/` (sin `.git` ni
`.env`). El inventario, con tamaño y sha256 de cada archivo, está en [`drive.manifest`](drive.manifest).
