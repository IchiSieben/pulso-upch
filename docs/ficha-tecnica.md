---
title: "Ficha técnica — Pulso UPCH"
subtitle: "Hackathon FACI 2026 · Reto 3"
---

# Ficha técnica del proyecto — Pulso UPCH

**Hackathon FACI 2026 · Universidad Peruana Cayetano Heredia · Reto 3**
Repositorio: https://github.com/IchiSieben/pulso-upch · Página: https://ichisieben.github.io/pulso-upch/ · Demo: https://ichisieben.github.io/pulso-upch/demo/

> **Límite ético.** Pulso UPCH **no diagnostica** ni detecta estrés, depresión o ninguna
> condición de salud. La medida primaria es un inventario validado que el estudiante responde
> por sí mismo; la dinámica de tecleo es una señal **exploratoria** y así se rotula en
> pantalla. Los resultados sobre datos sintéticos demuestran **viabilidad técnica, no validez
> clínica**.

## 1. Introducción

En universitarios peruanos la magnitud del malestar es alta: en 1 243 estudiantes de seis
universidades de Piura, con muestreo probabilístico, el 24 % alcanzó un nivel alto y el 50 %
un nivel moderado de síntomas de ansiedad y depresión en la escala ESTAD (Valle-Palomino et
al., 2024). Son niveles de escala, no diagnósticos. Y tener síntomas no equivale a llegar a un
servicio: en EE. UU., cerca del 60 % de los estudiantes con síntomas recibió tratamiento
clínico, es decir, unos 4 de cada 10 no (Healthy Minds Study 2024-25, más de 84 000
estudiantes). Las barreras declaradas son falta de tiempo (23 %), dinero (22 %) y preferir
manejarlo solo o con la familia (18 %). Ninguna se resuelve detectando mejor.

Pulso UPCH es una aplicación web que le da al estudiante una lectura honesta de sus propios
hábitos, con una medida validada en Perú como referencia, y acorta el camino hasta una persona
real del servicio de consejería.

## 2. Problematización

La propuesta inicial del equipo era detectar cambios conductuales con la dinámica de tecleo.
Al revisar la evidencia, esa premisa no se sostiene:

- Entre personas, el tecleo predice estrés laboral con **ρ = 0,078**; incluso los mejores
  modelos tienen un error similar o mayor que predecir la media (Naegelin et al., 2025; 36
  empleados, 8 semanas, 3 574 etiquetas EMA). Personalizado, ρ = 0,188.
- El tecleo sí cambia cuando una tarea es más difícil (+6,27 pausas > 1 s; +46,93 ms entre
  teclas), pero predecir la valoración subjetiva del usuario da **R² = 0,005** (Schütz et al.,
  2026; n = 36). Refleja carga impuesta, no estado interno.
- En 24 estudios de *digital phenotyping* en depresión (9 801 participantes) hay falta de
  validación externa (Leaning et al., 2024). El estudio fundacional de tecleo y ánimo analizó
  a 9 de 19 inscritos, con 64 observaciones y sin AUC (Zulueta et al., 2018).
- La retención mediana de las apps de salud mental es 3,3 % a 30 días (Baumel et al., 2019).
- Predecir no es ayudar: un sistema de alerta temprana identificó bien a los estudiantes en
  riesgo y la consejería que disparó no redujo el abandono (Plak et al., 2022).
- Informar sobre un trastorno puede dañar: un taller sobre TDAH subió la creencia de tenerlo
  del 28 % al 58 %; la educación sobre el efecto nocebo redujo ese aumento a la mitad
  (Sandra et al., 2025; RCT doble ciego, n = 215).

**Pregunta de diseño:** ¿cómo acercar al estudiante a una persona real del servicio, con una
medida en la que se pueda confiar, sin diagnosticar, sin vigilar y sin generar el daño que
produce el propio mensaje?

## 3. Objetivos

