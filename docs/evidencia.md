# Evidencia: lo que dice y lo que no

Fuente única de las cifras que usa el proyecto (README, ficha, página, app y kit de
exposición). Cada fila se verificó contra la fuente primaria el 7 nov 2026. Donde el brief
original decía algo más fuerte que la fuente, manda la fuente y se anota la corrección.

## Tabla de evidencia

| # | Qué dice la fuente (cifras tal cual) | Qué NO dice | Qué decidimos | Fuente |
|---|---|---|---|---|
| E1 | 36 empleados, 8 semanas, 3 574 observaciones etiquetadas por EMA. Predecir estrés con ratón y teclado entre personas ("one-fits-all"): **ρ = 0,078**. Personalizado: ρ medio = 0,188. Los mejores modelos tienen un error (MAE) **similar o algo mayor que un modelo que predice la media**. | No dice que el tecleo nunca servirá; dice que hoy no sirve para uso real. | El tecleo queda como **señal exploratoria rotulada**, nunca como medida de estrés. El modelo es siempre intra-sujeto. | Naegelin, Weibel, Kerr et al. (2025), "One does not fit all: Detecting work-related stress from mouse, keyboard, and cardiac data in the field", *medRxiv*, [10.1101/2025.08.02.25332538](https://doi.org/10.1101/2025.08.02.25332538) |
| E2 | n = 36. Cuando la tarea (escribir *prompts* a un LLM) es más difícil, el tecleo **sí** cambia: +6,27 pausas > 1 s; +46,93 ms de intervalo entre teclas. Pero predecir la valoración subjetiva del usuario (utilidad percibida de la respuesta) da **R² = 0,005** en el mejor caso. | No es un estudio de estrés clínico ni de estudiantes. | El tecleo refleja **carga impuesta por la tarea**, no el estado interno. Por eso añadimos la carga académica del calendario como variable observable. | Schütz, Cherif, Sayffaerth, Weber & Chiossi (2026), "Typing Behavior in Human-LLM Interaction", *Proc. ACM Hum.-Comput. Interact.* (PACM-HCI), DOI anunciado 10.1145/3821685 (al 2026-11-08 todavía no resuelve en doi.org); preprint [arXiv:2606.28090](https://arxiv.org/abs/2606.28090) |
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

## Ampliación 2026-11-08 (Fase 1, solo filas ✅)

Origen: los informes de `docs/investigacion/`. Cada fila la comprobó por separado un
verificador contra la fuente (`docs/investigacion/verificacion.md`). Solo entran las cifras
marcadas ✅. Las ⚠️ (Evans 2018; "casi el doble" del INEI frente a 2019) **no se usan**.

| # | Qué dice la fuente (cifras tal cual) | Qué NO dice | Qué decidimos | Fuente |
|---|---|---|---|---|
| E14 | Perú, ENDES 2023: el **14,4 %** de las personas de 15 a 19 años tuvo algún episodio depresivo en los últimos 12 meses (total de 15 años o más: 10,9 %). Serie para 15–19 años: 7,5 % (2014), 8,8 % (2019), 11,2 % (2021), 15,7 % (2022), 14,4 % (2023). n del grupo: 3 032. | Es un grupo de edad, no de estudiantes; es autorreporte. Frente a 2019 el aumento es +64 %, no "casi el doble". | Cifra peruana principal de "El problema en cifras". | INEI (2024), *Perú: Enfermedades No Transmisibles y Transmisibles, 2023*, ENDES, Cuadro 1.41, [PDF](https://encuestas.inei.gob.pe/endes/2023/SALUD/ENFERMEDADES_ENDES_2023.pdf) |
| E15 | Perú, 20–29 años: **11,1 %** en 2023, frente a 7,3 % en 2014. | Lo mismo que E14. | Es la edad universitaria típica. Se usa como contexto. | INEI (2024), ENDES 2023, ídem |
| E16 | Estudiantes de medicina (167 estudios, 43 países): **27,2 %** con depresión o síntomas depresivos (IC 95 %: 24,7–29,9). Solo el **15,7 %** de quienes dieron positivo buscó tratamiento psiquiátrico. | Es un dato mundial, no peruano; combina síntomas y diagnóstico. | Respalda el puente: el problema es llegar a ayuda. | Rotenstein et al. (2016), *JAMA* 316(21):2214–2236, [10.1001/jama.2016.17324](https://doi.org/10.1001/jama.2016.17324) |
| E17 | Universitarios: prevalencia de depresión entre 10 % y 85 %, con una media ponderada de **30,6 %** (24 estudios, 1990–2010). | Hay mucha heterogeneidad. | Solo se usa como contexto. | Ibrahim et al. (2013), *J Psychiatr Res* 47(3):391–400, [10.1016/j.jpsychires.2012.11.015](https://doi.org/10.1016/j.jpsychires.2012.11.015) |
| E18 | Doctorandos de Flandes: el **32 %** está en riesgo de un trastorno psiquiátrico común (GHQ-4+), frente al 14,00 % de la población con estudios superiores. | Es una escala de cribado, no un diagnóstico; Bélgica. | Para el posgrado. Se dice el país. | Levecque et al. (2017), *Research Policy* 46(4):868–879, [10.1016/j.respol.2017.02.008](https://doi.org/10.1016/j.respol.2017.02.008) |
| E19 | En el primer año de la pandemia, la prevalencia mundial de ansiedad y depresión **aumentó un 25 %**. | Es la población general, no estudiantes. | Contexto mundial. | OMS (2 mar 2022), comunicado y *Scientific brief* "Mental Health and COVID-19: Early evidence of the pandemic's impact", [who.int](https://www.who.int/news/item/02-03-2022-covid-19-pandemic-triggers-25-increase-in-prevalence-of-anxiety-and-depression-worldwide) |
| E20 | 2020: **+27,6 %** (IC 25,1–30,3) en depresión mayor y **+25,6 %** (23,2–28,0) en trastornos de ansiedad. | Son estimaciones modeladas. | Respaldo de E19. | COVID-19 Mental Disorders Collaborators (2021), *Lancet* 398:1700–1712, [10.1016/S0140-6736(21)02143-7](https://doi.org/10.1016/S0140-6736(21)02143-7) |
| E21 | Estudiantes de Latinoamérica durante la pandemia: prevalencia agrupada de síntomas de salud mental del **45 %** (población general: 37 %). | Son síntomas, no está desglosado por nivel y es solo el período de pandemia. | Contexto regional. | Zhang et al. (2022), *Epidemiol Psychiatr Sci* 31:e23, [10.1017/S2045796021000767](https://doi.org/10.1017/S2045796021000767) |
| E22 | 808 estudiantes de medicina de **24 escuelas peruanas**: síntomas de ansiedad en el **77,6 %** y de depresión en el **67,3 %** (GAD-7 y PHQ-9 > 4). | Corte bajo (síntomas leves o más); fue en pandemia. | Se cita con el corte dicho. | Zila-Velasque et al. (2023), *PLoS ONE* 18(6):e0286338, [10.1371/journal.pone.0286338](https://doi.org/10.1371/journal.pone.0286338) |
| E23 | 264 estudiantes de medicina de una universidad privada de Lima (2025): depresión **45,1 %**, ansiedad **34,9 %** (PHQ-9, GAD-7). | Una sola universidad; la prevalencia es un resultado secundario de un estudio sobre dieta. | Contexto. | Armas, Polanco Taipe & Soriano-Moreno (2026), *PLoS ONE* 21(6):e0346062, [10.1371/journal.pone.0346062](https://doi.org/10.1371/journal.pone.0346062) |
| E24 | 193 estudiantes de medicina de externado en Lima (2022), **con el SISCO**: estrés académico moderado en el **36,3 %** y severo en el **29,0 %**. | Una universidad (Científica del Sur); usa niveles propios del estudio. | Muestra que el SISCO se usa en Lima en medicina. **No adoptamos sus niveles** (E11). | Carpio-Oviedo et al. (2025), *BMC Psychiatry* 26:37, [10.1186/s12888-025-07683-6](https://doi.org/10.1186/s12888-025-07683-6) |
| E25 | 187 estudiantes de medicina de una universidad privada de Lima (2012): prevalencia de estrés académico del **77,54 %**. | No tiene DOI; no nombra la universidad. | Solo contexto. | Bedoya-Lau, Matos & Zelaya (2014), *Rev Neuropsiquiatr* 77(4):262–270, [redalyc](https://www.redalyc.org/articulo.oa?id=372033988009) |
| E26 | 13 984 estudiantes de primer año de 8 países: solo el **24,6 %** buscaría tratamiento con seguridad ante un problema emocional futuro; el **56,4 %** prefiere manejarlo solo y el **48,0 %** hablar con amigos o familia. | Mide intención, no conducta. | Las barreras son de actitud: el producto baja el costo del primer paso. | Ebert et al. (2019), *Int J Methods Psychiatr Res* 28(2):e1782, [10.1002/mpr.1782](https://doi.org/10.1002/mpr.1782) |
| E27 | Estudiantes de medicina de EE. UU.: el **26,9 %** buscaría ayuda profesional con seguridad ante un problema emocional serio, frente al **44,3 %** de la población general. | Es EE. UU. | Respalda que medicina pide menos ayuda. | Dyrbye et al. (2015), *Acad Med* 90(7):961–969, [10.1097/ACM.0000000000000655](https://doi.org/10.1097/ACM.0000000000000655) |
| E28 | El **83,1 %** de los estudiantes de medicina con depresión moderada o grave cree que los docentes los verían incapaces de asumir sus responsabilidades (55,1 % sin depresión o con depresión mínima). | Una facultad de EE. UU. | **No se notifica a nadie**: el estudiante decide. | Schwenk, Davis & Wimsatt (2010), *JAMA* 304(11):1181–1190, [10.1001/jama.2010.1300](https://doi.org/10.1001/jama.2010.1300) |
| E29 | Estudiantes de medicina y residentes en Francia con depresión mayor: solo el **32 %** recibió tratamiento adecuado. | Incluye residentes. | Contexto de la brecha de tratamiento. | Vergeron et al. (2024), *Psychiatry Res* 339:115975, [10.1016/j.psychres.2024.115975](https://doi.org/10.1016/j.psychres.2024.115975) |
| E30 | Primer año en Sudáfrica: solo el **28,9 %** de los estudiantes con un trastorno mental recibió tratamiento; el 18,1 % usó atención en 12 meses. | Es Sudáfrica. | Contexto. | Bantjes et al. (2020), *Int J Ment Health Syst* 14:5, [10.1186/s13033-020-0339-y](https://doi.org/10.1186/s13033-020-0339-y) |
| E31 | En 79 ensayos de apps para depresión y ansiedad, el abandono fue menor en los ensayos con recordatorios, con contacto humano y **sin** gamificación. | Mide el abandono de las evaluaciones del ensayo, no el uso en la primera semana; es observacional. | Nada de rachas ni puntos. El contacto humano es el centro. | Liu et al. (2026), *JAMA Psychiatry* 83(1):43–50, [10.1001/jamapsychiatry.2025.3439](https://doi.org/10.1001/jamapsychiatry.2025.3439) |
| E32 | La gamificación no mostró efecto sobre la adherencia (β = −1,93; P = 0,40; 38 estudios, n = 8 110). | No descarta efectos pequeños. | La mascota **no** se presenta como retención. | Six et al. (2021), *JMIR Ment Health* 8(11):e32199, [10.2196/32199](https://doi.org/10.2196/32199) |
| E33 | 209 universitarios: que el agente virtual fuera conversacional o animado no cambió los síntomas; la animación mejoró la experiencia de uso. | No midió retención. | La mascota es experiencia, no tratamiento. | Six et al. (2025), *JMIR Ment Health* 12:e67381, [10.2196/67381](https://doi.org/10.2196/67381) |
| E34 | Hay evidencia de daños por **dependencia emocional** de un compañero virtual (582 publicaciones de r/Replika). | Es cualitativo, con un chatbot conversacional. | La mascota no habla en texto libre, no tiene emociones propias y no "extraña" al estudiante. | Laestadius et al. (2022), *New Media & Society*, [10.1177/14614448221142007](https://doi.org/10.1177/14614448221142007) |
| E35 | "La Línea 113 Salud, opción 5, está disponible las 24 horas del día, todos los días del año." También se describe como línea gratuita de orientación en salud mental. | Es una nota de la agencia estatal Andina, no una página del MINSA (gob.pe devolvió error al consultarla). | La app muestra la Línea 113, opción 5, como salida para una crisis. | Andina (12 oct 2025), "Línea 113 del Minsa: más de 60,000 personas recibieron orientación psicológica gratuita", [andina.pe](https://andina.pe/agencia/noticia-linea-113-del-minsa-mas-60000-personas-recibieron-orientacion-psicologica-gratuita-1048068.aspx) |
| E36 | El DS 016-2024-JUS aprueba el nuevo reglamento de la Ley 29733 de Protección de Datos Personales y deroga el DS 003-2013-JUS. | — | Es el marco del protocolo del piloto. | MINJUSDH (2024), [gob.pe](https://www.gob.pe/institucion/minjus/noticias/1067368-ejecutivo-aprueba-nuevo-reglamento-de-la-ley-de-proteccion-de-datos-personales) |

**Descartado en la Fase 1:** Evans et al. (2018), porque solo se confirmó en una nota de prensa;
la frase "casi el doble que en 2019" del INEI, porque el aumento es +64 %; las cifras de
"competitividad por plazas" y "es parte de la carrera", porque ninguna fuente indexada las
cuantifica; y los datos de retención de apps con mascota (Finch, Duolingo y otras), porque
no están publicados en fuentes indexadas.

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
