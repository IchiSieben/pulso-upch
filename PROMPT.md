# PROMPT — Pulso UPCH (Hackathon FACI 2026)

Estás en la raíz del proyecto. Haz `git init` aquí. Se entrega HOY, en menos de 20
minutos. Prioriza README + ficha técnica por encima del código.

La propuesta ya está definida por otro integrante del equipo: **materialízala, no
la rediseñes.**

## QUÉ ES

**Pulso UPCH** — app que mide la dinámica de escritura del estudiante (velocidad
de tecleo, intervalos entre pulsaciones, frecuencia de borrado, duración de
sesión) **sin almacenar el contenido escrito**, más autorreporte voluntario de
horas de descanso y energía percibida (escala 1–5).

Un modelo de detección de anomalías (**Isolation Forest**, scikit-learn) compara
contra la línea base del propio estudiante y señala cambios sostenidos. Criterio
demostrativo: tres días consecutivos.

## LÍMITE ABSOLUTO

El sistema **no diagnostica depresión ni ninguna condición de salud mental**. No
etiqueta al usuario. Solo describe un cambio respecto a su propio patrón y ofrece
un botón voluntario para acceder al canal de consejería psicológica de la UPCH,
**sin transmitirle ningún resultado del modelo**.

Un cambio en la escritura puede deberse a cansancio, exámenes, distracción, una
lesión o al uso de otro teclado. El texto de la app debe decirlo donde el usuario
lo lea, no enterrado en los términos.

## ALCANCE DEL MVP

Solo mide dentro de la propia app. Nada de teclado de WhatsApp, redes sociales ni
monitoreo en segundo plano. Datos sintéticos de 21 días para la demo, **etiquetados
como sintéticos en pantalla**.

## STACK (todo gratis, sin costo variable)

| Componente | Tecnología |
|---|---|
| Front | React Native + Expo |
| Backend | Python + FastAPI |
| Modelo | scikit-learn (IsolationForest) |
| Almacenamiento MVP | local / JSON |

Si Expo no despliega a tiempo, haz una web app en React/Vite que capture los
mismos eventos de teclado. **Prioriza tener una demo viva sobre la plataforma.**

## ENTREGABLES

1. `README.md` en español, con la limitación ética en la primera pantalla del
   documento, no al final.
2. `docs/ficha-tecnica.md` con la plantilla oficial de la UPCH (apartados 1–10:
   Introducción, Problematización, Objetivos, ODS, Diseño del proyecto, Resultados
   esperados, Colaboración, Plan de implementación, Declaración de uso de IA,
   Referencias). Arial 11, interlineado 1.5, máx. 10 páginas. Exportable a PDF como
   `Reto3_PulsoUPCH.pdf`.
3. Generador de datos sintéticos con tres escenarios (estable / cambio aislado /
   cambio sostenido) y el modelo entrenado sobre ellos.
4. App demo funcional: consentimiento → prueba de escritura → autorreporte →
   gráfica de tendencia → resultado en dos estados ("sin cambios relevantes" /
   "cambio sostenido observado") → botón de orientación → borrar mis datos.

## PRIVACIDAD (aquí se ganan puntos)

- Jamás se guarda texto, palabras ni contraseñas. Solo métricas numéricas
  agregadas por sesión. **Demuéstralo en el código** y dilo en el README.
- Consentimiento informado antes de cualquier captura.
- Función de borrado **funcional**, no decorativa.
- Menciona la Ley 29733 y su reglamento (DS 016-2024-JUS) para un piloto real.
- Incluye la declaración de uso de IA.

## REGLA DE HONESTIDAD

Las pruebas con datos sintéticos demuestran **viabilidad técnica**, no validez
clínica ni precisión para detectar nada. La ficha debe decirlo tal cual.

## REFERENCIAS ÚTILES

- Wang et al. (2014), *StudentLife*, ACM UbiComp.
- Zulueta et al. (2018), keystroke metadata y estado de ánimo, *JMIR*,
  https://www.jmir.org/2018/7/e241
- Leaning et al. (2024), revisión sistemática de digital phenotyping,
  https://pubmed.ncbi.nlm.nih.gov/38215802/
- OMS (2021), *Ethics and governance of artificial intelligence for health*.

## URGENTE — 20 MINUTOS

Entrega en este orden y commitea apenas tengas cada uno:
1) `README.md` → 2) `docs/ficha-tecnica.md` → 3) lo que alcance de código.
No pulas nada hasta tener los tres. **Primer commit en los primeros 5 minutos.**

Al final, crea el repo:

```bash
gh repo create pulso-upch --public --source=. --push
```

Avísame con la URL del repo apenas exista.
