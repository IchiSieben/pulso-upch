# Selectores de la demo (para el video, Fase 5)

Estables en `app/src/App.jsx`. Ejemplo: `[data-step="panel"] [data-act="primary"]`.

| Selector | Dónde | Qué hace |
|---|---|---|
| `[data-step="inicio\|consentimiento\|tema\|inventario\|escritura\|checkin\|panel\|datos"]` | Raíz de cada pantalla | Identifica el paso |
| `[data-act="primary"]` | Una por pantalla | Acción principal (Empezar, Continuar, Siguiente, Terminar inventario, Terminar, Ver mi panel, Exportar o borrar mis datos; en `datos`, Volver al panel) |
| `[data-act="bridge"]` | Barra superior, todas las pantallas | "Hablar con alguien" |
| `[data-act="bridge-card"]` | Tarjeta del panel | "Quiero orientación" |
| `a[href="tel:113"]` | Bajo la barra y en la tarjeta | Línea 113, opción 5 |
| `[data-act="skip"]` | inventario, escritura, checkin | Omitir / Prefiero no responder / Ahora no |
| `[data-act="pause"]` | inventario (páginas de ítems) | Pausar y seguir después |
| `[data-act="resume"]` | inventario (al volver) y panel | Retomar inventario |
| `[data-act="back"]` | inventario | Atrás |
| `[data-act="to-panel"]` | pasos intermedios | Ir a mi panel |
| `[data-act="redo"]` | panel | Repetir el recorrido |
| `[data-act="typing"]` | escritura | Textarea (el texto no se guarda) |
| `[data-act="export"]`, `[data-act="erase"]`, `[data-act="erase-confirm"]` | datos | Exportar, borrar, confirmar borrado |
| `[data-scenario="stable\|isolated\|sustained"]` | panel | Escenario sintético |
| `[data-feature="wpm\|iki_mean_ms\|iki_sd_ms\|backspace_rate\|session_s"]` | panel | Métrica del gráfico |
| `[data-pref="mode-auto\|mode-light\|mode-dark"]` | tema | Modo |
| `[data-pref="accent-granate\|accent-petroleo\|accent-salvia\|accent-grafito"]` | tema | Acento |
| `[data-pref="large-text"]`, `[data-pref="mascot"]` | tema | Checkbox oculto; hacer clic en su `label` (`label:has([data-pref="mascot"])`) |
| `[data-consent="sisco\|typing\|self"]` | consentimiento | Checkbox oculto; clic en su `label` |
| `[data-filter="si\|no"]`, `[data-intensity="1..5"]` | inventario (página inicial) | Filtro e intensidad SISCO |
| `.scale [data-v="1..5"]` | inventario, checkin | Respuesta en la escala |
| `[data-rest="5..9"]`, `[data-energy="1..5"]` | checkin | Descanso y energía |
| `.mascot[data-stage="0\|1\|2"]` | inicio, tema, tras inventario, tras checkin, panel | Pulsito (no existe si está apagado) |

## Check-in: qué se hizo con "evaluaciones esta semana"

Se quitó del check-in para que quede en 3 toques (descanso, energía y un ítem SISCO
rotativo). El panel ya manejaba su ausencia: la tarjeta de carga muestra el ciclo sintético
con el título "Tu carga de la semana". Las sesiones antiguas que sí lo traen se siguen
mostrando.
