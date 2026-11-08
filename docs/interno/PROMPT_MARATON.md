# MARATÓN — Pulso UPCH · sesión autónoma de día completo

El dueño del proyecto no estará disponible durante varias horas. Trabaja de corrido,
sin pedir confirmaciones. Este documento es tu única fuente de instrucciones; si algo
no está aquí, decide tú y anótalo en `docs/DECISIONES.md` con cómo revertirlo.

Lee primero: `README.md`, `docs/ficha-tecnica.md`, `docs/evidencia.md`,
`docs/DECISIONES.md`, `HANDOFF.md`, `docs/interno/BRIEF_V2.md`.

---

## 0. Reglas que no se negocian

1. **La tesis no cambia:** *"No detectamos estrés. Acortamos el camino."* Todo lo que
   construyas la refuerza. Si una idea la contradice, no entra.
2. **Nada infiere estado psicológico** a partir de tecleo, color elegido, interacción
   con la mascota, interpretación de imágenes ni ninguna otra señal implícita. La
   única medida es el instrumento validado. Las demás son descriptivas o de
   personalización. **Prohibido** cualquier prueba proyectiva (tipo Rorschach).
3. **Ninguna cifra sin fuente indexada** (PubMed, Nature, Lancet, OMS, OPS, INEI,
   MINSA, revistas con DOI). Cada cifra que aparezca en la web, slides o ficha debe
   tener su fila en `docs/evidencia.md` con autor, año, revista, DOI/URL, **y la cita
   textual** de donde sale. Si no se puede verificar, no se usa. Si una afirmación
   popular no tiene respaldo (ejemplo: "los doctorandos tienen más riesgo cardíaco"),
   se descarta y se anota por qué.
4. **Nada de alianzas institucionales inventadas.** Bienestar UPCH, comité de ética,
   cualquier instituto: siempre "propuesto", nunca "coordinado".
5. **Commit y push al cerrar cada fase**, con mensaje descriptivo. El repo tiene
   auto-deploy a GitHub Pages y a Hostinger; lo que subas se publica.
6. **No rompas lo que funciona.** Antes de rediseñar, saca capturas de la demo y la
   landing actuales en `docs/capturas/antes/`. Si una fase deja la demo peor que
   antes, revierte esa fase.
7. **Declaración de uso de IA** se mantiene y se actualiza.
8. Privacidad: el texto escrito nunca se guarda; sigue probado por tests. Si añades
   datos nuevos (mascota, preferencias), van a almacenamiento local del navegador y
   se borran con "Borrar mis datos". Añade tests.

---

## FASE 1 — Investigación con subagentes en paralelo (~2 h)

Lanza **cinco subagentes a la vez**, cada uno escribe su informe en
`docs/investigacion/<tema>.md` (máx. 1 200 palabras, tabla de cifras con fuente y
cita textual). Luego lanza un **sexto subagente verificador** que abre cada fuente
y marca cada cifra como ✅ verificada / ⚠️ no coincide / ❌ no encontrada. Solo las ✅
pasan a `docs/evidencia.md`.

**1A · Cifras gerenciales de salud mental por etapa educativa.**
Escolar, preuniversitario, universitario, posgrado y doctorado. Prevalencia de
síntomas depresivos, ansiedad y estrés; comparación con población general; cambio
desde la pandemia (la OMS reportó ~25 % de aumento de ansiedad y depresión en el
primer año; verifícalo y cita el informe exacto). Para doctorado busca Levecque et
al. 2017 (*Research Policy*) y Evans et al. 2018 (*Nature Biotechnology*) y
verifica sus cifras reales. Mundial y Perú por separado. Perú: INEI, MINSA, INSM
"Honorio Delgado – Hideyo Noguchi", papers peruanos indexados. Ya tenemos
verificado: Valle-Palomino et al. 2024 (n=1 243, Piura) — 24 % alto / 50 %
moderado. Amplía, no repitas.

**1B · Por qué no piden ayuda.** Barreras a buscar atención en universitarios:
estigma, tiempo, costo, normalización cultural del malestar académico, percepción
de que "es parte de la carrera". Evidencia específica en estudiantes de ciencias de
la salud y medicina (competitividad, elección de plazas por notas). Latinoamérica y
Perú si existe. Tasa de uso de servicios de consejería universitaria cuando existen.

**1C · Mascota y gamificación: qué dice la evidencia.** Efecto de compañeros
virtuales, mascotas y mecánicas de juego sobre la adherencia en apps de salud
mental y bienestar (metaanálisis 2020–2026). Riesgos documentados: infantilización,
dependencia, trivialización. Qué diseños funcionaron y cuáles no. Ejemplos de apps
reales con mascota y sus datos de retención si están publicados. Conclusión
explícita: ¿la mascota mejora la *primera semana* de uso? Eso es lo único que nos
importa, dado el 3,3 % de retención a 30 días.

