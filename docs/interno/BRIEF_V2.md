> **Documento interno de trabajo, reemplazado.** El enfoque vigente está en el README y en `docs/evidencia.md`; las cifras de este texto se corrigieron contra sus fuentes allí.

# BRIEF V2 — Pulso UPCH · versión de presentación

> Este documento reemplaza el enfoque anterior del proyecto. Léelo entero antes de
> tocar código. Se presenta el **lunes** ante jurado académico con perfil de salud,
> y **el autor de este brief no estará presente**: el equipo expone solo, así que
> todo lo que se construya debe ser auto-explicativo.

---

## 0. Lo que cambia y por qué

Investigamos la evidencia real detrás de la premisa del proyecto. El resultado es
incómodo y hay que incorporarlo, no esconderlo:

| Hallazgo | Fuente |
|---|---|
| La dinámica de tecleo predice estrés con **ρ = 0.078 entre sujetos** (0.188 personalizado). **No supera a un modelo que predice la media.** Los autores concluyen que no sirve para uso real todavía. | "One does not fit all: Detecting work-related stress from mouse, keyboard and heart rate data", medRxiv 2025.08.02.25332538 — 36 empleados, 8 semanas, 3 574 etiquetas EMA |
| Al manipular la dificultad de la tarea, el tecleo **sí** cambia (pausas >1 s +6.27; inter-key +46.9 ms), pero predecir la valoración subjetiva del usuario da **R² = 0.005**. Detecta carga impuesta, no estado interno. | Schütz et al. 2026, PACM-HCI, [DOI](https://doi.org/10.1145/3821685), n=34 |
| En 24 estudios de digital phenotyping en depresión (9 801 participantes), **ningún estudio usó validación externa**. Desempeño "moderado", riesgo de sesgo por datos faltantes. | Leaning et al. 2024, *Neurosci Biobehav Rev* 158:105541, [DOI](https://doi.org/10.1016/j.neubiorev.2024.105541) |
| BiAffect, el estudio fundacional de keystroke y ánimo: de 19 inscritos **se analizaron 9**, 64 observaciones, R² marginal 0.41, **sin AUC reportado**, teléfonos provistos por el estudio. | Zulueta et al. 2018, *JMIR* 20(7):e241 |
| Retención de apps de salud mental: **3.9 % a 15 días, 3.3 % a 30 días**. Apertura diaria mediana 4.0 %. | Baumel et al. 2019, *JMIR* 21(9):e14567 — 93 apps, mediana 100 000 instalaciones |
| Un sistema de alerta temprana **predijo con precisión** a los estudiantes en riesgo y la consejería que disparó **no redujo el abandono ni mejoró el rendimiento**. Predecir ≠ ayudar. | Plak et al. 2022, *Higher Education Quarterly* 76(1):131–152, [DOI](https://doi.org/10.1111/hequ.12298) |
| Informar sobre un trastorno subió el **autodiagnóstico falso del 28 % al 58 %** sin que los síntomas reales cambiaran. Añadir educación sobre el efecto nocebo **lo redujo a la mitad**. | Sandra et al. 2025, *Psychological Medicine* 55:e330, [DOI](https://doi.org/10.1017/S0033291725101979), RCT doble ciego n=215 |
| En universitarios peruanos: **24 % nivel alto y 50 % moderado** de síntomas de ansiedad/depresión. | Valle-Palomino et al. 2024, *BMC Psychology* 12(1):765, [DOI](https://doi.org/10.1186/s40359-024-02272-w), n=1 243, 6 universidades de Piura, muestreo probabilístico |
| ~40 % de estudiantes con síntomas **no recibe tratamiento**. Barreras: falta de tiempo (23 %), dinero (22 %), preferir manejarlo solo (18 %). Ninguna se resuelve detectando mejor. | Healthy Minds Study 2024-25, 84 000 estudiantes, 135 campus |

**Conclusión operativa:** el proyecto deja de afirmar que detecta estrés. Pasa a ser
un instrumento honesto que mide si la señal sirve, apoyado en una medida validada,
y cuyo producto real es el **puente al servicio humano que ya existe**.

---

## 1. La tesis nueva, en una frase

> El 40 % de los estudiantes con síntomas no llega al servicio de consejería que su
> universidad ya tiene. Pulso UPCH no intenta diagnosticarlos: les da una lectura
> honesta de sus propios hábitos, con una medida validada en Perú como referencia,
> y acorta el camino hasta una persona real. Y mide si su propia señal sirve —
> publicando la respuesta aunque sea que no.

Esa última cláusula es el diferenciador. Los demás equipos van a prometer detección.
Nosotros medimos honestamente y reportamos el fracaso si lo hay.

---

## 2. Arquitectura de la medida (lo que hay que reconstruir)

**Tres capas, jerarquía explícita:**

1. **Medida primaria — instrumento validado.** El estudiante responde un inventario
   corto validado en población peruana. Opciones:
   - **SISCO** de estrés académico — validado con **628 universitarios peruanos**,
     invarianza por sexo (Manrique-Millones, Manrique-Pino & Millones-Rivalles 2019,
     *Ansiedad y Estrés*, [DOI](https://doi.org/10.1016/j.anyes.2019.03.001)).
   - **Escala de Estrés Percibido adaptada a Lima** — n=752; **atención: el estudio
     recomienda 12 ítems y estructura de DOS factores no correlacionados
     (distrés/eustrés), y rechaza un puntaje global único** (Boluarte-Carbajal et al.
     2023, *Front Psychol* 14:1160466,
     [DOI](https://doi.org/10.3389/fpsyg.2023.1160466)). Si se usa, hay que reportar
     dos puntajes, no uno.

   Implementar SISCO como principal. No inventar ítems: usar los del instrumento
   publicado y citarlo.

2. **Variable de calendario — carga académica observable.** No requiere inferir
   estados internos: cuántas evaluaciones y entregas caen en cada semana del ciclo.
   La relación carga autorreportada ↔ estrés es **r = 0.62** (Lahme et al. 2024,
   arXiv:2404.05682). Ojo con el matiz: la trayectoria **no es un pico en la semana de
   exámenes**, es una meseta que sube en las primeras 4–5 semanas y se mantiene
   (η² parcial = .52). No prometan "detectamos el pico de exámenes".

3. **Señal exploratoria — dinámica de tecleo.** Se mantiene, pero **rotulada en la
   propia interfaz como exploratoria**, con su ρ real a la vista. El modelo es
   **intra-sujeto siempre**: se entrena sobre la línea base de la propia persona y se
   evalúa con partición temporal por bloques, nunca aleatoria y nunca entre personas.

**Regla dura:** ninguna pantalla, texto o gráfico puede sugerir que el tecleo mide
estrés. Lo que mide es *desviación respecto al propio patrón*, que es una afirmación
descriptiva y verdadera.

---

## 3. Qué construir

### 3.1 La app (prioridad 1)

Flujo, con la jerarquía nueva:

```
consentimiento granular
  → inventario validado (medida primaria)
  → prueba de escritura (señal exploratoria, rotulada)
  → autorreporte de descanso y energía
  → panel personal: tu semana vs. tu línea base + carga del calendario
  → si hay cambio sostenido: mensaje CON educación nocebo
  → puente: agendar orientación (una acción, un clic)
  → exportar mis datos · borrar mis datos
```

**El mensaje de cambio sostenido debe llevar, en el mismo bloque y con el mismo peso
visual:**
- qué cambió, en términos descriptivos ("escribiste más lento y borraste más que tu
  promedio de las últimas 3 semanas");
- que **las fluctuaciones son normales** y hay muchas causas no clínicas;
- que **esto no es un diagnóstico ni una evaluación de salud**;
- la acción voluntaria, sin presión.

Esto no es un disclaimer legal al pie. Es una intervención con evidencia: reduce el
autoetiquetado falso a la mitad (Sandra et al. 2025). Que se vea.

### 3.2 Estética

Referencia: páginas de producto de Apple. Mucho aire, tipografía grande, una sola
columna, jerarquía clara, cero bordes y sombras recargadas. Modo claro y oscuro.
Responsive de verdad, que en teléfono se vea igual de bien — es donde lo van a abrir.

Paleta sobria. Nada de rojo de alarma en los estados: el "cambio sostenido observado"
no es una emergencia y no debe parecerlo. Ámbar suave como mucho.

### 3.3 La página de presentación (prioridad 2)

`index.html` tiene que servirle al equipo el lunes **sin que nadie explique nada**.
Secciones:

1. El problema con las cifras peruanas (24 % / 50 %, n=1 243) y el 40 % que no llega
   al servicio.
2. La tesis en una frase.
3. **Diagrama de arquitectura en SVG, interactivo**: al pasar o tocar cada bloque se
   explica qué hace. Tres capas de medida + flujo de datos + dónde vive cada cosa.
4. **La sección que gana el hackathon: "Lo que la evidencia dice y lo que no".**
   Una tabla honesta con ρ=0.078, R²=0.005, 3.3 % de retención, y qué decidimos en
   consecuencia. Ningún otro equipo va a tener esto.
5. Privacidad por diseño, demostrable: enlace al código exacto donde se ve que el
   texto nunca se guarda.
6. Indicadores del piloto y cómo se medirían.
7. Proyección: qué haría falta para un piloto real (comité de ética, convenio con
   Bienestar, tamaño muestral).

### 3.4 Indicadores del piloto (van en la ficha y en la web)

| Indicador | Cómo se mide |
|---|---|
| **Tiempo hasta primera consulta atendida** *(primario)* | Días entre la derivación en la app y la cita efectivamente asistida, contra línea base histórica del servicio |
| Conversión derivación → cita **asistida** | Derivaciones / citas asistidas, seguimiento a 14 días, denominador explícito |
| Retención real a 30 días | Usuarios con ≥1 sesión entre los días 23–30 / cohorte inicial. **Declararla aunque sea mala; el referente honesto es 3.3 %** |
| Estrés pre/post a 8 semanas | SISCO al inicio y a las 8 semanas, **análisis por intención de tratar** imputando a quienes abandonan |
| **Autoetiquetado y daño iatrogénico** | Ítem "creo que tengo un problema de salud mental" (1–5) pre/post, replicando el diseño de Sandra et al. + tasa de falsos positivos |
| Confianza y percepción de vigilancia | % que opta por compartir con Bienestar vs. mantener privado; tasa de opt-out |

Medir el daño es lo que separa una propuesta seria de un pitch. Que esté a la vista.

---

## 4. Despliegue

La app y el backend solo corren en local hoy. Para el lunes:

- **La landing** ya está en GitHub Pages y ahí se queda.
- **La app** debe quedar accesible públicamente. Opción barata y suficiente: compilar
  el front y publicarlo también estático, con el modelo corriendo **en el navegador**
  (el Isolation Forest sobre 21 días de datos es trivial; se puede reimplementar en JS
  o precomputar). Así no hace falta backend vivo y la demo nunca se cae en la
  exposición.
- Si se mantiene el backend, tiene que estar levantado y probado **el domingo**, no el
  lunes. Una demo que depende de un `uvicorn` en la laptop de alguien es una demo que
  falla.

Decide tú cuál, pero **la demo del lunes no puede depender de que alguien arranque un
servidor**.

---

## 5. Kit de exposición para el equipo

El autor no estará el lunes. Hay que dejar, en `docs/`:

- **`guion-exposicion.md`** — 7 minutos cronometrados, con quién dice qué y en qué
  minuto. Que incluya la frase de apertura y la de cierre, literales.
- **`preguntas-dificiles.md`** — las preguntas que el jurado va a hacer y la respuesta
  honesta a cada una. Mínimo estas:
  - *"¿Qué evidencia tienen de que el tecleo mide estrés?"* → la respuesta es ρ=0.078
    y por eso es exploratoria y la medida primaria es SISCO. **Responder esto bien
    gana el hackathon; responderlo mal lo pierde.**
  - *"¿Esto no es vigilancia?"* → consentimiento granular, datos del estudiante,
    nunca se guarda texto, borrado funcional, no se notifica a nadie.
  - *"¿Y si genera ansiedad en quien lo usa?"* → educación nocebo en cada mensaje,
    con la cita del ensayo, y el indicador de autoetiquetado que vamos a medir.
  - *"¿Quién lo va a seguir usando?"* → nadie, estadísticamente: 3.3 % a 30 días. Por
    eso el valor se entrega en la primera semana y el KPI es el puente, no el uso.
  - *"¿Por qué no usan una app que ya existe?"*
  - *"¿Esto reemplaza al psicólogo?"* → no, y el diseño entero está hecho para
    llevar hacia él.
- **`arquitectura.md`** — una página explicando el sistema para alguien que no lo
  construyó.

---

## 6. Reglas de honestidad (no negociables)

- Ninguna cifra sin fuente verificable. Si no está comprobada, se marca como
  `[por verificar]` visible, no se maquilla.
- Los resultados sobre datos sintéticos demuestran **viabilidad técnica**, no validez
  clínica. Esa frase va tal cual donde corresponda.
- No se afirma ningún contacto institucional que no haya ocurrido. Si no hay convenio
  con Bienestar Universitario, se dice "propuesto", no "coordinado".
- El sistema **no diagnostica** nada. Ni en la interfaz, ni en la ficha, ni en el
  pitch.
- La declaración de uso de IA se mantiene y se actualiza.
- La URL real de consejería de la UPCH debe reemplazar el marcador actual
  (`VITE_COUNSELING_URL`). Si no se consigue, se deja el marcador **visible como
  pendiente**, no un enlace falso.

---

## 7. Orden de trabajo sugerido

1. Reescribir README y ficha técnica con el enfoque nuevo y las citas de la sección 0.
2. Añadir el inventario validado a la app como medida primaria.
3. Reescribir el mensaje de resultado con educación nocebo.
4. Rehacer la interfaz completa con la estética descrita.
5. Rehacer `index.html` con el diagrama interactivo y la sección de evidencia honesta.
6. Dejar la demo accesible sin backend vivo.
7. Escribir el kit de exposición.
8. Commit y push frecuentes; que nada viva solo en local.

Al terminar, actualiza `HANDOFF.md` y `NOTES.md` con qué quedó hecho, qué quedó
pendiente y por qué.
