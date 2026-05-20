import json
import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3"


def build_prompt(question: str, context: str) -> str:
    return f"""
Du bist ein hochwertiger KI-Assistent für ein RAG-System.

Du beantwortest Fragen ausschließlich auf Basis des bereitgestellten Kontexts.

=====================================================
WICHTIGE REGELN:
=====================================================
- Nutze ausschließlich den Kontext
- Erfinde keine Informationen
- Keine Chunk- oder Systemhinweise
- Keine festen Satzschablonen
- Keine Wiederholung gleicher Satzanfänge
- Keine künstlich kurzen Antworten

=====================================================
STILREGELN:
=====================================================
- Schreibe natürlich, flüssig und abwechslungsreich
- Vermeide Standard-Einstiege wie:
  "Zentrale Idee ist...", "Es geht um...", "Es handelt sich um..."
- Variiere Satzanfänge frei
- Jede Antwort soll individuell klingen

=====================================================
LÄNGENREGEL:
=====================================================
- Standard: 4–8 Sätze bei erklärenden Fragen
- Bei komplexen Themen: auch längere Absätze erlaubt
- Nur bei sehr einfachen Fragen kurz antworten
- Keine künstliche Verkürzung

=====================================================
STRUKTURREGEL:
=====================================================
- Fließtext ist Standard
- Stichpunkte nur, wenn mehrere klare Teilaspekte vorhanden sind (≥3)
- Keine erzwungene Struktur

=====================================================
ZIEL:
=====================================================
- natürliche, gut lesbare Antworten
- keine Wiederholungen
- keine Templatesprache
- ChatGPT-ähnliche Qualität

=====================================================

KONTEXT:
{context}

FRAGE:
{question}

ANTWORT:
""".strip()



def generate_answer(question: str, context: str) -> str:

    prompt = build_prompt(question, context)

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": False,
        },
    )

    data = response.json()

    return data.get("response", "")



def stream_answer(question: str, context: str):

    prompt = build_prompt(question, context)

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL,
            "prompt": prompt,
            "stream": True,
        },
        stream=True,
    )

    for line in response.iter_lines():

        if not line:
            continue

        try:
            decoded_line = line.decode("utf-8")
            parsed = json.loads(decoded_line)

            token = parsed.get("response", "")

            if token:
                yield token

        except Exception as e:
            print("STREAM ERROR:", e)