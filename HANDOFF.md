# HANDOFF — Pulso UPCH (versión de presentación, brief V2)

- Repo: https://github.com/IchiSieben/pulso-upch · Página: https://ichisieben.github.io/pulso-upch/
- Demo pública, sin servidor: https://ichisieben.github.io/pulso-upch/demo/
- Última sesión: 2026-11-07. Código verificado en vivo en `9ac2e02`.

## 2026-11-07 (noche) · Corrección, paleta, movimiento, slides y guion

- Slides: https://ichisieben.github.io/pulso-upch/expo/ · PDF de respaldo:
  https://ichisieben.github.io/pulso-upch/expo/pulso-upch-expo.pdf
- Commits: `5ec7f06` correcciones de `index.html` · `db204c3` paleta Cayetano · `1c7b07b`
  movimiento + tarjetas de referencias · `833e7c2` deck + PDF · `38c1f63` guion de 8:00 ·
  el commit de este HANDOFF (granate fuera de la barra "hoy" y del punto del día).
- Paleta: granate `#B03437` (marca), dorado `#F3C72D` (solo detalles). AA verificado con
  `python tools/contrast.py` (0 fallos, claro y oscuro). El cambio sostenido sigue en ámbar.
- Movimiento: aparición al hacer scroll, diagrama que se arma capa por capa, cifras que
  cuentan (0,078 · 3,3 % · 628). Con `prefers-reduced-motion` todo queda estático. Se arregló
  un error previo: el hover del diagrama también capturaba los `.n` de las cifras.
- Deck: 6 slides; ← → o clic, F pantalla completa, T temporizador (ámbar a las 7:00),
  R reinicia, espacio pausa el video en la slide 3.
- **Falta el video**: subir `demo/pulso-demo.mp4` (menos de 100 MB por el límite de GitHub),
  commit y push. Hasta entonces la slide 3 muestra "Falta el video" y el plan B. Un
  `npm run build` ya no lo borra.
- Guion: `docs/guion-exposicion.md`, con los tiempos del video marcados
  `[ajustar al video final]`.
- Verificado en vivo: landing (móvil claro, escritorio oscuro, movimiento reducido), deck
  (6 slides sin desborde, navegación, temporizador con reloj simulado), demo E2E claro y
  oscuro, `pytest` 5 passed. Con un video de prueba: arranca en mute, espacio pausa, salir de
  la slide lo pausa.

## Estado: los 7 puntos del brief V2 §7 están hechos

1. README + ficha (`docs/ficha-tecnica.md`, PDF con `python tools/ficha_pdf.py`) con el enfoque
   nuevo. Todas las cifras verificadas contra la fuente primaria en `docs/evidencia.md`
   (6 correcciones al brief, listadas ahí).
2. SISCO de 31 ítems (Barraza 2007; validado en Lima por Manrique-Millones et al. 2019) como
   medida primaria: `app/src/sisco.js`. Redacción literal cotejada en dos anexos de tesis
   peruanas independientes. Media por subescala, sin niveles.
3. Mensaje de cambio sostenido con educación nocebo en 4 bloques de igual peso
   (`ChangeMessage` en `app/src/App.jsx`).
4. UI nueva estilo página de producto, claro/oscuro, mobile-first.
5. `index.html`: diagrama SVG interactivo, "Lo que la evidencia dice y lo que no",
   privacidad con enlaces a líneas de código, indicadores, proyección.
6. Demo estática en `demo/` (build de `app/`, `npm run build`), datos en localStorage.
   Detector cambiado de Isolation Forest a z robusto intra-sujeto, idéntico en Python y JS.
7. Kit: `docs/guion-exposicion.md`, `docs/preguntas-dificiles.md`, `docs/arquitectura.md`.

## Verificado
- `python -m pytest tests backend -q` → 5 passed (paridad Python/JS en 180 corridas, dirección
  de los mensajes, backend).
- `python model/train_eval.py` → 90/90 sintético + barrido de sensibilidad (50 % → 27/30,
  30 % → 3/30, 0 falsos positivos).
- E2E con Playwright contra la URL pública (390×844, claro y oscuro): flujo completo, sin
  errores de consola, sin texto en localStorage, borrado deja localStorage vacío, sin scroll
  horizontal; y los caminos de consentimiento parcial (sin autorreporte, sin SISCO, sin tecleo).
- Corregido tras la primera verificación: con el autorreporte desactivado se perdía la prueba
  de escritura; la barra de progreso causaba scroll horizontal en "Tus datos".

## Pendiente
- **URL del canal de consejería UPCH**: no se encontró página pública específica. El botón va
  a https://bienestar.cayetano.edu.pe/ con aviso visible "pendiente de confirmar". Al
  obtenerla: `VITE_COUNSELING_URL=<url> npm run build` en `app/` y commit de `demo/`.
- Nombres reales del equipo en el guion (hoy "Persona 1/2/3").
- Video `demo/pulso-demo.mp4` y ajuste de los tiempos del guion a ese corte.
- Ensayo cronometrado el domingo.
- Snapshot en Drive (`Gdrive:01-Trabajo/Portfolio/pulso-upch/`) y `drive.manifest`: no hecho.
- Decisiones tomadas sin el autor: `docs/DECISIONES.md` (incluye mover PROMPT.md y BRIEF_V2.md a `docs/interno/`).
