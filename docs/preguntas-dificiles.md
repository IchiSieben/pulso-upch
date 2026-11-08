# Preguntas difíciles — y la respuesta honesta

Regla general: respuesta corta primero (una frase), luego el dato, luego la decisión que
tomamos por ese dato. Si no saben algo, dicen que no lo saben.

---

### 1. "¿Qué evidencia tienen de que el tecleo mide estrés?"

**Esta es la pregunta que decide el hackathon.**

> "Ninguna, y por eso no lo afirmamos. La mejor evidencia disponible encuentra una
> correlación de 0,078 entre el tecleo y el estrés entre personas, en 36 empleados durante 8
> semanas; los modelos no se equivocan menos que predecir el promedio. Personalizado llega a
> 0,188. Por eso nuestra medida principal es el SISCO, validado en 628 universitarios de Lima,
> y el tecleo aparece en pantalla rotulado como exploratorio, comparado solo contigo mismo.
> Lo que sí describe, con verdad, es si escribiste distinto a tu propio patrón."

Si repreguntan "¿entonces para qué lo dejan?":

> "Porque es barato, no invasivo y personalizado, y la pregunta de si sirve dentro de una
> misma persona sigue abierta. Lo mantenemos para medirlo con honestidad en un piloto y
> publicar el resultado, incluso si es que no sirve."

No decir: "es un indicador temprano", "complementa el diagnóstico", "la IA aprende tu
estado".

### 2. "¿Esto no es vigilancia?"

> "Está diseñado para no poder serlo. Consentimiento separado para cada medida. Nunca se
> guarda el texto: cada pulsación se reduce a 'carácter o borrado' y una hora; se puede ver
> en el código, en keystroke.js. En la demo no hay servidor: todo vive en el navegador del
> estudiante. Puede exportar o borrar todo con un botón. Y no se notifica a nadie: ni a la
> universidad, ni a Bienestar, ni a los profesores."

Si preguntan por un piloto real: "El backend opcional rechaza cualquier campo que no sea un
número, y aplicaría la Ley 29733 con datos sensibles, consentimiento expreso y derechos ARCO.
Además vamos a medir la percepción de vigilancia: cuántos eligen compartir y cuántos se dan
de baja."

### 3. "¿Y si genera ansiedad en quien lo usa?"

> "Es un riesgo real y lo tomamos en serio. Un ensayo doble ciego de 2025 mostró que informar
> sobre un trastorno hizo que la proporción de jóvenes que creía tenerlo subiera del 28 al
> 58 %, y que explicarles el efecto nocebo redujo ese aumento a la mitad. Por eso cada mensaje
> de cambio trae, con el mismo peso visual: qué cambió en términos descriptivos, que es
> normal, que no es un diagnóstico y qué es el efecto nocebo. Sin rojo de alarma. Y en el
> piloto medimos el autoetiquetado antes y después, porque a la semana el efecto del estudio
> ya no era significativo y no queremos suponer que funciona."

### 4. "¿Quién lo va a seguir usando?"

> "Estadísticamente, casi nadie: la retención mediana de las apps de salud mental es 3,3 % a
> los 30 días. Por eso no medimos el éxito por uso. El valor se entrega en la primera semana
> y el indicador principal es el tiempo hasta una consulta efectivamente atendida. La
> retención la vamos a declarar aunque sea mala."

### 5. "¿Por qué no usan una app que ya existe?"

> "Porque las que existen no están validadas en universitarios peruanos ni conectan con el
> servicio de la propia universidad, y muchas capturan contenido o prometen detectar. Lo que
> aportamos no es otra app de bienestar: es una medida validada en Lima, honestidad sobre lo
> que no se puede medir, y un puente de un clic al servicio que la UPCH ya tiene. Si una app
> existente hiciera eso, la recomendaríamos."

(No nombrar ni criticar apps concretas: no las evaluamos.)

### 6. "¿Esto reemplaza al psicólogo?"

> "No, y el diseño entero va en la dirección contraria: todo termina en un botón para hablar
> con una persona. Una alerta temprana que solo predice no ayuda: en un experimento en una
> universidad neerlandesa, la alerta acertó y la consejería que disparó no redujo el
> abandono. Nuestro producto es acortar el camino hasta la persona, no sustituirla."

### 7. "¿Cuál es la precisión de su modelo?"

> "Sobre datos sintéticos, 90 de 90 escenarios. Pero eso solo demuestra viabilidad técnica,
> no validez clínica: los cambios los construimos nosotros y son grandes. Cuando los
> achicamos a un tercio, el detector deja de verlos: 3 de 30. Nunca da falsos positivos en el
> escenario estable. No tenemos precisión en personas reales y no la vamos a inventar."

### 8. "¿Tienen convenio con Bienestar o aprobación de ética?"

> "No. Ambos están propuestos, no coordinados. Hoy el botón lleva a la página pública de
> Bienestar Estudiantil de la UPCH, y el canal directo de consejería está marcado en la app
> como pendiente de confirmar. Un piloto requiere primero el comité de ética."

### 9. "¿Cuántos participantes necesitarían?"

> "Unos 250, con los supuestos a la vista. Para ver un cambio moderado en el SISCO hacen
> falta 90 estudiantes con las dos mediciones, unos 150 si se pierde el 40 %. Para el puente,
> si la línea base fuera del 5 % y subiera al 12 %, harían falta 248. Ese 5 % es un supuesto:
> la línea base real la tiene Bienestar, y es lo primero que le pediríamos. Si el efecto es
> menor, el piloto es de factibilidad y lo decimos así." (Cálculo en
> `docs/ARQUITECTURA_V3.md`, §4.)

### 10. "¿Por qué el SISCO y no otra escala?"

