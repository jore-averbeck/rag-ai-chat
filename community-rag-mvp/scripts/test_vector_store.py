import os
from ingestion.extractor import extract_elements_from_pdf
from ingestion.chunker import chunk_elements
from ingestion.embedder import embed_chunks
from ingestion.vector_store import store_chunks


PDF_PATH = "data/processed/test_downloaded.pdf"


def main():
    print("\n--- 1. EXTRACT ---")
    elements = extract_elements_from_pdf(PDF_PATH)
    print("Elements:", len(elements))

    print("\n--- 2. CHUNK ---")
    chunks = chunk_elements(elements)
    print("Chunks:", len(chunks))

    print("\n--- 3. EMBED ---")
    chunks_with_embeddings = embed_chunks(chunks)
    print("Embedded chunks:", len(chunks_with_embeddings))

    print("\n--- 4. STORE ---")
    result = store_chunks(chunks_with_embeddings, "test_downloaded.pdf")

    print("\n--- DONE ---")
    print(result)


if __name__ == "__main__":
    main()