**General.** Desarrollar un prototipo que acorte el camino entre el estudiante y el servicio
de consejería, usando una medida validada en Perú como referencia y evaluando con honestidad
si una señal exploratoria de tecleo aporta algo.

**Específicos.**
1. Administrar el Inventario SISCO de estrés académico como medida primaria y devolver un
   puntaje descriptivo por subescala.
2. Registrar la carga académica de la semana como variable observable.
3. Comparar la dinámica de tecleo solo con la línea base de la propia persona, rotulada como
   exploratoria, sin almacenar nunca el texto.
4. Integrar educación nocebo en cada mensaje de cambio.
5. Ofrecer el puente a la consejería en un clic, sin enviar resultados a nadie.
6. Definir indicadores de piloto que midan el puente y el posible daño, no la precisión.

## 4. Objetivos de Desarrollo Sostenible (ODS)

- **ODS 3 — Salud y bienestar** (meta 3.4: promover la salud mental y el bienestar).
- **ODS 4 — Educación de calidad**: entornos universitarios que acompañan al estudiante.
- **ODS 16 — Instituciones sólidas** (secundario): tratamiento de datos transparente y con
  consentimiento.

## 5. Diseño del proyecto

**Tres capas de medida, con jerarquía explícita.**

| Capa | Qué mide | Estatus |
|---|---|---|
| 1. Inventario SISCO (Barraza, 2007) | Frecuencia de estresores, síntomas y estrategias de afrontamiento, escala 1–5. Validado en 628 universitarios de Lima: modelos de 3 y 5 factores, invarianza por sexo, ρ de Jöreskog 0,82 / 0,88 / 0,69 (Manrique-Millones et al., 2019). | **Medida primaria** |
| 2. Carga del calendario | Evaluaciones y entregas de la semana. Carga autorreportada ↔ estrés r = 0,62; el estrés sube en las primeras semanas del ciclo y se estabiliza en una meseta (Lahme et al., 2024). | Observable |
| 3. Dinámica de tecleo | Velocidad, intervalos entre teclas, borrados y duración, comparados con la línea base de la propia persona. | **Exploratoria**, rotulada en pantalla |

**Regla dura:** ninguna pantalla sugiere que el tecleo mide estrés. Lo que muestra es
desviación respecto al propio patrón, que es una afirmación descriptiva y verdadera.

**Flujo de usuario.** Consentimiento granular (cada capa por separado) → SISCO → prueba de
escritura → autorreporte voluntario de descanso, energía y evaluaciones de la semana → panel
personal (semana vs. línea base + carga) → si hay cambio sostenido, mensaje descriptivo con
educación nocebo en el mismo bloque y con el mismo peso visual → puente a la consejería →
exportar o borrar mis datos.

**Detector.** Por cada métrica de tecleo se calcula la mediana y la MAD de los primeros 14
días de la misma persona; cada día posterior recibe un z robusto. Un día es atípico si al
menos dos métricas tienen |z| > 3, y solo tres días atípicos seguidos producen "cambio
sostenido observado". Siempre intra-sujeto y con partición temporal, nunca aleatoria ni entre
personas. El mismo algoritmo existe en Python (`model/detector.py`) y JavaScript
(`app/src/detector.js`), y una prueba verifica que marcan los mismos días.

**Arquitectura.**

| Capa | Tecnología |
|---|---|
| App | React 18 + Vite, publicada como sitio estático en GitHub Pages |
| Cómputo | En el navegador: SISCO, detector y panel. Sin servidor |
| Almacenamiento | `localStorage` del propio dispositivo; exportar en JSON y borrar |
| Backend opcional | Python + FastAPI con esquema estricto (rechaza texto); no requerido por la demo |
| Modelo de referencia | Python (`model/`), generador sintético y evaluación reproducible |

**Privacidad.** El capturador solo registra si la pulsación fue un carácter o un borrado y su
marca de tiempo, y al terminar lo reduce a cinco números (`app/src/keystroke.js`). El texto
nunca se guarda ni se envía. No se notifica a nadie.

## 6. Resultados esperados

