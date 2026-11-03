from fastapi.testclient import TestClient

from backend.main import DATA_DIR, app

c = TestClient(app)
U = "test-user-01"
M = dict(wpm=40, iki_mean_ms=290, iki_sd_ms=90, backspace_rate=0.05, session_s=60,
         rest_hours=7, energy_1_5=4)


def test_text_is_rejected_and_not_stored():
    r = c.post(f"/sessions/{U}", json={**M, "text": "hola mundo"})
    assert r.status_code == 422
    assert not (DATA_DIR / f"{U}.json").exists()


def test_store_only_numbers_then_delete():
    r = c.post(f"/sessions/{U}", json=M)
    assert r.status_code == 200
    raw = (DATA_DIR / f"{U}.json").read_text()
    assert all(isinstance(v, (int, float)) for v in __import__("json").loads(raw)[0].values())
    t = c.get(f"/trend/{U}?scenario=sustained").json()
    assert len(t["days"]) == 21 and t["days"][-1]["synthetic"] is False
    d = c.delete(f"/data/{U}").json()
    assert d == {"deleted": True, "exists_now": False}
    assert not (DATA_DIR / f"{U}.json").exists()


def test_scenarios_states():
    assert c.get("/trend/nobody-xx?scenario=stable").json()["state"] == "sin cambios relevantes"
    assert c.get("/trend/nobody-xx?scenario=sustained").json()["state"] == \
        "cambio sostenido observado"
