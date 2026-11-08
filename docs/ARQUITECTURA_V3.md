# Arquitectura V3 y plan de investigación del piloto

Fecha: 2026-11-08. Este documento amplía `docs/arquitectura.md`. Todo lo que dice
"propuesto" **no está acordado** con ninguna unidad de la UPCH.

## 1. Sistema actual: la demo

```
Navegador del estudiante (único lugar donde hay datos)
├── Inventario SISCO (31 ítems, redacción publicada) ──┐
├── Prueba de escritura → 5 números (sin texto)       ├─► localStorage del navegador
├── Check-in (descanso, energía, 1 ítem SISCO)        │   claves pulso_v2 (datos)
├── Preferencias (tema, acento, texto, mascota)  ─────┤   y pulso_prefs (preferencias)
└── Uso (días abiertos, inventario, puente)  ─────────┘
        │
        └─► "Hablar con alguien" → enlace a Bienestar (sale del navegador
            sin ningún dato) · Línea 113, opción 5
```

- No hay servidor, cuentas ni analítica. Lo que se escribe se convierte al instante en
  tiempos y tipos de tecla (`app/src/keystroke.js`), y el texto nunca se guarda (tests en
  `tests/`).
- "Borrar mis datos" elimina todas las claves `pulso*`.

## 2. Piloto propuesto: con servidor, solo si hay aprobación ética

```
Estudiante ──(consentimiento informado firmado en la app)──► App
   │                                                         │
   │  datos numéricos + código seudónimo (sin nombre, sin DNI) │ HTTPS
   ▼                                                         ▼
Servidor del piloto (UPCH, propuesto) ── tabla de enlace código↔persona: NO existe en el
   │                                     servidor; la custodia el investigador principal,
   │                                     cifrada y fuera de línea, solo para retiro del estudio
   ├─► Base de investigación (seudonimizada)
   └─► Panel de Bienestar (propuesto): SOLO AGREGADOS
         · nº de clics en "Hablar con alguien" por semana
         · citas pedidas y atendidas, tiempo hasta la atención
         · celdas con < 10 estudiantes se suprimen
         · nunca un registro individual, nunca un puntaje por persona
```

- **El puente sigue siendo voluntario.** El estudiante pide la cita; nadie lo contacta
  por un puntaje (E28: el miedo a cómo te ven los docentes es una barrera documentada).
- El tecleo sigue siendo exploratorio y por estudiante. No se usa para ninguna decisión.

## 3. Modelo de datos

| Dato | Dónde (demo) | Dónde (piloto propuesto) | Cuánto tiempo | Quién lo ve |
|---|---|---|---|---|
| Texto escrito | En ninguna parte (no se guarda) | En ninguna parte | — | Nadie |
| Tiempos de tecla agregados (5 números por sesión) | Navegador | Base seudonimizada | Duración del estudio + 2 años, luego se borra | Equipo de investigación |
| Respuestas SISCO (31 ítems) | Navegador | Base seudonimizada | Ídem | Equipo de investigación; el estudiante ve las suyas |
| Check-in diario | Navegador | Base seudonimizada | Ídem | Ídem |
| Preferencias (tema, acento, mascota) | Navegador | Solo en el navegador | Hasta que el estudiante las borre | Solo el estudiante |
| Uso (días abiertos, hitos) | Navegador | Base seudonimizada (para el A/B de la mascota) | Duración del estudio | Equipo de investigación |
| Clic en "Hablar con alguien" | Navegador (hito) | Contador agregado | Duración del estudio | Bienestar, solo en agregado |
| Cita atendida (sí/no, fecha) | — | La registra Bienestar con el código seudónimo y el consentimiento del estudiante | Duración del estudio | Equipo de investigación, en agregado |
| Nombre, DNI, correo | Nunca | Solo en el consentimiento, custodiado aparte por el investigador principal | Lo que fije el comité | Investigador principal |

Marco legal: Ley 29733 de Protección de Datos Personales y su reglamento, el DS
016-2024-JUS (E36). Los datos de salud son **datos sensibles**: requieren consentimiento
expreso y por escrito, la finalidad declarada, el registro del banco de datos ante la
Autoridad Nacional de Protección de Datos Personales y medidas de seguridad. Antes de
recoger el primer dato, el equipo debe verificar con la oficina legal de la UPCH los
requisitos concretos del reglamento, entre ellos la evaluación de impacto
**[por verificar]**.

## 4. Protocolo del estudio piloto (borrador)

**Pregunta principal.** En estudiantes de pregrado de la UPCH, ¿ofrecer Pulso UPCH, con su
acceso de un toque a Bienestar, acorta el tiempo hasta una primera consulta efectivamente
atendida y aumenta la proporción de estudiantes que llegan a ella, sin aumentar el
autoetiquetado?

**Diseño.** Pre/post con un grupo y análisis por intención de tratar: se analiza a todos los
que dieron su consentimiento, usen o no la app. Duración: un semestre, de 16 semanas.
- Línea base: la tasa histórica de consultas atendidas del semestre anterior, que entrega
  Bienestar en agregado (propuesto). Esa cifra hoy **no la tenemos** **[por verificar]**.
- Secundario, dentro del piloto: un A/B de la mascota, asignada al azar (encendida o
  apagada) al instalar, que mide el uso de los días 1 a 7 (E31–E33).

**Resultados.**

