"""Within-person deviation detector: robust z-score against the student's OWN baseline.

What it measures: how far each day's typing dynamics sit from that same person's first
14 days. It does NOT measure stress, mood or any health state (see README, section
"Lo que la evidencia dice"). Between-person typing->stress prediction reaches rho = 0.078
in the literature, so this signal is exploratory by design.

Rule (mirrored 1:1 in app/src/detector.js; tests/test_parity.py checks both agree):
  1. Baseline = first BASELINE_DAYS days. Per feature: median and MAD (scaled x1.4826).
  2. z = (x - median) / max(scaled MAD, floor). floor avoids division by ~0.
  3. A day is atypical if at least MIN_FEATURES typing features have |z| > Z_THRESHOLD.
  4. "Cambio sostenido observado" only after RUN_LENGTH consecutive atypical days.
Self-report (rest, energy) is shown to the user but never used to flag a day.

Swap back to the IsolationForest version: `from detector_iforest import evaluate`.
"""

TYPING_FEATURES = ["wpm", "iki_mean_ms", "iki_sd_ms", "backspace_rate", "session_s"]
BASELINE_DAYS = 14
Z_THRESHOLD = 3.0
MIN_FEATURES = 2
RUN_LENGTH = 3  # demonstrative criterion, not clinically derived
MAD_SCALE = 1.4826
REL_FLOOR = 0.02  # spread floor = 2 % of |median| (or 1e-6)

STATE_OK = "sin cambios relevantes"
STATE_CHANGE = "cambio sostenido observado"
STATE_BASELINE = "construyendo tu línea base"


def _median(xs):
    s = sorted(xs)
    n = len(s)
    return s[n // 2] if n % 2 else (s[n // 2 - 1] + s[n // 2]) / 2


def baseline_stats(base):
    stats = {}
    for f in TYPING_FEATURES:
        xs = [float(d[f]) for d in base if d.get(f) is not None]
        med = _median(xs)
        mad = _median([abs(x - med) for x in xs]) * MAD_SCALE
        stats[f] = {"median": med, "spread": max(mad, REL_FLOOR * abs(med), 1e-6)}
    return stats


def evaluate(days, baseline_days=BASELINE_DAYS, run_length=RUN_LENGTH):
    days = sorted(days, key=lambda d: d["day"])
    if len(days) < baseline_days + 1:
        return {"state": STATE_BASELINE, "longest_run": 0, "flags": [], "z": []}
    stats = baseline_stats(days[:baseline_days])
    zs, flags = [], []
    for i, d in enumerate(days):
        z = {f: round((float(d[f]) - stats[f]["median"]) / stats[f]["spread"], 3)
             for f in TYPING_FEATURES}
        zs.append(z)
        n_out = sum(1 for v in z.values() if abs(v) > Z_THRESHOLD)
        flags.append(i >= baseline_days and n_out >= MIN_FEATURES)
    run = best = 0
    for f in flags:
        run = run + 1 if f else 0
        best = max(best, run)
    return {
        "state": STATE_CHANGE if best >= run_length else STATE_OK,
        "longest_run": best,
        "flags": flags,
        "z": zs,
        "baseline": {f: {k: round(v, 4) for k, v in s.items()} for f, s in stats.items()},
    }
