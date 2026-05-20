from ingestion.extractor import extract_elements_from_pdf
from ingestion.chunker import chunk_elements
from ingestion.embedder import embed_chunks

path = "data/processed/test_downloaded.pdf"

elements = extract_elements_from_pdf(path)

chunks = chunk_elements(elements)

embedded = embed_chunks(chunks)

print("\n--- EMBEDDED CHUNK ---\n")

print(embedded[0].keys())

print("\nEmbedding Länge:")

print(len(embedded[0]["embedding"]))