| Tipo | Medida |
|---|---|
| Primario | Tiempo desde la inscripción hasta la primera consulta atendida; proporción de estudiantes que la alcanzan a 16 semanas |
| Secundario | Conversión de clic en "Hablar con alguien" a cita; retención real (días activos), aunque sea baja (E5); cambio del SISCO por subescala entre la semana 1 y la 16 |
| Daño | Un ítem de autoetiquetado ("¿Crees que tienes un problema de salud mental?") en la semana 1 y la 16 (E7) |
| Confianza | ¿Confías en lo que la app hace con tus datos? (Likert 1–5) |

**Instrumentos.** SISCO de 31 ítems (E11), el ítem de autoetiquetado, el ítem de confianza y
los registros de citas atendidas de Bienestar (propuesto).

**Tamaño muestral.** Supuestos explícitos, con α = 0,05 bilateral y potencia del 80 %:
- **SISCO pre/post (pareado):** para detectar un cambio pequeño-moderado, d = 0,3, hacen falta
  **90** estudiantes con las dos mediciones. Si se pierde el 40 % entre la semana 1 y la 16
  (E5 sugiere que será más), hay que inscribir **150**.
- **Consulta atendida:** pasar de un 5 % histórico (supuesto **[por verificar]** con
  Bienestar) a un 12 % exige **248** por grupo en una comparación de dos proporciones con la
  cohorte histórica. Del 5 % al 10 % exige **435**.
- **Conclusión.** Un piloto de **250 estudiantes** responde con potencia la pregunta del
  SISCO y la del puente si el efecto es grande (5 → 12 %). Si es menor, el piloto es de
  factibilidad y estima el efecto para un estudio mayor. Se dice así en la exposición.

Fórmulas: pareado, n = ((z₁₋α/₂ + z₁₋β) / d)² + z²/2. Proporciones, la fórmula estándar con
varianza agrupada. El cálculo se reproduce con
`python -c` (comando en `docs/DECISIONES.md`, entrada de la Fase 4).

**Cronograma propuesto**

| Mes | Hito |
|---|---|
| 0–2 | Protocolo completo y envío al comité de ética en investigación de la UPCH (propuesto). Convenio de datos con Bienestar (propuesto). Revisión legal Ley 29733 / DS 016-2024-JUS |
| 2–3 | Prueba de tono de la mascota y del lenguaje con 5 estudiantes. Servidor seudonimizado y pruebas de seguridad |
| 3–7 | Piloto de un semestre (16 semanas) |
| 7–9 | Análisis y publicación de los resultados, sean buenos o malos, incluida la señal de tecleo aunque no sirva |

**Ética.** Sin aprobación del comité no hay piloto. Se requiere:
- consentimiento informado separado para cada dato;
- retiro en cualquier momento, con borrado de los datos;
- protocolo de derivación ante riesgo: la app muestra la Línea 113, opción 5 (E35), y el
  canal de Bienestar, y no interviene;
- ningún dato individual a docentes ni a Bienestar.

## 5. Mapa interdisciplinario: qué le toca a cada carrera

Todo **propuesto**: ninguna facultad ha aceptado nada. Fuente: el informe 1E (carreras
confirmadas en la web oficial de la UPCH).

| Carrera | Qué aporta | Su pregunta de investigación |
|---|---|---|
| Psicología | El SISCO, el protocolo de derivación y la revisión del lenguaje no patologizante | ¿Qué lleva a un estudiante a pedir cita, y cómo lo vive el consejero? |
| Medicina | La población con más carga reportada (E22–E25) y el diseño clínico | ¿Cambia el SISCO de los estudiantes de medicina a lo largo del ciclo? |
| Salud Pública y Salud Global | Diseño del estudio, tamaño muestral, equidad de acceso | ¿Qué proporción llega a una cita efectiva y cuánto tarda? |
| Enfermería | Primer contacto presencial y triaje | ¿Pueden los tópicos ser puerta de entrada al puente? |
| Ingeniería Informática | Privacidad en el dispositivo y la señal exploratoria intra-sujeto | ¿Es estable la señal de tecleo de cada estudiante frente a su propia línea base? |
| Ingeniería Industrial | Flujo de agenda y capacidad del servicio | ¿Cuántas derivaciones absorbe la consejería sin saturarse? |
| Administración en Salud | Modelo de servicio, costos e indicadores | ¿Qué costo y qué indicadores justifican mantenerlo? |
| Educación | Calendario y carga académica | ¿Qué prácticas de evaluación reducen el estresor "sobrecarga"? |

## 6. Hoja de ruta

| Plazo | Qué | Criterio de éxito |
|---|---|---|
| **6 meses** | Protocolo aprobado por el comité de ética (propuesto); convenio con Bienestar (propuesto); postulación a BioIncuba como destino natural después del hackathon (propuesto) | Aprobación ética escrita; un canal de citas real en lugar del aviso "pendiente" |
| **12 meses** | Piloto de un semestre con unos 250 estudiantes; resultados publicados | Tiempo hasta la atención medido con línea base; daño (autoetiquetado) medido |
| **24 meses** | Si el puente funciona: extender a más facultades y evaluar la sostenibilidad con Administración en Salud. Si no funciona: publicarlo y cerrar | Una decisión con datos, no con entusiasmo |

BioIncuba (1D) es la incubadora de la UPCH. Su convocatoria Startup Perú 13G pide un
"prototipo funcional y tracción". Nuestra tracción solo puede salir del piloto, por eso el
orden es primero ética y piloto, y después incubación.