> "Porque está validado en 628 universitarios de Lima, con invarianza por sexo, y mide
> estrés académico, que es justo lo que la carga del calendario modifica. Consideramos la
> Escala de Estrés Percibido validada en Lima, pero ese estudio recomienda reportar dos
> puntajes separados, distrés y eustrés, no uno global; la dejamos documentada como
> alternativa."

Si preguntan por niveles ("¿y si sale alto?"): "No mostramos niveles. No hay puntos de corte
clínicos validados en Perú; mostramos la media por subescala para que el estudiante se
compare consigo mismo."

### 11. "Las cifras de Piura y de Estados Unidos, ¿aplican a la UPCH?"

> "No directamente, y lo decimos en la página. Piura muestra la magnitud en universitarios
> peruanos; son niveles de una escala, no diagnósticos. El dato de tratamiento es de Estados
> Unidos. Medir la línea base de la UPCH sería parte del piloto."

### 12. "¿Usaron IA para hacer esto?"

> "Sí, y está declarado: Claude, mediante Claude Code, para redactar, programar y verificar
> las citas contra sus fuentes. Esa verificación nos corrigió varias cifras del borrador; las
> correcciones están en la tabla de evidencia. Las decisiones y la revisión son del equipo.
> El detector en sí no es IA generativa: es una regla estadística transparente."

### 13. "¿Por qué la demo abre directamente en el mensaje de 'cambio sostenido'?"

> "Para mostrar en pocos segundos cómo está diseñado el mensaje, que es la parte más
> delicada. Un estudiante real no vería eso al empezar: durante sus primeros 14 días la app
> está 'construyendo tu línea base' y no compara nada. Como en una demo nadie tiene 14 días
> de historia, usamos 20 días sintéticos, rotulados en pantalla, y los botones permiten ver
> también los escenarios 'estable' y 'un día distinto'."

### 14. "¿La mascota no infantiliza un tema serio?"

> "Es un riesgo real, y por eso la mascota está recortada. Es una guía del recorrido, sobria,
> sin voz de niño y sin estados de ánimo. No se pone triste si no vuelves y no lleva rachas.
> Crece solo con el uso, nunca con tus respuestas, y se apaga con un toque. Tampoco
> prometemos que retenga: un metaanálisis de 38 estudios no encontró efecto de la
> gamificación sobre la adherencia (Six 2021). Por eso es una hipótesis que el piloto mide:
> el uso de los días 1 a 7 con mascota y sin ella. Antes del piloto, probamos el tono con
> estudiantes." (E31–E34)

### 15. "¿Por qué usan cifras de EE. UU. y no de Perú?"

> "Usamos las dos, y decimos cuál es cuál.
> - **Perú:**
>   - el 14,4 % de los peruanos de 15 a 19 años tuvo un episodio depresivo en el último año
>     (INEI, ENDES 2023; grupo de edad, no estudiantes);
>   - en seis universidades de Piura, el 24 % estaba en nivel alto de síntomas (Valle-Palomino
>     2024; nivel de escala, no diagnóstico);
>   - en estudiantes de medicina peruanos hay estudios con prevalencias altas, pero son de una
>     universidad o con cortes bajos, y lo aclaramos.
> - **Fuera de Perú:**
>   - el 15,7 % de estudiantes de medicina con síntomas buscó tratamiento (mundo, 167
>     estudios);
>   - el 24,6 % de los estudiantes de primer año buscaría tratamiento con seguridad (8 países).
>
> No encontramos un estudio peruano indexado sobre por qué los estudiantes de salud no piden
> ayuda. Ese vacío es parte de lo que el piloto respondería." (E8, E14, E16, E22–E26)

### 16. "¿Qué pasa si un estudiante está en crisis?"

> "La app no interviene: deriva. En todas las pantallas, junto a 'Hablar con alguien', está la
> Línea 113, opción 5, del MINSA, gratuita y disponible las 24 horas, con un toque para
> llamar, y el canal de Bienestar. La app no evalúa el riesgo ni decide por nadie, porque un
> prototipo sin servidor no puede responder a una emergencia y no debe aparentar que puede."
> (E35)

### 17. "¿Por qué no avisan a Bienestar cuando alguien sale alto?"

> "Porque el miedo a cómo te ven los docentes y a las consecuencias para la carrera es una
> barrera documentada. En un estudio, el 83,1 % de los estudiantes de medicina con depresión
> moderada o grave creía que los docentes los verían incapaces. Si la app avisara, quienes más
> lo necesitan dejarían de usarla. En el piloto propuesto, Bienestar solo vería datos
> agregados, nunca individuales." (E28; `docs/ARQUITECTURA_V3.md` §2)

### 18. "¿Es sostenible? ¿Quién lo paga?"

> "La demo cuesta casi cero, porque es una página estática sin servidor. El piloto necesita un
> servidor seudonimizado y horas de consejería, que es un costo que la universidad ya tiene.
> No prometemos una cifra. La sostenibilidad la evaluaría Administración en Salud con los
> datos del piloto, y el paso natural después del hackathon es BioIncuba, si la UPCH lo
> acepta." (`docs/ARQUITECTURA_V3.md` §6)

### 19. "¿Qué aporta esto a la UPCH más allá de una app?"

> "Una pregunta de investigación para cada carrera:
> - Psicología: qué lleva a pedir cita.
> - Salud Pública: cuánto se tarda en llegar.
> - Medicina: cómo cambia el estrés a lo largo del ciclo.
> - Enfermería: si los tópicos sirven de puerta de entrada.
> - Ingeniería: si la señal de tecleo de cada uno es estable.
> - Administración en Salud: si vale lo que cuesta.
>
> Todo eso es propuesto: ninguna facultad lo ha aceptado todavía." (`docs/ARQUITECTURA_V3.md`
> §5)
