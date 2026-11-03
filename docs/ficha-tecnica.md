---
title: "Ficha técnica — Pulso UPCH"
subtitle: "Hackathon FACI 2026 · Reto 3"
---

# Ficha técnica del proyecto — Pulso UPCH

**Hackathon FACI 2026 · Universidad Peruana Cayetano Heredia · Reto 3**
Formato de entrega: Arial 11, interlineado 1.5, máximo 10 páginas. Archivo: `Reto3_PulsoUPCH.pdf`.

> **Límite ético.** Pulso UPCH **no diagnostica depresión ni ninguna condición de salud
> mental** y no etiqueta al usuario. Solo describe un cambio respecto al propio patrón del
> estudiante. Las pruebas con datos sintéticos demuestran **viabilidad técnica, no validez
> clínica ni precisión para detectar nada**.

## 1. Introducción

La vida universitaria concentra periodos de carga académica intensa, privación de sueño y
estrés. Muchas veces el propio estudiante no percibe que su estado cambió durante varios días
seguidos, y cuando busca ayuda el malestar ya está instalado.

Pulso UPCH es una aplicación que mide la **dinámica** de escritura del estudiante —velocidad
de tecleo, intervalos entre pulsaciones, frecuencia de borrado y duración de sesión— **sin
almacenar el contenido escrito**, y la combina con un autorreporte voluntario de horas de
descanso y energía percibida (1–5). Un modelo de detección de anomalías compara cada día contra
la línea base del propio estudiante y, si observa un cambio sostenido, se lo muestra **solo a
él**, junto con un acceso voluntario al canal de consejería psicológica de la UPCH.

## 2. Problematización

- Los cambios de rutina asociados al agotamiento o al malestar emocional suelen ser graduales y
  pasan desapercibidos para quien los vive.
- Los instrumentos de tamizaje tradicionales son puntuales (un cuestionario en una fecha) y
  dependen de que el estudiante decida responderlos.
- La literatura de *digital phenotyping* muestra que señales pasivas del uso de dispositivos,
  entre ellas la dinámica de tecleo, se asocian a variaciones de estado de ánimo (Zulueta et
  al., 2018; Wang et al., 2014), aunque la evidencia sigue siendo heterogénea y no permite
  diagnóstico (Leaning et al., 2024).
- Las soluciones existentes suelen capturar contenido (mensajes, redes) o monitorear en segundo
  plano, lo que plantea riesgos serios de privacidad y de estigmatización.

**Pregunta de diseño:** ¿cómo devolverle al estudiante una señal útil sobre cambios en su propio
patrón, sin leer lo que escribe, sin diagnosticar y sin informar a terceros?

## 3. Objetivos

**General.** Desarrollar un prototipo funcional que detecte cambios sostenidos en la dinámica de
escritura de un estudiante respecto a su propia línea base, preservando la privacidad y sin
emitir juicios clínicos.

**Específicos.**
1. Capturar solo métricas numéricas agregadas por sesión (nunca texto) dentro de la propia app.
2. Implementar un detector Isolation Forest por estudiante con una regla de persistencia de
   tres días consecutivos.
3. Validar la viabilidad técnica con un generador de datos sintéticos de 21 días en tres
   escenarios: estable, cambio aislado y cambio sostenido.
4. Ofrecer un flujo completo con consentimiento informado, resultado no clínico, acceso
   voluntario a consejería y borrado real de los datos.

## 4. Objetivos de Desarrollo Sostenible (ODS)

- **ODS 3 — Salud y bienestar** (meta 3.4: promover la salud mental y el bienestar).
- **ODS 4 — Educación de calidad**: entornos universitarios que acompañan el bienestar del
  estudiante.
- **ODS 16 — Paz, justicia e instituciones sólidas** (secundario): tratamiento de datos
  transparente y con consentimiento.

## 5. Diseño del proyecto

**Flujo de usuario.** Consentimiento informado → prueba de escritura → autorreporte voluntario →
gráfica de tendencia (21 días) → resultado en dos estados: *"sin cambios relevantes"* o
*"cambio sostenido observado"* → botón de orientación (consejería UPCH) → borrar mis datos.

**Datos capturados (por sesión).** `wpm`, `iki_mean_ms`, `iki_sd_ms`, `backspace_rate`,
`session_s`, y opcionalmente `rest_hours` y `energy_1_5`. El capturador solo registra si la
pulsación fue un carácter o un borrado y su marca de tiempo; al terminar la prueba reduce todo a
números y descarta el resto. El backend rechaza cualquier campo no previsto (esquema estricto),
de modo que no puede recibir texto aunque se intente.

**Modelo.** Isolation Forest (scikit-learn) entrenado sobre los primeros 14 días del propio
estudiante (línea base). Cada día posterior recibe una puntuación de anomalía. Un día es atípico
si cae por debajo del umbral aprendido; **tres días atípicos consecutivos** activan el estado
*"cambio sostenido observado"*. Un día atípico aislado no cambia el resultado: así se evita
reaccionar a una mala noche o a un teclado distinto.

**Arquitectura.**

| Capa | Tecnología |
|---|---|
| Front | React Native + Expo (propuesta); web app React/Vite para la demo viva |
| Backend | Python + FastAPI |
| Modelo | scikit-learn — IsolationForest |
| Almacenamiento MVP | JSON local por usuario, sin nube de pago |

