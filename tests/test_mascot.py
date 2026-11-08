"""The mascot's stage depends only on usage milestones, never on answers or typing."""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def run():
    out = subprocess.run(["node", str(ROOT / "tests/mascot.mjs"), str(ROOT / "app/src/mascot.js")],
                         capture_output=True, text=True, encoding="utf-8", check=True).stdout
    return json.loads(out)


def test_stage_ignores_content():
    assert run()["pure"]


def test_stage_never_decreases():
    assert run()["monotonic"]


def test_stage_reads_only_usage_keys():
    r = run()
    assert r["onlyKeys"]
    assert set(r["read"]) <= {"daysOpened", "inventoryDone", "bridgeTouched"}


def test_three_stages_and_sober_lines():
    r = run()
    assert r["stages"] == [0, 1, 2]
    for t in r["lines"]:
        assert t and "¡" not in t and "ito " not in t
