# Producto V3: qué entra y qué no, con su fuente

Escrito el 2026-11-08 a partir de los informes de `docs/investigacion/`, después de pasar
por el verificador (`docs/investigacion/verificacion.md`). La tesis no cambia: *No
detectamos estrés. Acortamos el camino.* Cada decisión de este documento la refuerza o no
entra.

Conciliado con el verificador el 2026-11-08: todas las filas citadas aquí (1A·3, 1B·2, 1B·4, 1B·5, 1C·1, 1C·2, 1C·7, 1C·9) son ✅ y tienen su fila en `docs/evidencia.md` (E16, E26, E28, E31–E34).

Notación de fuentes: E# es una fila de `docs/evidencia.md`. "1C·2" es la fila 2 del informe
1C.

## Entra

### 1. "Hablar con alguien": una sola acción, siempre visible

- **Qué hace.** Es un botón fijo en la barra superior de cada pantalla de la demo y una
  tarjeta en el panel. Lleva a la página pública de Bienestar Estudiantil, con el aviso
  visible "canal directo pendiente de confirmar". Debajo aparece, siempre, la **Línea 113,
  opción 5 (MINSA, salud mental, gratuita, 24 h)**, para quien esté en crisis. La app no
  interviene: deriva.
- **Por qué.**
  - Las barreras a pedir ayuda son sobre todo actitudinales: querer manejarlo solo, preferir
    a amigos o familia (1B·2, Ebert 2019). Detectar mejor no resuelve eso. Un acceso de un toque,
    voluntario y sin enviar datos, reduce el costo de dar el paso.
  - En estudiantes de medicina, solo el 15,7 % de quienes dieron positivo buscó tratamiento
    (1A·3, Rotenstein 2016).
  - Lo que sí se asocia a menos abandono es el **contacto humano** (1C·1).
- **Indicador.** Tiempo hasta una consulta efectivamente atendida (E6, Plak 2022: predecir no
  es ayudar).
- **Pendiente.** No hay URL pública de un canal de consejería en la web de la UPCH (1E). La
  única mención es una noticia de 2023 sobre el "Servicio Integrado de Consejería Psicológica
  DUGAD-UPCH", sin página propia. Se mantiene el aviso.

### 2. Mascota "Pulsito": entra recortada, como guía y como hipótesis

Lo que pide el plan y lo que dice la evidencia no coinciden, y gana la evidencia (regla de la
Fase 2: "lo que 1C diga que no funciona, no entra"):

- **No hay estudio indexado que muestre que una mascota mejore el uso en la primera semana**
  (1C, conclusión: fuerza muy baja).
- La gamificación no mostró efecto sobre la adherencia en 38 estudios (1C·2, Six 2021).
- En 79 ensayos, el abandono fue menor **sin** gamificación (1C·1, Liu 2026).
- El único ensayo con un agente animado solo mejoró la valoración de la app, no los síntomas
  ni la retención (1C·7, Six 2025).

**Decisión.**

- La mascota entra como **guía del flujo**: acompaña cada paso con una frase corta y celebra
  discretamente al terminar un bloque.
- Su aspecto **crece con hitos de uso**, en tres etapas, y solo hacia adelante:
  - días distintos en que se abrió la app;
  - inventario completado;
  - haber tocado "Hablar con alguien".
- **No crece ni cambia con las respuestas, el puntaje SISCO ni el tecleo.** Esto lo prueba
  un test (`tests/test_mascot.py`).
- **Sin estados de ánimo propios**: no extraña, no sufre y no se pone triste si el estudiante
  no vuelve. **Sin rachas** ni nada que se pierda por ausencia. Mitiga el riesgo de
  dependencia (1C·9, Laestadius 2022) y de culpa (1C, riesgo 2).
- **Se puede apagar** en "Tema y accesibilidad". Apagada, el flujo es idéntico.
- **No se presenta como mecanismo de retención.** En la exposición y en la landing se dice:
  "es una hipótesis; en el piloto se compara el uso de los días 1 a 7 con y sin mascota"
  (1C, riesgo 5).
- Tono sobrio, para universitarios. El riesgo de infantilizar no tiene estudio (1C, riesgo 3).
  Antes del piloto se prueba con 5 estudiantes.

### 3. Tema de color y accesibilidad

- Modo automático, claro u oscuro.
- Cuatro acentos con contraste AA verificado (`tools/contrast.py`): granate, petróleo,
  salvia y grafito.
- Texto grande.
- Se guarda en este navegador y **se borra con "Borrar mis datos"**. No se analiza. Es
  preferencia, no señal.

### 4. Menos preguntas: inventario una vez, check-in diario de 3 toques

- **SISCO completo (31 ítems)** al inicio y al final del piloto. Es la única medida validada
  (E11), y se puede pausar a mitad y retomar.
- **Check-in diario de ≤ 3 toques:**
  - horas de descanso;
  - energía;
  - **una pregunta rotativa del SISCO**, mostrada **tal cual**, con la redacción publicada
    ("durante este semestre"), sin adaptarla a "hoy". Lleva el rótulo "pregunta del
    inventario, tal cual". La respuesta se guarda como dato descriptivo con su fecha, no
    como señal diaria. Un ítem suelto **no** es un puntaje validado y la app lo dice.
- **Por qué.**
  - La apertura diaria mediana de las apps de salud mental es 4,0 % y la retención a 30 días
    es 3,3 % (E5).
  - Lo que se asocia a menos abandono son los recordatorios y el contacto humano, no las
    mecánicas de juego (1C·1).
  - No encontramos un estudio verificado que mida el efecto de la longitud del check-in sobre
    el abandono en este tipo de app. Por eso es una **decisión de diseño que se mide**: la
    tasa de check-ins completados es un indicador del piloto.

### 5. "El problema en cifras" en la landing

Lleva solo las cifras ✅ del verificador, cada una con su fuente al tocar. Se dice siempre
qué es Perú y qué es otro país, y qué son síntomas por escala, no diagnósticos.

### 6. "Un proyecto para toda Cayetano"

El mapa de 1E, con lo que aporta cada carrera y la pregunta de investigación que le toca.
Todo lo institucional va como **propuesto**.

## No entra

| Idea | Por qué no | Fuente |
|---|---|---|
| Mascota con estados de ánimo, o que refleje cómo está el estudiante | Inferiría el estado psicológico por una vía implícita (regla 0.2) y suma riesgo de dependencia | 1C·9 |
| Rachas, puntos, insignias, ranking | Sin efecto en la adherencia y asociados a más abandono | 1C·1, 1C·2 |
| Afirmar que la mascota "retiene" | No hay evidencia | 1C, conclusión |
| Interpretar el color elegido, imágenes o pruebas proyectivas | Prohibido por la regla 0.2 | — |
| Niveles "leve / moderado / severo" del SISCO | No hay puntos de corte validados en Perú | E11 |
| Notificar a Bienestar o a un docente | El estudiante decide; el miedo a las consecuencias para la carrera es una barrera documentada | 1B·4 (Schwenk 2010), 1B·5 (Sheldon 2024) |
| Cifras de "competitividad por plazas" o "es parte de la carrera" | No encontramos fuente indexada que las cuantifique | 1B y 1E, "Descartado" |

## Cómo revertir

- La mascota depende de la preferencia `mascot: true`. El valor por defecto está en
  `app/src/prefs.js`. Ponerlo en `false` la quita de la demo sin tocar el flujo.
- El check-in es un paso propio (`checkin`). Quitarlo del arreglo `STEPS` vuelve al
  autorreporte anterior.
