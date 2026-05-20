from retrieval.search import search
from retrieval.context_builder import build_context
from rag.answer import generate_answer

query = "Was sagt das Zine über Macht und Gesellschaft?"

print("\nSTEP 1: SEARCH")
results = search(query)
print("OK")

print("\nSTEP 2: CONTEXT")
context = build_context(results)
print("OK")

print("\nSTEP 3: CONTEXT OUTPUT")
print(context)

print("\nSTEP 4: CALL LLM")
answer = generate_answer(query, context)

print("\nSTEP 5: ANSWER")
print(answer)