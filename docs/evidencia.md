# Evidencia: lo que dice y lo que no

Fuente única de las cifras que usa el proyecto (README, ficha, página, app y kit de
exposición). Cada fila se verificó contra la fuente primaria el 7 nov 2026. Donde el brief
original decía algo más fuerte que la fuente, manda la fuente y se anota la corrección.

## Tabla de evidencia

| # | Qué dice la fuente (cifras tal cual) | Qué NO dice | Qué decidimos | Fuente |
|---|---|---|---|---|
| E1 | 36 empleados, 8 semanas, 3 574 observaciones etiquetadas por EMA. Predecir estrés con ratón y teclado entre personas ("one-fits-all"): **ρ = 0,078**. Personalizado: ρ medio = 0,188. Los mejores modelos tienen un error (MAE) **similar o algo mayor que un modelo que predice la media**. | No dice que el tecleo nunca servirá; dice que hoy no sirve para uso real. | El tecleo queda como **señal exploratoria rotulada**, nunca como medida de estrés. El modelo es siempre intra-sujeto. | Naegelin, Weibel, Kerr et al. (2025), "One does not fit all: Detecting work-related stress from mouse, keyboard, and cardiac data in the field", *medRxiv*, [10.1101/2025.08.02.25332538](https://doi.org/10.1101/2025.08.02.25332538) |
| E2 | n = 36. Cuando la tarea (escribir *prompts* a un LLM) es más difícil, el tecleo **sí** cambia: +6,27 pausas > 1 s; +46,93 ms de intervalo entre teclas. Pero predecir la valoración subjetiva del usuario (utilidad percibida de la respuesta) da **R² = 0,005** en el mejor caso. | No es un estudio de estrés clínico ni de estudiantes. | El tecleo refleja **carga impuesta por la tarea**, no el estado interno. Por eso añadimos la carga académica del calendario como variable observable. | Schütz, Cherif, Sayffaerth, Weber & Chiossi (2026), "Typing Behavior in Human-LLM Interaction", *Proc. ACM Hum.-Comput. Interact.* (PACM-HCI), [10.1145/3821685](https://doi.org/10.1145/3821685); preprint [arXiv:2606.28090](https://arxiv.org/abs/2606.28090) |
| E3 | Revisión sistemática: 24 estudios de *digital phenotyping* en depresión, 9 801 participantes. Desempeño heterogéneo y **falta de validación externa**. | El resumen no afirma literalmente que "ningún" estudio validó externamente; no se pudo leer el texto completo. | No usamos ninguna cifra de precisión de la literatura como si fuera nuestra. | Leaning et al. (2024), *Neurosci. Biobehav. Rev.* 158:105541, [10.1016/j.neubiorev.2024.105541](https://doi.org/10.1016/j.neubiorev.2024.105541) |
| E4 | BiAffect (trastorno bipolar): 19 inscritos, **9 analizados**, 64 observaciones, R² marginal 0,41, **sin AUC reportado**. | No es población universitaria ni de estrés académico. | El "estudio fundacional" del tecleo y el ánimo es pequeño: no se puede citar como prueba de que funciona. | Zulueta et al. (2018), *J. Med. Internet Res.* 20(7):e241, [10.2196/jmir.9775](https://doi.org/10.2196/jmir.9775) |
| E5 | 93 apps de salud mental (mediana 100 000 instalaciones): retención mediana **3,9 % a 15 días y 3,3 % a 30 días**; apertura diaria mediana 4,0 %. | No mide apps universitarias con puente a un servicio. | El valor se entrega en la **primera semana** y el indicador principal es el puente a la consejería, no el uso. Declaramos la retención aunque sea mala. | Baumel et al. (2019), *J. Med. Internet Res.* 21(9):e14567, [10.2196/14567](https://doi.org/10.2196/14567) |
| E6 | Experimento de campo aleatorizado en una universidad neerlandesa: el sistema de alerta temprana **predijo con precisión** a los estudiantes en riesgo, y la consejería que disparó **no redujo el abandono ni mejoró el rendimiento**. | No dice que la consejería no sirva; dice que predecir no basta. | **Predecir ≠ ayudar.** Medimos el tiempo hasta una consulta efectivamente atendida, no la precisión. | Plak et al. (2022), *Higher Education Quarterly* 76(1):131–152, [10.1111/hequ.12298](https://doi.org/10.1111/hequ.12298) |
| E7 | Ensayo doble ciego, n = 215 jóvenes sanos. Un taller de concienciación sobre TDAH subió la creencia de tener TDAH del **28 % al 58 %**. Con educación sobre el efecto nocebo: del 26 % al 41 %; los autores dicen que **redujo aproximadamente a la mitad** el aumento inmediato. A la semana, la diferencia contra el control no fue significativa (p = 0,08). | Es sobre TDAH, no sobre estrés; el efecto a una semana es incierto. | Cada mensaje de cambio lleva **educación nocebo integrada**, con el mismo peso visual. Y **medimos el autoetiquetado** en el piloto, porque el efecto a largo plazo no está probado. | Sandra et al. (2025), "Inform and do no harm", *Psychological Medicine* 55:e330, [10.1017/S0033291725101979](https://doi.org/10.1017/S0033291725101979) |
| E8 | 1 243 universitarios de 6 universidades de Piura, muestreo probabilístico proporcional: **24 % en nivel alto y 50 % en nivel moderado** de síntomas de ansiedad y depresión (escala ESTAD). | Son niveles de una escala, **no diagnósticos**; es Piura, no Lima ni la UPCH. | Se cita como magnitud del problema en universitarios peruanos, con esos matices dichos en voz alta. | Valle-Palomino et al. (2024), *BMC Psychology* 12:765, [10.1186/s40359-024-02272-w](https://doi.org/10.1186/s40359-024-02272-w) |
| E9 | Healthy Minds Study 2024-25 (EE. UU.): más de 84 000 estudiantes, 135 campus. Cerca del **60 %** de quienes tienen síntomas de depresión o ansiedad recibió tratamiento clínico. Barreras: falta de tiempo (23 %), razones económicas (22 %), preferir manejarlo solo o con la familia (18 %). | El "~40 % sin tratamiento" **lo derivamos** nosotros (100 − 60); no está impreso así. Es población de EE. UU. | Lo decimos como "cerca de 4 de cada 10, en EE. UU." Ninguna de esas barreras se resuelve detectando mejor: por eso el producto es el puente. | Healthy Minds Network (2025), *Healthy Minds Study 2024-2025 Data Report*, [UCLA Health Policy](https://healthpolicy.ucla.edu/our-work/publications/healthy-minds-study-2024-2025-data-report) |
| E10 | Carga autorreportada ↔ estrés: **r_rm = 0,62**. El estrés **sube en las primeras semanas del ciclo y se estabiliza en una meseta** (η² parcial = 0,52, primer semestre). | Las semanas de examen **no se analizaron** (poca participación): no se puede afirmar ni negar un pico en exámenes. | La carga del calendario es una variable observable. **No prometemos "detectar el pico de exámenes".** | Lahme et al. (2024), [arXiv:2404.05682](https://arxiv.org/abs/2404.05682) |
| E11 | Inventario SISCO de estrés académico (31 ítems: filtro, intensidad, 8 estresores, 15 síntomas, 6 estrategias de afrontamiento; Likert 1 = nunca a 5 = siempre). Validado en **628 universitarios de Lima** (muestreo por conveniencia): modelos de 3 y 5 factores con ajuste adecuado, **invarianza por sexo**, confiabilidad ρ de Jöreskog 0,82 / 0,88 / 0,69. | No tiene puntos de corte clínicos validados en Perú; no diagnostica. | Es la **medida primaria** de la app. Reportamos puntaje por subescala, sin "niveles" inventados. | Manrique-Millones, Millones-Rivalles & Manrique-Pino (2019), *Ansiedad y Estrés* 25(1):28–34, [10.1016/j.anyes.2019.03.001](https://doi.org/10.1016/j.anyes.2019.03.001). Instrumento original: Barraza (2007). |
| E12 | Segundo uso peruano del SISCO: universitarios de Lima, con aprobación de comité de ética; α de Cronbach entre 0,78 y 0,91. Estresores principales: evaluaciones de los docentes, sobrecarga y tiempo limitado. | — | Respalda el uso del SISCO en universitarios peruanos. | Cassaretto, Vilela & Gamarra (2021), *Liberabit* 27(2):e482 |
| E13 | Escala de Estrés Percibido en Lima, n = 752: se recomienda la **versión de 12 ítems**, con **dos factores ortogonales** (distrés y eustrés, r = −0,041); el análisis bifactor rechaza un factor global. | — | Alternativa al SISCO. Si se usa, **se reportan dos puntajes, nunca uno**. No implementada en el MVP. | Boluarte-Carbajal et al. (2023), *Front. Psychol.* 14:1160466, [10.3389/fpsyg.2023.1160466](https://doi.org/10.3389/fpsyg.2023.1160466) |

## Correcciones respecto al brief V2

- E2: n = 36 (34 era el mínimo del cálculo de potencia); R² = 0,005 es sobre la utilidad
  percibida de la respuesta de un LLM.
- E3: "falta de validación externa" en lugar de "ningún estudio".
- E7: el estudio es sobre TDAH; la cifra es creencia de tener TDAH.
- E9: el 40 % es derivado y de EE. UU.
- E10: se retira "no es un pico en exámenes" como hallazgo; las semanas de examen no se
  analizaron.
- E11: el orden de autores es Manrique-Millones, Millones-Rivalles, Manrique-Pino; la
  versión validada en Perú es la de 31 ítems (no la SV-21).

## Resultado propio (datos sintéticos)

Los resultados sobre datos sintéticos demuestran **viabilidad técnica**, no validez clínica.
`python model/train_eval.py`, 30 semillas por escenario:

| Escenario | Esperado | Coincide |
|---|---|---|
| Estable | sin cambios relevantes | 30/30 |
| Cambio aislado (1 día) | sin cambios relevantes | 30/30 |
| Cambio sostenido (5 días) | cambio sostenido observado | 30/30 |

Ese 90/90 es fácil **porque el cambio lo construimos nosotros y es grande** (unas 5
desviaciones estándar de la velocidad). El barrido de sensibilidad muestra dónde deja de
funcionar:

| Tamaño del cambio sintético | Detectado (de 30) | Falsos positivos en "estable" |
|---|---|---|
| 10 % | 0 | 0 |
| 20 % | 1 | 0 |
| 30 % | 3 | 0 |
| 40 % | 18 | 0 |
| 50 % | 27 | 0 |
| 75 % | 30 | 0 |
| 100 % | 30 | 0 |

Lectura honesta: la regla es conservadora (no inventa cambios) y **no ve cambios pequeños**.
Si los cambios reales asociados al estrés son del tamaño que sugiere E1, este detector no los
vería. Eso es exactamente lo que un piloto tiene que medir.
