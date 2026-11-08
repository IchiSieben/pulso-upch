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
