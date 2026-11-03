"""Train the detector on the 3 synthetic scenarios across several seeds and report.

Technical feasibility only: the scenarios are built by us, so this proves the pipeline
separates patterns we defined. It says nothing about clinical validity.
"""
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from detector import STATE_CHANGE, STATE_OK, evaluate  # noqa: E402
from synth import generate  # noqa: E402

EXPECTED = {"stable": STATE_OK, "isolated": STATE_OK, "sustained": STATE_CHANGE}
SEEDS = range(30)

if __name__ == "__main__":
    print("DATOS SINTÉTICOS — viabilidad técnica, no validez clínica\n")
    ok_total = 0
    for scen, exp in EXPECTED.items():
        states = Counter(evaluate(generate(scen, seed=s))["state"] for s in SEEDS)
        ok = states[exp]
        ok_total += ok
        print(f"{scen:10s} esperado='{exp}'  coincide {ok}/{len(SEEDS)}  {dict(states)}")
    print(f"\nTotal: {ok_total}/{len(SEEDS) * 3} corridas con el estado esperado")
    r = evaluate(generate("sustained", seed=7))
    print("\nEjemplo (sostenido, seed 7): flags por día =",
          "".join("X" if f else "." for f in r["flags"]), "| racha máx =", r["longest_run"])
