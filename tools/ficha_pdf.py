"""Render docs/ficha-tecnica.md to docs/Reto3_PulsoUPCH.pdf (Arial 11, 1.5 spacing) via headless Edge."""
import re, subprocess, sys
from pathlib import Path
import markdown

root = Path(__file__).resolve().parent.parent
md = (root / "docs/ficha-tecnica.md").read_text(encoding="utf-8")
md = re.sub(r"^---\n.*?\n---\n", "", md, flags=re.S)  # drop front matter
body = markdown.markdown(md, extensions=["tables"])
css = """@page{size:A4;margin:2.5cm}body{font-family:Arial,sans-serif;font-size:11pt;line-height:1.5;color:#000}
h1{font-size:16pt}h2{font-size:13pt;margin-top:14pt}table{border-collapse:collapse;width:100%;font-size:10pt}
td,th{border:1px solid #888;padding:3pt 5pt;vertical-align:top}blockquote{border-left:3pt solid #b4531c;margin:0;padding:2pt 10pt}
code{font-family:Arial,sans-serif}"""
html = root / "docs/_ficha.html"
html.write_text(f"<!doctype html><html lang=es><meta charset=utf-8><style>{css}</style><body>{body}</body></html>", encoding="utf-8")
edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out = root / "docs/Reto3_PulsoUPCH.pdf"
subprocess.run([edge, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                f"--print-to-pdf={out}", html.as_uri()], check=True, timeout=60)
html.unlink()
print("wrote", out, out.stat().st_size)
