"""Record the Pulso UPCH demo video (Phase 5).

Drives the real demo inside tools/video/stage.html (phone frame + captions) with Playwright,
records 1920x1080 WebM, then ffmpeg -> demo/pulso-demo.mp4 (H.264 yuv420p, 30 fps, no audio,
+faststart). Writes docs/video-timestamps.md with the start of each scene.

Usage (from the repo root; serves the repo locally, never records against the internet):
  python -I tools/video/record_demo.py            # full render
  python -I tools/video/record_demo.py --preview  # fast pass, screenshots of key scenes only
Selectors: docs/selectores-demo.md.
"""
import argparse, os, random, shutil, subprocess, sys, tempfile, threading, time
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT_MP4 = ROOT / "demo" / "pulso-demo.mp4"
OUT_TS = ROOT / "docs" / "video-timestamps.md"
TEXT = "Esta semana tengo dos parciales y una entrega de laboratorio, pero voy avanzando de a pocos."

ap = argparse.ArgumentParser()
ap.add_argument("--preview", action="store_true")
ap.add_argument("--shots", default=str(ROOT / "docs" / "capturas" / "video"))
args = ap.parse_args()
SPEED = 0.15 if args.preview else 1.17  # 1.17 brings the full take to ~4:30
random.seed(7)


def serve():
    class Quiet(SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    handler = partial(Quiet, directory=str(ROOT))
    srv = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


srv = serve()
BASE = f"http://127.0.0.1:{srv.server_address[1]}"
tmp = Path(tempfile.mkdtemp(prefix="pulso-video-"))
scenes = []

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=1,
                              record_video_dir=None if args.preview else str(tmp),
                              record_video_size={"width": 1920, "height": 1080})
    page = ctx.new_page()
    t_ctx = time.monotonic()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(f"{BASE}/tools/video/stage.html?src=../../demo/index.html")
    app = page.frame_locator("#app")
    app.locator('[data-step="inicio"]').wait_for()
    page.wait_for_timeout(800)
    t0 = time.monotonic()  # video is trimmed to start here (drops the blank start)

    def wait(s):
        page.wait_for_timeout(int(s * 1000 * SPEED))

    def scene(step, title, line, shot=None):
        scenes.append((time.monotonic() - t0, step, title))
        page.evaluate("([a,b,c]) => setCap(a,b,c)", [step, title, line])
        page.wait_for_timeout(600)
        if args.preview and shot:
            Path(args.shots).mkdir(parents=True, exist_ok=True)
            page.screenshot(path=f"{args.shots}/{shot}.png")

    def click(sel, pause=0.9):
        loc = app.locator(sel).first
        loc.scroll_into_view_if_needed()
        loc.hover(); wait(0.35)
        loc.click(); wait(pause)

    def show(sel, pause=1.5):
        app.locator(sel).first.evaluate("e => e.scrollIntoView({behavior:'smooth', block:'center'})")
        wait(pause)

    def scroll_by(px, pause=1.2):
        app.locator("body").evaluate(f"() => window.scrollBy({{top:{px}, behavior:'smooth'}})")
        wait(pause)

    # 1 · Portada
    scene("Pulso UPCH", "No detectamos estrés. Acortamos el camino.",
          "Un prototipo para estudiantes de la UPCH. Corre entero en el teléfono, sin servidor.", "1-portada")
    wait(6); scroll_by(300, 3); scroll_by(-300, 2.5)
    click('[data-step="inicio"] [data-act="primary"]', 1.2)

    # 2 · Consentimiento
    scene("Paso 1", "Tú decides qué se mide.",
          "Cada parte se activa por separado: inventario, escritura y check-in. Cualquiera se puede apagar.")
    wait(5); scroll_by(320, 4); scroll_by(320, 4)
    click('[data-step="consentimiento"] [data-act="primary"]', 1.2)

    # 3 · Mascota y tema
    scene("Paso 2", "Tu tema. Tu ritmo.",
          "Modo, color y texto grande. Pulsito guía el recorrido: crece con el uso, nunca con tus respuestas.", "2-tema")
    wait(4)
    click('[data-pref="accent-petroleo"]', 1.6)
    click('[data-pref="accent-salvia"]', 1.6)
    click('[data-pref="accent-granate"]', 1.6)
    click('[data-pref="mode-dark"]', 2.2)
    click('[data-pref="mode-light"]', 1.6)
    wait(2)
    click('[data-step="tema"] [data-act="primary"]', 1.2)

    # 4 · Inventario
    scene("Paso 3", "Inventario SISCO.",
          "Los 31 ítems publicados, validados en 628 universitarios de Lima. Se puede pausar y retomar.", "3-inventario")
    wait(4)
    click('[data-filter="si"]', 1.0)
    click('[data-intensity="4"]', 1.4)
    click('[data-step="inventario"] [data-act="primary"]', 1.4)
    scales = app.locator('[data-step="inventario"] .scale')
    for i, v in enumerate((4, 3, 4)):
        if scales.count() > i:
            btn = scales.nth(i).locator(f'[data-v="{v}"]')
            btn.scroll_into_view_if_needed(); btn.hover(); wait(0.4); btn.click(); wait(1.4)
    wait(1.5)
    scene("Paso 3", "Todo se puede dejar en blanco.", "Para el video saltamos al final del inventario.")
    for _ in range(12):
        if app.locator('[data-step="inventario"]').count() == 0:
            break
        app.locator('[data-step="inventario"] [data-act="primary"]').first.click()
        wait(0.6)
    wait(1.5)

    # 5 · Escritura
    scene("Paso 4", "Prueba de escritura.",
          "Exploratoria: no mide estrés. Lo que escribes no se guarda; solo quedan cinco números.", "4-escritura")
    wait(4)
    ta = app.locator('[data-act="typing"]')
    ta.scroll_into_view_if_needed(); ta.click(); wait(0.6)
    typo_at = {18: "x", 47: "pa", 70: "q"}
    for i, ch in enumerate(TEXT):
        if i in typo_at:
            for c in typo_at[i]:
                page.keyboard.type(c, delay=random.randint(60, 180) * SPEED)
            page.wait_for_timeout(int(350 * SPEED))
            for _ in typo_at[i]:
                page.keyboard.press("Backspace"); page.wait_for_timeout(int(random.randint(90, 160) * SPEED))
        page.keyboard.type(ch, delay=random.randint(60, 180) * SPEED)
    wait(2.5)
    click('[data-step="escritura"] [data-act="primary"]', 2.5)
    wait(1)

    # 6 · Check-in
    scene("Paso 5", "Tres toques al día.",
          "Descanso, energía y una pregunta del inventario, tal cual. Un ítem suelto no es un puntaje.", "5-checkin")
    wait(4)
    click('[data-rest="7"]', 1.4)
    click('[data-energy="3"]', 1.4)
    one = app.locator('[data-step="checkin"] .scale [data-v="2"]').first
    if one.count():
        one.scroll_into_view_if_needed(); one.hover(); wait(0.4); one.click(); wait(1.4)
    wait(2.5)
    click('[data-step="checkin"] [data-act="primary"]', 2)

    # 7 · Panel
    scene("Tu panel", "Primero, lo validado.",
          "El SISCO por subescala, sin niveles inventados. Después, tu carga académica.", "6-panel")
    wait(5); scroll_by(420, 5); scroll_by(420, 5)
    scene("Tu panel", "Al final, el experimento.",
          "Historia sintética y rotulada: 20 días de ejemplo más hoy. Solo se compara contigo.")
    show('[data-scenario="stable"]', 5)
    click('[data-scenario="stable"]', 4)
    click('[data-scenario="isolated"]', 5)

    # 8 · Cambio sostenido
    click('[data-scenario="sustained"]', 2)
    scene("Cambio sostenido", "Lo que más cuidamos.",
          "Cuatro bloques del mismo peso: qué cambió, es normal, no es un diagnóstico y el efecto nocebo.", "7-cambio")
    scroll_by(380, 6); scroll_by(300, 7); scroll_by(300, 7); scroll_by(300, 6)

    # 9 · Hablar con alguien
    scene("Hablar con alguien", "Un toque. Voluntario.",
          "Lleva a Bienestar sin enviar ningún resultado. En crisis: Línea 113, opción 5 (MINSA), 24 horas.", "8-puente")
    show('[data-act="bridge-card"]', 4)
    app.locator('[data-act="bridge-card"]').first.hover(); wait(4)
    app.locator('[data-act="bridge"]').first.hover(); wait(4)

    # 10 · Tus datos
    show('[data-step="panel"] [data-act="primary"]', 1.5)
    click('[data-step="panel"] [data-act="primary"]', 1.5)
    scene("Tus datos", "Solo números.",
          "Esto es todo lo que se guarda, y solo en este navegador. Se puede exportar o borrar.", "9-datos")
    wait(5); scroll_by(400, 5); scroll_by(400, 5)

    # 11 · Borrar
    scene("Tus datos", "Borrar todo.", "Un botón y no queda nada guardado.")
    click('[data-act="erase"]', 2.5)
    click('[data-act="erase-confirm"]', 4)
    left = page.evaluate("() => Object.keys(document.getElementById('app').contentWindow.localStorage).filter(k => k.startsWith('pulso')).length")
    wait(3)

    # 12 · Cierre
    scene("ichisieben.github.io/pulso-upch", "Acortamos el camino hasta una persona.",
          "Prototipo con historia sintética: viabilidad técnica, no validez clínica.", "10-cierre")
    wait(8)
    t_end = time.monotonic() - t0
    video = page.video
    ctx.close()  # finalises the WebM
    webm = video.path() if video else None
    browser.close()