- Prototipo funcional de punta a punta, accesible desde el teléfono sin instalar nada.
- Medida primaria validada, con puntaje por subescala y sin niveles inventados.
- Mensajes de resultado con educación nocebo integrada.

**Resultados obtenidos sobre datos sintéticos** (`model/train_eval.py`, 30 semillas):

| Escenario sintético | Estado esperado | Coincide |
|---|---|---|
| Estable | Sin cambios relevantes | 30/30 |
| Cambio aislado (1 día) | Sin cambios relevantes | 30/30 |
| Cambio sostenido (5 días) | Cambio sostenido observado | 30/30 |

Barrido de sensibilidad (cambio sostenido reducido): al 50 % del tamaño se detecta en 27/30
corridas; al 40 %, en 18/30; al 30 %, en 3/30; nunca hay falsos positivos en el escenario
estable. La regla es conservadora y **no ve cambios pequeños**.

**Declaración de honestidad.** Los resultados sobre datos sintéticos demuestran **viabilidad
técnica**, no validez clínica. Los escenarios los construyó el equipo; el detector solo
confirma que separa patrones que nosotros definimos. Si los cambios reales son del tamaño que
sugiere la literatura, este detector probablemente no los vería, y eso es lo que un piloto
tiene que medir y publicar.

## 7. Colaboración (propuesta, no coordinada)

Ninguno de estos actores ha sido contactado formalmente; son los que un piloto requeriría.

- **Bienestar Estudiantil de la UPCH** y su servicio de consejería psicológica: destino del
  puente, validación del lenguaje y línea base histórica del tiempo hasta la primera cita.
- **Comité Institucional de Ética en Investigación de la UPCH**: protocolo, consentimiento y
  evaluación de riesgos.
- **Facultad de Ciencias e Ingeniería (FACI)**: soporte técnico.
- **Estudiantes voluntarios**: usabilidad y percepción de vigilancia.

## 8. Plan de implementación e indicadores

| Etapa | Plazo | Entregable |
|---|---|---|
| 0. Hackathon | Hoy | Demo estática, medida primaria, detector sintético, evidencia verificada |
| 1. Ética | Mes 1–2 | Protocolo y aprobación del comité de ética; consentimiento granular revisado |
| 2. Legal | Mes 2 | Banco de datos inscrito conforme a la Ley N.° 29733 y su Reglamento (D.S. N.° 016-2024-JUS); derechos ARCO |
| 3. Convenio | Mes 2–3 | Acuerdo con Bienestar Estudiantil: canal de citas y línea base histórica |
| 4. Piloto | Mes 4–6 | Cohorte voluntaria, 8 semanas |
| 5. Evaluación | Mes 6 | Informe público, incluido si la señal de tecleo no aporta |

**Indicadores del piloto.**

| Indicador | Cómo se mide |
|---|---|
| **Tiempo hasta la primera consulta atendida** *(primario)* | Días entre la derivación en la app y la cita efectivamente asistida, contra la línea base histórica del servicio |
| Conversión derivación → cita asistida | Citas asistidas / derivaciones, seguimiento a 14 días, denominador explícito |
| Retención real a 30 días | Usuarios con ≥ 1 sesión entre los días 23–30 / cohorte inicial; se declara aunque sea mala (referente: 3,3 %) |
| Estrés pre/post a 8 semanas | SISCO al inicio y a las 8 semanas, por intención de tratar, imputando a quienes abandonan |
| Autoetiquetado y daño iatrogénico | Ítem "creo que tengo un problema de salud mental" (1–5) pre/post, como en Sandra et al. (2025), + tasa de falsos positivos |
| Confianza y vigilancia percibida | % que opta por compartir con Bienestar vs. mantener privado; tasa de *opt-out* |

**Tamaño muestral** `[por verificar]`: se calculará con el comité de ética a partir de la
línea base real del tiempo hasta la primera cita; sin ese dato, cualquier cifra sería
inventada.

