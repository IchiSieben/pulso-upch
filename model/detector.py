"""Per-student IsolationForest + 3-consecutive-day rule.

Describes a change against the student's OWN baseline. It is not a diagnosis.
"""
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

FEATURES = ["wpm", "iki_mean_ms", "iki_sd_ms", "backspace_rate", "session_s",
            "rest_hours", "energy_1_5"]
BASELINE_DAYS = 14
RUN_LENGTH = 3  # demonstrative criterion: 3 consecutive atypical days

STATE_OK = "sin cambios relevantes"
STATE_CHANGE = "cambio sostenido observado"


def _matrix(days, means):
    # Missing voluntary self-report -> baseline mean (neutral), never a penalty.
    return np.array([[d.get(f) if d.get(f) is not None else means[f] for f in FEATURES]
                     for d in days], dtype=float)


def evaluate(days, baseline_days=BASELINE_DAYS, run_length=RUN_LENGTH, seed=0):
    days = sorted(days, key=lambda d: d["day"])
    if len(days) < baseline_days + 1:
        return {"state": STATE_OK, "reason": "línea base insuficiente", "flags": [],
                "scores": []}
    base = days[:baseline_days]
    means = {f: float(np.mean([d[f] for d in base if d.get(f) is not None] or [0]))
             for f in FEATURES}
    scaler = StandardScaler().fit(_matrix(base, means))
    model = IsolationForest(n_estimators=200, contamination="auto", random_state=seed)
    model.fit(scaler.transform(_matrix(base, means)))
    # Threshold: lowest baseline score minus a margin, so baseline days are never flagged.
    base_scores = model.score_samples(scaler.transform(_matrix(base, means)))
    threshold = float(base_scores.min() - 0.02)
    scores = model.score_samples(scaler.transform(_matrix(days, means)))
    flags = [bool(i >= baseline_days and s < threshold) for i, s in enumerate(scores)]
    run = best = 0
    for f in flags:
        run = run + 1 if f else 0
        best = max(best, run)
    return {
        "state": STATE_CHANGE if best >= run_length else STATE_OK,
        "longest_run": best,
        "threshold": round(threshold, 4),
        "flags": flags,
        "scores": [round(float(s), 4) for s in scores],
    }
