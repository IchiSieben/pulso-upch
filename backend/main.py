"""Pulso UPCH API. Stores ONLY numeric per-session metrics in local JSON.

Privacy is enforced by the schema: extra fields are forbidden, so a request carrying text
(e.g. {"text": "..."}) is rejected with 422 and never touches disk.
"""
import json
import re
import sys
from pathlib import Path
from typing import Literal, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "model"))
from detector import evaluate  # noqa: E402
from synth import generate  # noqa: E402

DATA_DIR = Path(__file__).resolve().parent / "data"
DATA_DIR.mkdir(exist_ok=True)

app = FastAPI(title="Pulso UPCH")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"],
                   allow_headers=["*"])


class SessionMetrics(BaseModel):
    """Only numbers. No text field exists, and unknown fields are rejected."""
    model_config = ConfigDict(extra="forbid")
    wpm: float = Field(ge=0, le=400)
    iki_mean_ms: float = Field(ge=0, le=10000)
    iki_sd_ms: float = Field(ge=0, le=10000)
    backspace_rate: float = Field(ge=0, le=1)
    session_s: float = Field(ge=0, le=7200)
    rest_hours: Optional[float] = Field(default=None, ge=0, le=24)
    energy_1_5: Optional[int] = Field(default=None, ge=1, le=5)


def _path(user_id: str) -> Path:
    if not re.fullmatch(r"[a-zA-Z0-9-]{4,64}", user_id):
        raise HTTPException(400, "user_id inválido")
    return DATA_DIR / f"{user_id}.json"


def _load(user_id):
    p = _path(user_id)
    return json.loads(p.read_text()) if p.exists() else []


@app.post("/sessions/{user_id}")
def add_session(user_id: str, m: SessionMetrics):
    rows = _load(user_id)
    rows.append(m.model_dump())
    _path(user_id).write_text(json.dumps(rows))
    return {"stored_fields": sorted(m.model_dump().keys()), "sessions": len(rows)}


@app.get("/trend/{user_id}")
def trend(user_id: str, scenario: Literal["stable", "isolated", "sustained"] = "stable"):
    """Demo: 20 SYNTHETIC days of the chosen scenario + the user's latest real session as
    day 21. Returns the model state; it is a description of change, not a diagnosis."""
    days = generate(scenario)[:20]
    real = _load(user_id)
    if real:
        last = real[-1]
        days.append({"day": 21, "synthetic": False, **last})
    else:
        days = generate(scenario)
    result = evaluate(days)
    return {"days": days, **result,
            "disclaimer": "Datos sintéticos de demostración. No es un diagnóstico."}


@app.delete("/data/{user_id}")
def delete_data(user_id: str):
    p = _path(user_id)
    existed = p.exists()
    if existed:
        p.unlink()
    return {"deleted": existed, "exists_now": p.exists()}
