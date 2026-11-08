"""Landing check: scroll reveals, layer-by-layer diagram, count-ups end at their HTML values, no
overflow or console errors/404s; reduced motion stays static.
Usage: python -I tools/qa/landing_test.py [BASE_URL] [OUT_DIR]
  BASE_URL defaults to the live site; locally, serve the repo (python -m http.server 8765)
  and pass http://127.0.0.1:8765/ .
"""
import sys, tempfile
from playwright.sync_api import sync_playwright
base = sys.argv[1] if len(sys.argv) > 1 else "https://ichisieben.github.io/pulso-upch/"
out = sys.argv[2] if len(sys.argv) > 2 else tempfile.mkdtemp(prefix="landing-")
errs = []
with sync_playwright() as p:
    b = p.chromium.launch()
    # 1) motion on
    for name, vp, scheme in (("m-light", (390, 844), "light"), ("d-dark", (1280, 900), "dark")):
        ctx = b.new_context(viewport={"width": vp[0], "height": vp[1]}, color_scheme=scheme)
        pg = ctx.new_page()
        pg.on("console", lambda m: m.type == "error" and errs.append(m.text)); pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("response", lambda r: r.status >= 400 and errs.append(f"{r.status} {r.url}"))
        pg.goto(base)
        print(name, "mo:", pg.evaluate("document.documentElement.classList.contains('mo')"))
        print(name, "evidence hidden before scroll:", pg.evaluate("getComputedStyle(document.querySelector('.ev>li')).opacity"))
        st1 = pg.evaluate("getComputedStyle(document.querySelector('[data-st=\"7\"]')).opacity")
        print(name, "bridge opacity before:", st1)
        pg.locator("#arquitectura .diagram").scroll_into_view_if_needed()
        pg.wait_for_timeout(500)
        print(name, "bridge mid-build:", pg.evaluate("getComputedStyle(document.querySelector('[data-st=\"7\"]')).opacity"))
        pg.wait_for_timeout(3600)
        print(name, "bridge after:", pg.evaluate("getComputedStyle(document.querySelector('[data-st=\"7\"]')).opacity"))
        pg.locator("#arquitectura").screenshot(path=f"{out}/{name}-arch.png")
        pg.locator('.n[data-k="nocebo"]').click()
        print(name, pg.inner_text("#info")[:40].replace("\n", " | "))
        el = pg.locator('[data-count="0.078"]')
        el.scroll_into_view_if_needed(); pg.wait_for_timeout(350)
        print(name, "count mid:", el.inner_text())
        pg.wait_for_timeout(1500)
        print(name, "count end:", el.inner_text(), pg.locator('[data-count="3.3"]').inner_text() if False else "")
        # scroll through everything so all reveal, then full screenshot
        h = pg.evaluate("document.body.scrollHeight")
        for y in range(0, h, 400):
            pg.evaluate(f"scrollTo(0,{y})"); pg.wait_for_timeout(60)
        pg.wait_for_timeout(1800)
        print(name, "finals:", [pg.locator(f'[data-count="{v}"]').inner_text() for v in ("0.078", "3.3", "628")])
        print(name, "hidden left:", pg.evaluate("[...document.querySelectorAll('.rv')].filter(e=>!e.classList.contains('in')).length"),
              "overflow:", pg.evaluate("document.documentElement.scrollWidth>innerWidth"))
        pg.locator("#evidencia").screenshot(path=f"{out}/{name}-evid.png")
        pg.screenshot(path=f"{out}/{name}-full.png", full_page=True)
        ctx.close()
    # 2) reduced motion: everything visible immediately, no counting
    ctx = b.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
    pg = ctx.new_page(); pg.goto(base)
    print("reduced mo:", pg.evaluate("document.documentElement.classList.contains('mo')"),
          "ev opacity:", pg.evaluate("getComputedStyle(document.querySelector('.ev>li')).opacity"),
          "bridge:", pg.evaluate("getComputedStyle(document.querySelector('[data-st=\"7\"]')).opacity"),
          "count:", pg.locator('[data-count="628"]').inner_text())
    ctx.close(); b.close()
print("ERRORS", errs)
