from typing import List, Dict


def build_context(results: List[Dict]) -> str:
    """
    Clean context without any structural labels that leak into LLM output.
    """

    context_parts = []

    for r in results:
        text = r.get("content", "").strip()

        if not text:
            continue

        context_parts.append(text)

    return "\n\n".join(context_parts)