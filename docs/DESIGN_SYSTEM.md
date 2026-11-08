# Design system · Pulso UPCH

Una sola fuente para la demo (`app/`), la landing (`index.html`), las slides (`expo/`) y el
one-pager. Referencia estética: páginas de producto de Apple. Una idea por pantalla,
tipografía grande, mucho aire y movimiento con propósito. Sin WebGL, sin 3D y sin
librerías de animación.

## 1. Principios

1. **Una idea por pantalla.** Cada vista tiene un título, una frase y una acción principal.
2. **El granate es identidad, nunca alarma.** Los estados de cambio usan ámbar suave. No
   existe un rojo de error para el estudiante.
3. **Lo que se muestra no interpreta.** Ningún color, animación ni gesto de la mascota
   depende de las respuestas del estudiante. Dependen solo del avance en el flujo.
4. **Sin JavaScript, todo se lee.** Las animaciones parten del estado final escrito en el
   HTML.
5. **AA en todo el texto.** Lo comprueba `python tools/contrast.py` (exit 0 = sin fallos).

## 2. Color

Los tokens se definen en `:root`, con su versión oscura en
`@media (prefers-color-scheme: dark)`, `:root[data-theme="dark"]` y
`:root[data-theme="light"]`.

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` | `#ffffff` | `#000000` | Fondo |
| `--bg2` | `#f5f5f7` | `#161617` | Tarjetas |
| `--fg` | `#1d1d1f` | `#f5f5f7` | Texto |
| `--muted` | `#5a5a5f` | `#a1a1a6` | Texto secundario |
| `--faint` | `#6e6e73` | `#8e8e93` | Fuentes, pies (≥ 4.5:1) |
| `--brand` | `#B03437` | `#B03437` | Botón principal (texto blanco) |
| `--accent` | `#B03437` | `#F08A8C` | Enlaces y texto de marca |
| `--gold` | `#F3C72D` | `#F3C72D` | **Solo decoración**: punto del eyebrow, barra de progreso, bordes. Nunca texto sobre blanco. |
| `--amber` / `--amber-bg` | `#8a5d00` / `#fdf6e7` | `#f0c46c` / `#2a2214` | Mensaje de cambio sostenido |
| `--calm` | `#2f7d5b` | `#6cc79a` | "Sin cambios relevantes" |

### Acentos elegibles por el estudiante (demo)

Es una preferencia de accesibilidad: se guarda en el navegador y no se analiza. Solo cambia
`--accent` y `--brand`. Todos pasan AA, con texto blanco sobre `--brand` y `--accent` sobre
`--bg`/`--bg2`, en los dos modos.

| Nombre | `--brand` | `--accent` claro | `--accent` oscuro |
|---|---|---|---|
| Granate Cayetano (por defecto) | `#B03437` | `#B03437` | `#F08A8C` |
| Azul petróleo | `#1F5F7A` | `#1F5F7A` | `#7CC4E0` |
| Verde salvia | `#2F6B4F` | `#2F6B4F` | `#86C9A6` |
| Grafito | `#3A3A3F` | `#3A3A3F` | `#C7C7CC` |

También se puede elegir el modo (automático, claro u oscuro) y el **texto grande**, que
sube la base a 19 px.

## 3. Tipografía

La pila es del sistema, sin fuentes web: `-apple-system, BlinkMacSystemFont, "SF Pro
Text", "Segoe UI", Inter, Roboto, "Helvetica Neue", Arial, sans-serif`.

| Rol | Tamaño | Peso | Interlínea | Tracking |
|---|---|---|---|---|
| Display (cifra grande) | `clamp(56px, 14vw, 120px)` | 700 | 1.0 | −0.045em |
| H1 | `clamp(40px, 9vw, 64px)` | 700 | 1.06 | −0.035em |
| H2 | `clamp(28px, 6vw, 48px)` | 700 | 1.1 | −0.03em |
| H3 | 21px | 600 | 1.2 | −0.02em |
| Lead | `clamp(19px, 3.6vw, 24px)` | 400 | 1.4 | −0.01em |
| Cuerpo | 17px (19 px con texto grande) | 400 | 1.47 | −0.01em |
| Eyebrow | 14px | 600 | — | 0 |
| Fuente / pie | 13px | 400 | 1.4 | 0 |

Las cifras van con `font-variant-numeric: tabular-nums` y coma decimal (es-PE).

## 4. Espaciado y forma

- Base de 4 px. Escala: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- Columna de lectura: 692 px como máximo. Bloques anchos: 1080 px. Margen lateral: 22 px
  en móvil.
- Radios: 28 px en tarjetas, 980 px en botones (píldora), 14 px en campos.
- Sin sombras. La separación se hace con aire o con `--bg2`.
- Área táctil mínima: 44 × 44 px.

## 5. Componentes

| Componente | Regla |
|---|---|
| Botón principal | Píldora `--brand`, texto blanco, 17 px / 600. Una sola acción principal por pantalla. |
| Botón secundario | Texto `--accent`, sin fondo. |
| "Hablar con alguien" | Siempre visible: va en la barra superior de la demo y como tarjeta en el panel. Lleva a Bienestar, con el aviso visible "canal directo pendiente de confirmar". |
| Tarjeta de cifra | Cifra display, una línea de contexto y la fuente, que se despliega al tocar (`<details>`). |
| Mensaje de cambio | 4 bloques del mismo tamaño sobre `--amber-bg`: qué cambió, es normal que cambie, no es un diagnóstico, efecto nocebo. |
| Etiqueta exploratoria | Píldora `--bg2` con el texto "Exploratorio: no mide estrés". |
| Progreso | Barra de 2 px en `--gold`. |
| Mascota | Ver §7. |

## 6. Movimiento

- Duraciones: 200 ms (respuesta a un toque), 400 ms (cambio de pantalla), 700 ms
  (aparición), 1 400 ms (conteo de cifras).
- Curva: `cubic-bezier(.2, .7, .2, 1)` (ease-out suave). Sin rebotes.
- Se anima solo `opacity` y `transform`.
- Cada movimiento comunica algo: entrada de contenido, progreso o confirmación. Nada se
  mueve en bucle salvo la respiración de la mascota (4 s, amplitud de 2 %).
- Con `prefers-reduced-motion: reduce` no hay transiciones de pantalla, conteos ni
  respiración: todo aparece en su estado final.

## 7. Mascota: "Pulsito"

- Es un brote geométrico simple en una maceta redonda en `--brand`, con dos ojos sobrios.
  Es SVG en línea, sin imágenes. El dorado aparece solo en la última etapa (la flor).
- Tono cálido, no infantil. Habla poco, en frases de guía ("Vamos por la segunda parte").
  No pone voz de bebé, no usa diminutivos en sus textos y no dice "¡yay!".
- **Su apariencia depende solo del uso:** días distintos en que se abrió la app, inventario
  completado y si se tocó "Hablar con alguien". Son 3 etapas de crecimiento: brote, hojas y
  flor dorada.
- **No tiene estados de ánimo.** No se pone triste ni contenta según las respuestas, y nunca
  muestra culpa por no volver. No hay rachas que se pierdan.
- En el flujo reacciona al paso: aparece, acompaña y celebra discretamente al terminar un
  bloque. No reacciona al contenido.

## 8. Voz

Se usa el tú, frases cortas y lenguaje descriptivo ("tu ritmo fue más lento que tu
promedio"), nunca diagnóstico ("estás estresado"). Las cifras van siempre con su fuente a
un toque de distancia.
