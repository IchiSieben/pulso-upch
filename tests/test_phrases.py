"""The descriptive message must match the direction of the synthetic shift."""
import json, subprocess
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent


def test_sustained_message_direction():
    out = subprocess.run(["node", str(ROOT / "tests/phrases.mjs"), str(ROOT / "model/synthetic/sustained.json"),
                          str(ROOT / "app/src/detector.js")], capture_output=True, text=True, encoding="utf-8", check=True).stdout
    txt = " ".join(json.loads(out))
    # SHIFT in model/synth.py: slower, longer and more irregular pauses, more deletions, shorter sessions.
    for want in ("más lento", "pausas más largas", "más irregular", "borraste más"):
        assert want in txt, (want, txt)
    for bad in ("más rápido", "más cortas", "más parejo", "borraste menos"):
        assert bad not in txt, (bad, txt)