**1D · BioIncuba y proyectos comparables que ganaron.** Qué proyectos tiene o tuvo
BioIncuba (incubadora de la UPCH), cuáles en salud mental o salud digital, qué
criterios usan. Luego: proyectos de salud mental universitaria que ganaron
financiamiento o concursos internacionales (Wellcome Trust Mental Health, MIT Solve,
Hult Prize, Grand Challenges Canada, concursos de la OPS). Qué tenían en común en
su *pitch*: cómo presentaban problema, evidencia, modelo de impacto y sostenibilidad.
Extrae 5 lecciones aplicables a nuestra presentación.

**1E · Cayetano: carreras, mapa interdisciplinario y competitividad.** Qué carreras
tiene la UPCH (Psicología, Medicina, Enfermería, Ingeniería Informática, Salud
Pública, Neurociencia si existe, Administración en Salud, etc.) con fuente de la web
oficial. Qué grupos o institutos de la UPCH investigan salud mental, neurociencia o
psicología (nombres reales con URL institucional). Evidencia indexada sobre estrés y
competitividad en estudiantes de medicina peruanos. Con eso, propón el mapa de qué
aporta cada carrera al proyecto.

---

## FASE 2 — Decisiones de producto a partir de la evidencia (~30 min)

Con los informes verificados, escribe `docs/PRODUCTO_V3.md` con lo que entra y lo que
no, cada punto con la fuente que lo justifica. Como mínimo decide:

- **Mascota compañera.** Entra como razón de volver y como guía del flujo. Evoluciona
  con el *uso* (días que abriste la app, inventario completado, cita agendada),
  **nunca** con el estado del estudiante. No tiene "estados de ánimo" que reflejen al
  usuario. Tono cálido, no infantil: pensada para universitarios.
- **Personalización de color/tema.** Entra como accesibilidad y preferencia.
  Se guarda localmente. No se analiza.
- **Menos preguntas.** El inventario completo (SISCO 31 ítems) se aplica una vez al
  inicio del piloto. El uso diario es un *check-in* de ≤ 3 toques: descanso, energía y
  una pregunta rotativa del instrumento. Justifícalo con la literatura de abandono.
- **El puente.** Una sola acción visible en todo momento: "Hablar con alguien".
  Con el enlace real si se consigue; si no, a Bienestar con aviso de pendiente.
- Lo que la investigación 1C diga que no funciona, no entra.

---

## FASE 3 — Rediseño visual completo (~3 h)

Primero `docs/DESIGN_SYSTEM.md`: tipografía, escala, espaciado, paleta (granate
#B03437 primario, dorado #F3C72D solo en detalles, grises con contraste AA
verificado por `tools/contrast.py`), componentes, reglas de movimiento. Luego
aplícalo en los tres frentes.

**Referencia estética:** páginas de producto de Apple. Una idea por pantalla,
tipografía grande, mucho aire, movimiento con propósito. Sin WebGL, sin 3D, sin
librerías pesadas. `prefers-reduced-motion` respetado.

**3A · Demo (`app/`, publicada en `demo/`).** Pensada para teléfono. Flujo:
bienvenida con la mascota → consentimiento granular → tema de color → inventario
(con progreso y posibilidad de pausar) → prueba de escritura → check-in diario →
panel personal → mensaje de cambio sostenido con los 4 bloques y la educación nocebo
→ "Hablar con alguien" → "Tus datos" (exportar / borrar). Micro-animaciones en las
transiciones. La mascota reacciona al *progreso del flujo*, no al contenido de las
respuestas.

**3B · Landing (`index.html`).** Nueva sección al inicio, **"El problema en
cifras"**, con 4–6 números gerenciales de la Fase 1 en tarjetas grandes con
animación de conteo y su fuente visible al tocar. Mantener y mejorar: arquitectura
animada capa por capa, "Lo que la evidencia dice y lo que no", privacidad
demostrable, indicadores, requisitos para piloto real. Añadir: **"Un proyecto para
toda Cayetano"** con el mapa interdisciplinario de 1E (qué aporta cada carrera) y
**"Hacia dónde va"** con la hoja de ruta de la Fase 4.

**3C · Slides (`expo/`).** Rediseñar con el design system. Mantener: 6 slides,
navegación, temporizador (T, ámbar a las 7:00, R reinicia), slide de video con
espacio y pausa, PDF de respaldo regenerado.

Al terminar cada frente: capturas en `docs/capturas/despues/`, comparar con
`antes/`, y corregir lo que se vea peor.

---

## FASE 4 — Arquitectura ampliada y plan de investigación (~1 h)