**Mensajes al usuario.** Todo resultado va acompañado del texto: *"Un cambio en tu escritura
puede deberse a cansancio, exámenes, distracción, una lesión o a usar otro teclado. Esto no es
un diagnóstico."* El botón de orientación abre el canal de consejería **sin enviarle ningún
resultado del modelo**.

**Alcance del MVP.** Solo mide dentro de la propia app. Sin teclado del sistema, sin WhatsApp ni
redes, sin monitoreo en segundo plano. Datos de demostración sintéticos y etiquetados como tales
en pantalla.

## 6. Resultados esperados

- Prototipo funcional de punta a punta (captura → modelo → resultado → borrado).
- Generador sintético reproducible (semilla fija) con tres escenarios de 21 días.
- Comportamiento esperado del detector sobre los datos sintéticos: el escenario *estable* y el
  de *cambio aislado* terminan en "sin cambios relevantes"; el de *cambio sostenido* en "cambio
  sostenido observado". Los resultados obtenidos se reportan en `model/train_eval.py`.

**Declaración de honestidad.** Estas pruebas con datos sintéticos demuestran **viabilidad
técnica, no validez clínica ni precisión para detectar nada**. Los escenarios fueron construidos
por el propio equipo, por lo que el modelo solo confirma que puede separar patrones que nosotros
mismos definimos. Cualquier afirmación sobre utilidad real exige un piloto con participantes,
aprobación de un comité de ética y evaluación con métricas validadas.

## 7. Colaboración

- **Servicio de consejería psicológica / bienestar estudiantil de la UPCH**: destino del botón
  de orientación y validación del lenguaje de la app.
- **Comité Institucional de Ética en Investigación de la UPCH**: revisión de protocolo antes de
  cualquier piloto con estudiantes.
- **Facultad de Ciencias e Ingeniería (FACI)**: soporte técnico y despliegue.
- **Estudiantes voluntarios**: retroalimentación sobre usabilidad y percepción de privacidad.

## 8. Plan de implementación

| Etapa | Plazo | Entregable |
|---|---|---|
| 0. Hackathon | Hoy | MVP web, modelo sobre datos sintéticos, ficha técnica |
| 1. Diseño ético | Mes 1–2 | Protocolo, consentimiento, evaluación de impacto, aprobación del comité de ética |
| 2. Cumplimiento legal | Mes 2 | Inscripción del banco de datos y política de privacidad conforme a la **Ley N.° 29733** y su **Reglamento (D.S. N.° 016-2024-JUS)**; datos tratados como sensibles, consentimiento expreso, derechos ARCO |
| 3. App móvil | Mes 2–3 | Versión React Native + Expo con almacenamiento cifrado en el dispositivo |
| 4. Piloto acotado | Mes 4–6 | Grupo voluntario reducido; medición de usabilidad y aceptabilidad, no de diagnóstico |
| 5. Evaluación | Mes 6 | Informe de resultados y decisión de continuidad |

**Riesgos y mitigaciones.** Falsos positivos (mitigado con la regla de 3 días y el lenguaje no
clínico); percepción de vigilancia (mitigado con captura solo en la app, sin contenido y con
borrado real); dependencia del dispositivo o teclado (declarado explícitamente al usuario).

## 9. Declaración de uso de IA

El equipo utilizó **Claude (Anthropic), a través de Claude Code**, como asistente para redactar
la documentación (README y esta ficha) y generar el código del prototipo (generador sintético,
modelo, backend y app web). La propuesta, el criterio ético, las decisiones de diseño y la
revisión final del contenido son responsabilidad del equipo. El modelo de detección del
prototipo (Isolation Forest) es un algoritmo estadístico clásico, no un modelo de IA generativa,
y no procesa texto del usuario.

## 10. Referencias

- Leaning, I. E., et al. (2024). From smartphone data to clinically relevant predictions: A
  systematic review of digital phenotyping methods in depression. *Neuroscience &
  Biobehavioral Reviews*. https://pubmed.ncbi.nlm.nih.gov/38215802/
- Liu, F. T., Ting, K. M., & Zhou, Z.-H. (2008). Isolation Forest. *Proceedings of the IEEE
  International Conference on Data Mining (ICDM)*, 413–422.
- Organización Mundial de la Salud. (2021). *Ethics and governance of artificial intelligence
  for health: WHO guidance*. Ginebra: OMS.
- Pedregosa, F., et al. (2011). Scikit-learn: Machine Learning in Python. *Journal of Machine
  Learning Research*, 12, 2825–2830.
- Perú. Congreso de la República. (2011). *Ley N.° 29733, Ley de Protección de Datos
  Personales*.
- Perú. Ministerio de Justicia y Derechos Humanos. (2024). *Decreto Supremo N.° 016-2024-JUS,
  Reglamento de la Ley N.° 29733*.
- Wang, R., Chen, F., Chen, Z., et al. (2014). StudentLife: Assessing mental health, academic
  performance and behavioral trends of college students using smartphones. *Proceedings of
  ACM UbiComp 2014*, 3–14.
- Zulueta, J., Piscitello, A., Rasic, M., et al. (2018). Predicting mood disturbance severity
  with mobile phone keystroke metadata: A BiAffect digital phenotyping study. *Journal of
  Medical Internet Research*, 20(7), e241. https://www.jmir.org/2018/7/e241
