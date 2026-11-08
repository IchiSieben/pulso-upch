"""Synthetic 21-day typing-dynamics generator. SYNTHETIC DATA ONLY.

Three scenarios: stable / isolated (one atypical day) / sustained (last 5 days shifted).
Only numeric per-session metrics exist here; there is no text anywhere in the pipeline.
"""
import json
import sys
from pathlib import Path

import numpy as np

FEATURES = ["wpm", "iki_mean_ms", "iki_sd_ms", "backspace_rate", "session_s",
            "rest_hours", "energy_1_5"]
DAYS = 21
BASE = dict(wpm=42.0, iki_mean_ms=285.0, iki_sd_ms=95.0, backspace_rate=0.06,
            session_s=180.0, rest_hours=7.2, energy_1_5=4.0)
NOISE = dict(wpm=2.0, iki_mean_ms=12.0, iki_sd_ms=8.0, backspace_rate=0.008,
             session_s=20.0, rest_hours=0.5, energy_1_5=0.4)
# Shift applied on an "atypical" day: slower, more erratic, more deletions, less rest/energy.
SHIFT = dict(wpm=-11.0, iki_mean_ms=95.0, iki_sd_ms=50.0, backspace_rate=0.06,
             session_s=-40.0, rest_hours=-2.4, energy_1_5=-1.8)


def _day(rng, shifted, scale=1.0):
    row = {}
    for f in FEATURES:
        v = BASE[f] + rng.normal(0, NOISE[f]) + (SHIFT[f] * scale if shifted else 0.0)
        row[f] = v
    row["energy_1_5"] = int(np.clip(round(row["energy_1_5"]), 1, 5))
    row["backspace_rate"] = float(np.clip(row["backspace_rate"], 0, 1))
    return {k: (round(v, 3) if isinstance(v, float) else v) for k, v in row.items()}


def generate(scenario: str, seed: int = 7, shift_scale: float = 1.0):
    rng = np.random.default_rng(seed)
    if scenario == "stable":
        atypical = set()
    elif scenario == "isolated":
        atypical = {17}
    elif scenario == "sustained":
        atypical = set(range(16, 21))
    else:
        raise ValueError(scenario)
    return [{"day": d + 1, "synthetic": True, **_day(rng, d in atypical, shift_scale)} for d in range(DAYS)]


if __name__ == "__main__":
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "synthetic"
    out.mkdir(parents=True, exist_ok=True)
    for s in ("stable", "isolated", "sustained"):
        (out / f"{s}.json").write_text(json.dumps(generate(s), indent=1))
        print("wrote", out / f"{s}.json")
