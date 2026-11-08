"""Phone-viewport E2E of the demo: full flow (light, dark, mascot off, reduced motion), no console
errors, no horizontal scroll, typed text never in localStorage, zero pulso* keys after erase.
Usage: python -I tools/qa/e2e_demo.py [BASE_URL] [OUT_DIR]
  BASE_URL defaults to the live site; locally, serve the repo (python -m http.server 8765)
  and pass http://127.0.0.1:8765/ .
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "https://ichisieben.github.io/pulso-upch/"
URL = BASE.rstrip("/") + "/demo/index.html"
SHOTS = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(__file__).resolve().parents[2] / "docs" / "capturas" / "despues"
SHOTS.mkdir(parents=True, exist_ok=True)
SECRET = "zqxsecreto"
fails = []


def check(cond, msg):
    if not cond:
        fails.append(msg)


def no_hscroll(p, tag):
    w = p.evaluate("document.documentElement.scrollWidth - window.innerWidth")
    check(w <= 0, f"{tag}: horizontal scroll {w}px")


def step(p, name, tag, shot):
    p.wait_for_selector(f'[data-step="{name}"]')
    p.wait_for_timeout(450)
    no_hscroll(p, f"{tag}/{name}")
    check(p.locator('[data-act="bridge"]').is_visible(), f"{tag}/{name}: bridge hidden")
    check(p.locator('a[href="tel:113"]').first.is_visible(), f"{tag}/{name}: 113 hidden")
    if shot:
        p.screenshot(path=str(SHOTS / f"demo-{shot}.png"), full_page=False)


def flow(br, tag, scheme="light", reduced="no-preference", mascot_off=False, shots=False):
    ctx = br.new_context(viewport={"width": 390, "height": 844}, color_scheme=scheme, reduced_motion=reduced, accept_downloads=True)
    p = ctx.new_page()
    errors = []
    p.on("console", lambda m: m.type == "error" and errors.append(m.text))
    p.on("pageerror", lambda e: errors.append(str(e)))
    p.goto(URL)
    s = (lambda n: n) if shots else (lambda n: None)
    step(p, "inicio", tag, s("1-inicio"))
    if reduced == "reduce":
        anim = p.evaluate("[getComputedStyle(document.querySelector('.screen')).animationName, getComputedStyle(document.querySelector('.mascot svg')).animationName]")
        check(anim == ["none", "none"], f"{tag}: reduced motion still animates {anim}")
    else:
        anim = p.evaluate("getComputedStyle(document.querySelector('.mascot svg')).animationName")
        check(anim == "breathe", f"{tag}: breathing missing {anim}")
    p.click('[data-step="inicio"] [data-act="primary"]')
    step(p, "consentimiento", tag, s("2-consentimiento"))
    p.click('[data-act="primary"]')
    step(p, "tema", tag, None)
    p.click('[data-pref="accent-petroleo"]')
    brand = p.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--brand').trim()")
    check(brand.lower() == "#1f5f7a", f"{tag}: accent not applied {brand}")
    if mascot_off:
        p.click('label:has([data-pref="mascot"])')
    if shots:
        p.screenshot(path=str(SHOTS / "demo-3-tema.png"))
    p.click('[data-act="primary"]')
    step(p, "inventario", tag, None)
    p.click('[data-filter="si"]')
    p.click('[data-intensity="3"]')
    p.click('[data-act="primary"]')
    for b in p.locator('.scale').all()[:4]:
        b.locator('[data-v="4"]').click()
    if shots:
        p.wait_for_timeout(400)
        p.screenshot(path=str(SHOTS / "demo-4-inventario.png"))
    p.click('[data-act="pause"]')
    step(p, "escritura", tag, None)
    p.click('[data-act="to-panel"]')
    step(p, "panel", tag, None)
    p.click('[data-act="resume"]')
    step(p, "inventario", tag, None)
    p.click('[data-act="resume"]')
    check(p.locator('.scale button.on').count() == 4, f"{tag}: answers not resumed")
    for _ in range(3):
        for sc in p.locator('.scale').all():
            sc.locator('[data-v="3"]').click()
        p.click('[data-act="primary"]')
    step(p, "escritura", tag, s("5-escritura"))
    p.click('[data-act="typing"]')
    p.keyboard.type(SECRET + " hoy fue un dia largo de clases", delay=25)
    p.click('[data-act="primary"]')
    step(p, "checkin", tag, None)
    p.click('[data-rest="7"]'); p.click('[data-energy="3"]'); p.click('.sisco-item [data-v="2"]')
    check(p.locator('text=Pregunta del inventario, tal cual').is_visible(), f"{tag}: item label")
    if shots:
        p.wait_for_timeout(400)
        p.screenshot(path=str(SHOTS / "demo-6-checkin.png"))
    p.click('[data-act="primary"]')
    step(p, "panel", tag, None)
    check(p.locator('.mascot').count() == (0 if mascot_off else 1), f"{tag}: mascot count")
    p.click('[data-scenario="stable"]')
    p.click('[data-scenario="sustained"]')
    check(p.locator('.change .four > div').count() == 4, f"{tag}: change blocks")
    if shots:
        p.screenshot(path=str(SHOTS / "demo-7-panel.png"))
        p.locator('.change').scroll_into_view_if_needed()
        p.screenshot(path=str(SHOTS / "demo-8-cambio.png"))
    if tag == "dark":
        p.screenshot(path=str(SHOTS / "demo-10-panel-oscuro.png"))
    ls = p.evaluate("JSON.stringify(Object.entries(localStorage))")
    check(SECRET not in ls and "dia largo" not in ls, f"{tag}: typed text in localStorage")
    p.click('[data-act="primary"]')
    step(p, "datos", tag, s("9-datos"))
    with p.expect_download() as d:
        p.click('[data-act="export"]')
    check(d.value.suggested_filename.endswith(".json"), f"{tag}: export")
    p.click('[data-act="erase"]')
    p.click('[data-act="erase-confirm"]')
    step(p, "inicio", tag, None)
    keys = p.evaluate("Object.keys(localStorage).filter(k => k.startsWith('pulso'))")
    check(keys == [], f"{tag}: pulso keys after erase {keys}")
    p.reload(); p.wait_for_selector('[data-step="inicio"]')
    keys = p.evaluate("Object.keys(localStorage).filter(k => k.startsWith('pulso'))")
    check(keys == [], f"{tag}: pulso keys after reload {keys}")
    check(not errors, f"{tag}: console errors {errors}")
    ctx.close()


with sync_playwright() as pw:
    br = pw.chromium.launch()
    flow(br, "light", shots=True)
    flow(br, "dark", scheme="dark")
    flow(br, "mascot-off", mascot_off=True)
    flow(br, "reduced", reduced="reduce")
    br.close()

print("FAILS:", len(fails))
for f in fails:
    print(" -", f)
sys.exit(1 if fails else 0)
