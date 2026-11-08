# Decisiones tomadas sin el autor

Formato: fecha · tarea · qué se eligió · por qué · qué se descartó · cómo revertirlo.

- **2026-11-07 · Detector.** Se reemplazó el Isolation Forest por un z robusto (mediana/MAD)
  contra la línea base de la propia persona, idéntico en Python y JS. Por qué: la demo debe
  correr en el navegador (brief §4) y un IF portado a JS no se puede verificar equivalente a
  scikit-learn; el z robusto es transparente y expresa literalmente "desviación respecto a tu
  propio patrón". Descartado: portar IF; precomputar (no cubre la sesión real del día 21).
  Revertir: `model/detector_iforest.py` sigue intacto; en Python basta importar `evaluate`
  desde ahí.
- **2026-11-07 · Citas.** Se verificaron las 11 cifras del brief V2 contra la fuente primaria
  y se corrigieron las que la fuente no respalda tal cual (lista en `docs/evidencia.md`).
  Manda la fuente sobre el brief.
- **2026-11-07 · Instrumento.** SISCO de 31 ítems (Barraza 2007), no SISCO SV-21: la
  validación peruana (Manrique-Millones et al. 2019) es de la versión de 31. Se reportan
  medias por subescala (1–5), sin niveles leve/moderado/severo, porque no hay puntos de corte
  validados en Perú. PSS-12 (Boluarte-Carbajal 2023) queda como alternativa documentada.
