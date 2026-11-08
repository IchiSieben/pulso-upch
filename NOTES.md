# NOTES — Pulso UPCH

## 2026-11-07 (noche) · Paleta Cayetano, movimiento, slides y guion de 8:00

**Hecho.** 3 correcciones de texto; paleta granate/dorado con AA verificado
(`tools/contrast.py`); movimiento con IntersectionObserver y tarjetas de referencias; deck en
`expo/` con PDF; guion reescrito para 8:00 con el video en mute narrado.
**Decidido** (detalle en `docs/DECISIONES.md`): el granate es solo marca, nunca estado. Lo
que marca "tú" en la demo pasó a neutro. `--faint` se oscureció porque daba 3,6:1. El build
ya no vacía `demo/`. El temporizador arranca con T, no al cargar.
**Pendiente.** Subir `demo/pulso-demo.mp4` y ajustar los tiempos del guion; nombres del
equipo; URL de consejería; ensayo.

## 2026-11-07 · Giro a la versión de presentación (docs/interno/BRIEF_V2.md)

**Hecho.** Los 7 puntos del brief V2. Ver HANDOFF.md para el detalle y la verificación.

**Decidido y por qué** (detalle en `docs/DECISIONES.md`):
- Detector: z robusto contra la línea base propia en vez de Isolation Forest, para que la
  demo corra en el navegador con un algoritmo verificable idéntico al de Python. El IF sigue
  en `model/detector_iforest.py`.
- SISCO de 31 ítems, no SV-21: es la versión validada en Perú.
- Sin niveles leve/moderado/severo: no hay puntos de corte validados en Perú.
- Manda la fuente sobre el brief: 6 cifras corregidas (Schütz n=36; "~40 %" es derivado y de
  EE. UU.; Sandra es sobre TDAH; Lahme no analizó semanas de examen; Leaning dice "falta de"
  validación externa; orden de autores de Manrique-Millones).
- Línea 113 sin número de opción: las fuentes no coinciden en la ruta del menú.

**Hallado en la verificación:** las frases de "pausas" e "irregularidad" tenían la dirección
invertida; corregido y fijado con `tests/test_phrases.py`.

**Pendiente.** URL directa de consejería UPCH; nombres del equipo en el guion; ensayo;
snapshot en Drive.
