"""Deck check: 6 slides fit 1600x900, keyboard/click navigation, timer amber at 7:00 (simulated
clock). Optional 3rd arg: path of the PDF to regenerate (expo/pulso-upch-expo.pdf).
Usage: python -I tools/qa/expo_test.py [BASE_URL] [OUT_DIR]
  BASE_URL defaults to the live site; locally, serve the repo (python -m http.server 8765)
  and pass http://127.0.0.1:8765/ .
"""
import sys, tempfile
from playwright.sync_api import sync_playwright
base = sys.argv[1] if len(sys.argv) > 1 else "https://ichisieben.github.io/pulso-upch/"
out = sys.argv[2] if len(sys.argv) > 2 else tempfile.mkdtemp(prefix="expo-")
pdf = sys.argv[3] if len(sys.argv) > 3 else None
errs = []
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1600, "height": 900})
    pg = ctx.new_page()
    pg.clock.install()
    pg.on("console", lambda m: m.type == "error" and errs.append(m.text)); pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(base + "expo/")
    pg.wait_for_timeout(300)
    n = pg.evaluate("document.querySelectorAll('.slide').length")
    for k in range(n):
        pg.wait_for_timeout(700)
        print(k + 1, pg.evaluate("location.hash"), "on:", pg.evaluate("[...document.querySelectorAll('.slide')].findIndex(s=>s.classList.contains('on'))"),
              "overflowing:", pg.evaluate("[...document.querySelector('.slide.on').querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.bottom>900.5||r.right>1600.5}).map(e=>e.className||e.tagName).slice(0,4)"))
        pg.screenshot(path=f"{out}/expo-{k+1}.png")
        pg.keyboard.press("ArrowRight")
    print("video missing class:", pg.evaluate("document.querySelector('.vbox').className"))
    pg.keyboard.press("ArrowLeft"); pg.keyboard.press("Home")
    print("home ->", pg.evaluate("location.hash"))
    pg.mouse.click(1400, 450); print("click right ->", pg.evaluate("location.hash"))
    pg.mouse.click(100, 450); print("click left ->", pg.evaluate("location.hash"))
    pg.keyboard.press("t")
    pg.clock.run_for(6 * 60 * 1000 + 59 * 1000)
    print("timer 6:59", pg.inner_text("#timer"), pg.evaluate("document.getElementById('timer').className"))
    pg.clock.run_for(2000)
    print("timer 7:01", pg.inner_text("#timer"), pg.evaluate("document.getElementById('timer').className"))
    pg.screenshot(path=f"{out}/expo-timer.png")
    pg.keyboard.press("t"); print("hidden:", pg.evaluate("document.getElementById('timer').className"))
    pg.keyboard.press("r"); pg.keyboard.press("t"); pg.clock.run_for(1000)
    print("after reset", pg.inner_text("#timer"))
    ctx.close()
    if pdf:
        ctx = b.new_context(viewport={"width": 1600, "height": 900}); pg = ctx.new_page()
        pg.goto(base + "expo/"); pg.wait_for_timeout(500)
        pg.emulate_media(media="print")
        pg.pdf(path=pdf, width="1600px", height="900px", print_background=True, prefer_css_page_size=True)
        print("pdf written")
        ctx.close()
    b.close()
print("ERRORS", errs)
