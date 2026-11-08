# HANDOFF — Pulso UPCH (V3, maratón del 2026-11-08)

- Repo: https://github.com/IchiSieben/pulso-upch · Página: https://ichisieben.github.io/pulso-upch/
- Demo: https://ichisieben.github.io/pulso-upch/demo/ · Slides: https://ichisieben.github.io/pulso-upch/expo/
  · PDF de respaldo: https://ichisieben.github.io/pulso-upch/expo/pulso-upch-expo.pdf
- Video: https://ichisieben.github.io/pulso-upch/demo/pulso-demo.mp4 · One-pager: `docs/one-pager.pdf`
- Última sesión: 2026-11-08. Último cambio de código publicado: `489dc4f` (verificado en Pages).
  Tags `fase-1` … `fase-7`. Snapshot en Drive: `Gdrive:01-Trabajo/Portfolio/pulso-upch/2026-11-08/`.

## Para el dueño, en 10 líneas

1. **Hecho, las 7 fases**, cada una con commit, tag `fase-N` y push:
   - investigación verificada (50 ✅ de 55);
   - `PRODUCTO_V3`;
   - rediseño de la demo, la landing y las slides;
   - `ARQUITECTURA_V3` con el piloto;
   - video de 4:29;
   - guion, preguntas y one-pager;
   - control de calidad.
2. **Calidad.** Lighthouse da accesibilidad 100 en la landing, la demo y las slides.
   `pytest` 9 passed, `contrast.py` sin fallos, E2E de la demo en teléfono sin fallos y sin
   errores de consola.
3. **Decidí sin ti: la mascota está recortada.** La evidencia (1C) no muestra que mejore la
   primera semana, así que entra como guía apagable, sin estados de ánimo ni rachas, y se
   presenta como **hipótesis** con un A/B en el piloto, nunca como retención.
4. **Decidí sin ti: el check-in.** "Evaluaciones de la semana" salió del check-in para dejarlo
   en 3 toques. La pregunta rotativa del SISCO va **tal cual** ("este semestre").
5. **Decidí sin ti: el video.** Se grabó en Python en vez de `.mjs`, y "Tus datos" va después
   de "Hablar con alguien", siguiendo el flujo real. Todo está en `docs/DECISIONES.md`, con
   cómo revertirlo.
6. **Descarté cifras.** Evans 2018 (solo estaba confirmada en una nota de prensa) y "casi el
   doble que en 2019" del INEI (es +64 %).
7. **Corregí un DOI.** El DOI de Schütz 2026 todavía no está registrado y ahora enlaza a arXiv.
8. **Revisa antes del lunes, 1.** Ve el video completo y ensaya el guion con cronómetro. Las
   slides 4 a 6 están al límite de 1:30.
9. **Revisa antes del lunes, 2.** Mira el dibujo de la mascota en `docs/capturas/despues/` y
   decide si se queda. Para apagarla por defecto, cambia `mascot: false` en
   `app/src/prefs.js` y haz build.
10. **Pendiente:**
    - nombres del equipo (Persona 1/2/3);
    - URL real de consejería (no existe una pública; la 1E solo halló una noticia de 2023);
    - la línea base de Bienestar (el 5 % del tamaño muestral es un supuesto);
    - **Hostinger no sirve este proyecto.** Ningún sitio de la cuenta lo publica; solo
      GitHub Pages. Para publicarlo, crear `pulso.ichisieben.dev` (comando en
      DECISIONES);
    - `docs/ficha-tecnica.md` y `docs/Reto3_PulsoUPCH.pdf` todavía describen el flujo V2
      (autorreporte, sin check-in ni mascota): actualizar y regenerar con
      `tools/ficha_pdf.py`.

## 2026-11-08 · Maratón V3: qué hay y dónde

| Fase | Qué quedó | Archivos |
|---|---|---|
| 1 | 5 informes y un verificador independiente; E14–E36 en evidencia | `docs/investigacion/`, `docs/evidencia.md` |
| 2 | Qué entra y qué no, con su fuente | `docs/PRODUCTO_V3.md` |
| 3 | Design system; la demo, la landing y las slides rediseñadas; capturas antes y después | `docs/DESIGN_SYSTEM.md`, `app/`, `demo/`, `index.html`, `expo/`, `docs/capturas/` |
| 4 | Piloto propuesto, modelo de datos, n ≈ 250, mapa por carrera, hoja de ruta | `docs/ARQUITECTURA_V3.md` |
| 5 | Video de 4:29, 1080p30, 9,4 MB; se regenera con `python -I tools/video/record_demo.py` | `demo/pulso-demo.mp4`, `docs/video-timestamps.md`, `tools/video/` |
| 6 | Guion con los tiempos reales, preguntas 14–19, one-pager A4 | `docs/guion-exposicion.md`, `docs/preguntas-dificiles.md`, `docs/one-pager.pdf` |
| 7 | Enlaces, Lighthouse, E2E, tests, contraste; README y estado | este archivo, `README.md`, `NOTES.md` |

Comandos:
- `cd app && npm run build`, que no borra `demo/pulso-demo.mp4`;
- `python -m pytest tests backend -q`;
- `python tools/contrast.py`;
- `python -I tools/one_pager_pdf.py`;
- `python -I tools/video/record_demo.py [--preview]`;
- `python -I tools/qa/e2e_demo.py [BASE_URL]`, `tools/qa/expo_test.py` y `tools/qa/landing_test.py`
  (por defecto, contra la URL pública).

---

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
