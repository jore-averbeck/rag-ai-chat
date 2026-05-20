from rag.rag_engine import RAGEngine

engine = RAGEngine()

result = engine.query("Was sagt das Zine über Macht und Gesellschaft?")

print("\n--- ANSWER ---\n")
print(result["answer"])

print("\n--- SOURCES ---\n")
for s in result["sources"]:
    print(s["document_name"], s["chunk_index"])