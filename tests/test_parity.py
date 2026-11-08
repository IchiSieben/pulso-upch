"""Python and JS detectors must agree on every day of every synthetic run."""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "model"))
from detector import evaluate  # noqa: E402
from synth import generate  # noqa: E402


def test_python_js_parity(tmp_path):
    cases = [generate(s, seed=k, shift_scale=sc)
             for s in ("stable", "isolated", "sustained") for k in range(30)
             for sc in (0.4, 1.0)]
    f = tmp_path / "cases.json"
    f.write_text(json.dumps(cases))
    out = subprocess.run(["node", str(ROOT / "tests/parity.mjs"), str(f),
                          str(ROOT / "app/src/detector.js")],
                         capture_output=True, text=True, check=True).stdout
    js = json.loads(out)
    assert len(js) == len(cases)
    for days, j in zip(cases, js):
        p = evaluate(days)
        assert p["state"] == j["state"]
        assert p["flags"] == j["flags"]
        for zp, zj in zip(p["z"], j["z"]):
            for k in zp:
                assert abs(zp[k] - zj[k]) <= 0.0011