**Riesgos y mitigaciones.** Autoetiquetado falso (educación nocebo + se mide); percepción de
vigilancia (todo en el dispositivo, consentimiento granular, nadie es notificado); falsos
positivos del tecleo (regla de 3 días, rotulado exploratorio, nunca usado como medida).

## 9. Declaración de uso de IA

El equipo utilizó **Claude (Anthropic), a través de Claude Code**, para redactar la
documentación, generar el código del prototipo y verificar las citas contra sus fuentes
primarias; esa verificación corrigió varias cifras del borrador (ver `docs/evidencia.md`). La
propuesta, el criterio ético, las decisiones de diseño y la revisión final son
responsabilidad del equipo. El detector es una regla estadística clásica (z robusto), no un
modelo de IA generativa, y no procesa texto del usuario.

## 10. Referencias

- Barraza Macías, A. (2007). Propiedades psicométricas del Inventario SISCO del estrés
  académico. *Psicología Científica.com*, 9(13). `[por verificar: datos de edición]`
- Baumel, A., Muench, F., Edan, S., & Kane, J. M. (2019). Objective user engagement with
  mental health apps. *Journal of Medical Internet Research*, 21(9), e14567.
  https://doi.org/10.2196/14567
- Boluarte-Carbajal, A., et al. (2023). *Frontiers in Psychology*, 14, 1160466. https://doi.org/10.3389/fpsyg.2023.1160466
- Cassaretto, M., Vilela, P., & Gamarra, L. (2021). Estrés académico en universitarios
  peruanos. *Liberabit*, 27(2), e482.
- Healthy Minds Network. (2025). *Healthy Minds Study 2024-2025 Data Report*.
- Lahme, S. Y., et al. (2024). *arXiv*, 2404.05682. https://arxiv.org/abs/2404.05682
- Leaning, I. E., et al. (2024). From smartphone data to clinically relevant predictions.
  *Neuroscience & Biobehavioral Reviews*, 158, 105541.
  https://doi.org/10.1016/j.neubiorev.2024.105541
- Manrique-Millones, D., Millones-Rivalles, R., & Manrique-Pino, O. (2019). The SISCO
  Inventory of Academic Stress: Examination of its psychometric properties in a Peruvian
  sample. *Ansiedad y Estrés*, 25(1), 28–34. https://doi.org/10.1016/j.anyes.2019.03.001
- Naegelin, M., Weibel, R. P., Kerr, J. I., et al. (2025). One does not fit all: Detecting
  work-related stress from mouse, keyboard, and cardiac data in the field. *medRxiv*.
  https://doi.org/10.1101/2025.08.02.25332538
- Perú. Congreso de la República. (2011). *Ley N.° 29733, Ley de Protección de Datos
  Personales*. Ministerio de Justicia. (2024). *D.S. N.° 016-2024-JUS*.
- Plak, S., Cornelisz, I., Meeter, M., & van Klaveren, C. (2022). Early warning systems for
  more effective student counselling in higher education. *Higher Education Quarterly*,
  76(1), 131–152. https://doi.org/10.1111/hequ.12298
- Sandra, D. A., et al. (2025). Inform and do no harm: Nocebo education reduces false
  self-diagnosis caused by mental health awareness. *Psychological Medicine*, 55, e330.
  https://doi.org/10.1017/S0033291725101979
- Schütz, L., Cherif, Y., Sayffaerth, C., Weber, T., & Chiossi, F. (2026). Typing behavior
  in human-LLM interaction. *Proceedings of the ACM on Human-Computer Interaction*.
  https://doi.org/10.1145/3821685
- Valle-Palomino, N., et al. (2024). *BMC Psychology*, 12, 765.
  https://doi.org/10.1186/s40359-024-02272-w
- Zulueta, J., et al. (2018). Predicting mood disturbance severity with mobile phone
  keystroke metadata: A BiAffect digital phenotyping study. *Journal of Medical Internet
  Research*, 20(7), e241. https://doi.org/10.2196/jmir.9775
