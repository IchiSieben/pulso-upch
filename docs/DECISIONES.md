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