`docs/ARQUITECTURA_V3.md` y su versión visual en la landing:

- Diagrama de sistema actual (cliente, sin servidor) y del piloto propuesto
  (con backend, consentimiento, anonimización, panel agregado para Bienestar **solo
  con datos agregados, nunca individuales**).
- **Modelo de datos** con qué se guarda, dónde, cuánto tiempo y quién puede verlo.
- **Plan de estudio piloto** como protocolo de investigación: pregunta, diseño
  (pre/post con intención de tratar), instrumentos (SISCO + ítem de autoetiquetado +
  confianza), tamaño muestral calculado con supuestos explícitos, cronograma, y los
  pasos de comité de ética y protección de datos (Ley 29733, DS 016-2024-JUS).
- **Mapa interdisciplinario** de 1E: rol de Psicología, Medicina/Salud Pública,
  Enfermería, Ingeniería, Administración. Qué pregunta de investigación le toca a
  cada uno.
- **Hoja de ruta** 6 / 12 / 24 meses, con BioIncuba como destino natural después del
  hackathon.

---

## FASE 5 — Video de la demo con Playwright (~1 h)

Objetivo: `demo/pulso-demo.mp4`, ~4:30, 1920×1080, 30 fps, H.264 yuv420p,
`-movflags +faststart`, sin audio, < 50 MB.

- `tools/video/stage.html`: fondo con la paleta, a la izquierda un marco de teléfono
  en CSS con `<iframe>` de la demo (390×844), a la derecha subtítulos grandes (título
  del paso + una línea). Arriba, discreto: "Pulso UPCH · Hackathon FACI 2026".
- `tools/video/record-demo.mjs`: Playwright con `recordVideo` a 1920×1080, maneja la
  app dentro del iframe con `frameLocator`, cambia subtítulos con `page.evaluate`.
  **Lee el código de la app y usa los selectores reales.** Tecleo con
  `page.keyboard.type` y retardo humano variable (60–180 ms), con 2–3 borrados.
- Sirve la demo en local; no grabes contra internet.
- Convierte con ffmpeg. Recorta el arranque en blanco.
- **Antes del render completo**: capturas de 4 escenas clave, míralas, corrige.
- Escenas (≈ 4:30 en total): portada · consentimiento · mascota y tema · inventario
  (3–4 ítems, salta al final) · prueba de escritura · "Tus datos" mostrando solo
  números · check-in · panel con 21 días **sintéticos rotulados** · mensaje de cambio
  sostenido con educación nocebo (tiempo para leerlo) · "Hablar con alguien" ·
  borrar datos · cierre con URL.
- Genera `docs/video-timestamps.md` con el minuto de cada escena.

Si el dueño decide grabar en el Mac: esta fase se corre allí **después** de hacer
`git pull` con todo lo anterior ya subido. Nunca dos máquinas sobre el repo a la vez.

---

## FASE 6 — Guion, preguntas y material de venta (~1 h)

- `docs/guion-exposicion.md`: 8:00 con corte duro, planificado a 7:15. Tiempos
  reales del video. Roles Persona 1/2/3 (los nombres los pone el equipo).
- `docs/preguntas-dificiles.md`: ampliar con las que surjan de la Fase 1, sobre todo:
  *"¿La mascota no infantiliza un tema serio?"*, *"¿Por qué cifras de EE. UU. y no de
  Perú?"* (respuesta: ambas, y cuáles son cuáles), *"¿Qué pasa si un estudiante está
  en crisis?"* (respuesta: la app muestra la Línea 113 del MINSA y el canal
  institucional; no interviene, deriva).
- `docs/one-pager.pdf` (A4, 1 página): el proyecto como lo leería un evaluador de
  BioIncuba — problema con cifras, solución, evidencia, equipo interdisciplinario,
  qué piden. Con el design system.

---

## FASE 7 — Control de calidad y cierre (~30 min)

- Todos los enlaces internos y externos responden.
- Lighthouse en landing, demo y expo: accesibilidad ≥ 95, sin errores de consola.
- Probar la demo en viewport de teléfono de punta a punta.
- Cada cifra visible tiene su fila en `docs/evidencia.md` con ✅.
- `tools/contrast.py` sin fallos.
- Tests del backend y de la app pasan.
- Actualizar `README.md`, `HANDOFF.md`, `NOTES.md`, `docs/DECISIONES.md`.
- Último commit y push. Confirmar que GitHub Pages y Hostinger muestran la versión
  final.

Al terminar, deja en `HANDOFF.md` una sección **"Para el dueño, en 10 líneas"**: qué
quedó hecho, qué quedó pendiente, qué decisiones tomaste por tu cuenta y qué debe
revisar antes del lunes.
