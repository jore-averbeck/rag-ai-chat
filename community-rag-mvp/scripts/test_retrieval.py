from retrieval.search import search
from retrieval.context_builder import build_context


def main():
    query = "Was sagt das Zine über Macht und Gesellschaft?"

    print("\n--- QUERY ---")
    print(query)

    results = search(query)

    print("\n--- TOP MATCHES ---\n")

    for r in results:
        print(f"Document: {r['document_name']}")
        print(f"Chunk: {r['chunk_index']}")
        print(f"Text: {r['content'][:200]}")
        print("---")

    context = build_context(results)

    print("\n--- FINAL CONTEXT ---\n")
    print(context[:1500])


if __name__ == "__main__":
    main()