- **2026-11-07 · Consejería.** No existe una página pública específica del servicio de
  consejería psicológica de la UPCH que se pudiera confirmar. El botón apunta a Bienestar
  Estudiantil (https://bienestar.cayetano.edu.pe/) y la interfaz muestra "canal específico:
  pendiente de confirmar". Revertir: `VITE_COUNSELING_URL` al compilar.
- **2026-11-07 · Despliegue.** Demo estática en `demo/` (GitHub Pages), datos en
  `localStorage`. El backend FastAPI se conserva como opcional y la demo no lo usa.
- **2026-11-07 · Documentos de trabajo.** `PROMPT.md` (brief v1) y `BRIEF_V2.md` se movieron a
  `docs/interno/` con un encabezado "reemplazado". Por qué: el repo es público y la página
  enlaza al código; la raíz debe mostrar solo el enfoque vigente. No se borra nada (el
  historial los conserva igual). Revertir: `git mv docs/interno/*.md .`
- **2026-11-07 · Paleta Cayetano.** Granate `#B03437` como marca y dorado `#F3C72D` solo en
  detalles (punto de los rótulos, línea bajo la barra, barra de progreso, borde del botón del
  puente), aproximados del logo sin manual oficial. En modo oscuro el granate de texto se
  aclara a `#F08A8C` (el botón sigue `#B03437` con texto blanco, 6,2:1). `--muted` claro pasó
  de `#6e6e73` a `#5a5a5f` y `--faint` de `#86868b` a `#6e6e73` para que todo texto pase AA
  (antes `--faint` daba 3,6:1). El ámbar claro pasó a `#8a5d00`. Verificación:
  `python tools/contrast.py` (sale con 0 fallos). Los estados de cambio siguen en ámbar suave;
  el granate nunca se usa para señalar un cambio. Revertir: tokens en `:root` de
  `index.html` y `app/src/styles.css`.
- **2026-11-07 · Movimiento.** Solo CSS + IntersectionObserver, sin librerías. Se activa con
  la clase `mo` en `<html>`, que el script solo pone si no hay `prefers-reduced-motion`: sin
  JS o con movimiento reducido todo se ve estático y completo. Las cifras animadas tienen su
  valor final en el HTML. Revertir: borrar el bloque "Motion" del script de `index.html`.
- **2026-11-07 · Build de la demo.** `emptyOutDir` pasó a `false` y un plugin borra solo
  `demo/assets/` antes de compilar, para que `demo/pulso-demo.mp4` (que el equipo sube a
  mano y usa `expo/`) sobreviva a un `npm run build`. Revertir: `app/vite.config.js`.
- **2026-11-07 · Deck.** 6 slides en `expo/index.html` (un solo archivo, sin dependencias),
  escenario fijo de 1600×900 escalado a la ventana. En la slide del video, espacio
  pausa en vez de avanzar, para poder sincronizar la narración. El video arranca solo y en
  mute al entrar a la slide. El temporizador empieza al pulsar T por primera vez (no al
  cargar) para que el ensayo no cuente el tiempo de preparación. PDF de respaldo generado
  con Chromium en modo impresión (la slide del video muestra un rótulo con la URL de la demo).
- **2026-11-08 · Maratón, Fase 1 (investigación).** Cinco investigadores en paralelo
  (`docs/investigacion/1A`–`1E`) y un verificador independiente (`verificacion.md`): de 55
  filas, 50 ✅, 5 ⚠️ y 0 ❌. Solo las ✅ numéricas pasaron a `docs/evidencia.md` (E14–E36).
  Se descartaron Evans 2018 (solo confirmado en nota de prensa) y la frase "casi el doble
  que en 2019" del INEI (es +64 %). Los informes 1A y 1C pasan del tope de 1 200 palabras
  (~1 390 y ~1 300) por tablas y URL: se dejaron enteros. Las capturas `docs/capturas/` van
  dentro del repo porque el prompt de la maratón lo pide (la regla del workspace dice lo
  contrario para capturas pesadas; aquí son ~12 PNG). La Línea 113, opción 5, sale de
  Andina (agencia estatal), porque gob.pe rechazó la consulta automática (E35). Revertir:
  `git revert` del commit `fase-1`.
- **2026-11-08 · Maratón, Fase 2 (producto).** `docs/PRODUCTO_V3.md`. El plan decía "la
  mascota entra"; la evidencia (1C) dice que no hay prueba de que mejore la primera semana
  y que la gamificación no mejora la adherencia (E31, E32). Se resolvió así: la mascota
  entra como **guía del flujo**, se puede apagar, crece solo con hitos de uso, no tiene
  estados de ánimo ni rachas, y se presenta como **hipótesis a medir** (días 1–7 con y sin
  mascota), nunca como retención. La pregunta rotativa del check-in se muestra con la
  redacción publicada del SISCO ("este semestre"), sin adaptarla a "hoy". Revertir: la
  preferencia `mascot` a `false` por defecto en `app/src/prefs.js`.
- **2026-11-08 · Maratón, Fase 3 (rediseño).** Primero `docs/DESIGN_SYSTEM.md`; después
  la demo, la landing y las slides, cada una con su agente y verificada con Playwright.
  - **Demo:** el flujo nuevo es inicio → consentimiento → tema → inventario (con pausa) →
    escritura → check-in de 3 toques → panel → datos. "Hablar con alguien" y la Línea 113
    están en la barra superior de todas las pantallas.
  - **Check-in:** "Evaluaciones esta semana" salió del check-in para dejarlo en 3 toques.
    Cuando falta ese dato, el panel muestra la carga del ciclo sintético, rotulada.
  - **Mascota:** `stage()` en `app/src/mascot.js` es pura y solo lee días abiertos,
    inventario y puente. Lo prueba `tests/test_mascot.py`.
  - **Borrado:** `erase()` elimina todas las claves `pulso*`, incluidas las preferencias.
  - **Selectores** estables para el video en `docs/selectores-demo.md`.
  - **Slides:** las cifras grandes van en el color del texto, no en granate (el granate
    es la marca, no el dato).
  - **Revertir:** `git revert` del commit de la fase (`fase-3`).
- **2026-11-08 · Maratón, Fase 4 (arquitectura y piloto).** `docs/ARQUITECTURA_V3.md`.
  - **Panel de Bienestar** (propuesto): solo agregados, con celdas de menos de 10 estudiantes
    suprimidas. La tabla que une el código seudónimo con la persona no vive en el servidor.
  - **Diseño del piloto:** pre/post con intención de tratar. Dentro de él, un A/B de la
    mascota para los días 1 a 7.
  - **Tamaño muestral**, con α = 0,05 y potencia del 80 %:
    - SISCO pareado, d = 0,3 → 90 estudiantes, 150 si se pierde el 40 %.
    - Consulta atendida del 5 % al 12 % → 248; del 5 % al 10 % → 435.
    - Por eso se propone un piloto de unos 250, y se dice que es de factibilidad si el
      efecto es menor.
    - Reproducir: `python -c "from math import ceil,sqrt; za,zb=1.959964,0.841621; print(ceil(((za+zb)/0.3)**2+za**2/2))"`.
  - **El 5 % de línea base es un supuesto [por verificar]** con Bienestar.
  - **La versión visual va en la landing**, en las secciones "De la demo al piloto", "Un
    proyecto para toda Cayetano" y "Hacia dónde va". Entró en el commit de la Fase 3
    porque el agente de la landing trabajó con este documento ya escrito.
- **2026-11-08 · Maratón, Fase 5 (video).** `demo/pulso-demo.mp4`: 4:29, 1920×1080, 30 fps,
  H.264 yuv420p, faststart, sin audio, 9,4 MB. Se grabó con Playwright **en Python**
  (`tools/video/record_demo.py`) y no en `.mjs`, porque en esta máquina no está instalado
  Playwright para Node y el de Python ya tiene sus navegadores.
  - **Orden de las escenas:** "Tus datos" va después de "Hablar con alguien" y no después
    de la escritura. Así sigue el flujo real de la app y no hay que saltar pantallas.
  - **Botón "Hablar con alguien":** en el video se señala con el cursor, pero no se pulsa,
    porque abriría una página externa y la grabación es solo local.
  - **Duración:** un factor `SPEED = 1.17` lleva la toma a unos 4:30.
  - **Regenerar:** `python -I tools/video/record_demo.py` (y `--preview` para una pasada
    rápida con capturas). Al regenerarlo se reescribe `docs/video-timestamps.md`.
- **2026-11-08 · Maratón, Fase 6 (guion y material).**
  - **Guion** (`docs/guion-exposicion.md`): reescrito con los tiempos reales del video
    (4:29). Las cifras se leen completas ("catorce coma cuatro"), sin redondear.
  - **Preguntas difíciles** (`docs/preguntas-dificiles.md`): la 9 ahora da el tamaño
    muestral con sus supuestos. Se añadieron de la 14 a la 19: mascota, cifras de Perú
    frente a las de EE. UU., crisis, por qué no se avisa a Bienestar, sostenibilidad y
    aporte a la UPCH.
  - **One-pager:** `docs/one-pager.pdf`, de una página A4, generado desde
    `docs/one-pager.html` con `python -I tools/one_pager_pdf.py`.
- **2026-11-08 · Maratón, Fase 7 (calidad).** Comprobado sobre la versión publicada (commit
  `489dc4f` en Pages):
  - **Lighthouse (móvil):** accesibilidad 100 en la landing, la demo y las slides.
  - **Pruebas:** `pytest` 9 passed, `contrast.py` con 0 fallos, E2E de la demo contra la URL
    pública sin fallos.
  - **Enlaces:** 53 revisados; todos los DOI están registrados en doi.org salvo
    `10.1145/3821685` (Schütz 2026), que aún no resuelve y ahora enlaza al preprint de arXiv.
  - **SEO de las slides:** sigue en 50 porque el deck lleva `noindex` a propósito. Se añadió
    la meta descripción.
  - **Hostinger:** no se pudo confirmar. Su URL no figura en el repo y los conectores de
    Hostinger no estaban disponibles en esta sesión; queda pendiente.