srv.shutdown()

print(f"duration {t_end:.1f}s · pulso keys left after erase: {left} · page errors: {errors}")
if args.preview:
    sys.exit(0)

start = t0 - t_ctx + 0.6  # first caption has faded in
OUT_MP4.parent.mkdir(exist_ok=True)
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{start:.2f}", "-i", str(webm), "-t", f"{t_end - 0.6:.2f}",
                "-an", "-r", "30", "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
                "-movflags", "+faststart", str(OUT_MP4)], check=True)
shutil.rmtree(tmp, ignore_errors=True)

fmt = lambda s: f"{int(max(0, s - 0.6) // 60)}:{int(max(0, s - 0.6) % 60):02d}"  # times relative to the trimmed start
rows = "\n".join(f"| {fmt(t)} | {step} | {title} |" for t, step, title in scenes)
OUT_TS.write_text(f"""# Tiempos del video de la demo

`demo/pulso-demo.mp4`, generado con `python -I tools/video/record_demo.py`. Dura
**{fmt(t_end)}**, en 1920×1080 a 30 fps, sin audio. Cada fila es el momento en que cambia
el subtítulo. Si el video se vuelve a grabar, este archivo se regenera solo.

| Tiempo | Paso | Subtítulo |
|---|---|---|
{rows}
""", encoding="utf-8")
print("wrote", OUT_MP4, f"{OUT_MP4.stat().st_size/1e6:.1f} MB", "and", OUT_TS)
