"""Render docs/one-pager.html to docs/one-pager.pdf (A4, must be exactly 1 page)."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
src, out = ROOT / "docs" / "one-pager.html", ROOT / "docs" / "one-pager.pdf"
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.set_viewport_size({"width": 794, "height": 1123})
    pg.goto(src.as_uri())
    overflow = pg.evaluate("document.documentElement.scrollHeight - document.documentElement.clientHeight")
    pg.pdf(path=str(out), format="A4", print_background=True, prefer_css_page_size=True)
    pg.set_viewport_size({"width": 794, "height": 1123})
    pg.screenshot(path=str(ROOT / "docs" / "capturas" / "despues" / "one-pager.png"))
    b.close()
data = out.read_bytes()
pages = data.count(b"/Type /Page") - data.count(b"/Type /Pages")
print(f"{out.name}: {pages} page(s), {len(data)/1e3:.0f} kB, overflow {overflow}px")
